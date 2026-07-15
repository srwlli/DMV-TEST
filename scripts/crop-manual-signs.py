#!/usr/bin/env python3
"""
Crop individual sign tiles from the rendered Ohio Driver Manual sign pages.

Source: manual/render/sign300-14.png and sign300-15.png (300 DPI renders of
PDF pages 14-15 = printed manual pages 11-12, Section 4 Traffic Signs).

The manual lays signs out in a regular grid: each sign symbol sits above a
bold black caption. We crop by explicit row/column boxes measured from the
300-DPI page (2550x3300). Boxes are the SYMBOL area only (caption excluded)
so the test shows just the sign graphic.

Output: assets/signs/manual/<id>.png  (one PNG per sign)

Every sign here is a public-domain MUTCD traffic-control symbol as depicted
in the official Ohio Driver Manual (HSY 7607).
"""
import os
from PIL import Image

REN = 'manual/render'
OUT = 'assets/signs/manual'
os.makedirs(OUT, exist_ok=True)

# Page 14 (2550x3300). Boxes are (left, top, right, bottom) in px, symbol only.
# Measured from the 300-DPI render. 5-col regulatory, 4-col prohibitory,
# then 5-col warning grid across two rows.
P14 = 'sign300-14.png'
P15 = 'sign300-15.png'

# Column centers (approx) for a 5-across layout and tile half-width.
# Row bands were located from the inspection strips.
SIGNS_14 = [
    # id,                 page,  (left, top, right, bottom)  -- measured from 300-DPI grid
    ('reg-stop',          P14, (355, 780, 555, 1015)),
    ('reg-school-speed',  P14, (700, 715, 925, 1010)),
    ('reg-do-not-enter',  P14, (1175, 780, 1405, 1010)),
    ('reg-one-way',       P14, (1595, 775, 1795, 1015)),
    ('reg-yield',         P14, (1955, 785, 2175, 1005)),

    ('proh-no-left-turn',  P14, (495, 1435, 715, 1665)),
    ('proh-no-u-turn',     P14, (945, 1435, 1165, 1665)),
    ('proh-no-right-turn', P14, (1395, 1435, 1615, 1665)),
    ('proh-no-bicycles',   P14, (1835, 1435, 2055, 1665)),

    ('warn-roundabout',       P14, (355, 1955, 575, 2175)),
    ('warn-road-curves',      P14, (755, 1955, 975, 2175)),
    ('warn-downhill',         P14, (1155, 1955, 1385, 2175)),
    ('warn-intersection-t',   P14, (1555, 1955, 1785, 2175)),
    ('warn-two-way',          P14, (1965, 1955, 2185, 2175)),

    ('warn-narrow-bridge',    P14, (360, 2385, 560, 2595)),
    ('warn-no-passing',       P14, (730, 2400, 930, 2580)),  # triangle points right
    ('warn-bicycle-crossing', P14, (1170, 2380, 1380, 2600)),
    ('warn-limited-clearance',P14, (1610, 2380, 1820, 2600)),
    ('warn-road-branches',    P14, (2050, 2380, 2260, 2600)),

    ('warn-sharp-right',      P14, (755, 2755, 975, 2975)),
    ('warn-ped-crossing',     P14, (1155, 2755, 1385, 2975)),
    ('warn-railroad',         P14, (1555, 2755, 1785, 2975)),
]

# Page 15: work-zone, guide, route markers.
SIGNS_15 = [
    ('wz-flagger',        P15, (360, 470, 560, 700)),
    ('wz-road-work',      P15, (700, 470, 940, 700)),

    ('guide-rest-area',   P15, (360, 1150, 570, 1360)),
    ('guide-route-132',   P15, (760, 1150, 970, 1360)),
    ('guide-hospital',    P15, (1160, 1150, 1370, 1360)),
    ('guide-directional', P15, (1560, 1150, 2170, 1360)),

    ('route-county-16',   P15, (360, 1720, 560, 1960)),
    ('route-interstate-22', P15, (1000, 1720, 1200, 1960)),
    ('route-business-22', P15, (1560, 1720, 1770, 1960)),
    ('route-us-40',       P15, (620, 2130, 820, 2360)),
    ('route-state-18',    P15, (1180, 2130, 1380, 2360)),
]

def crop_all(specs):
    cache = {}
    made = []
    for sid, page, box in specs:
        if page not in cache:
            cache[page] = Image.open(os.path.join(REN, page)).convert('RGB')
        tile = cache[page].crop(box)
        # trim uniform background margins
        out = os.path.join(OUT, f'{sid}.png')
        tile.save(out)
        made.append((sid, tile.size))
    return made

# Page-15 signs (work-zone/guide/route) are catalog-only and laid out irregularly
# (mixed with decorative barrel graphics); the quiz tests none of them, and the
# signs catalog page uses the Wikimedia SVGs. So we crop page-14 test signs only.
made = crop_all(SIGNS_14)
for sid, size in made:
    print(f'{sid:26s} {size}')
print(f'\nTotal: {len(made)} sign tiles -> {OUT}/')
