/**
 * generate-product-pages.mjs
 * ---------------------------------------------------------------------------
 * 生成 4 个产品详情页（product-20ft-expandable.html 等）。
 *
 * 为什么用脚本生成：4 个详情页结构完全一致，只有参数/文案不同。
 *   · 想改所有详情页的公共结构（比如加一个区块）→ 改本文件的 template 部分，重跑
 *   · 只想改某个型号的文字/参数 → 直接改 MODELS 数据，重跑
 *   · 生成后就是普通 HTML，也可以直接在 HTML 里手改（改完不要再跑脚本，会被覆盖）
 *
 * 用法： node tools/generate-product-pages.mjs
 * ---------------------------------------------------------------------------
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/* ===========================================================================
 * 1. 型号数据（改这里就能改页面内容）
 * ========================================================================= */
const SWATCHES = [
  { name: 'RAL 9010 White', hex: '#f4f4f2' },
  { name: 'RAL 7016 Anthracite', hex: '#383e42' },
  { name: 'RAL 5011 Navy', hex: '#1a365d' },
  { name: 'RAL 7035 Grey', hex: '#d7d7d7' },
  { name: 'RAL 8017 Brown', hex: '#45322e' },
  { name: 'RAL 1015 Sand', hex: '#e6d2b5' },
];

