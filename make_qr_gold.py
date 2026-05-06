import qrcode
from PIL import Image, ImageDraw, ImageOps

QR_URL    = "https://linktr.ee/doughdealers"
LOGO_PATH = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\src\assets\logoblack.png"
OUTPUT    = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\DoughDealers_QR_Gold.png"

GOLD  = "#c8a96e"
BLACK = "#000000"
WHITE = "#ffffff"

# Generate QR with high error correction
qr = qrcode.QRCode(
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=2,
)
qr.add_data(QR_URL)
qr.make(fit=True)

# Gold dots on black background
qr_img = qr.make_image(fill_color=GOLD, back_color=BLACK).convert("RGBA")
qr_w, qr_h = qr_img.size

# Load logo and invert (black logo -> white/gold-friendly)
logo = Image.open(LOGO_PATH).convert("RGBA")
r, g, b, a = logo.split()
rgb = Image.merge("RGB", (r, g, b))
rgb = ImageOps.invert(rgb)
logo = Image.merge("RGBA", (*rgb.split(), a))

# Resize logo to 35%
logo_size = int(qr_w * 0.35)
logo = logo.resize((logo_size, logo_size), Image.LANCZOS)

# Create gold circle background behind logo
bg_size = int(logo_size * 1.15)
bg = Image.new("RGBA", (bg_size, bg_size), (0, 0, 0, 0))
draw = ImageDraw.Draw(bg)
draw.ellipse([0, 0, bg_size - 1, bg_size - 1], fill=GOLD)

# Paste logo centered on gold circle
offset = (bg_size - logo_size) // 2
bg.paste(logo, (offset, offset), logo)

# Paste onto QR code centered
pos = ((qr_w - bg_size) // 2, (qr_h - bg_size) // 2)
qr_img.paste(bg, pos, bg)

# Add thin gold border around the whole image
border = 18
final_w = qr_w + border * 2
final_h = qr_h + border * 2
final = Image.new("RGBA", (final_w, final_h), BLACK)
draw2 = ImageDraw.Draw(final)
draw2.rectangle([0, 0, final_w - 1, final_h - 1], outline=GOLD, width=6)
final.paste(qr_img, (border, border), qr_img)

final = final.convert("RGB")
final.save(OUTPUT, dpi=(300, 300))
print(f"Gold QR code saved to {OUTPUT}")
