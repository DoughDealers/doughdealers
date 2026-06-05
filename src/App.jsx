import { useState, useRef, useEffect } from 'react'
import './App.css'

import logo from './assets/logo.svg'
import themeSong from './assets/theme.mp3'
import danceVideo from './assets/dance.mp4'
import logoblack from './assets/logoblack.png'
import mascot from './assets/mascot.png'

import merchAddict from './assets/merch/DoughAddict.png'
import merchFien from './assets/merch/DoughFien.png'
import merchBack from './assets/merch/DoughitBack.png'
import merchUp from './assets/merch/DoughItup!.png'
import merchGot from './assets/merch/GotDough.png'
import merchBest from './assets/merch/TheBestDoughFaSho!.png'
import merchWhere from './assets/merch/WhereTheDoughsAt.png'
import merchKing from './assets/merch/DoughKing.png'
import merchQueen from './assets/merch/Doughqueen.png'
import merchLife from './assets/merch/DoughLife.png'
import merchMoney from './assets/merch/momoneyDoughProblems.png'
import merchGang from './assets/merch/DoughGang.png'
import merchChip from './assets/merch/ChipHappens.png'
import merchTalkChip from './assets/merch/ILoveItWhenYouTalkChip.png'
import merchBCE from './assets/merch/BCE.png'
import merchImTheChip from './assets/merch/ImTheChip.png'
import merchChippinMe from './assets/merch/YouGotToBeChippinMe.png'
import merchStraightChipping from './assets/merch/StraightChippin.png'
import merchShowMeChips from './assets/merch/ShowMeYourChips.png'

const DOUGH_SHIRTS = [
  { id: 6,  name: 'The Best Dough Fa Sho!',  img: merchBest },
  { id: 1,  name: 'Dough Addict',             img: merchAddict },
  { id: 2,  name: 'Dough Fien',               img: merchFien },
  { id: 3,  name: 'Dough It Back!',           img: merchBack },
  { id: 4,  name: 'Dough It Up!',             img: merchUp },
  { id: 5,  name: 'Got Dough?',               img: merchGot },
  { id: 7,  name: 'Where The Doughs At?!',    img: merchWhere },
  { id: 8,  name: 'Dough King',               img: merchKing },
  { id: 9,  name: 'Dough Queen',              img: merchQueen },
  { id: 10, name: 'Dough Life',               img: merchLife },
  { id: 13, name: 'Dough Gang',               img: merchGang },
  { id: 12, name: 'Mo Money Dough Problems',  img: merchMoney },
]

const CHIP_SHIRTS = [
  { id: 14, name: 'Chip Happens',             img: merchChip },
  { id: 15, name: 'I Love It When You Talk Chip', img: merchTalkChip },
  { id: 16, name: 'Big Chip Energy',          img: merchBCE },
  { id: 17, name: "I'm The Chip!",            img: merchImTheChip },
  { id: 18, name: 'You Got To Be Chippin Me!', img: merchChippinMe },
  { id: 19, name: 'Straight Chipping',        img: merchStraightChipping },
  { id: 20, name: 'Show Me Your Chips!',      img: merchShowMeChips },
]

const SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL']
const SIZE_PRICES = { S: 25, M: 25, L: 25, XL: 25, '2XL': 30, '3XL': 35 }
import cb1 from './assets/cinnabomb/cb1.1.png'
import cb2 from './assets/cinnabomb/cb1.2.png'
import cb3 from './assets/cinnabomb/cb1.3.png'
import cbnf1 from './assets/cinnabomb/cbnf1.png'
import cbnf2 from './assets/cinnabomb/cbnf2.png'
import cbnf3 from './assets/cinnabomb/cbnf3.png'
import cinnaBombVideo from './assets/cinnabomb/CinnaBombV.mp4'
import cinnaBombFrostingVideo from './assets/cinnabomb/CinnaBombFV.mp4'

const CINABOMB_FROSTING = [cb1, cb2, cb3]
const CINABOMB_REGULAR  = [cbnf1, cbnf2, cbnf3]

import cd1 from './assets/chipdip/CD1.1.png'
import cd2 from './assets/chipdip/CD2.1.png'
import cd3 from './assets/chipdip/cd3.3.png'
import cdVideo from './assets/chipdip/CDV1.mp4'
import cdNugsVideo from './assets/chipdip/nugs.mp4'
import meltDownVideo from './assets/meltdown/meltdown.mp4'

const CHIPDIP_IMAGES = [cd1, cd3, cd2]

import fruitFlashVideo from './assets/fruitywave/FruitFlashV.mp4'

import oatPecan from './assets/oatsession/pecan.png'
import oatPecanVideo from './assets/oatsession/oatsessionV.mp4'
import oatRegularVideo from './assets/oatsession/OatsessionRegular.mp4'
import oatRaisinVideo from './assets/oatsession/OatsessionRaisin.mp4'
import mm1 from './assets/mm/RC1.png'
import mm2 from './assets/mm/m3.1.png'
import mm3 from './assets/mm/m4.1.png'
import mmVideo from './assets/mm/fg.mp4'
import rcNugsVideo from './assets/mm/RainbowCrunchNV.mp4'
import nc1 from './assets/nutcase/ncf1.1.png'
import nc2 from './assets/nutcase/NCF2.png'
import nc3 from './assets/nutcase/NCF3.png'
import ncVideo from './assets/nutcase/NC_video.mp4'

