import qrcode
from PIL import Image, ImageOps, ImageDraw

QR_URL    = "https://linktr.ee/doughdealers"
LOGO_PATH = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\src\assets\logoblack.png"
OUTPUT    = r"C:\Users\nathan martinez\Documents\Claude\dough-dealers\DoughDealers_QR_Inverted.png"

# Generate QR code — black dots on white background
qr = qrcode.QRCode(
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=20,
    border=2,
)
qr.add_data(QR_URL)
qr.make(fit=True)

qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")
qr_w, qr_h = qr_img.size

# Load logo as-is (black logo on white circle)
logo = Image.open(LOGO_PATH).convert("RGBA")
logo_size = int(qr_w * 0.35)
logo = logo.resize((logo_size, logo_size), Image.LANCZOS)

# Create a white circle behind the logo
bg_size = int(logo_size * 1.12)
bg = Image.new("RGBA", (bg_size, bg_size), (0, 0, 0, 0))
draw = ImageDraw.Draw(bg)
draw.ellipse([0, 0, bg_size - 1, bg_size - 1], fill=(255, 255, 255, 255))

# Paste logo centered on circle
offset = (bg_size - logo_size) // 2
bg.paste(logo, (offset, offset), logo)

# Paste circle+logo centered on QR code
pos = ((qr_w - bg_size) // 2, (qr_h - bg_size) // 2)
qr_img.paste(bg, pos, bg)

qr_img = qr_img.convert("RGB")
qr_img.save(OUTPUT, dpi=(300, 300))
print(f"Inverted QR code saved to {OUTPUT}")
