const PDFDocument = require('pdfkit')
const fs = require('fs')

const GOLD   = '#c8a96e'
const BLACK  = '#111111'
const GRAY   = '#555555'
const LGRAY  = '#888888'
const WHITE  = '#ffffff'
const LINE   = '#d4c5a9'

const MENU = [
  {
    section: 'COOKIES',
    subtitle: 'Chunks: $25 / 6   |   Nugs: $24 / 20',
    items: [
      { name: 'Chip Drip',       price: '$5.00 each', description: 'Soft-baked cookie dripping with rich chocolate chips.', options: ['Regular', 'Nutella'] },
      { name: 'Oatsession',      price: '$5.00 each', description: 'Hearty oatmeal cookie with a touch of cinnamon.', options: ['Regular', 'Raisin', 'Pecan'] },
      { name: 'Golden Grind',    price: '$5.00 each', description: 'Golden peanut butter cookie with rich, nutty flavor.' },
      { name: 'Rainbow Rush',    price: '$5.00 each', description: 'Soft and chewy cookie packed with colorful M&M candies.', options: ['Regular', 'Peanut'] },
      { name: 'Nut Case',        price: '$5.00 each', description: 'Peanut butter cookie filled with rich peanut butter chips and crunchy peanut candies.' },
      { name: 'CinnaBomb',       price: '$5.00 each', description: 'Warm cinnamon cookie swirled with rich brown sugar.', options: ['Original', 'No Frosting'] },
      { name: 'Blue Dream',      price: '$5.00 each', description: 'Blueberry cookie layered with fresh blueberries, a creamy cheesecake filling, and topped with cream cheese chips.' },
      { name: 'Midnight Crunch', price: '$5.00 each', description: 'Chocolate cookie filled with Oreo pieces and white chocolate chips, with a whole Oreo center.' },
      { name: 'Berry Bliss',     price: '$5.00 each', description: 'Buttery cookie with raspberries and creamy macadamia nuts.' },
      { name: 'Red Temptation',  price: '$5.00 each', description: 'Red velvet cookie with chocolate chips, Oreo bites, and a cream cheese center.' },
      { name: 'Melt Down',       price: '$5.00 each', description: 'Chocolate chip cookie with graham cracker pieces, gooey marshmallow, and a milk chocolate bar.' },
    ]
  },
  {
    section: 'MUFFINS',
    subtitle: '$25 each',
    items: [
      { name: 'Chocolate',  price: '$25.00', description: 'Rich cocoa muffin loaded with chocolate chips.', options: ['Double Chocolate', 'Triple Chocolate'] },
      { name: 'Pumpkin',    price: '$25.00', description: 'Warmly spiced pumpkin muffin with a soft, moist crumb.', options: ['Original', 'Cream Cheese'] },
      { name: 'Blueberry',  price: '$25.00', description: 'Fluffy muffin bursting with fresh blueberries.', options: ['Original', 'Cream Cheese'] },
      { name: 'Strawberry', price: '$25.00', description: 'Sweet strawberry muffin with a golden sugar top.', options: ['Original', 'Cream Cheese'] },
      { name: 'Banana',     price: '$25.00', description: 'Moist banana muffin with a tender, buttery finish.', options: ['Regular', 'Walnuts'] },
    ]
  },
  {
    section: 'POP TARTS',
    subtitle: '$25 each',
    items: [
      { name: 'Blueberry',    price: '$25.00', description: 'Flaky pastry shell filled with sweet blueberry jam and vanilla icing.' },
      { name: 'Strawberry',   price: '$25.00', description: 'Classic strawberry filling in a buttery, golden crust.' },
      { name: 'Brown Sugar',  price: '$25.00', description: 'Warm cinnamon-sugar filling in a crisp, flaky shell.' },
      { name: 'Mixed Berry',  price: '$25.00', description: 'A blend of blueberry, strawberry, and raspberry in every bite.' },
    ]
  },
  {
    section: 'PIES',
    subtitle: '$25 each',
    items: [
      { name: 'Lemon Meringue', price: '$25.00', description: 'Tangy lemon curd topped with a fluffy, toasted meringue.' },
      { name: 'Blueberry',      price: '$25.00', description: 'Plump blueberries baked into a flaky, golden lattice crust.' },
      { name: 'Apple',          price: '$25.00', description: 'Cinnamon-spiced apples in a buttery, golden lattice crust.' },
      { name: 'Pecan',          price: '$25.00', description: 'Rich, buttery pecan filling with a hint of bourbon.' },
      { name: 'Pumpkin',        price: '$25.00', description: 'Warmly spiced pumpkin custard in a flaky pie shell.' },
      { name: 'Key Lime',       price: '$25.00', description: 'Tangy key lime custard in a toasted graham cracker crust.' },
      { name: 'Chocolate',      price: '$25.00', description: 'Dark chocolate Oreo crust with a light and dark chocolate mousse, topped with whipped cream and chocolate shavings.' },
    ]
  },
  {
    section: 'ROLLS',
    subtitle: '$35 each',
    items: [
      { name: 'Original',    price: '$35.00', description: 'Classic soft dough rolled in warm cinnamon sugar, finished with a silky cream cheese frosting.' },
      { name: 'Banana',      price: '$35.00', description: 'Layers of ripe banana and cinnamon folded into pillowy dough, crowned with banana cream cheese icing.' },
      { name: 'Oreo',        price: '$35.00', description: 'Crushed Oreo pieces folded into every layer, drizzled with a thick cream cheese glaze.' },
      { name: 'Chocolate',   price: '$35.00', description: 'A soft deep chocolate dough with sugar and chocolate layers, with a Nutella topping.' },
      { name: 'Strawberry',  price: '$35.00', description: 'Sweet strawberry jam tucked into every fold, glazed with a light cream cheese icing.' },
      { name: 'Blueberry',   price: '$35.00', description: 'Plump blueberries woven through soft dough, finished with a vanilla cream cheese glaze.' },
      { name: 'Carrot Cake', price: '$35.00', description: 'Spiced carrot cake dough packed with warm cinnamon, finished with a rich cream cheese frosting.' },
    ]
  },
]

