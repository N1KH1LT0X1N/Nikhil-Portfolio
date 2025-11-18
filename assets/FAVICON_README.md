# Favicon Files

This directory should contain the following favicon files for optimal browser support:

## Required Files

- `favicon.ico` - Legacy favicon (16x16, 32x32)
- `favicon-16x16.png` - 16x16 PNG favicon
- `favicon-32x32.png` - 32x32 PNG favicon
- `apple-touch-icon.png` - 180x180 PNG for iOS devices
- `favicon.svg` - SVG favicon (currently available)

## How to Generate

You can use the provided `favicon.svg` as a starting point and generate the other formats using:

1. **Online Tools:**
   - https://realfavicongenerator.net/
   - https://favicon.io/

2. **Command Line (ImageMagick):**
   ```bash
   # From SVG to PNG
   convert favicon.svg -resize 16x16 favicon-16x16.png
   convert favicon.svg -resize 32x32 favicon-32x32.png
   convert favicon.svg -resize 180x180 apple-touch-icon.png

   # Create ICO
   convert favicon-16x16.png favicon-32x32.png favicon.ico
   ```

## Current Status

✅ `favicon.svg` - Created with gradient and "NP" initials
⏳ Other formats need to be generated

Once generated, place all files in this `assets/` directory.