const MM_IMAGES = [mm1, mm2, mm3]
const NUTCASE_IMAGES = [nc1, nc2, nc3]
import oatRegular from './assets/oatsession/or1.png'
import bd1 from './assets/bluedream/bd1.png'
import bdd1 from './assets/bluedream/bdd1.png'
import bdVideo from './assets/bluedream/BDV.mp4'
import ggNugsVideo from './assets/goldengrind/nugs.mp4'
import ggChunksVideo from './assets/goldengrind/ggvideo.mp4'

const BLUEDREAM_IMAGES = [bdd1]
import oatRaisin from './assets/oatsession/raisin1.png'

import midnightCrunchVideo from './assets/blackoutbites/midnightcrunch.mp4'

import goldenToastVideo from './assets/goldentoast/GoldenToastV.mp4'
import sweetRiceVideo from './assets/sweetrice/SweetRiceV.mp4'

import bcCrownVideo from './assets/berrycrown/BerryCrownV.mp4'

const DOUGH_ITEMS = {
  Cookies: [
    { id: 1,  name: 'Chip Drip',           price: 5.00, emoji: '🍪', description: 'Soft-baked cookie dripping with rich chocolate chips.', variantDescriptions: { Nutella: 'Soft-baked cookie dripping with rich chocolate chips, with gooey nutella filling.' }, variants: ['Regular', 'Nutella'], styleVideos: { Chunks: cdVideo, Nugs: cdNugsVideo }, noNugsVariants: ['Nutella'] },
    { id: 2,  name: 'Oatsession',           price: 5.00, emoji: '🌾', description: 'Hearty oatmeal cookie with a touch of cinnamon.', variantDescriptions: { Raisin: 'Hearty oatmeal cookie with a touch of cinnamon and plump, juicy raisins.', Pecan: 'Hearty oatmeal cookie with a touch of cinnamon, loaded with rich, toasted pecans.' }, variants: ['Regular', 'Raisin', 'Pecan'], variantVideos: { Regular: oatRegularVideo, Raisin: oatRaisinVideo, Pecan: oatPecanVideo } },
    { id: 3,  name: 'Golden Grind',         price: 5.00, emoji: '✨', description: 'Golden peanut butter cookie with rich, nutty flavor.', styleVideos: { Chunks: ggChunksVideo, Nugs: ggNugsVideo } },
    { id: 19, name: 'Rainbow Rush',        price: 5.00, emoji: '🌈', description: 'Soft and chewy cookie packed with colorful M&M candies.', variantDescriptions: { Peanut: 'Soft and chewy cookie packed with colorful peanut M&M candies.' }, variants: ['Regular', 'Peanut'], styleVideos: { Nugs: rcNugsVideo, Chunks: mmVideo } },
    { id: 26, name: 'Nut Case',             price: 5.00, emoji: '🥜', description: 'Peanut butter cookie filled with rich peanut butter chips and crunchy peanut candies.', video: ncVideo, videoFirst: true },
    { id: 20, name: 'CinnaBomb',            price: 5.00, emoji: '💥', description: 'Warm cinnamon cookie swirled with rich brown sugar.', variants: ['Original', 'No Frosting'], variantVideos: { Original: cinnaBombFrostingVideo, 'No Frosting': cinnaBombVideo }, noNugs: true },
    { id: 21, name: 'Blue Dream',           price: 5.00, emoji: '🫐', description: 'Blueberry cookie layered with fresh blueberries, a creamy cheesecake filling, and topped with cream cheese chips.', video: bdVideo, videoFirst: true, noNugs: true },
    { id: 22, name: 'Midnight Crunch',       price: 5.00, description: 'Chocolate cookie filled with Oreo pieces and white chocolate chips, with a whole Oreo center.', video: midnightCrunchVideo, videoFirst: true, noNugs: true },
    { id: 23, name: 'Berry Bliss',      price: 5.00, emoji: '🍓', description: 'Buttery cookie with raspberries and creamy macadamia nuts.' },
    { id: 24, name: 'Red Temptation',       price: 5.00, emoji: '❤️', description: 'Red velvet cookie with chocolate chips, Oreo bites, and a cream cheese center.', noNugs: true },
    { id: 25, name: 'Melt Down',            price: 5.00, emoji: '🔥', description: 'Chocolate chip cookie with graham cracker pieces, gooey marshmallow, and a milk chocolate bar.', video: meltDownVideo, videoFirst: true, noNugs: true },
  ],
  Muffins: [
    { id: 7,  name: 'Chocolate',   price: 25, emoji: '🍫', description: 'Rich cocoa muffin loaded with chocolate chips.', variants: ['Double Chocolate', 'Triple Chocolate'] },
    { id: 8,  name: 'Pumpkin',     price: 25, emoji: '🎃', description: 'Warmly spiced pumpkin muffin with a soft, moist crumb.', variants: ['Original', 'Cream Cheese'] },
    { id: 9,  name: 'Blueberry',   price: 25, emoji: '🫐', description: 'Fluffy muffin bursting with fresh blueberries.', variants: ['Original', 'Cream Cheese'] },
    { id: 27, name: 'Strawberry',  price: 25, emoji: '🍓', description: 'Sweet strawberry muffin with a golden sugar top.', variants: ['Original', 'Cream Cheese'] },
    { id: 28, name: 'Banana',      price: 25, emoji: '🍌', description: 'Moist banana muffin with a tender, buttery finish.', variants: ['Regular', 'Walnuts'] },
  ],
  'Pop Tarts': [
    { id: 10, name: 'Blueberry',    price: 25, emoji: '🫐', description: 'Flaky pastry shell filled with sweet blueberry jam and vanilla icing.' },
    { id: 11, name: 'Strawberry',   price: 25, emoji: '🍓', description: 'Classic strawberry filling in a buttery, golden crust.' },
    { id: 12, name: 'Brown Sugar',  price: 25, emoji: '🟤', description: 'Warm cinnamon-sugar filling in a crisp, flaky shell.' },
    { id: 29, name: 'Mixed Berry',  price: 25, emoji: '🍇', description: 'A blend of blueberry, strawberry, and raspberry in every bite.' },
  ],
  Pies: [
    { id: 13, name: 'Lemon Meringue', price: 25, emoji: '🍋', description: 'Tangy lemon curd topped with a fluffy, toasted meringue.' },
    { id: 14, name: 'Blueberry',      price: 25, emoji: '🫐', description: 'Plump blueberries baked into a flaky, golden lattice crust.' },
    { id: 15, name: 'Apple',          price: 25, emoji: '🍎', description: 'Cinnamon-spiced apples in a buttery, golden lattice crust.' },
    { id: 30, name: 'Pecan',          price: 25, emoji: '🥧', description: 'Rich, buttery pecan filling with a hint of bourbon.' },
    { id: 31, name: 'Pumpkin',        price: 25, emoji: '🎃', description: 'Warmly spiced pumpkin custard in a flaky pie shell.' },
    { id: 32, name: 'Key Lime',       price: 25, emoji: '🍋', description: 'Tangy key lime custard in a toasted graham cracker crust.' },
    { id: 40, name: 'Chocolate',      price: 25, emoji: '🍫', description: 'Dark chocolate Oreo crust with a light and dark chocolate mousse, topped with whipped cream\nand chocolate shavings.' },
  ],
  Rolls: [
    { id: 33, name: 'Original',    price: 35, emoji: '🌀', description: 'Classic soft dough rolled in warm cinnamon sugar, finished with a silky cream cheese frosting.' },
    { id: 34, name: 'Banana',      price: 35, emoji: '🍌', description: 'Layers of ripe banana and cinnamon folded into pillowy dough, crowned with banana cream cheese icing.' },
    { id: 35, name: 'Oreo',        price: 35, emoji: '🖤', description: 'Crushed Oreo pieces folded into every layer, drizzled with a thick cream cheese glaze.' },
    { id: 36, name: 'Chocolate',   price: 35, emoji: '🍫', description: 'A soft deep chocolate dough with sugar and chocolate layers, with a Nutella topping.' },
    { id: 37, name: 'Strawberry',  price: 35, emoji: '🍓', description: 'Sweet strawberry jam tucked into every fold, glazed with a light cream cheese icing.' },
    { id: 38, name: 'Blueberry',   price: 35, emoji: '🫐', description: 'Plump blueberries woven through soft dough, finished with a vanilla cream cheese glaze.' },
    { id: 39, name: 'Carrot Cake', price: 35, emoji: '🥕', description: 'Spiced carrot cake dough packed with warm cinnamon, finished with a rich cream cheese frosting.' },
  ],
  Specials: [],
}

