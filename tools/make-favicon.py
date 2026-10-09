#!/usr/bin/env python3
"""生成站点根目录的 favicon.ico（16/32/48 多尺寸）与 apple-touch-icon.png。

不依赖 Pillow / cairosvg 等外部库：自己光栅化方形房子图标 + 手写 PNG/ICO 编码。
图标与 assets/img/icons/favicon.svg 是同一套几何（64×64 设计坐标）。
"""
import binascii, os, struct, zlib

# ---------- 设计坐标（与 favicon.svg 一致，64×64） ----------
NAVY   = (0x1a, 0x36, 0x5d)
ORANGE = (0xed, 0x89, 0x36)
WHITE  = (0xff, 0xff, 0xff)

S = 64.0
RR_X, RR_Y, RR_W, RR_H, RR_R = 0, 0, 64, 64, 12      # 圆角底板
ROOF = ((32, 11), (55, 30), (9, 30))                 # 屋顶三角
BODY = (16, 30, 32, 23)                              # 房体  x,y,w,h
DOOR = (27, 38, 10, 15)                              # 门

def in_rounded_rect(x, y):
    if not (-0.001 <= x <= RR_X + RR_W + 0.001 and -0.001 <= y <= RR_Y + RR_H + 0.001):
        return False
    cx = min(max(x, RR_X + RR_R), RR_X + RR_W - RR_R)
    cy = min(max(y, RR_Y + RR_R), RR_Y + RR_H - RR_R)
    if x == cx or y == cy:
        return True
    return (x - cx) ** 2 + (y - cy) ** 2 <= RR_R * RR_R

def in_tri(x, y, t):
    (x1, y1), (x2, y2), (x3, y3) = t
    d1 = (x - x2) * (y1 - y2) - (x1 - x2) * (y - y2)
    d2 = (x - x3) * (y2 - y3) - (x2 - x3) * (y - y3)
    d3 = (x - x1) * (y3 - y1) - (x3 - x1) * (y - y1)
    neg = (d1 < 0) or (d2 < 0) or (d3 < 0)
    pos = (d1 > 0) or (d2 > 0) or (d3 > 0)
    return not (neg and pos)

def in_rect(x, y, r):
    rx, ry, rw, rh = r
    return rx <= x <= rx + rw and ry <= y <= ry + rh

def color_at(x, y):
    """返回该设计坐标点的颜色，点在图标外则返回 None。"""
    if not in_rounded_rect(x, y):
        return None
    if in_tri(x, y, ROOF):
        return ORANGE
    if in_rect(x, y, BODY):
        if in_rect(x, y, DOOR):
            return NAVY
        return WHITE
    return NAVY

def render(size, ss=4):
    """按 size×size 输出 RGBA bytes，ss 为超采样倍率（抗锯齿）。"""
    px = bytearray(size * size * 4)
    step = S / (size * ss)
    for py in range(size):
        for pxi in range(size):
            r = g = b = a = 0
            for sy in range(ss):
                for sx in range(ss):
                    x = (pxi * ss + sx + 0.5) * step
                    y = (py * ss + sy + 0.5) * step
                    c = color_at(x, y)
                    if c:
                        r += c[0]; g += c[1]; b += c[2]; a += 255
            n = ss * ss
            if a == 0:
                continue
            # 颜色按覆盖到的子像素平均；alpha 按覆盖率给
            cov = a / 255
            px[(py * size + pxi) * 4 + 0] = round(r / cov)
            px[(py * size + pxi) * 4 + 1] = round(g / cov)
            px[(py * size + pxi) * 4 + 2] = round(b / cov)
            px[(py * size + pxi) * 4 + 3] = round(a / n)
    return bytes(px)

def png(w, h, rgba):
    raw = b''.join(b'\x00' + rgba[y * w * 4:(y + 1) * w * 4] for y in range(h))
    def chunk(tag, data):
        return (struct.pack('>I', len(data)) + tag + data +
                struct.pack('>I', binascii.crc32(tag + data) & 0xffffffff))
    return (b'\x89PNG\r\n\x1a\n' +
            chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)) +
            chunk(b'IDAT', zlib.compress(raw, 9)) +
            chunk(b'IEND', b''))

def ico(images):
    """images: [(size, png_bytes)] —— 用 PNG 压缩的 ICO（现代浏览器与 Vista+ 均支持）。"""
    n = len(images)
    header = struct.pack('<HHH', 0, 1, n)
    offset = 6 + 16 * n
    entries, blobs = b'', b''
    for size, data in images:
        s = 0 if size >= 256 else size
        entries += struct.pack('<BBBBHHII', s, s, 0, 0, 1, 32, len(data), offset)
        offset += len(data)
        blobs += data
    return header + entries + blobs

if __name__ == '__main__':
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    icons_dir = os.path.join(root, 'assets', 'img', 'icons')
    os.makedirs(icons_dir, exist_ok=True)

    sizes = [16, 32, 48]
    imgs = [(s, png(s, s, render(s))) for s in sizes]
    ico_path = os.path.join(root, 'favicon.ico')
    with open(ico_path, 'wb') as f:
        f.write(ico(imgs))
    print(f'✔ {ico_path}  {os.path.getsize(ico_path)} B  ({", ".join(f"{s}x{s}" for s in sizes)})')

    # 只生成页面实际引用的两个位图：apple-touch-icon（iOS 桌面图标）
    # 以及站点根目录的 favicon.ico。多生成的图标没人引用就是死文件，不生成。
    for s, name in [(180, 'apple-touch-icon.png')]:
        p = os.path.join(icons_dir, name)
        with open(p, 'wb') as f:
            f.write(png(s, s, render(s)))
        print(f'✔ {p}  {os.path.getsize(p)} B  ({s}x{s})')
