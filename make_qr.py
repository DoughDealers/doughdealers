import qrcode
from PIL import Image

QR_URL    = "https://linktr.ee/doughdealers"
LOGO_PATH = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\src\assets\logoblack.png"
OUTPUT    = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\DoughDealers_QR.png"

# Generate QR code with high error correction so logo can cover center
qr = qrcode.QRCode(
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=2,
)
qr.add_data(QR_URL)
qr.make(fit=True)

qr_img = qr.make_image(fill_color="white", back_color="black").convert("RGBA")
qr_w, qr_h = qr_img.size

# Load and resize logo to ~35% of QR code size
logo = Image.open(LOGO_PATH).convert("RGBA")
# Invert the logo colors (black logo -> white logo for dark background)
r, g, b, a = logo.split()
from PIL import ImageOps
rgb = Image.merge("RGB", (r, g, b))
rgb = ImageOps.invert(rgb)
logo = Image.merge("RGBA", (*rgb.split(), a))
logo_size = int(qr_w * 0.35)
logo = logo.resize((logo_size, logo_size), Image.LANCZOS)

# Create a black circle behind the logo
from PIL import ImageDraw
bg_size = int(logo_size * 1.12)
bg = Image.new("RGBA", (bg_size, bg_size), (0, 0, 0, 0))
draw = ImageDraw.Draw(bg)
draw.ellipse([0, 0, bg_size - 1, bg_size - 1], fill=(0, 0, 0, 255))

# Paste logo centered on circle
offset = (bg_size - logo_size) // 2
bg.paste(logo, (offset, offset), logo)

# Paste circle+logo centered on QR code
pos = ((qr_w - bg_size) // 2, (qr_h - bg_size) // 2)
qr_img.paste(bg, pos, bg)

qr_img = qr_img.convert("RGB")
qr_img.save(OUTPUT, dpi=(300, 300))
print(f"QR code saved to {OUTPUT}")