const BRIKS = [
  { id: 4,  name: 'Sweet Rice',   price: 25, emoji: '🍚', video: sweetRiceVideo, videoFirst: true },
  { id: 5,  name: 'Berry Crown',  price: 25, video: bcCrownVideo, videoFirst: true },
  { id: 6,  name: 'Golden Toast', price: 25, video: goldenToastVideo, videoFirst: true },
  { id: 26, name: 'Fruit Flash',  price: 25, video: fruitFlashVideo, videoFirst: true },
]

function CartDrawer({ cart, onClose, onRemove, onClear, onClearAndClose, orderConfirmed, onOrderConfirmed }) {
  const [deliveryFee, setDeliveryFee] = useState(0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const TAX_RATE = 0.0825
  const tax = subtotal * TAX_RATE
  const serviceFee = Math.round((subtotal + tax + deliveryFee) * 0.03 * 100) / 100
  const total = subtotal + tax + deliveryFee + serviceFee

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-qty">x{item.qty} — ${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>✕</button>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <div className="cart-subtotal">Subtotal: <strong>${subtotal.toFixed(2)}</strong></div>
              <div className="cart-tax">Tax (8.25%): <strong>${tax.toFixed(2)}</strong></div>
              {deliveryFee > 0 && (
                <div className="cart-tax">Delivery Fee: <strong>${deliveryFee.toFixed(2)}</strong></div>
              )}
              <div className="cart-tax">Service Fee (3%): <strong>${serviceFee.toFixed(2)}</strong></div>
              <div className="cart-total">Total: <strong>${total.toFixed(2)}</strong></div>
              <button className="clear-btn" onClick={onClear}>Clear Cart</button>
            </div>
            <div className="cart-schedule">
              {orderConfirmed ? (
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <div style={{ fontSize: '3rem', margin: '8px 0 12px' }}>🍪</div>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '1.1rem' }}>
                    You just made the sweetest deal, fa sho.<br />
                    We'll reach out to confirm soon!
                  </p>
                  <h3 className="cart-schedule-title" style={{ textAlign: 'center', marginTop: '24px' }}>Scheduled Order</h3>
                  <p className="cart-schedule-sub" style={{ textAlign: 'center' }}>
                    {orderConfirmed.date} at {(() => { const [h, m] = orderConfirmed.time.split(':'); const hr = parseInt(h); return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}` })()}
                  </p>
                  <p className="cart-schedule-sub" style={{ textAlign: 'center', marginTop: '-8px' }}>
                    {orderConfirmed.method === 'pickup' ? 'Pickup' : 'Delivery'}
                  </p>
                  <p style={{ marginTop: '20px', fontSize: '0.78rem', color: '#aaa', lineHeight: 1.5, textAlign: 'center' }}>
                    Using Outlook or Hotmail? Add{' '}
                    <strong style={{ color: '#c8a96e' }}>orders@thedoughdealers.com</strong>{' '}
                    to your contacts so your confirmation lands in your inbox.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="cart-schedule-title">Schedule Your Order</h3>
                  <p className="cart-schedule-sub">Pick a date and how you want it.</p>
                  <ScheduleForm
                    cart={cart}
                    deliveryFee={deliveryFee}
                    serviceFee={serviceFee}
                    onDeliveryFeeChange={setDeliveryFee}
                    onSuccess={details => onOrderConfirmed(details)}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const STYLE_PRICES = { Nugs: 24, Chunks: 25 }
const STYLE_SIZES = { Nugs: 20, Chunks: 6 }

function MerchCard({ item, onAdd }) {
  const [size, setSize] = useState('S')
  const price = SIZE_PRICES[size]

  return (
    <div className="merch-card">
      <img src={item.img} alt={item.name} className="merch-img" />
      <div className="merch-info">
        <h3>{item.name}</h3>
        <span className="price">${price}.00</span>
      </div>
      <div className="size-selector">
        {SIZES.map(s => (
          <button
            key={s}
            className={`size-btn ${size === s ? 'active' : ''}`}
            onClick={() => setSize(s)}
          >{s}</button>
        ))}
      </div>
      <button className="item-btn merch-shop" onClick={() => onAdd({ ...item, name: `${item.name} (${size})`, price, emoji: '👕', qty: 1 })}>
        Add
      </button>
    </div>
  )
}

function ImageGallery({ images }) {
  const [active, setActive] = useState(0)
  return (
    <div className="gallery">
      <img src={images[active]} alt="" className="gallery-main" />
      <div className="gallery-thumbs">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`gallery-thumb ${active === i ? 'active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  )
}

function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  const isTouch = window.matchMedia('(hover: none)').matches

  useEffect(() => {
    if (!isTouch) return
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else { video.pause(); video.currentTime = 0 }
      },
      { threshold: 0.5 }
    )
    observer.observe(video)
    // auto-play immediately if already in view (e.g. variant switch)
    video.play().catch(() => {})
    return () => observer.disconnect()
  }, [isTouch])

  return (
    <video
      ref={videoRef}
      className="cookie-video"
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      onMouseEnter={e => !isTouch && e.target.play()}
      onMouseLeave={e => { if (!isTouch) { e.target.pause(); e.target.currentTime = 0 } }}
    />
  )
}

function CookieCard({ cookie, onAdd, styleOptions = true, noNugs = false, qtyStep = 6 }) {
  const [variant, setVariant] = useState(cookie.variants?.[0] ?? null)
  const effectiveNoNugs = noNugs || (cookie.noNugsVariants?.includes(variant) ?? false)
  const [style, setStyle] = useState('Chunks')
  const effectiveStep = styleOptions ? STYLE_SIZES[style] : qtyStep
  const [qty, setQty] = useState(effectiveStep)

  const pricePerUnit = styleOptions ? STYLE_PRICES[style] : cookie.price
  const unitSize = styleOptions ? STYLE_SIZES[style] : qtyStep
  const totalPrice = (qty / unitSize) * pricePerUnit

  function selectVariant(v) {
    setVariant(v)
    const willHideNugs = noNugs || (cookie.noNugsVariants?.includes(v) ?? false)
    if (willHideNugs && style === 'Nugs') {
      setStyle('Chunks')
      setQty(STYLE_SIZES['Chunks'])
    }
  }

  function selectStyle(newStyle) {
    setStyle(newStyle)
    setQty(STYLE_SIZES[newStyle])
  }

  function handleAdd() {
    const variantLabel = variant ? ` – ${variant}` : ''
    const name = styleOptions ? `${cookie.name}${variantLabel} (${style})` : `${cookie.name}${variantLabel}`
    const price = pricePerUnit / unitSize
    onAdd({ ...cookie, name, price, qty })
  }

  const videoEl = cookie.video && <VideoPlayer src={cookie.video} />
  const variantVideoEl = cookie.variantVideos?.[variant] && <VideoPlayer key={variant} src={cookie.variantVideos[variant]} />
  const styleVideoEl = cookie.styleVideos?.[style] && <VideoPlayer key={style} src={cookie.styleVideos[style]} />

  return (
    <div className="cookie-card">
      {cookie.videoFirst && videoEl}
      {variantVideoEl}
      {styleVideoEl}
      {cookie.variantGalleries?.[variant]
        ? <ImageGallery images={cookie.variantGalleries[variant]} />
        : cookie.images
          ? <ImageGallery images={cookie.images} />
          : cookie.variantImages?.[variant]
            ? <img src={cookie.variantImages[variant]} alt={variant} className="variant-image" />
            : null
      }
      {!cookie.videoFirst && videoEl}
      <h3>{cookie.name}</h3>
      <p style={{ whiteSpace: 'pre-line' }}>{(variant && cookie.variantDescriptions?.[variant]) || cookie.description}</p>

      {cookie.variants && (
        <div className="variant-toggle">
          {cookie.variants.map(v => (
            <button
              key={v}
              className={`variant-btn ${variant === v ? 'active' : ''}`}
              onClick={() => selectVariant(v)}
            >{v}</button>
          ))}
        </div>
      )}

      {styleOptions && (
        <div className="style-toggle">
          <button
            className={`style-btn ${style === 'Chunks' ? 'active' : ''}`}
            onClick={() => selectStyle('Chunks')}
          >
            Chunks <span className="style-price">$25</span>
          </button>
          {!effectiveNoNugs && (
            <button
              className={`style-btn ${style === 'Nugs' ? 'active' : ''}`}
              onClick={() => selectStyle('Nugs')}
            >
              Nugs <span className="style-price">$24</span>
            </button>
          )}
        </div>
      )}
      {styleOptions && (
        <p className="style-qty-note">
          {style === 'Chunks' ? '6 bags · 1 large cookie each' : '5 bags · 4 small cookies each'}
        </p>
      )}

      <div className="cookie-footer">
        <div className="qty-price-group">
          <div className="qty-row">
            <button className="qty-btn" onClick={() => setQty(q => Math.max(effectiveStep, q - effectiveStep))}>−</button>
            <span className="qty-display">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q + effectiveStep)}>+</button>
          </div>
          <span className="price">${totalPrice.toFixed(2)}</span>
        </div>
        <button className="item-btn" onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}

