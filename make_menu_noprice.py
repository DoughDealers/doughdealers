from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image, PageBreak
from reportlab.lib.enums import TA_CENTER

output = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\DoughDealers_Menu_NoPrice.pdf"

doc = SimpleDocTemplate(output, pagesize=letter,
    leftMargin=0.75*inch, rightMargin=0.75*inch,
    topMargin=0.75*inch, bottomMargin=0.75*inch)

WHITE      = colors.HexColor('#ffffff')
GOLD       = colors.HexColor('#c8a96e')
DARK       = colors.HexColor('#1a1a1a')
GREY       = colors.HexColor('#555555')
LIGHT_GREY = colors.HexColor('#888888')

tagline_style   = ParagraphStyle('Tagline',   fontName='Helvetica-Oblique', fontSize=12,
    textColor=GOLD, alignment=TA_CENTER, spaceAfter=2)
section_style   = ParagraphStyle('Section',   fontName='Helvetica-Bold',    fontSize=14,
    textColor=GOLD, spaceBefore=8, spaceAfter=2, alignment=TA_CENTER)
item_name_style = ParagraphStyle('ItemName',  fontName='Helvetica-Bold',    fontSize=11,
    textColor=DARK, spaceAfter=1, alignment=TA_CENTER)
item_desc_style = ParagraphStyle('ItemDesc',  fontName='Helvetica',         fontSize=8.5,
    textColor=GREY, spaceAfter=1, alignment=TA_CENTER)
note_style      = ParagraphStyle('Note',      fontName='Helvetica-Oblique', fontSize=7.5,
    textColor=LIGHT_GREY, spaceAfter=1, alignment=TA_CENTER)
footer_style    = ParagraphStyle('Footer',    fontName='Helvetica',         fontSize=8,
    textColor=LIGHT_GREY, alignment=TA_CENTER)

story = []

LOGO_PATH = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\src\assets\logowhite.png"

logo_img = Image(LOGO_PATH, width=2.0*inch, height=2.0*inch)
logo_img.hAlign = 'CENTER'

logo_row = Table([[logo_img]], colWidths=[7*inch])
logo_row.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), DARK),
    ('ALIGN',      (0,0), (-1,-1), 'CENTER'),
    ('TOPPADDING', (0,0), (-1,-1), 14),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
]))
story.append(logo_row)

tagline_row = Table([[Paragraph('The Best Dough Fa Sho!', tagline_style)]], colWidths=[7*inch])
tagline_row.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), DARK),
    ('ALIGN',      (0,0), (-1,-1), 'CENTER'),
    ('TOPPADDING', (0,0), (-1,-1), 8),
    ('BOTTOMPADDING', (0,0), (-1,-1), 16),
]))
story.append(tagline_row)
story.append(Spacer(1, 8))

def section_header(title):
    story.append(HRFlowable(width='100%', thickness=1.5, color=GOLD, spaceAfter=2))
    story.append(Paragraph(title.upper(), section_style))

def menu_item(name, desc, variants=None):
    story.append(Paragraph(f'<b>{name}</b>', item_name_style))
    if desc:
        story.append(Paragraph(desc, item_desc_style))
    if variants:
        story.append(Paragraph(f'Options: {", ".join(variants)}', note_style))
    story.append(Spacer(1, 4))

# COOKIES
section_header('Cookies')
story.append(Spacer(1, 4))
cookies = [
    ('Chip Drip',      'Soft-baked cookie dripping with rich chocolate chips.', ['Regular', 'Nutella']),
    ('Oatsession',     'Hearty oatmeal cookie with a touch of cinnamon.',                  ['Regular', 'Raisin', 'Pecan']),
    ('Golden Grind',   'Golden peanut butter cookie with rich, nutty flavor.',             None),
    ('Rainbow Rush', 'Soft and chewy cookie packed with colorful M&M candies.',          ['Regular', 'Peanut']),
    ('Nut Case',       'Peanut butter cookie filled with rich peanut butter chips and crunchy peanut candies.', None),
    ('CinnaBomb',      'Warm cinnamon cookie swirled with rich brown sugar.',               ['Regular', 'Frosting']),
    ('Blue Dream',     'Blueberry cookie layered with fresh blueberries, a creamy cheesecake filling,<br/>topped with cream cheese chips.', None),
    ('Midnight Crunch', 'Chocolate cookie filled with Oreo pieces and white chocolate chips, with a whole Oreo center.', None),
    ('Berry Bliss', 'Buttery cookie with raspberries and creamy macadamia nuts.',       None),
    ('Red Temptation', 'Red velvet cookie with chocolate chips, Oreo bites, and a cream cheese center.', None),
    ('Melt Down',      'Chocolate chip cookie with graham cracker pieces, gooey marshmallow, and a milk chocolate bar.', None),
]
for n, d, v in cookies:
    menu_item(n, d, v)