const MODELS = [
  {
    file: 'product-20ft-expandable.html',
    id: '20ft-expandable',
    code: '20E-2R1B',
    name: '20FT Expandable Container House',
    short: '20FT Expandable',
    priceFrom: '$4,500',
    priceRange: '$4,500 – $7,200',
    priceNote: 'FOB China, standard configuration',
    area: '37.2 m²',
    areaImp: '400 ft²',
    layout: '2 Bedrooms · 1 Bathroom',
    folded: '5900 × 2260 × 2480 mm',
    expanded: '5900 × 6300 mm',
    loading: '2 units / 40HQ',
    lead: '25 days',
    badge: 'Best seller',
    metaTitle: '20FT Expandable Container House — 37.2 m², 2 Bed 1 Bath | from $4,500',
    metaDesc:
      '20ft expandable container house: 37.2 m², 2 bedrooms, 1 bathroom. Folds to 5900×2260×2480 mm so two units fit one 40HQ. FOB from $4,500.',
    hook:
      'The unit that made expandable houses popular: two of them share one container, which is why it lands cheaper per square metre than anything else we build.',
    overview: [
      'The 20FT Expandable is our volume model and the one most first-time importers start with. It leaves the factory as a folded steel box 5900 mm long, 2260 mm wide and 2480 mm high. Two of those fit inside a single 40HQ container with room for the fittings crate, which halves your freight cost per unit compared with any fixed-size container home.',
      'On site the two wings swing out on the factory-fitted hinge line and the unit becomes 5900 × 6300 mm — 37.2 m² of internal floor. Because the walls, ceiling, floor, wiring and plumbing are all finished on the jig before shipping, there is no wet trade on site: no tiling, no painting, no chasing walls for cable.',
      'Standard layout is two bedrooms, one full bathroom, a galley kitchen and a living/dining space that takes a four-seat table. That layout suits granny flats, staff housing, mining accommodation and rental units. It is also the model most often re-drawn into a studio-plus layout or a retail fit-out, both of which we quote at no extra drawing cost.',
      'Everything is built to the code of the destination country. For Australia and New Zealand we supply AS/NZS-compliant accessories and documentation; for the US we build to IBC/IRC with 110 V UL-listed components; for the EU the frame is EN 1090 certified.',
    ],
    highlights: [
      { t: 'Two units per 40HQ', d: 'Folded width is only 2260 mm, so the freight per unit is the lowest in our range.' },
      { t: '37.2 m² usable', d: 'Full-height internal space with no wheel arches, no sloping ceiling, no compromise on furniture.' },
      { t: 'Unfolds in ~30 min', d: 'Two people, a forklift or small crane. No welding, no concrete foundation required.' },
      { t: 'Pre-wired and pre-plumbed', d: 'Factory plugs and wet-area connections — the on-site work is a water inlet and one power feed.' },
      { t: 'Galvanised bolted frame', d: 'Q235B/Q355B steel, 2.5–4.0 mm, hot-dip galvanised and bolted, not welded on site.' },
      { t: '25-day lead time', d: 'Standard configuration ships in 25 days; custom layout in about 30.' },
    ],
    specs: [
      ['Model code', '20E-2R1B'],
      ['Type', 'Expandable container house (2 wings, factory-hinged)'],
      ['Folded size (L × W × H)', '5900 × 2260 × 2480 mm'],
      ['Expanded footprint', '5900 × 6300 mm'],
      ['Internal area', '37.2 m² / 400 ft²'],
      ['Standard layout', '2 bedrooms, 1 bathroom, kitchen, living / dining'],
      ['Steel frame', 'Q235B / Q355B galvanised steel, 2.5–4.0 mm, bolted connection'],
      ['Wall panel', '50 / 75 mm EPS sandwich panel, 0.5 mm colour steel (rock wool or PU optional)'],
      ['Roof', 'Galvanised steel deck + 75 mm insulation panel, 1.0 kN/m² live load'],
      ['Floor', '18 mm cement board on steel purlins, PVC / laminate / SPC finish'],
      ['Ceiling height', '2480 mm internal (2600 mm optional)'],
      ['Door', 'Steel security door 900 × 2000 mm, aluminium alloy frame'],
      ['Windows', 'Aluminium sliding windows, tempered glass, insect screen, security bar optional'],
      ['Electrical', 'CE / UL components · 110 V or 220 V · pre-wired sockets, switch panel, LED lights'],
      ['Plumbing', 'PPR / PVC pre-installed; toilet, basin, shower and floor drain ready to connect'],
      ['Load capacity', 'Floor 1.5 kN/m² · roof 1.0 kN/m²'],
      ['Wind / seismic', 'Designed per destination code — 0.9 kN/m² wind pressure typical'],
      ['External finish', 'Colour steel cladding, RAL colour of your choice'],
      ['Container loading', '2 units per 40HQ'],
      ['Gross weight', '≈ 2,600 kg per unit'],
      ['Production lead time', '25 days (30 days for custom layout)'],
      ['MOQ', '1 unit'],
    ],
    layouts: [
      { n: 'Layout A — Standard', d: '2 bedrooms · 1 bathroom · kitchen · living/dining', note: 'Most ordered configuration. Sleeps 4 with a sofa bed.', p: 'Included' },
      { n: 'Layout B — Studio Plus', d: '1 master bedroom · 1 large open living/kitchen · 1 bathroom', note: 'For couples, retirees or rental units where one big room sells better than two small ones.', p: 'No extra charge' },
      { n: 'Layout C — Commercial', d: 'Open plan office or retail floor · 1 accessible WC', note: 'Adds a glass shopfront and a counter. Popular as a site office or sales suite.', p: '+$420' },
    ],
    install: [
      { t: 'Prepare a level base', d: 'Concrete slab, compacted hardcore, or 8–12 concrete blocks / adjustable steel feet. Flatness within 10 mm over the whole footprint — this is the only step where a mistake hurts.' },
      { t: 'Land the folded unit', d: 'Forklift or a small truck crane lifts at the four marked lifting lugs on the frame corners. The unit arrives folded, 2260 mm wide, and always travels with the door side up.' },
      { t: 'Unfold the two wings', d: 'Release the transport locks, then pull each wing out along its hinge until it seats on the frame rail. Two people, roughly 15 minutes per wing. No crane needed for this step.' },
      { t: 'Lock the frame', d: 'Insert and torque the high-strength bolts at the wing-to-frame and wing-to-wing joints. We supply the torque figures and a marked-up drawing; a wrench and a socket set is the whole toolkit.' },
      { t: 'Connect power and water', d: 'Industrial plug for power, one PPR inlet and one PVC outlet for water. All internal circuits are already terminated — this is a 30-minute job for an electrician and a plumber.' },
      { t: 'Seal, test and clean', d: 'Apply the supplied neutral-cure silicone to the external joints, run a water test on the wet areas, check the RCDs, and you are finished. Total on-site labour for two people: about half a day.' },
    ],
    faq: [
      ['Does it need a concrete foundation?', 'No. A level, compacted surface with blocks or adjustable steel feet is enough, and that is what most of our customers use. A slab is only needed if local regulation requires one — we will tell you what your country usually accepts.'],
      ['How many units fit in one container?', 'Two 20ft expandable units fit one 40HQ container. Quantities of three or more are shipped on a mixed loading plan so you get the cheapest freight per unit — we prepare that plan for you before you book.'],
      ['Can two units be joined into one bigger house?', 'Yes. The end walls are removable panels, so two or three units can be bolted together into one continuous floor plate. We supply the joining kit and the combined drawing.'],
      ['What is the difference between 20ft and 30ft?', 'Same 6300 mm expanded width, but the 30ft is 9000 mm long and gives 56.7 m² instead of 37.2 m². In practice the 20ft is chosen for one or two occupants, the 30ft for a family.'],
      ['How long does installation take?', 'Two people finish a single unit in about half a day including sealing and testing. The unfolding itself is around 30 minutes.'],
      ['What do I need to prepare for customs?', 'We supply the commercial invoice, packing list, bill of lading, and the CE / ISO certificates plus the material declaration your customs broker will ask for.'],
    ],
    related: ['30ft-expandable', '40ft-expandable', 'apple-cabin'],
  },

  {
    file: 'product-30ft-expandable.html',
    id: '30ft-expandable',
    code: '30E-3R1B',
    name: '30FT Expandable Container House',
    short: '30FT Expandable',
    priceFrom: '$6,800',
    priceRange: '$6,800 – $9,900',
    priceNote: 'FOB China, standard configuration',
    area: '56.7 m²',
    areaImp: '610 ft²',
    layout: '3 Bedrooms · 1 Bathroom',
    folded: '9000 × 2260 × 2480 mm',
    expanded: '9000 × 6300 mm',
    loading: '1–2 units / 40HQ',
    lead: '25–30 days',
    badge: 'Granny flat favourite',
    metaTitle: '30FT Expandable Container House — 56.7 m², 3 Bed 1 Bath | from $6,800',
    metaDesc:
      '30ft expandable container house: 56.7 m², 3 bedrooms, 9 m clear span with no internal columns. FOB from $6,800, shipped worldwide.',
    hook:
      'Nine metres long and 56.7 m² inside — the size that fits most granny flat and secondary-dwelling rules while still giving a family three real bedrooms.',
    overview: [
      'The 30FT Expandable is 9000 mm long when folded and 9000 × 6300 mm when opened, giving 56.7 m² of internal floor. That puts it in the sweet spot for secondary dwellings: big enough for three bedrooms and a proper living area, small enough to stay inside the floor-area caps that most councils apply to granny flats and ADUs.',
      'Structurally it is the same system as the 20ft — galvanised bolted frame, factory-hinged wings, sandwich-panel walls — but with the extra length working for you. The 9000 mm span means the living/dining room is column-free, so you can put a full dining table and a sofa group in without walking around a post.',
      'Standard layout gives three bedrooms, one bathroom, a kitchen and a combined living/dining area. The two layouts we quote most often are 2 bedrooms plus a study (for people who work from home) and 2 bedrooms plus a second bathroom (for shared occupancy). Neither costs more than the standard drawing.',
      'Because floor area drives approval in most markets, this is the model where our compliance documentation does the most work. For Australia we supply the AS/NZS accessory compliance pack; for the US, the drawings and material declarations that an IBC/IRC reviewer will ask for; for Europe, EN 1090 structural certification.',
    ],
    highlights: [
      { t: '56.7 m² internal', d: 'Three real bedrooms, not three rooms with a bed squeezed in.' },
      { t: '9 m column-free span', d: 'No post in the middle of the living area — a genuine advantage over flat pack modules.' },
      { t: 'Fits secondary-dwelling caps', d: 'Sized to sit inside typical granny flat / ADU floor-area limits.' },
      { t: 'Compliance pack included', d: 'AS/NZS, IBC/IRC or EN documentation prepared for your building reviewer.' },
      { t: 'One or two per container', d: 'Two units fit a 40HQ when shipped without the furniture crate — we plan the loading for you.' },
      { t: 'Unfolds in ~40 min', d: 'Two people plus a forklift; no heavy crane, no welding, no wet trades on site.' },
    ],
    specs: [
      ['Model code', '30E-3R1B'],
      ['Type', 'Expandable container house (2 wings, factory-hinged)'],
      ['Folded size (L × W × H)', '9000 × 2260 × 2480 mm'],
      ['Expanded footprint', '9000 × 6300 mm'],
      ['Internal area', '56.7 m² / 610 ft²'],
      ['Standard layout', '3 bedrooms, 1 bathroom, kitchen, living / dining'],
      ['Steel frame', 'Q235B / Q355B galvanised steel, 2.5–4.0 mm, bolted connection, 9 m clear span'],
      ['Wall panel', '50 / 75 mm EPS sandwich panel, 0.5 mm colour steel (rock wool or PU optional)'],
      ['Roof', 'Galvanised steel deck + 75 mm insulation panel, 1.0 kN/m² live load'],
      ['Floor', '18 mm cement board on steel purlins, PVC / laminate / SPC finish'],
      ['Ceiling height', '2480 mm internal (2600 mm optional)'],
      ['Doors', 'Steel security door 900 × 2000 mm + internal doors to all bedrooms'],
      ['Windows', 'Aluminium sliding windows, tempered glass, insect screen on bedroom windows'],
      ['Electrical', 'CE / UL components · 110 V or 220 V · pre-wired, LED lighting throughout'],
      ['Plumbing', 'PPR / PVC pre-installed, wet area ready for toilet, basin, shower'],
      ['Load capacity', 'Floor 1.5 kN/m² · roof 1.0 kN/m²'],
      ['Wind / seismic', 'Designed per destination code — 0.9 kN/m² wind pressure typical'],
      ['External finish', 'Colour steel cladding, RAL colour of your choice'],
      ['Container loading', '1–2 units per 40HQ depending on specification'],
      ['Gross weight', '≈ 3,900 kg per unit'],
      ['Production lead time', '25–30 days'],
      ['MOQ', '1 unit'],
    ],
    layouts: [
      { n: 'Layout A — Standard', d: '3 bedrooms · 1 bathroom · kitchen · living/dining', note: 'Sleeps 5 including a sofa bed. Our most-quoted drawing.', p: 'Included' },
      { n: 'Layout B — Home Office', d: '2 bedrooms · 1 study · 1 bathroom', note: 'For buyers who need a dedicated workspace with a window and a door.', p: 'No extra charge' },
      { n: 'Layout C — Dual Bath', d: '2 bedrooms · 2 bathrooms · enlarged living', note: 'Shared occupancy, staff housing or rental where two tenants need their own bathroom.', p: '+$650' },
    ],
    install: [
      { t: 'Prepare a level base', d: 'Two rows of support at 3000 mm centres minimum. Slab, compacted hardcore, or blocks. Flatness within 10 mm across the 9 m length — for a base this long, check it with a laser level, not by eye.' },
      { t: 'Land the folded unit', d: 'Forklift or small crane lifts at the four marked lugs. At 9 m folded the unit is long but narrow (2260 mm), so a standard flatbed can move it from port to site.' },
      { t: 'Unfold both wings', d: 'Release the transport locks and swing each wing out until it seats on the frame rail. Allow about 20 minutes per wing with two people. The wing panels are the heaviest part of the whole job.' },
      { t: 'Bolt and align', d: 'Torque the wing-to-frame and wing-to-wing bolts in the sequence shown on the supplied drawing. Check the diagonal measurements at this point — the drawing gives you the figures.' },
      { t: 'Connect services', d: 'One power feed, one water inlet, one drain. Internal circuits and the wet-area pipework are already terminated in the factory.' },
      { t: 'Seal and commission', d: 'Silicone the external joints, water-test the bathroom, test the RCD, and check that all bedroom doors latch after the base has settled for 24 hours.' },
    ],
    faq: [
      ['Will this fit granny flat size limits in Australia?', 'It is one of the reasons we build it. At 56.7 m² it sits inside the floor-area caps used by most councils for secondary dwellings. Requirements still vary by state and council — send us the postcode and we will tell you which documents we prepare for that jurisdiction.'],
      ['How many units fit in a 40HQ container?', 'One unit with the furniture crate, or two units if you take the standard fit-out and ship the loose items separately. We issue a loading plan with the quotation so you can see the actual cost per unit.'],
      ['Can I get three bedrooms plus two bathrooms?', 'Yes, but you trade living space for it — the total floor area does not change. We will draw both versions so you can see the difference before you decide.'],
      ['Is 9 m too long for my site access?', 'That is the question worth asking early. A 40ft truck with a 9 m load needs a turning radius and an overhead clearance most rural and suburban sites already have, but inner-city laneways often do not. Tell us your access dimensions and we will advise before you order.'],
      ['How is it heated and cooled?', 'We pre-install the wiring and the wall sleeve for split-system air conditioners — typically two units for this floor area. Most buyers supply the AC locally because it is cheaper than importing it.'],
      ['What maintenance does the shell need?', 'Wash the colour-steel cladding twice a year, touch up stone chips, and check the silicone joints annually. That is the whole schedule for the first ten years.'],
    ],
    related: ['20ft-expandable', '40ft-expandable', 'apple-cabin'],
  },

  {
    file: 'product-40ft-expandable.html',
    id: '40ft-expandable',
    code: '40E-3R2B',
    name: '40FT Expandable Container House',
    short: '40FT Expandable',
    priceFrom: '$8,900',
    priceRange: '$8,900 – $12,800',
    priceNote: 'FOB China, standard configuration',
    area: '74.3 m²',
    areaImp: '800 ft²',
    layout: '3 Bedrooms · 2 Bathrooms · Store',
    folded: '11800 × 2260 × 2480 mm',
    expanded: '11800 × 6300 mm',
    loading: '1 unit / 40HQ',
    lead: '30 days',
    badge: 'Largest unit',
    metaTitle: '40FT Expandable Container House — 74.3 m², 3 Bed 2 Bath | from $8,900',
    metaDesc:
      '40ft expandable container house: 74.3 m², 3 bedrooms, 2 bathrooms and a walk-in store. Our largest single unit. FOB from $8,900.',
    hook:
      '74.3 m² with three bedrooms, two bathrooms and a walk-in store. This is the unit that stops feeling like a container and starts feeling like a house.',
    overview: [
      'The 40FT Expandable is the largest single unit we build: 11800 mm long, expanding to 11800 × 6300 mm for 74.3 m² of internal floor. That is comparable to a small conventional house, and it is the point at which buyers stop making compromises on room sizes.',
      'The standard layout gives three bedrooms, two full bathrooms, a kitchen with room for an island, a living/dining area that takes a six-seat table, and a walk-in store that most people convert into a laundry or pantry. Because the total footprint is generous, the layout can be pushed further than the smaller models: four bedrooms, a second living area, or a fully open-plan living/kitchen with a separate utility room.',
      'Structurally it shares the same system as the rest of the range — galvanised bolted frame, factory-hinged wings, sandwich-panel envelope — but with the longest span in the catalogue, which makes it the model most often ordered for two-storey stacking on project sites.',
      'It ships one unit per 40HQ. For volume buyers that matters: at 50 units the freight per unit is roughly 30% higher than the 30ft, and we will show you both numbers side by side so the decision is based on landed cost rather than FOB.',
    ],
    highlights: [
      { t: '74.3 m² internal', d: 'House-scale rooms: 3 bedrooms, 2 bathrooms, kitchen with island space, walk-in store.' },
      { t: '11.8 m × 6.3 m footprint', d: 'The largest floor plate in our range from a single container.' },
      { t: 'Stackable to 2 floors', d: 'Designed for corner-column stacking — the standard configuration for site camps.' },
      { t: 'Two full bathrooms', d: 'Not a wet room and a WC: two complete bathrooms with shower, basin and WC.' },
      { t: 'One unit per 40HQ', d: 'Simple loading, no mixed plan, and the fittings crate travels inside the unit.' },
      { t: '30-day lead time', d: 'Standard in 30 days; custom or multi-unit orders are scheduled so nothing slips silently.' },
    ],
    specs: [
      ['Model code', '40E-3R2B'],
      ['Type', 'Expandable container house (2 wings, factory-hinged)'],
      ['Folded size (L × W × H)', '11800 × 2260 × 2480 mm'],
      ['Expanded footprint', '11800 × 6300 mm'],
      ['Internal area', '74.3 m² / 800 ft²'],
      ['Standard layout', '3 bedrooms, 2 bathrooms, kitchen, living / dining, walk-in store'],
      ['Steel frame', 'Q235B / Q355B galvanised steel, 3.0–4.0 mm, bolted connection, 11.8 m span'],
      ['Wall panel', '75 mm EPS sandwich panel, 0.5 mm colour steel (rock wool or PU recommended)'],
      ['Roof', 'Galvanised steel deck + 100 mm insulation panel, 1.0 kN/m² live load'],
      ['Floor', '18 mm cement board on steel purlins, PVC / laminate / SPC finish'],
      ['Ceiling height', '2480 mm internal (2600 mm optional)'],
      ['Doors', 'Steel security door + 5 internal doors, all pre-hung in factory'],
      ['Windows', 'Aluminium sliding windows, tempered glass, insect screens standard'],
      ['Electrical', 'CE / UL components · 110 V or 220 V · distribution board, RCD, LED lighting'],
      ['Plumbing', 'Two full wet areas pre-piped; water heater position and connections prepared'],
      ['Load capacity', 'Floor 1.5 kN/m² · roof 1.0 kN/m² · stackable 2 floors'],
      ['Wind / seismic', 'Designed per destination code — wind load calculated for your site'],
      ['External finish', 'Colour steel cladding, RAL colour of your choice'],
      ['Container loading', '1 unit per 40HQ'],
      ['Gross weight', '≈ 5,200 kg per unit'],
      ['Production lead time', '30 days'],
      ['MOQ', '1 unit'],
    ],
    layouts: [
      { n: 'Layout A — Standard', d: '3 bedrooms · 2 bathrooms · kitchen · living/dining · store', note: 'The house-equivalent plan. Sleeps 6 comfortably.', p: 'Included' },
      { n: 'Layout B — Four Bed', d: '4 bedrooms · 2 bathrooms · reduced living area', note: 'For larger families or staff housing where bed count beats living space.', p: 'No extra charge' },
      { n: 'Layout C — Open Plan', d: '2 bedrooms · 2 bathrooms · large open kitchen/living · utility room', note: 'Couples and downsizers. Kitchen island, no corridor.', p: '+$480' },
      { n: 'Layout D — Clinical / Office', d: 'Open floor plate · reception · 2 accessible WCs', note: 'Clinic, medical annex or site office fit-out with antibacterial wall finish.', p: '+$1,100' },
    ],
    install: [
      { t: 'Build the base for the load', d: 'A 74.3 m² unit with water and furniture can exceed 8,000 kg. Use a slab, or support beams at 3000 mm centres with proper footings. We supply a base drawing with the point loads marked.' },
      { t: 'Plan the lift', d: 'At 11800 mm folded the unit needs a crane or a large telehandler with a spreader beam, not a forklift. Most buyers arrange this through a local crane hire firm — we provide the rigging drawing.' },
      { t: 'Land and level', d: 'Set the unit on its base and level it across both axes with the adjustable feet before releasing the lifting gear. Do not skip this: an out-of-level base shows up as door alignment problems three weeks later.' },
      { t: 'Unfold the wings', d: 'Release the transport locks and extend both wings — about 25 minutes per wing with two people. The four-panel design on this model means each wing panel is shorter and easier to handle than on the 20ft.' },
      { t: 'Bolt the structure', d: 'Torque the wing-to-frame and wing-to-wing connections to the figures on the supplied drawing, then check the three diagonal measurements.' },
      { t: 'Commission services', d: 'Two wet areas, so allow an extra hour for the water test. Confirm the RCD trips, the hot water runs, and the roof drainage discharges away from the base.' },
    ],
    faq: [
      ['Is 74.3 m² too big for a single 40HQ?', 'No — the unit folds to 2260 mm wide, which is exactly why it fits. It ships as one unit per container with the loose fittings packed inside, so there is no separate crate to clear.'],
      ['Can it be stacked?', 'Yes, two floors as standard, with external stair towers. The corner columns take the point loads; we supply the stacking kit, connection plates and the structural calculation. Three floors is possible with the detachable system rather than this one.'],
      ['Do I need a crane?', 'For this model, yes — a small crane or telehandler with a spreader beam. The 11800 mm folded length is too long for a forklift to place accurately.'],
      ['How does it compare in price per m² to the 30ft?', 'Roughly 12–15% cheaper per square metre on FOB. The freight cost per unit is higher because only one fits a container, so ask us for the landed comparison — for most destinations the 40ft still wins per square metre.'],
      ['Can I have a second storey access from inside?', 'Not internally in the standard design — stacking uses external stair towers. If you need an internal staircase, that is a two-unit custom project and we will quote it as one building rather than two containers.'],
      ['What is the walk-in store used for?', 'Most buyers make it a laundry, a pantry, or a technical room for the water heater and inverter. It also gives you a place to put the electrical distribution board where it is accessible and out of the living space.'],
    ],
    related: ['30ft-expandable', '20ft-expandable', 'apple-cabin'],
  },

  {
    file: 'product-apple-cabin.html',
    id: 'apple-cabin',
    code: '5.8C-1R1B',
    name: 'Apple Cabin / Capsule House',
    short: 'Apple Cabin',
    priceFrom: '$12,500',
    priceRange: '$12,500 – $18,900',
    priceNote: 'FOB China, hospitality specification',
    area: '12.8 m²',
    areaImp: '138 ft²',
    layout: 'Studio · 1 Bathroom',
    folded: '5800 × 2200 × 2500 mm',
    expanded: '5800 × 2200 mm',
    loading: '4 units / 40HQ',
    lead: '35 days',
    badge: 'Hospitality',
    metaTitle: 'Apple Cabin Capsule House — 12.8 m² Panoramic Studio | from $12,500',
    metaDesc:
      'Apple cabin capsule house: 12.8 m² studio with full-height panoramic glazing, aluminium frame and a complete bathroom. FOB from $12,500.',
    hook:
      'A capsule with one whole wall of glass. It exists because guests pay for the view, and a glamping pod that lets you see the valley outsells a room that does not.',
    overview: [
      'The Apple Cabin is not an expandable house — it is a single-piece capsule, 5800 × 2200 × 2500 mm, delivered fully assembled and finished. There is nothing to unfold and no site assembly beyond setting it down on a prepared base and connecting power and water.',
      'What defines it is the glazing: one entire long wall is tempered double glazing in an aluminium frame, running from floor to ceiling. That single design decision is why resorts, glamping sites and holiday parks buy it, and why it earns more per night than a container conversion of the same footprint.',
      'Inside, the standard fit-out is a studio: sleeping zone, compact kitchenette, and a full bathroom with shower, basin and WC. Finishes are a step above our expandable range — SPC flooring, aluminium trim, concealed LED lighting, and a choice of interior panelling including a curved option that follows the capsule shell.',
      'Four units fit one 40HQ container, so the freight per unit on a multi-unit order is the lowest in our entire range. For a resort adding six pods, that is a materially different business case than importing six separate structures.',
    ],
    highlights: [
      { t: 'Full-wall panoramic glazing', d: 'Tempered double glazing in an aluminium frame, floor to ceiling. The reason guests book it.' },
      { t: 'Arrives fully finished', d: 'No unfolding, no assembly. Set it down, connect power and water, hand over the key.' },
      { t: 'Four units per 40HQ', d: 'The cheapest freight per unit we offer — decisive on multi-unit resort orders.' },
      { t: 'Hospitality-grade interior', d: 'SPC flooring, aluminium trim, concealed LED lighting, compact kitchenette, full bathroom.' },
      { t: 'Curved shell, no cold bridges', d: 'Insulated panel shell with continuous insulation — comfortable in -10 °C to 40 °C.' },
      { t: 'Relocatable', d: 'Lift it onto a truck and move it. No foundation, no demolition, no lost asset.' },
    ],
    specs: [
      ['Model code', '5.8C-1R1B'],
      ['Type', 'Capsule house / apple cabin (single piece, fully assembled)'],
      ['Overall size (L × W × H)', '5800 × 2200 × 2500 mm'],
      ['Internal area', '12.8 m² / 138 ft²'],
      ['Standard layout', 'Studio: sleeping zone, kitchenette, full bathroom'],
      ['Frame', 'Galvanised lightweight steel frame with curved shell panels'],
      ['Wall / roof panel', '75 mm insulated composite panel, aluminium-trim finish'],
      ['Glazing', 'Full-length tempered double glazing, aluminium alloy frame, floor to ceiling'],
      ['Floor', '18 mm board + SPC (stone plastic composite) finish, waterproof'],
      ['Ceiling height', '2400 mm internal at centre'],
      ['Door', 'Aluminium alloy entrance door with laminated glass panel'],
      ['Electrical', 'CE / UL components · 110 V or 220 V · concealed LED lighting, USB outlets, RCD'],
      ['Bathroom', 'Shower, basin, WC, water heater position, extractor fan, waterproof wall panels'],
      ['Kitchenette', 'Counter, sink, tap, space for undercounter fridge and induction hob'],
      ['Insulation', '75 mm composite panel; suitable for -10 °C to 40 °C ambient with appropriate heating / cooling'],
      ['Climate', 'Wall sleeve and wiring prepared for a split-system air conditioner'],
      ['External finish', 'Bonded aluminium or colour-steel skin, RAL colour of your choice'],
      ['Container loading', '4 units per 40HQ'],
      ['Gross weight', '≈ 1,800 kg per unit'],
      ['Production lead time', '35 days'],
      ['MOQ', '1 unit'],
    ],
    layouts: [
      { n: 'Layout A — Hotel Pod', d: '1.8 m bed · full bathroom · wardrobe · minibar', note: 'The standard resort unit. Scored highest in guest reviews in our own installations.', p: 'Included' },
      { n: 'Layout B — Glamping Plus', d: 'Bed · kitchenette with hob · dining nook · larger bathroom', note: 'For self-catering stays of two nights or more, where guests expect to cook.', p: '+$1,350' },
      { n: 'Layout C — Garden Office', d: 'Open desk area · storage wall · shower room · no kitchenette', note: 'Home office with a view. Popular with buyers who already have a house on the land.', p: '-$400' },
    ],
    install: [
      { t: 'Prepare a small, flat base', d: 'The unit weighs about 1,800 kg, so four pads or a compacted gravel pad is enough. Flatness within 5 mm — the shell is rigid, and an uneven base is visible through the glazing line.' },
      { t: 'Plan access for the delivery truck', d: 'Fully assembled, the cabin is 5800 mm long and 2500 mm high. Check overhead cables, gate widths and turning space before the truck arrives — this step causes more delays than any other.' },
      { t: 'Set it down', d: 'A truck-mounted crane, a small crawler crane or a telehandler. Four marked lifting points, one smooth lift, set on the prepared pads.' },
      { t: 'Level and fix', d: 'Level with the built-in adjustable feet, then anchor to the pads with the supplied brackets if your site is exposed to high wind.' },
      { t: 'Connect power and water', d: 'One power feed, one water inlet and one drain. All internal circuits, plumbing and the extractor fan are factory-terminated.' },
      { t: 'Commission and dress', d: 'Test the RCD, run the shower, check the glazing seals, and fit the supplied interior curtains or blinds. A single pod is a half-day job for two people.' },
    ],
    faq: [
      ['Is this a container house?', 'No, and it is worth being clear about that. It is a single-piece capsule with a curved insulated shell, delivered fully assembled. It shares nothing with a shipping container except the truck that moves it.'],
      ['How many fit in a container?', 'Four units per 40HQ. That is the lowest freight per unit in our range and the main reason multi-unit resort orders work financially.'],
      ['Can it be used as a permanent home?', 'It is 12.8 m², so in most jurisdictions it counts as a habitable unit but not a dwelling on its own. It is usually used as a guest pod, a garden studio, or an additional bedroom — check your local rules and we will supply the drawings.'],
      ['How do you clean the glazing?', 'Standard glass cleaner and a squeegee. The glazing unit is fixed, not sliding, so there are no tracks to clog.'],
      ['What is the lifespan?', 'The aluminium and insulated shell are rated for 20+ years; the glazing gaskets should be inspected every three years.'],
      ['Can it be moved later?', 'Yes. It is designed to be lifted again. Many buyers relocate pods between sites when a lease ends — that is a real advantage over anything built in place.'],
    ],
    related: ['20ft-expandable', '30ft-expandable', '40ft-expandable'],
  },
];