const REVIEWS = [
  { id: 1, name: 'Jasmine R.',    stars: 5, text: 'The Chip Drip hits different every single time. Crispy edges, gooey center — I order every week without fail.' },
  { id: 2, name: 'Marcus T.',     stars: 5, text: 'Got the CinnaBomb with frosting and I literally could not stop eating it. Best cinnamon cookie I\'ve ever had, period.' },
  { id: 3, name: 'Aaliyah M.',    stars: 5, text: 'Blue Dream is INSANE. The cheesecake filling with the blueberries is something else. My whole family is obsessed.' },
  { id: 4, name: 'Devon K.',      stars: 5, text: 'Ordered the Original roll for my birthday and it was gone in 10 minutes. That cream cheese frosting is no joke.' },
  { id: 5, name: 'Priya S.',      stars: 5, text: 'Midnight Crunch had me speechless. Chocolate cookie with a whole Oreo in the center? Dough Dealers don\'t miss.' },
  { id: 6, name: 'Carlos V.',     stars: 5, text: 'The Melt Down is dangerous — in the best way. Graham cracker, marshmallow, and chocolate in one cookie is unfair.' },
]

const DOUGH_TABS = ['Cookies', 'Muffins', 'Pop Tarts', 'Rolls', 'Pies', 'Specials', 'Briks']