function generatePDF(outputPath, showPrices) {
  const doc = new PDFDocument({ size: 'LETTER', margin: 0 })
  doc.pipe(fs.createWriteStream(outputPath))

  const W = doc.page.width
  const H = doc.page.height
  const ML = 48  // margin left
  const MR = W - 48  // margin right
  const CONTENT_W = MR - ML

  let y = 0
  let firstSection = true

  function drawHeader() {
    // Black header bar
    doc.rect(0, 0, W, 72).fill(BLACK)
    // Gold line under header
    doc.rect(ML, 80, CONTENT_W, 1.5).fill(GOLD)
    y = 96
  }

  function ensureSpace(needed) {
    if (y + needed > H - 48) {
      doc.addPage()
      // Gold line at top of new page
      doc.rect(ML, 40, CONTENT_W, 1.5).fill(GOLD)
      y = 56
    }
  }

  function drawSection(section) {
    ensureSpace(60)
    if (!firstSection) {
      y += 8
      doc.rect(ML, y, CONTENT_W, 1).fill(LINE)
      y += 16
    }
    firstSection = false

    // Section title
    doc.fontSize(18).font('Helvetica-Bold').fillColor(GOLD)
      .text(section.section, ML, y)
    y += 24

    // Subtitle
    if (section.subtitle && showPrices) {
      doc.fontSize(9).font('Helvetica').fillColor(LGRAY)
        .text(section.subtitle, ML, y)
      y += 18
    }

    doc.rect(ML, y, CONTENT_W, 1).fill(GOLD)
    y += 14
  }

  function drawItem(item) {
    // Estimate height needed
    const descLines = Math.ceil(item.description.length / 85)
    const optLines  = item.options ? 1 : 0
    const needed    = 20 + (descLines * 13) + (optLines * 13) + 12
    ensureSpace(needed)

    // Name + price on same line
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#1a1a1a')
      .text(item.name, ML, y, { continued: false })

    if (showPrices) {
      doc.fontSize(10).font('Helvetica').fillColor(GRAY)
        .text(item.price, ML, y, { align: 'right', width: CONTENT_W })
    }

    y += 16

    // Description
    doc.fontSize(9.5).font('Helvetica').fillColor(GRAY)
      .text(item.description, ML + 8, y, { width: CONTENT_W - 100 })
    y += Math.ceil(item.description.length / 85) * 13

    // Options
    if (item.options) {
      doc.fontSize(8.5).font('Helvetica-Oblique').fillColor(LGRAY)
        .text('Options: ' + item.options.join(', '), ML + 8, y)
      y += 13
    }

    y += 10
  }

  drawHeader()

  for (const section of MENU) {
    drawSection(section)
    for (const item of section.items) {
      drawItem(item)
    }
  }

  // Footer on last page
  doc.fontSize(8).font('Helvetica').fillColor(LGRAY)
    .text('thedoughdealers.com  |  Info@thedoughdealers.com', ML, H - 36, { align: 'center', width: CONTENT_W })

  doc.end()
  console.log(`Generated: ${outputPath}`)
}

generatePDF('DoughDealers_Menu.pdf', true)
generatePDF('DoughDealers_Menu_NoPrice.pdf', false)
