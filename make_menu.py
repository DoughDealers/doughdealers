from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT

output = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\DoughDealers_Menu.pdf"

doc = SimpleDocTemplate(output, pagesize=letter,
    leftMargin=0.75*inch, rightMargin=0.75*inch,
    topMargin=0.75*inch, bottomMargin=0.75*inch)

WHITE = colors.HexColor('#ffffff')
GOLD  = colors.HexColor('#c8a96e')
DARK  = colors.HexColor('#1a1a1a')
GREY  = colors.HexColor('#555555')
LIGHT_GREY = colors.HexColor('#888888')

title_style = ParagraphStyle('Title', fontName='Helvetica-Bold', fontSize=32,
    textColor=WHITE, alignment=TA_CENTER, spaceAfter=2)
tagline_style = ParagraphStyle('Tagline', fontName='Helvetica-Oblique', fontSize=12,
    textColor=GOLD, alignment=TA_CENTER, spaceAfter=2)
section_style = ParagraphStyle('Section', fontName='Helvetica-Bold', fontSize=14,
    textColor=GOLD, spaceBefore=8, spaceAfter=2)
item_name_style = ParagraphStyle('ItemName', fontName='Helvetica-Bold', fontSize=10,
    textColor=DARK, spaceAfter=1)
item_desc_style = ParagraphStyle('ItemDesc', fontName='Helvetica', fontSize=8.5,
    textColor=GREY, spaceAfter=1)
price_style = ParagraphStyle('Price', fontName='Helvetica-Bold', fontSize=10,
    textColor=DARK)
note_style = ParagraphStyle('Note', fontName='Helvetica-Oblique', fontSize=7.5,
    textColor=LIGHT_GREY, spaceAfter=1)
sub_style = ParagraphStyle('Sub', fontName='Helvetica', fontSize=8.5,
    textColor=LIGHT_GREY, spaceAfter=5)
footer_style = ParagraphStyle('Footer', fontName='Helvetica', fontSize=8,
    textColor=LIGHT_GREY, alignment=TA_CENTER)

story = []

LOGO_PATH = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\src\assets\logowhite.png"

# Logo centered in dark band — large and fully opaque
logo_img = Image(LOGO_PATH, width=2.0*inch, height=2.0*inch)
logo_img.hAlign = 'CENTER'

logo_row = Table([[logo_img]], colWidths=[7*inch])
logo_row.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), DARK),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('TOPPADDING', (0,0), (-1,-1), 14),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
]))
story.append(logo_row)

tagline_row = Table([[Paragraph('The Best Dough Fa Sho!', tagline_style)]], colWidths=[7*inch])
tagline_row.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), DARK),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('TOPPADDING', (0,0), (-1,-1), 8),
    ('BOTTOMPADDING', (0,0), (-1,-1), 16),
]))
story.append(tagline_row)
story.append(Spacer(1, 8))

def section_header(title):
    story.append(HRFlowable(width='100%', thickness=1.5, color=GOLD, spaceAfter=2))
    story.append(Paragraph(title.upper(), section_style))

def menu_item(name, desc, price_label, variants=None):
    name_para  = Paragraph(f'<b>{name}</b>', item_name_style)
    price_para = Paragraph(price_label, price_style)
    row = Table([[name_para, price_para]], colWidths=[5.3*inch, 1.7*inch])
    row.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ALIGN', (1,0), (1,0), 'RIGHT'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(row)
    if desc:
        story.append(Paragraph(desc, item_desc_style))
    if variants:
        story.append(Paragraph(f'Options: {", ".join(variants)}', note_style))
    story.append(Spacer(1, 3))

# COOKIES
section_header('Cookies')
story.append(Paragraph('Chunks: $25 / 6  |  Nugs: $24 / 20', sub_style))
cookies = [
    ('Chip Drip',      'Soft-baked cookie dripping with rich chocolate chips.',  '$5.00 each', ['Regular', 'Nutella']),
    ('Oatsession',     'Hearty oatmeal cookie with a touch of cinnamon.',                    '$5.00 each', ['Regular', 'Raisin', 'Pecan']),
    ('Golden Grind',   'Golden peanut butter cookie with rich, nutty flavor.',               '$5.00 each', None),
    ('Rainbow Rush', 'Soft and chewy cookie packed with colorful M&M candies.',            '$5.00 each', ['Regular', 'Peanut']),
    ('Nut Case',       'Peanut butter cookie filled with rich peanut butter chips and crunchy peanut candies.', '$5.00 each', None),
    ('CinnaBomb',      'Warm cinnamon cookie swirled with rich brown sugar.',                 '$5.00 each', ['Regular', 'Frosting']),
    ('Blue Dream',     'Blueberry cookie layered with fresh blueberries, a creamy cheesecake filling,<br/>topped with cream cheese chips.', '$5.00 each', None),
    ('Midnight Crunch', 'Chocolate cookie filled with Oreo pieces and white chocolate chips, with a whole Oreo center.', '$5.00 each', None),
    ('Berry Bliss', 'Buttery cookie with raspberries and creamy macadamia nuts.',         '$5.00 each', None),
    ('Red Temptation', 'Red velvet cookie with chocolate chips, Oreo bites, and a cream cheese center.', '$5.00 each', None),
    ('Melt Down',      'Chocolate chip cookie with graham cracker pieces, gooey marshmallow, and a milk chocolate bar.', '$5.00 each', None),
]
for n, d, p, v in cookies:
    menu_item(n, d, p, v)