/* ===========================================================================
 * 2. 公共片段（导航 / 页脚 / 图标）
 * ========================================================================= */
const ICON = {
  phone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  mail: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ed8936" stroke-width="2" class="mt-0.5 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  phoneSm: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ed8936" stroke-width="2" class="mt-0.5 shrink-0"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  mailSm: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ed8936" stroke-width="2" class="mt-0.5 shrink-0"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  clockSm: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ed8936" stroke-width="2" class="mt-0.5 shrink-0"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  wa: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-[#25d366]"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.37 2.98 1.17 3.09.78 3.65.73.56-.05 1.81-.74 2.06-1.45.25-.71.25-1.32.17-1.45-.07-.13-.27-.2-.57-.35zM12.04 21.5a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41 2.51 0 4.88.98 6.65 2.76a9.35 9.35 0 0 1 2.76 6.66c0 5.19-4.23 9.41-9.42 9.41z"/></svg>',
  check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2"><path d="m5 13 4 4L19 7"/></svg>',
  arrow: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chevron: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>',
};

/** 顶部信息条 + 导航栏（与静态页面保持完全一致） */
const HEADER = (active) => {
  const cur = (k) => (k === active ? ' aria-current="page"' : '');
  return `<a class="skip-link" href="#main">Skip to content</a>

<!-- 顶部信息条 -->
<div class="topbar hidden lg:block">
  <div class="mx-auto max-w-8xl px-5 lg:px-8 h-9 flex items-center justify-between">
    <div class="flex items-center gap-6">
      <a data-href="phone" href="tel:" class="flex items-center gap-1.5 transition hover:text-white">${ICON.phone}<span data-site="phone">+86 138 0000 0000</span></a>
      <a data-href="email" href="mailto:" class="flex items-center gap-1.5 transition hover:text-white">${ICON.mail}<span data-site="email">sales@example-containerhouse.com</span></a>
      <span class="hidden xl:flex items-center gap-1.5">${ICON.clock}<span data-site="hours">Mon – Sat 08:30 – 18:00 (GMT+8)</span></span>
    </div>
    <div class="flex items-center gap-4">
      <span>CE · ISO 9001 · SGS Audited Factory</span>
      <span class="h-3.5 w-px bg-brand-600"></span>
      <span>Shipping to 60+ countries</span>
    </div>
  </div>
</div>

<!-- 主导航 -->
<header class="site-header">
  <div class="mx-auto max-w-8xl px-4 sm:px-5 lg:px-8">
    <div class="flex h-16 items-center gap-2 sm:gap-4 lg:h-[4.25rem]">
      <a href="index.html" class="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5" aria-label="杰诚 HOUSE — home">
        <svg class="h-5 w-auto sm:h-[26px]" viewBox="0 0 64 40" aria-hidden="true">
          <rect x="4" y="14" width="56" height="24" fill="none" stroke="#1a365d" stroke-width="3"/>
          <path d="M0 14 L32 2 L64 14" fill="none" stroke="#ed8936" stroke-width="3" stroke-linejoin="round"/>
          <line x1="24" y1="14" x2="24" y2="38" stroke="#1a365d" stroke-width="2.5" stroke-dasharray="5 4"/>
          <line x1="45" y1="14" x2="45" y2="38" stroke="#1a365d" stroke-width="2.5" stroke-dasharray="5 4"/>
        </svg>
        <span class="leading-none">
          <span class="block font-display text-[1.15rem] font-bold tracking-wide text-brand-900 sm:text-[1.3rem]">杰诚 HOUSE</span>
          <span class="mt-0.5 hidden text-[.58rem] font-semibold tracking-[.16em] text-slate-500 sm:block">EXPANDABLE CONTAINER HOUSE</span>
        </span>
      </a>
      <nav class="ml-6 hidden items-center gap-7 lg:flex" aria-label="Main">
        <a class="nav-link" href="index.html"${cur('home')}>Home</a>
        <div class="nav-drop-wrap">
          <a class="nav-link" href="products.html"${cur('products')}>Products ${ICON.chevron}</a>
          <div class="nav-drop">
            <p class="drop-head">Expandable Series</p>
            <a href="product-20ft-expandable.html">20FT Expandable Container House</a>
            <a href="product-30ft-expandable.html">30FT Expandable Container House</a>
            <a href="product-40ft-expandable.html">40FT Expandable Container House</a>
            <p class="drop-head">Other Series</p>
            <a href="product-apple-cabin.html">Apple Cabin / Capsule House</a>
            <a href="products.html">View all products →</a>
          </div>
        </div>
        <a class="nav-link" href="projects.html"${cur('projects')}>Projects</a>
        <a class="nav-link" href="about.html"${cur('about')}>About Us</a>
        <a class="nav-link" href="blog.html"${cur('blog')}>Blog</a>
        <a class="nav-link" href="contact.html"${cur('contact')}>Contact</a>
      </nav>
      <div class="ml-auto flex items-center gap-2 sm:gap-3">
        <a data-href="whatsapp" href="#" class="hidden items-center gap-2 text-sm font-semibold text-brand-800 transition hover:text-accent-600 xl:flex">${ICON.wa}WhatsApp</a>
        <a href="contact.html" class="btn btn-accent btn-sm px-3 sm:px-4 lg:px-5">Request Quote</a>
        <button class="burger lg:hidden -mr-1 p-2" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobilePanel">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
  <div class="mobile-panel border-t border-[#e5e9f0] lg:hidden" id="mobilePanel">
    <nav class="px-5 pb-6 pt-2" aria-label="Mobile">
      <a href="index.html">Home</a>
      <a href="products.html">All Products</a>
      <a class="pl-4 text-[.9rem] font-medium text-slate-600" href="product-20ft-expandable.html">— 20FT Expandable</a>
      <a class="pl-4 text-[.9rem] font-medium text-slate-600" href="product-30ft-expandable.html">— 30FT Expandable</a>
      <a class="pl-4 text-[.9rem] font-medium text-slate-600" href="product-40ft-expandable.html">— 40FT Expandable</a>
      <a class="pl-4 text-[.9rem] font-medium text-slate-600" href="product-apple-cabin.html">— Apple Cabin</a>
      <a href="projects.html">Projects</a>
      <a href="about.html">About Us</a>
      <a href="blog.html">Blog</a>
      <a href="contact.html">Contact</a>
      <div class="mt-5 grid grid-cols-2 gap-2">
        <a class="btn btn-whatsapp btn-sm" data-href="whatsapp" href="#">WhatsApp</a>
        <a class="btn btn-accent btn-sm" href="contact.html">Request Quote</a>
      </div>
    </nav>
  </div>
</header>`;
};