const SHAPES = [
  { top: '5%',  left: '5%',  size: 80,  delay: 0,   duration: 12, emoji: '🍪' },
  { top: '15%', left: '88%', size: 60,  delay: 2,   duration: 10, emoji: '🧁' },
  { top: '50%', left: '3%',  size: 100, delay: 1,   duration: 15, emoji: '🍪' },
  { top: '75%', left: '90%', size: 70,  delay: 3,   duration: 11, emoji: '🥧' },
  { top: '35%', left: '92%', size: 50,  delay: 0.5, duration: 13, emoji: '🧇' },
  { top: '85%', left: '8%',  size: 90,  delay: 4,   duration: 14, emoji: '🍪' },
  { top: '60%', left: '85%', size: 65,  delay: 2.5, duration: 9,  emoji: '🎂' },
  { top: '12%', left: '45%', size: 55,  delay: 1.5, duration: 16, emoji: '🍩' },
  { top: '90%', left: '50%', size: 75,  delay: 3.5, duration: 12, emoji: '🥐' },
  { top: '40%', left: '50%', size: 45,  delay: 0.8, duration: 18, emoji: '🍪' },
  { top: '25%', left: '22%', size: 70,  delay: 1.2, duration: 14, emoji: '🧁' },
  { top: '68%', left: '35%', size: 55,  delay: 2.8, duration: 11, emoji: '🍩' },
  { top: '10%', left: '70%', size: 85,  delay: 0.3, duration: 13, emoji: '🥐' },
  { top: '80%', left: '65%', size: 60,  delay: 4.5, duration: 10, emoji: '🎂' },
  { top: '45%', left: '75%', size: 50,  delay: 1.8, duration: 17, emoji: '🧇' },
  { top: '55%', left: '18%', size: 75,  delay: 3.2, duration: 12, emoji: '🥧' },
  { top: '30%', left: '60%', size: 65,  delay: 0.6, duration: 15, emoji: '🍪' },
  { top: '95%', left: '25%', size: 80,  delay: 2.2, duration: 9,  emoji: '🧁' },
  { top: '18%', left: '35%', size: 45,  delay: 3.8, duration: 16, emoji: '🍩' },
  { top: '72%', left: '55%', size: 90,  delay: 1.0, duration: 13, emoji: '🍪' },
]

function MenuBackground() {
  return (
    <div className="menu-bg">
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className="menu-bg-shape"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            fontSize: s.size * 0.55,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          {s.emoji}
        </div>
      ))}
    </div>
  )
}

const BUSINESS_LAT = 29.5183
const BUSINESS_LNG = -98.7391

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function calcDeliveryFee(miles) {
  if (miles <= 3)  return 5
  if (miles <= 6)  return 8
  if (miles <= 10) return 12
  if (miles <= 15) return 16
  if (miles <= 20) return 20
  if (miles <= 30) return 25
  return null
}