story.append(PageBreak())

# MUFFINS
section_header('Muffins')
story.append(Paragraph('$25 for 6', sub_style))
muffins = [
    ('Chocolate',  'Rich cocoa muffin loaded with chocolate chips.',         '$25 / 6', ['Double Chocolate', 'Triple Chocolate']),
    ('Pumpkin',    'Warmly spiced pumpkin muffin with a soft, moist crumb.', '$25 / 6', ['Original', 'Cream Cheese']),
    ('Blueberry',  'Fluffy muffin bursting with fresh blueberries.',         '$25 / 6', ['Original', 'Cream Cheese']),
    ('Strawberry', 'Sweet strawberry muffin with a golden sugar top.',       '$25 / 6', ['Original', 'Cream Cheese']),
    ('Banana',     'Moist banana muffin with a tender, buttery finish.',     '$25 / 6', ['Regular', 'Walnuts']),
]
for n, d, p, v in muffins:
    menu_item(n, d, p, v)

# POP TARTS
section_header('Pop Tarts')
story.append(Paragraph('$25 for 5', sub_style))
poptarts = [
    ('Blueberry',   'Flaky pastry shell filled with sweet blueberry jam and vanilla icing.', '$25 / 5', None),
    ('Strawberry',  'Classic strawberry filling in a buttery, golden crust.',                '$25 / 5', None),
    ('Brown Sugar', 'Warm cinnamon-sugar filling in a crisp, flaky shell.',                  '$25 / 5', None),
    ('Mixed Berry', 'A blend of blueberry, strawberry, and raspberry in every bite.',        '$25 / 5', None),
]
for n, d, p, v in poptarts:
    menu_item(n, d, p, v)

# ROLLS
section_header('Rolls')
story.append(Paragraph('$35 for 6', sub_style))
rolls = [
    ('Original',   'Classic soft dough rolled in warm cinnamon sugar, finished with a silky cream cheese frosting.',         '$35 / 6', None),
    ('Banana',     'Layers of ripe banana and cinnamon folded into pillowy dough, crowned with banana cream cheese icing.',     '$35 / 6', None),
    ('Oreo',       'Crushed Oreo pieces folded into every layer, drizzled with a thick cream cheese glaze.',             '$35 / 6', None),
    ('Chocolate',  'A soft deep chocolate dough with sugar and chocolate layers, with a Nutella topping.',  '$35 / 6', None),
    ('Strawberry', 'Sweet strawberry jam tucked into every fold, glazed with a light cream cheese icing.',               '$35 / 6', None),
    ('Blueberry',  'Plump blueberries woven through soft dough, finished with a vanilla cream cheese glaze.',            '$35 / 6', None),
    ('Carrot Cake', 'Spiced carrot cake dough packed with warm cinnamon, finished with a rich cream cheese frosting.',  '$35 / 6', None),
]
for n, d, p, v in rolls:
    menu_item(n, d, p, v)

story.append(PageBreak())

# PIES
section_header('Pies')
story.append(Paragraph('$25 each', sub_style))
pies = [
    ('Lemon Meringue', 'Tangy lemon curd topped with a fluffy, toasted meringue.',   '$25 each', None),
    ('Blueberry',      'Plump blueberries baked into a flaky, golden lattice crust.', '$25 each', None),
    ('Apple',          'Cinnamon-spiced apples in a buttery, golden lattice crust.',  '$25 each', None),
    ('Pecan',          'Rich, buttery pecan filling with a hint of bourbon.',        '$25 each', None),
    ('Pumpkin',        'Warmly spiced pumpkin custard in a flaky pie shell.',        '$25 each', None),
    ('Key Lime',       'Tangy key lime custard in a toasted graham cracker crust.',  '$25 each', None),
]
for n, d, p, v in pies:
    menu_item(n, d, p, v)

# BRIKS
section_header('Briks')
story.append(Paragraph('Marshmallow-loaded cereal bars with a perfect balance of gooey and crunch.', item_desc_style))
story.append(Paragraph('$25 each', sub_style))
briks = [
    ('Sweet Rice',    None, '$25 each', None),
    ('Berry Crown',   None, '$25 each', None),
    ('Golden Toast',  None, '$25 each', None),
    ('Fruity Wave',   None, '$25 each', None),
]
for n, d, p, v in briks:
    menu_item(n, d, p, v)

# Footer
story.append(Spacer(1, 10))
story.append(HRFlowable(width='100%', thickness=1, color=GOLD))
story.append(Spacer(1, 6))
story.append(Paragraph('San Antonio, TX  |  210-606-6459  |  Info@thedoughdealers.com', footer_style))

doc.build(story)
print("PDF created!")