/** 页脚 */
const FOOTER = `<!-- 页脚 -->
<footer class="bg-brand-950 pt-14 text-brand-200">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <div class="grid gap-10 pb-12 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <div class="flex items-center gap-2.5">
          <svg width="38" height="25" viewBox="0 0 64 40" aria-hidden="true">
            <rect x="4" y="14" width="56" height="24" fill="none" stroke="#ffffff" stroke-width="3"/>
            <path d="M0 14 L32 2 L64 14" fill="none" stroke="#ed8936" stroke-width="3" stroke-linejoin="round"/>
            <line x1="24" y1="14" x2="24" y2="38" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="5 4"/>
            <line x1="45" y1="14" x2="45" y2="38" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="5 4"/>
          </svg>
          <span class="leading-none">
            <span class="block font-display text-[1.25rem] font-bold tracking-wide text-white" data-site="brand">杰诚 HOUSE</span>
            <span class="mt-0.5 block text-[.56rem] font-semibold tracking-[.16em] text-brand-300">EXPANDABLE CONTAINER HOUSE</span>
          </span>
        </div>
        <p class="mt-5 max-w-sm text-sm leading-relaxed text-brand-300">
          <span data-site="brandFull">杰诚 Modular House Co., Ltd.</span> — a factory-direct manufacturer of expandable
          container houses, flat pack container houses and apple cabins, exporting to 60+ countries since 2010.
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <span class="badge-cert bg-transparent text-brand-100 border-brand-700">CE</span>
          <span class="badge-cert bg-transparent text-brand-100 border-brand-700">ISO 9001</span>
          <span class="badge-cert bg-transparent text-brand-100 border-brand-700">SGS</span>
          <span class="badge-cert bg-transparent text-brand-100 border-brand-700">EN 1090</span>
        </div>
      </div>
      <nav class="lg:col-span-2" aria-label="Products">
        <h3 class="font-display text-base font-bold tracking-wider text-white">PRODUCTS</h3>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li><a class="transition hover:text-white" href="product-20ft-expandable.html">20FT Expandable</a></li>
          <li><a class="transition hover:text-white" href="product-30ft-expandable.html">30FT Expandable</a></li>
          <li><a class="transition hover:text-white" href="product-40ft-expandable.html">40FT Expandable</a></li>
          <li><a class="transition hover:text-white" href="product-apple-cabin.html">Apple Cabin</a></li>
          <li><a class="transition hover:text-white" href="products.html">All products</a></li>
        </ul>
      </nav>
      <nav class="lg:col-span-2" aria-label="Company">
        <h3 class="font-display text-base font-bold tracking-wider text-white">COMPANY</h3>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li><a class="transition hover:text-white" href="about.html">About us</a></li>
          <li><a class="transition hover:text-white" href="projects.html">Projects</a></li>
          <li><a class="transition hover:text-white" href="blog.html">Blog</a></li>
          <li><a class="transition hover:text-white" href="contact.html">Contact</a></li>
          <li><a class="transition hover:text-white" href="about.html#factory">Factory tour</a></li>
        </ul>
      </nav>
      <div class="lg:col-span-4">
        <h3 class="font-display text-base font-bold tracking-wider text-white">CONTACT</h3>
        <ul class="mt-4 space-y-3 text-sm">
          <li class="flex gap-3">${ICON.pin}<span data-site="address">No. 88 Industrial Road, Zhengding District, Shijiazhuang, Hebei, China</span></li>
          <li class="flex gap-3">${ICON.phoneSm}<a class="transition hover:text-white" data-href="phone" href="tel:"><span data-site="phone">+86 138 0000 0000</span></a></li>
          <li class="flex gap-3">${ICON.mailSm}<a class="transition hover:text-white" data-href="email" href="mailto:"><span data-site="email">sales@example-containerhouse.com</span></a></li>
          <li class="flex gap-3">${ICON.clockSm}<span data-site="hours">Mon – Sat 08:30 – 18:00 (GMT+8)</span></li>
        </ul>
        <div class="mt-5 flex flex-wrap gap-2">
          <a class="btn btn-whatsapp btn-sm" data-href="whatsapp" href="#">WhatsApp us</a>
          <a class="btn btn-accent btn-sm" href="contact.html">Request Quote</a>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4 border-t border-brand-800 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
      <p>© <span data-year>2026</span> <span data-site="brandFull">杰诚 Modular House Co., Ltd.</span> All rights reserved.</p>
      <p class="text-brand-400">Prices on this site are indicative FOB China and exclude freight, duty and local installation. All dimensions are nominal ±2%.</p>
    </div>
  </div>
</footer>`;