story.append(PageBreak())

# MUFFINS
section_header('Muffins')
story.append(Spacer(1, 4))
muffins = [
    ('Chocolate',  'Rich cocoa muffin loaded with chocolate chips.',         ['Double Chocolate', 'Triple Chocolate']),
    ('Pumpkin',    'Warmly spiced pumpkin muffin with a soft, moist crumb.', ['Original', 'Cream Cheese']),
    ('Blueberry',  'Fluffy muffin bursting with fresh blueberries.',         ['Original', 'Cream Cheese']),
    ('Strawberry', 'Sweet strawberry muffin with a golden sugar top.',       ['Original', 'Cream Cheese']),
    ('Banana',     'Moist banana muffin with a tender, buttery finish.',     ['Regular', 'Walnuts']),
]
for n, d, v in muffins:
    menu_item(n, d, v)

# POP TARTS
section_header('Pop Tarts')
story.append(Spacer(1, 4))
poptarts = [
    ('Blueberry',   'Flaky pastry shell filled with sweet blueberry jam and vanilla icing.', None),
    ('Strawberry',  'Classic strawberry filling in a buttery, golden crust.',                None),
    ('Brown Sugar', 'Warm cinnamon-sugar filling in a crisp, flaky shell.',                  None),
    ('Mixed Berry', 'A blend of blueberry, strawberry, and raspberry in every bite.',        None),
]
for n, d, v in poptarts:
    menu_item(n, d, v)

# ROLLS
section_header('Rolls')
story.append(Spacer(1, 4))
rolls = [
    ('Original',   'Classic soft dough rolled in warm cinnamon sugar, finished with a silky cream cheese frosting.'),
    ('Banana',     'Layers of ripe banana and cinnamon folded into pillowy dough, crowned with banana cream cheese icing.'),
    ('Oreo',       'Crushed Oreo pieces folded into every layer, drizzled with a thick cream cheese glaze.'),
    ('Chocolate',  'A soft deep chocolate dough with sugar and chocolate layers, with a Nutella topping.'),
    ('Strawberry', 'Sweet strawberry jam tucked into every fold, glazed with a light cream cheese icing.'),
    ('Blueberry',  'Plump blueberries woven through soft dough, finished with a vanilla cream cheese glaze.'),
    ('Carrot Cake', 'Spiced carrot cake dough packed with warm cinnamon, finished with a rich cream cheese frosting.'),
]
for n, d in rolls:
    menu_item(n, d)

story.append(PageBreak())

# PIES
section_header('Pies')
story.append(Spacer(1, 4))
pies = [
    ('Lemon Meringue', 'Tangy lemon curd topped with a fluffy, toasted meringue.'),
    ('Blueberry',      'Plump blueberries baked into a flaky, golden lattice crust.'),
    ('Apple',          'Cinnamon-spiced apples in a buttery, golden lattice crust.'),
    ('Pecan',          'Rich, buttery pecan filling with a hint of bourbon.'),
    ('Pumpkin',        'Warmly spiced pumpkin custard in a flaky pie shell.'),
    ('Key Lime',       'Tangy key lime custard in a toasted graham cracker crust.'),
    ('Chocolate',      'Dark chocolate Oreo crust with a light and dark chocolate mousse, topped with whipped cream and chocolate shavings.'),
]
for n, d in pies:
    menu_item(n, d)

# BRIKS
section_header('Briks')
story.append(Paragraph('Marshmallow-loaded cereal bars with a perfect balance of gooey and crunch.', item_desc_style))
story.append(Spacer(1, 4))
briks = [
    ('Sweet Rice',   None),
    ('Berry Crown',  None),
    ('Golden Toast', None),
    ('Fruity Wave',  None),
]
for n, d in briks:
    menu_item(n, d)

# Footer
story.append(Spacer(1, 10))
story.append(HRFlowable(width='100%', thickness=1, color=GOLD))
story.append(Spacer(1, 6))
story.append(Paragraph('San Antonio, TX  |  210-606-6459  |  Info@thedoughdealers.com', footer_style))

doc.build(story)
print("No-price PDF created!")