function ScheduleForm({ cart = [], deliveryFee = 0, serviceFee = 0, onDeliveryFeeChange, onSuccess }) {
  const [method, setMethod] = useState('pickup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('12:00')
  const [address, setAddress] = useState('')
  const [payLoading, setPayLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [feeLoading, setFeeLoading] = useState(false)
  const [distanceMiles, setDistanceMiles] = useState(null)
  const [feeError, setFeeError] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestTimer = useRef(null)
  const skipBlurGeocode = useRef(false)

  const today = new Date().toISOString().split('T')[0]

  function handleMethodChange(m) {
    setMethod(m)
    if (m === 'pickup') {
      onDeliveryFeeChange?.(0)
      setDistanceMiles(null)
      setFeeError('')
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  function applyGeoResult(lat, lng) {
    const miles = haversine(BUSINESS_LAT, BUSINESS_LNG, lat, lng)
    setDistanceMiles(miles)
    setFeeError('')
    const fee = calcDeliveryFee(miles)
    if (fee === null) {
      setFeeError(`Sorry, we don't deliver to addresses over 30 miles away (${miles.toFixed(1)} mi). Please contact us.`)
      onDeliveryFeeChange?.(0)
    } else {
      onDeliveryFeeChange?.(fee)
    }
  }

  function formatSuggestion(item) {
    const a = item.address || {}
    const num   = a.house_number || ''
    const road  = a.road || a.pedestrian || a.path || ''
    const city  = a.city || a.town || a.village || ''
    const state = a.state || ''
    const zip   = a.postcode || ''
    const street = [num, road].filter(Boolean).join(' ')
    return [street, city, state, zip].filter(Boolean).join(', ') || item.display_name
  }

  async function fetchSuggestions(val) {
    if (val.trim().length < 4) { setSuggestions([]); setShowSuggestions(false); return }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&addressdetails=1&limit=8&countrycodes=us`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data = await res.json()
      // Keep only house-number or road-level hits — skip city/county/state blobs
      const hits = data.filter(f =>
        f.address?.house_number || ['house', 'road', 'residential', 'building'].includes(f.type)
      )
      setSuggestions(hits.slice(0, 5))
      setShowSuggestions(hits.length > 0)
    } catch {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  function handleAddressChange(val) {
    setAddress(val)
    setDistanceMiles(null)
    onDeliveryFeeChange?.(0)
    setFeeError('')
    clearTimeout(suggestTimer.current)
    suggestTimer.current = setTimeout(() => fetchSuggestions(val), 400)
  }

  function selectSuggestion(item) {
    skipBlurGeocode.current = true
    setAddress(formatSuggestion(item))
    setSuggestions([])
    setShowSuggestions(false)
    applyGeoResult(parseFloat(item.lat), parseFloat(item.lon))
  }

  async function handleAddressBlur() {
    setTimeout(() => setShowSuggestions(false), 150)
    if (skipBlurGeocode.current) { skipBlurGeocode.current = false; return }
    if (!address.trim() || method !== 'delivery') return
    setFeeLoading(true)
    setFeeError('')
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`, {
        headers: { 'Accept-Language': 'en' }
      })
      const data = await res.json()
      if (!data.length) { setFeeError('Address not found. Please try again.'); setFeeLoading(false); return }
      applyGeoResult(parseFloat(data[0].lat), parseFloat(data[0].lon))
    } catch {
      setFeeError('Could not calculate delivery fee. Please try again.')
    }
    setFeeLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setPayLoading(true)

    try {
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          customer: { name, email, phone, date, time, address },
          method,
          deliveryFee,
          serviceFee,
        }),
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem('dd_order', JSON.stringify({ cart, deliveryFee, serviceFee }))
        const p = new URLSearchParams({ confirmed: '1', date, time, method })
        window.location.href = `/?${p.toString()}`
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
        setPayLoading(false)
      }
    } catch {
      alert('Something went wrong. Please try again.')
      setPayLoading(false)
    }
  }

  return (
    <form className="schedule-form-inner" onSubmit={handleSubmit}>
      <p className="schedule-section-label">Your Info</p>
      <div className="schedule-fields">
        <div className="schedule-field">
          <label>Full Name</label>
          <input type="text" placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="schedule-field">
          <label>Phone Number</label>
          <input type="tel" placeholder="(210) 555-0100" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
      </div>
      <div className="schedule-field">
        <label>Email Address</label>
        <input type="email" placeholder="jane@example.com" value={email} onChange={e => setEmail(e.target.value)} onBlur={e => setEmail(e.target.value)} autoComplete="email" required />
      </div>

      <p className="schedule-section-label">Order Details</p>
      <div className="method-toggle">
        <button
          type="button"
          className={`method-btn ${method === 'pickup' ? 'active' : ''}`}
          onClick={() => handleMethodChange('pickup')}
        >🏪 Pickup</button>
        <button
          type="button"
          className={`method-btn ${method === 'delivery' ? 'active' : ''}`}
          onClick={() => handleMethodChange('delivery')}
        >🚗 Delivery</button>
      </div>
      <p className="delivery-notice">⚠️ Delivery orders require a minimum purchase of <strong>$50.00</strong> before tax.</p>

      <div className="schedule-fields">
        <div className="schedule-field">
          <label>Select Date</label>
          <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="schedule-field">
          <label>Select Time</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
        </div>
      </div>

      {method === 'delivery' && (
        <div className="schedule-field">
          <label>Delivery Address</label>
          <div className="address-autocomplete">
            <input
              type="text"
              placeholder="Start typing your address…"
              value={address}
              onChange={e => handleAddressChange(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={handleAddressBlur}
              autoComplete="off"
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="address-suggestions">
                {suggestions.map((item, i) => (
                  <li
                    key={i}
                    className="address-suggestion-item"
                    onMouseDown={() => selectSuggestion(item)}
                  >
                    {formatSuggestion(item)}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {feeLoading && <p className="fee-status">Calculating delivery fee...</p>}
          {!feeLoading && feeError && <p className="fee-error">{feeError}</p>}
          {!feeLoading && !feeError && distanceMiles !== null && (
            <p className="fee-status">
              📍 {distanceMiles.toFixed(1)} miles away — Delivery fee: <strong>${deliveryFee.toFixed(2)}</strong>
            </p>
          )}
          <p className="fee-tiers">
            Delivery rates: 0–3 mi $5 · 3–6 mi $8 · 6–10 mi $12 · 10–15 mi $16 · 15–20 mi $20 · 20–30 mi $25
          </p>
        </div>
      )}

      <button type="submit" className="schedule-submit" disabled={payLoading}>
        {payLoading ? '⏳ Sending your order…' : '🍪 Submit Order'}
      </button>
    </form>
  )
}

function OrderConfirmedPage() {
  const params = new URLSearchParams(window.location.search)
  const date   = params.get('date') || ''
  const time   = params.get('time') || ''
  const method = params.get('method') || 'pickup'

  const rawSaved = JSON.parse(sessionStorage.getItem('dd_order') || 'null')
  const saved = rawSaved || {
    cart: [
      { name: 'Chip Drip – Nutella (Chunks)', price: 5, qty: 6 },
      { name: 'Oatsession – Regular (Chunks)', price: 5, qty: 6 },
    ],
    deliveryFee: 0,
    serviceFee: 0,
  }
  const { cart, deliveryFee, serviceFee = 0 } = saved
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const tax      = subtotal * 0.0825
  const total    = subtotal + tax + deliveryFee + serviceFee

  const formatTime = t => {
    if (!t) return ''
    const [h, m] = t.split(':')
    const hr = parseInt(h)
    return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'Arial, sans-serif' }}>
      <img src="/logowhite.png" alt="Dough Dealers" style={{ width: '140px', marginBottom: '32px', filter: 'invert(1)' }} />

      <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c8a96e', margin: '0 0 8px' }}>You just made the sweetest deal, fa sho.</h1>
        <p style={{ color: '#888', fontSize: '0.95rem', margin: '0 0 28px' }}>We'll reach out to confirm soon!</p>

        {/* Order items */}
        {cart.length > 0 && (
          <div style={{ background: '#f7f4f0', borderRadius: '12px', padding: '24px', marginBottom: '16px', textAlign: 'left' }}>
            <p style={{ margin: '0 0 14px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#c8a96e' }}>Your Order</p>
            {cart.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e8e0d8' }}>
                <span style={{ color: '#333', fontSize: '0.95rem' }}>{item.name} <span style={{ color: '#999' }}>x{item.qty}</span></span>
                <span style={{ color: '#333', fontWeight: 600, fontSize: '0.95rem' }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #d4c5a9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.88rem', marginBottom: '4px' }}>
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.88rem', marginBottom: '4px' }}>
                <span>Tax (8.25%)</span><span>${tax.toFixed(2)}</span>
              </div>
              {deliveryFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.88rem', marginBottom: '4px' }}>
                  <span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              {serviceFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.88rem', marginBottom: '4px' }}>
                  <span>Service Fee (3%)</span><span>${serviceFee.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c8a96e', fontWeight: 800, fontSize: '1rem', marginTop: '8px' }}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Scheduled order */}
        <div style={{ background: '#f7f4f0', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ margin: '0 0 6px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#c8a96e' }}>Scheduled Order</p>
          <p style={{ margin: '8px 0 4px', color: '#333', fontWeight: 600, fontSize: '1rem' }}>{date} at {formatTime(time)}</p>
          <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>{method === 'pickup' ? 'Pickup' : 'Delivery'}</p>
        </div>

        <p style={{ fontSize: '0.78rem', color: '#999', lineHeight: 1.6, margin: '0 0 32px' }}>
          Using Outlook or Hotmail? Add{' '}
          <strong style={{ color: '#c8a96e' }}>orders@thedoughdealers.com</strong>{' '}
          to your contacts so your confirmation lands in your inbox.
        </p>

        <a href="/" style={{ display: 'inline-block', background: '#111', color: '#fff', padding: '12px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
          Back to Dough Dealers
        </a>
      </div>
    </div>
  )
}

export default function App() {
  const params = new URLSearchParams(window.location.search)
  if (params.get('confirmed') === '1') return <OrderConfirmedPage />

  const isCartPreview = params.get('preview') === 'cart'
  const [cart, setCart] = useState(isCartPreview ? [{ id: 1, name: 'Chip Drip – Nutella (Chunks)', price: 5, qty: 6 }] : [])
  const [cartOpen, setCartOpen] = useState(isCartPreview)
  const [orderConfirmed, setOrderConfirmed] = useState(isCartPreview ? { date: 'Saturday, May 17', time: '14:30', method: 'pickup' } : null)
  const [added, setAdded] = useState(null)
  const [doughTab, setDoughTab] = useState('Cookies')
  const [merchTab, setMerchTab] = useState('Dough Shirts')
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  function togglePlay() {
    const audio = audioRef.current
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  function toggleMute() {
    audioRef.current.muted = !muted
    setMuted(!muted)
  }

  function addToCart(cookie) {
    const key = cookie.name // includes style e.g. "Chip Drip (Nugs)"
    setCart(prev => {
      const existing = prev.find(i => i.name === key)
      if (existing) return prev.map(i => i.name === key ? { ...i, qty: i.qty + cookie.qty } : i)
      return [...prev, { ...cookie }]
    })
    setAdded(cookie.id)
    setTimeout(() => setAdded(null), 1200)
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <>
      <audio ref={audioRef} src={themeSong} loop />

      <nav className="navbar">
        <div className="nav-brand">🍪 Dough Dealers</div>
        <ul className="nav-links">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-right">
          <div className="audio-controls">
            <button className="audio-btn" onClick={togglePlay} title={playing ? 'Pause' : 'Play'}>
              {playing ? '⏸' : '▶'}
            </button>
            <button className="audio-btn" onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
              {muted ? '🔇' : '🔊'}
            </button>
          </div>
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      <header className="hero">
        <video className="hero-dance" src={danceVideo} autoPlay loop muted playsInline />
        <div className="hero-overlay">
          <a href="#menu" className="hero-order-btn">Order Now</a>
        </div>
      </header>

      <section className="intro-section">
        <p className="intro-text">
          Dough Dealers is all about big, bold cookies that look as good as they taste—thick, loaded, and crispy on the edges with a soft, gooey center. Every cookie is crafted with quality ingredients and packed with flavor you can see in every bite. It's <strong>THE BEST DOUGH FA SHO!</strong>
        </p>
      </section>

      <section id="menu" className="menu-section">
        <div className="category">
          <h3 className="category-title">Menu</h3>
          <div className="dough-tabs">
            {DOUGH_TABS.filter(t => t !== 'Specials' && t !== 'Briks').map(tab => (
              <button
                key={tab}
                className={`dough-tab ${doughTab === tab ? 'active' : ''}`}
                onClick={() => setDoughTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '28px' }}>
            <button
              className={`dough-tab ${doughTab === 'Briks' ? 'active' : ''}`}
              onClick={() => setDoughTab('Briks')}
            >
              Briks
            </button>
            <button
              className={`dough-tab ${doughTab === 'Specials' ? 'active' : ''}`}
              onClick={() => setDoughTab('Specials')}
            >
              Specials
            </button>
          </div>
          <div className="cookie-grid">
            {(doughTab === 'Briks' ? BRIKS : DOUGH_ITEMS[doughTab]).map(item => (
              <div key={item.id} className={`card-wrap ${added === item.id ? 'added' : ''}`}>
                <CookieCard cookie={item} onAdd={addToCart} styleOptions={doughTab === 'Cookies'} noNugs={!!item.noNugs} qtyStep={doughTab === 'Pies' ? 1 : doughTab === 'Pop Tarts' ? 5 : 6} />
                {added === item.id && <div className="added-toast">Added!</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

<section id="merch" className="merch-section">
        <h2>Shop Merch</h2>
        <p className="section-sub">Rep the brand. Fresh tees for real ones.</p>
        <div className="dough-tabs">
          {['Dough Shirts', 'Chip Shirts'].map(tab => (
            <button
              key={tab}
              className={`dough-tab ${merchTab === tab ? 'active' : ''}`}
              onClick={() => setMerchTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="merch-grid">
          {(merchTab === 'Dough Shirts' ? DOUGH_SHIRTS : CHIP_SHIRTS).map(item => (
            <MerchCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      </section>

      <section id="addict" className="addict-section">
        <h2>Become an Addict</h2>
        <p>Join the Dough Dealers family. Sign up for exclusive drops, early access, and deals you can't resist.</p>
        <form
          className="addict-form"
          action="https://formsubmit.co/Info@thedoughdealers.com"
          method="POST"
        >
          <input type="hidden" name="_subject" value="New Dough Dealers Addict Sign-Up!" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="false" />
          <input type="text" name="name" placeholder="Your name" required />
          <input type="email" name="email" placeholder="Email address" required />
          <input type="tel" name="phone" placeholder="Phone number (optional)" />
          <button type="submit">Sign Me Up</button>
        </form>
      </section>


      <section id="contact" className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have a custom order or question? We'd love to hear from you.</p>
        <form
          className="contact-form"
          action="https://formsubmit.co/Info@thedoughdealers.com"
          method="POST"
        >
          <input type="hidden" name="_subject" value="New Dough Dealers Message" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="false" />
          <input type="text" name="name" placeholder="Your name" required />
          <input type="email" name="email" placeholder="Email address" required />
          <textarea name="message" placeholder="Your message" rows={4} required />
          <button type="submit">Send Message</button>
        </form>
      </section>

      <div className="float-nav">
        <a href="#menu" className="float-nav-item">
          <span className="float-nav-icon">🍪</span>
          <span className="float-nav-label">Cookies</span>
        </a>
<a href="#merch" className="float-nav-item">
          <span className="float-nav-icon">👕</span>
          <span className="float-nav-label">Merch</span>
        </a>
        <a href="#addict" className="float-nav-item">
          <span className="float-nav-icon">🔥</span>
          <span className="float-nav-label">Join Us</span>
        </a>
        <a href="#contact" className="float-nav-item">
          <span className="float-nav-icon">✉️</span>
          <span className="float-nav-label">Contact</span>
        </a>
      </div>

      <footer className="footer">
        <span>🍪 Dough Dealers — Baked with love</span>
      </footer>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onClear={() => { setCart([]); setOrderConfirmed(null) }}
          orderConfirmed={orderConfirmed}
          onOrderConfirmed={setOrderConfirmed}
        />
      )}
    </>
  )
}