/* ===========================================================================
 * 3. 页面模板
 * ========================================================================= */
const INTERIOR_IMAGES = [
  { src: 'interior-living', cap: 'Living / dining area', sub: 'Delivered with the layout you approve — furniture is optional' },
  { src: 'interior-kitchen', cap: 'Kitchen', sub: 'Counter, sink and space for undercounter fridge and hob' },
  { src: 'interior-bedroom', cap: 'Bedroom', sub: 'Full-height walls, real windows, standard 1.8 m bed' },
  { src: 'interior-bathroom', cap: 'Bathroom', sub: 'Shower, basin, WC and extractor — fully pre-piped' },
];

function page(m) {
  // 本商品自己的图片目录 —— 改这个商品的图不会影响任何别的商品
  const D = `products/${m.id}`;
  const gallery = [
    { src: `${D}/cover`,              alt: `${m.name} elevation drawing`, cap: 'Front elevation' },
    { src: `${D}/floorplan`,          alt: `${m.name} floor plan`,        cap: 'Floor plan' },
    { src: `${D}/interior-living`,    alt: `${m.name} living area`,       cap: 'Living area' },
    { src: `${D}/interior-kitchen`,   alt: `${m.name} kitchen`,           cap: 'Kitchen' },
    { src: `${D}/interior-bedroom`,   alt: `${m.name} bedroom`,           cap: 'Bedroom' },
    { src: `${D}/interior-bathroom`,  alt: `${m.name} bathroom`,          cap: 'Bathroom' },
    { src: `${D}/factory`,            alt: 'Factory workshop',            cap: 'Factory' },
  ];

  const relatedCards = m.related
    .map((rid) => MODELS.find((x) => x.id === rid))
    .map(
      (r) => `
        <article class="card card-hover reveal overflow-hidden">
          <div class="card-media aspect-[4/3]">
            <img src="assets/img/products/${r.id}/cover.svg" alt="${r.name}" loading="lazy">
          </div>
          <div class="p-5">
            <p class="model-code text-xs font-bold text-accent-600">${r.code}</p>
            <h3 class="mt-1.5 font-display text-lg font-bold leading-tight text-brand-900">
              <a class="transition hover:text-accent-600" href="${r.file}">${r.name}</a>
            </h3>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="price-tag text-[1.35rem]">${r.priceFrom}<small>starting from</small></span>
              <a class="link-arrow text-sm" href="${r.file}">Details</a>
            </div>
          </div>
        </article>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<!-- ===========================================================================
  ${m.file} —— ${m.name} 详情页
  ---------------------------------------------------------------------------
  本页由 tools/generate-product-pages.mjs 生成。两种改法：
    1) 直接改这个 HTML（简单直接，但重跑脚本会覆盖）
    2) 改脚本里的 MODELS 数据再重跑（适合同时改多个型号）
  【改联系方式】assets/js/site-config.js    【改颜色/字体】tailwind.config.js
  【换图片】本页的图全部在 assets/img/products/${m.id}/ 目录里（cover / floorplan /
            interior-* / factory），直接覆盖同名文件即可，不会影响其他型号
=========================================================================== -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${m.metaTitle}</title>
  <meta name="description" content="${m.metaDesc}">
  <link rel="canonical" href="https://www.example-containerhouse.com/${m.file}">

  <meta property="og:type" content="product">
  <meta property="og:title" content="${m.metaTitle}">
  <meta property="og:description" content="${m.metaDesc}">
  <meta property="og:image" content="assets/img/products/${m.id}/cover.svg">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/tailwind.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="assets/img/icons/favicon.svg">
  <link rel="apple-touch-icon" href="assets/img/icons/apple-touch-icon.png">

  <!-- 结构化数据：让 Google 能展示价格和评价 -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${m.name}",
    "sku": "${m.code}",
    "brand": { "@type": "Brand", "name": "杰诚 HOUSE" },
    "description": "${m.metaDesc}",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "${m.priceFrom.replace(/[$,]/g, '')}",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "杰诚 Modular House Co., Ltd." }
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${m.faq
  .map(
    ([q, a]) => `      { "@type": "Question", "name": ${JSON.stringify(q)}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(
      a
    )} } }`
  )
  .join(',\n')}
    ]
  }
  </script>
</head>

<body class="bg-white font-sans antialiased">
${HEADER('products')}

<main id="main">

<!-- =====================================================================
     01 · 面包屑
====================================================================== -->
<section class="bg-blueprint py-6">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a> <span class="mx-1.5">/</span>
      <a href="products.html">Products</a> <span class="mx-1.5">/</span>
      <span aria-current="page">${m.name}</span>
    </nav>
  </div>
</section>

<!-- =====================================================================
     02 · 图库 + 关键信息 + 询价入口
====================================================================== -->
<section class="bg-white py-10 lg:py-12">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <div class="grid gap-10 lg:grid-cols-12">

      <!-- 左：图库（大图 + 缩略图，点击放大） -->
      <div class="lg:col-span-7" data-gallery>
        <div class="gallery-main">
          <span class="card-badge">${m.badge}</span>
          <img data-gallery-main src="assets/img/${gallery[0].src}.svg" alt="${gallery[0].alt}">
        </div>
        <div class="gallery-thumbs" role="tablist" aria-label="Product images">
${gallery
  .map(
    (g, i) => `          <button class="gallery-thumb${i === 0 ? ' is-active' : ''}" type="button" data-gallery-thumb data-full="assets/img/${g.src}.svg" aria-label="${g.cap}">
            <img src="assets/img/${g.src}.svg" alt="${g.cap}">
          </button>`
  )
  .join('\n')}
        </div>
        <p class="mt-3 text-xs text-slate-500">
          Click any image to enlarge. Drawings shown are indicative — your approved drawing governs production.
        </p>
      </div>

      <!-- 右：摘要 + 参数 + CTA -->
      <div class="lg:col-span-5">
        <p class="eyebrow">${m.code}</p>
        <h1 class="section-title mt-3 text-[1.85rem] lg:text-[2.3rem]">${m.name}</h1>
        <p class="mt-3 text-[1.02rem] leading-relaxed text-slate-600">${m.hook}</p>

        <!-- 价格区间 -->
        <div class="mt-6 rounded-lg border border-brand-100 bg-brand-50 p-5">
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Factory-direct price range</p>
          <p class="price-tag mt-1 text-[2rem]">${m.priceRange}</p>
          <p class="mt-1 text-xs text-slate-500">${m.priceNote} · MOQ 1 unit · ocean freight quoted separately</p>
        </div>

        <!-- 关键参数 -->
        <dl class="spec-list mt-6">
          <div><dt>Internal area</dt><dd>${m.area} (${m.areaImp})</dd></div>
          <div><dt>Standard layout</dt><dd>${m.layout}</dd></div>
          <div><dt>Folded size</dt><dd>${m.folded}</dd></div>
          <div><dt>Expanded size</dt><dd>${m.expanded}</dd></div>
          <div><dt>Container loading</dt><dd>${m.loading}</dd></div>
          <div><dt>Lead time</dt><dd>${m.lead}</dd></div>
        </dl>

        <!-- 主 CTA 组 -->
        <div class="mt-6 grid gap-2 sm:grid-cols-2">
          <a class="btn btn-accent" href="#inquiry">Get a quotation ${ICON.arrow}</a>
          <a class="btn btn-whatsapp" data-href="whatsapp" data-wa-text="Hi, I am interested in the ${m.short} (${m.code}, ${m.area}). Please send the price list and floor plan." href="#">WhatsApp now</a>
        </div>
        <a class="btn btn-outline btn-block mt-2" href="#specs">Download full specification →</a>

        <!-- 信任点 -->
        <ul class="mt-6 space-y-2.5 text-sm text-slate-700">
          <li class="flex gap-2.5"><span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-500 text-white">${ICON.check}</span>Free 2D layout drawing with every quotation</li>
          <li class="flex gap-2.5"><span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-500 text-white">${ICON.check}</span>Third-party inspection (SGS / BV) welcome before loading</li>
          <li class="flex gap-2.5"><span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-500 text-white">${ICON.check}</span>CE / ISO certified, documentation for your customs broker included</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- =====================================================================
     03 · 产品概述 + 核心优势
====================================================================== -->
<section class="border-y border-[#e5e9f0] bg-brand-50 py-12 lg:py-16">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <div class="grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-5 reveal">
        <p class="eyebrow">Overview</p>
        <h2 class="section-title mt-3 text-[1.7rem] lg:text-[2.1rem]">What you are actually buying</h2>
        <div class="mt-5 flex flex-wrap gap-2">
          <span class="chip">${m.area} internal</span>
          <span class="chip">${m.layout}</span>
          <span class="chip chip-accent">${m.loading}</span>
          <span class="chip">${m.lead} lead time</span>
        </div>
      </div>
      <div class="lg:col-span-7 reveal">
${m.overview.map((p) => `        <p class="mt-4 leading-relaxed text-slate-700">${p}</p>`).join('\n')}
      </div>
    </div>

    <!-- 核心优势 6 项 -->
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
${m.highlights
  .map(
    (h) => `      <div class="card reveal p-5">
        <h3 class="font-display text-lg font-bold text-brand-900">${h.t}</h3>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600">${h.d}</p>
      </div>`
  )
  .join('\n')}
    </div>
  </div>
</section>

<!-- =====================================================================
     04 · 详细参数表
====================================================================== -->
<section class="bg-white py-12 lg:py-16" id="specs">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <div class="max-w-2xl reveal">
      <p class="eyebrow">Specification</p>
      <h2 class="section-title mt-3 text-[1.7rem] lg:text-[2.1rem]">${m.name} — full specification</h2>
      <p class="mt-4 text-slate-600">
        Standard configuration. Anything in this table can be changed — the specification sheet we send with your
        quotation always reflects what you actually ordered.
      </p>
    </div>

    <div class="table-scroll card mt-8 overflow-hidden reveal">
      <table class="spec-table">
        <caption>Dimensions are nominal ±2%. Load figures are design values, not tested failure loads.</caption>
        <tbody>
${m.specs
  .map(
    ([k, v]) => `          <tr><th scope="row">${k}</th><td>${v}</td></tr>`
  )
  .join('\n')}
        </tbody>
      </table>
    </div>

    <div class="mt-6 flex flex-wrap gap-3">
      <a class="btn btn-brand" href="#inquiry">Request the PDF specification</a>
      <a class="btn btn-outline" data-href="whatsapp" data-wa-text="Hi, please send the PDF specification for the ${m.code}." href="#">Ask for the PDF on WhatsApp</a>
    </div>
  </div>
</section>

<!-- =====================================================================
     05 · 户型图 + 可选布局
====================================================================== -->
<section class="border-y border-[#e5e9f0] bg-brand-50 py-12 lg:py-16" id="layout">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <div class="max-w-2xl reveal">
      <p class="eyebrow">Floor plan</p>
      <h2 class="section-title mt-3 text-[1.7rem] lg:text-[2.1rem]">Standard plan, and three ways to change it</h2>
      <p class="mt-4 text-slate-600">
        The dashed red lines in the drawing are the expandable wings. Total floor area stays the same whichever
        layout you choose — what changes is how the space is divided.
      </p>
    </div>

    <div class="mt-8 grid gap-8 lg:grid-cols-12">
      <figure class="lg:col-span-7 reveal">
        <img class="w-full rounded-lg border border-brand-100 bg-white" src="assets/img/${gallery[1].src}.svg" alt="${m.name} standard floor plan">
        <figcaption class="mt-3 text-xs text-slate-500">
          Standard layout drawing. <a class="link-arrow" href="#inquiry">Ask for the DWG / PDF version</a>.
        </figcaption>
      </figure>

      <div class="lg:col-span-5">
${m.layouts
  .map(
    (l) => `        <div class="card reveal mb-4 p-5">
          <div class="flex items-start justify-between gap-3">
            <h3 class="font-display text-lg font-bold text-brand-900">${l.n}</h3>
            <span class="chip ${l.p === 'Included' || l.p === 'No extra charge' ? '' : 'chip-accent'} shrink-0">${l.p}</span>
          </div>
          <p class="mt-1.5 text-sm font-semibold text-brand-800">${l.d}</p>
          <p class="mt-1.5 text-sm leading-relaxed text-slate-600">${l.note}</p>
        </div>`
  )
  .join('\n')}
      </div>
    </div>
  </div>
</section>

<!-- =====================================================================
     06 · 内部实景
====================================================================== -->
<section class="bg-white py-12 lg:py-16">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <div class="max-w-2xl reveal">
      <p class="eyebrow">Interior</p>
      <h2 class="section-title mt-3 text-[1.7rem] lg:text-[2.1rem]">Inside a finished unit</h2>
      <p class="mt-4 text-slate-600">
        These are the standard finishes, not a show-home upgrade. Aluminium trim, LED lighting, waterproof wet areas,
        and 2480 mm ceilings throughout.
      </p>
    </div>
    <div class="mt-8 grid gap-5 sm:grid-cols-2">
${INTERIOR_IMAGES.map(
  (i) => `      <figure class="card card-hover overflow-hidden reveal">
        <div class="card-media aspect-[4/3]"><img src="assets/img/products/${m.id}/${i.src}.svg" alt="${m.name} — ${i.cap}" loading="lazy"></div>
        <figcaption class="p-4">
          <p class="font-display text-base font-bold text-brand-900">${i.cap}</p>
          <p class="mt-1 text-xs text-slate-500">${i.sub}</p>
        </figcaption>
      </figure>`
).join('\n')}
    </div>
  </div>
</section>

<!-- =====================================================================
     07 · 安装步骤
====================================================================== -->
<section class="bg-blueprint py-12 text-white lg:py-16" id="installation">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <div class="grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <p class="eyebrow eyebrow-light">Installation</p>
        <h2 class="section-title section-title-light mt-3 text-[1.7rem] lg:text-[2.1rem]">Six steps, two people, no wet trades</h2>
        <p class="mt-4 leading-relaxed text-brand-100">
          Every unit ships with a written installation manual, a marked-up bolt drawing and the torque figures.
          We also run a video call with your installer before the container arrives — that call has prevented more
          problems than any document.
        </p>
        <div class="mt-7 rounded-lg border border-white/15 bg-white/5 p-4">
          <p class="text-sm text-brand-100">
            <strong class="text-white">Toolkit required:</strong> socket set, torque wrench, silicone gun, spirit or
            laser level, a forklift or small crane. No welding equipment.
          </p>
        </div>
        <a class="btn btn-accent mt-6" data-href="whatsapp" data-wa-text="Hi, please send the installation manual for the ${m.code}." href="#">Get the installation manual</a>
      </div>

      <div class="lg:col-span-7">
${m.install
  .map(
    (s, i) => `        <div class="step reveal" data-step="${String(i + 1).padStart(2, '0')}">
          <h4 class="text-white">${s.t}</h4>
          <p class="text-brand-100">${s.d}</p>
        </div>`
  )
  .join('\n')}
      </div>
    </div>
  </div>
</section>

<!-- =====================================================================
     08 · 定制选项
====================================================================== -->
<section class="bg-white py-12 lg:py-16" id="custom">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <div class="max-w-2xl reveal">
      <p class="eyebrow">Customisation</p>
      <h2 class="section-title mt-3 text-[1.7rem] lg:text-[2.1rem]">What you can change, and what it costs</h2>
      <p class="mt-4 text-slate-600">
        Prices below are indicative add-ons on top of the standard unit. Quantity discounts apply from 10 units.
        Nothing here affects the 25–35 day lead time except the furniture package.
      </p>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-3">

      <!-- 外形颜色 -->
      <div class="card reveal p-5 lg:col-span-1">
        <h3 class="font-display text-lg font-bold text-brand-900">Exterior colour</h3>
        <p class="mt-1.5 text-sm text-slate-600">Colour-steel skin in any RAL shade. Six stock colours ship fastest.</p>
        <div class="mt-4 grid grid-cols-2 gap-2">
${SWATCHES.map(
  (s) => `          <span class="swatch"><i style="background:${s.hex}"></i><span>${s.name}</span></span>`
).join('\n')}
        </div>
        <p class="mt-3 text-xs text-slate-500">Custom RAL: no extra cost, +3 days lead time.</p>
      </div>

      <!-- 保温 / 卫浴 / 电气 -->
      <div class="card reveal p-5">
        <h3 class="font-display text-lg font-bold text-brand-900">Insulation &amp; climate</h3>
        <div class="table-scroll mt-3">
          <table class="spec-table">
            <tbody>
              <tr><th scope="row">50 mm EPS</th><td>Standard · temperate climates</td></tr>
              <tr><th scope="row">75 mm EPS</th><td>+4% · most orders choose this</td></tr>
              <tr><th scope="row">75 mm rock wool</th><td>+8% · fire rating, noise</td></tr>
              <tr><th scope="row">75 mm PU panel</th><td>+15% · cold and hot climates</td></tr>
              <tr><th scope="row">Double glazing upgrade</th><td>+$260</td></tr>
              <tr><th scope="row">Roof insulation +25 mm</th><td>+$180</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card reveal p-5">
        <h3 class="font-display text-lg font-bold text-brand-900">Bathroom &amp; kitchen</h3>
        <div class="table-scroll mt-3">
          <table class="spec-table">
            <tbody>
              <tr><th scope="row">Bathroom — basic</th><td>Included</td></tr>
              <tr><th scope="row">Bathroom — premium</th><td>+$420 · branded sanitaryware</td></tr>
              <tr><th scope="row">Water heater</th><td>+$150</td></tr>
              <tr><th scope="row">Kitchenette</th><td>+$480 · counter, sink, tap</td></tr>
              <tr><th scope="row">Kitchen full set</th><td>+$680 · hob, hood, cupboard run</td></tr>
              <tr><th scope="row">Furniture package</th><td>+$1,200 · bed, sofa, table, wardrobe</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-3">
      <div class="card reveal p-5">
        <h3 class="font-display text-lg font-bold text-brand-900">Electrical</h3>
        <div class="table-scroll mt-3">
          <table class="spec-table">
            <tbody>
              <tr><th scope="row">110 V / 60 Hz</th><td>US, Canada · UL components</td></tr>
              <tr><th scope="row">220–240 V / 50 Hz</th><td>EU, UK, MENA, Africa</td></tr>
              <tr><th scope="row">230 V / 50 Hz</th><td>Australia, NZ · AS/NZS accessories</td></tr>
              <tr><th scope="row">Solar-ready pre-wire</th><td>+$180</td></tr>
              <tr><th scope="row">3 kW solar + battery</th><td>+$1,450</td></tr>
              <tr><th scope="row">Generator changeover</th><td>+$240</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card reveal p-5">
        <h3 class="font-display text-lg font-bold text-brand-900">External add-ons</h3>
        <div class="table-scroll mt-3">
          <table class="spec-table">
            <tbody>
              <tr><th scope="row">Split AC (1.5 HP)</th><td>+$310 each</td></tr>
              <tr><th scope="row">External stairs + landing</th><td>+$780</td></tr>
              <tr><th scope="row">Timber decking</th><td>+$95 / m²</td></tr>
              <tr><th scope="row">Retractable awning</th><td>+$420</td></tr>
              <tr><th scope="row">500 L water tank + pump</th><td>+$260</td></tr>
              <tr><th scope="row">Stacking kit (2 floors)</th><td>+$540</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card reveal p-5">
        <h3 class="font-display text-lg font-bold text-brand-900">Packing &amp; shipping</h3>
        <ul class="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
          <li><strong class="text-brand-800">Folded dimensions:</strong> ${m.folded} — standard 40HQ loading, no out-of-gauge freight.</li>
          <li><strong class="text-brand-800">Loading:</strong> ${m.loading}.</li>
          <li><strong class="text-brand-800">Protection:</strong> bubble wrap on glazing, corner guards, strap-down plan issued by us.</li>
          <li><strong class="text-brand-800">Terms:</strong> FOB, CIF or DDP — you get all three in the same quotation so you can compare landed cost.</li>
          <li><strong class="text-brand-800">Documents:</strong> invoice, packing list, B/L, CE / ISO certificates, material declaration for customs.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- =====================================================================
     09 · FAQ
====================================================================== -->
<section class="border-y border-[#e5e9f0] bg-brand-50 py-12 lg:py-16" id="faq">
  <div class="mx-auto max-w-4xl px-5 lg:px-8">
    <div class="reveal">
      <p class="eyebrow">FAQ</p>
      <h2 class="section-title mt-3 text-[1.7rem] lg:text-[2.1rem]">Questions we get about this model</h2>
    </div>
    <div class="mt-8">
${m.faq
  .map(
    ([q, a], i) => `      <div class="accordion-item reveal${i === 0 ? ' is-open' : ''}">
        <button class="accordion-head" type="button" aria-expanded="${i === 0}">${q}</button>
        <div class="accordion-body"><div>${a}</div></div>
      </div>`
  )
  .join('\n')}
    </div>
    <p class="mt-6 text-sm text-slate-600">
      Something not answered here?
      <a class="link-arrow" data-href="whatsapp" data-wa-text="Hi, I have a question about the ${m.code}: " href="#">Ask us on WhatsApp</a>
      and you will get a real engineer's answer, usually within 30 minutes during working hours.
    </p>
  </div>
</section>

<!-- =====================================================================
     10 · 相关型号
====================================================================== -->
<section class="bg-white py-12 lg:py-16">
  <div class="mx-auto max-w-8xl px-5 lg:px-8">
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between reveal">
      <div class="max-w-2xl">
        <p class="eyebrow">Compare</p>
        <h2 class="section-title mt-3 text-[1.7rem] lg:text-[2.1rem]">Buyers who looked at this also looked at</h2>
      </div>
      <a class="btn btn-outline shrink-0" href="products.html">Full comparison table</a>
    </div>
    <div class="mt-8 grid gap-6 sm:grid-cols-3">
${relatedCards}
    </div>
  </div>
</section>

<!-- =====================================================================
     11 · 底部询盘表单 CTA（每个产品页都必须保留这一段）
====================================================================== -->
<section class="relative isolate overflow-hidden bg-brand-900 py-14 lg:py-16" id="inquiry">
  <div class="absolute inset-0 bg-blueprint opacity-70"></div>
  <div class="relative mx-auto max-w-8xl px-5 lg:px-8">
    <div class="grid gap-10 lg:grid-cols-12 lg:items-start">

      <div class="lg:col-span-5">
        <p class="eyebrow eyebrow-light">Request a quotation</p>
        <h2 class="section-title section-title-light mt-3 text-[1.8rem] lg:text-[2.2rem]">
          Get the ${m.code} price, drawing and freight cost
        </h2>
        <p class="mt-4 leading-relaxed text-brand-100">
          Tell us the quantity and the destination port. You will get back a written quotation with FOB and CIF
          options, the layout drawing for your sign-off, the loading plan and the lead time — in one reply.
        </p>
        <dl class="mt-8 grid grid-cols-2 gap-6">
          <div><dt class="stat-num stat-num-light text-[1.7rem]">${m.area}</dt><dd class="stat-label text-brand-200">Internal area</dd></div>
          <div><dt class="stat-num stat-num-light text-[1.7rem]">${m.loading.split(' ')[0]}</dt><dd class="stat-label text-brand-200">Units per 40HQ</dd></div>
          <div><dt class="stat-num stat-num-light text-[1.7rem]">${m.lead.split(' ')[0]}</dt><dd class="stat-label text-brand-200">Days lead time</dd></div>
          <div><dt class="stat-num stat-num-light text-[1.7rem]">${m.priceFrom}</dt><dd class="stat-label text-brand-200">Starting price, FOB</dd></div>
        </dl>
        <div class="mt-8 flex flex-wrap gap-3">
          <a class="btn btn-whatsapp" data-href="whatsapp" data-wa-text="Hi, I want a quotation for the ${m.code} (${m.area}). Destination port: " href="#">WhatsApp: fastest reply</a>
          <a class="btn btn-ghost-light" data-href="email" href="mailto:">Email the sales team</a>
        </div>
      </div>

      <!-- 询盘表单 -->
      <div class="lg:col-span-7">
        <div class="rounded-xl border border-white/15 bg-white p-6 shadow-2xl lg:p-7">
          <h3 class="font-display text-2xl font-bold text-brand-900">Inquiry form</h3>
          <p class="mt-1.5 text-sm text-slate-600">
            Model already filled in for you. Fields marked <span class="req text-accent-600">*</span> are required.
          </p>
          <form class="js-form mt-5" novalidate>
            <!-- 产品名自动带入，方便你在邮箱里区分来源 -->
            <input type="hidden" name="product" value="${m.name} (${m.code})">
            <input type="hidden" name="source" value="${m.file} — bottom inquiry form">
            <div class="grid gap-x-4 sm:grid-cols-2">
              <div class="field">
                <label for="p-name">Name <span class="req">*</span></label>
                <input class="input" id="p-name" name="name" type="text" required placeholder="Your name" autocomplete="name">
                <span class="field-error">Please enter your name.</span>
              </div>
              <div class="field">
                <label for="p-company">Company</label>
                <input class="input" id="p-company" name="company" type="text" placeholder="Optional">
              </div>
              <div class="field">
                <label for="p-email">Email <span class="req">*</span></label>
                <input class="input" id="p-email" name="email" type="email" required placeholder="you@company.com" autocomplete="email">
                <span class="field-error">Please enter a valid email.</span>
              </div>
              <div class="field">
                <label for="p-phone">Phone / WhatsApp</label>
                <input class="input" id="p-phone" name="phone" type="tel" placeholder="+61 400 000 000">
              </div>
              <div class="field">
                <label for="p-country">Destination country <span class="req">*</span></label>
                <input class="input" id="p-country" name="country" type="text" required placeholder="e.g. Australia" autocomplete="country-name">
                <span class="field-error">We need this to quote freight.</span>
              </div>
              <div class="field">
                <label for="p-port">Discharge port</label>
                <input class="input" id="p-port" name="port" type="text" placeholder="e.g. Sydney">
              </div>
              <div class="field">
                <label for="p-qty">Quantity</label>
                <select class="select" id="p-qty" name="quantity">
                  <option>1 unit (sample)</option>
                  <option>2–5 units</option>
                  <option>6–20 units</option>
                  <option>20+ units (project)</option>
                </select>
              </div>
              <div class="field">
                <label for="p-model">Model</label>
                <select class="select" id="p-model" name="model">
                  <option selected>${m.name} (${m.code})</option>
                  <option>20FT Expandable — 37.2 m²</option>
                  <option>30FT Expandable — 56.7 m²</option>
                  <option>40FT Expandable — 74.3 m²</option>
                  <option>Apple Cabin — 12.8 m²</option>
                  <option>Flat pack / detachable / other</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label for="p-msg">Requirement <span class="req">*</span></label>
              <textarea class="textarea" id="p-msg" name="message" required data-minlen="10" placeholder="Layout changes, power supply (110V/220V), climate, insulation, target install date, and anything else we should know…"></textarea>
              <span class="field-error">Please give us at least a sentence (10 characters).</span>
            </div>
            <input class="hp-field" type="text" name="_hp" tabindex="-1" autocomplete="off" aria-hidden="true">
            <button class="btn btn-accent btn-block btn-lg" type="submit">Send inquiry about the ${m.code}</button>
            <p class="form-note mt-3">
              No newsletter, no reselling of your details. Reply within 12 working hours.
            </p>
          </form>
          <div class="form-success mt-4">
            <strong>Thanks — your inquiry about the ${m.name} has been received.</strong>
            <p class="mt-1">Our sales engineer will send the quotation within 12 working hours. For an instant answer, message us on WhatsApp.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</main>

${FOOTER}

<script src="assets/js/site-config.js"></script>
<script src="assets/js/main.js"></script>
</body>
</html>
`;
}

/* ===========================================================================
 * 4. 输出
 * ========================================================================= */
MODELS.forEach((m) => {
  writeFileSync(join(ROOT, m.file), page(m));
  console.log('✔ ' + m.file);
});
console.log('Done — ' + MODELS.length + ' product pages generated.');
