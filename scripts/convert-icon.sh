#!/bin/bash
# Convert SVG icon to PNG for the Lojong app
# This script generates 1024x1024 PNG from the SVG icon

set -e

ICON_SVG="assets/icon.svg"
ICON_PNG_1024="assets/icon.png"
ICON_PNG_ADAPTIVE="assets/adaptive-icon.png"
ICON_NOTIFICATION="assets/notification-icon.png"

echo "Converting Lojong icon SVG to PNG..."

# Check for available tools
if command -v magick &> /dev/null; then
    # ImageMagick available
    echo "Using ImageMagick..."
    magick "$ICON_SVG" -resize 1024x1024 -background none "$ICON_PNG_1024"
    magick "$ICON_SVG" -resize 1024x1024 -background none "$ICON_PNG_ADAPTIVE"
    magick "$ICON_SVG" -resize 192x192 -background none "$ICON_NOTIFICATION"
elif command -v convert &> /dev/null; then
    # Legacy ImageMagick command
    echo "Using ImageMagick (legacy)..."
    convert "$ICON_SVG" -resize 1024x1024 -background none "$ICON_PNG_1024"
    convert "$ICON_SVG" -resize 1024x1024 -background none "$ICON_PNG_ADAPTIVE"
    convert "$ICON_SVG" -resize 192x192 -background none "$ICON_NOTIFICATION"
elif command -v node &> /dev/null; then
    # Try using Node.js with a library
    echo "Using Node.js to convert SVG to PNG..."
    cat > /tmp/svg2png.js << 'EOF'
const fs = require('fs');
const path = require('path');

// Using sharp library (install with: npm install sharp)
try {
  const sharp = require('sharp');
  
  const svgBuffer = fs.readFileSync('assets/icon.svg');
  
  // 1024x1024
  sharp(svgBuffer)
    .resize(1024, 1024, { fit: 'contain', background: { r: 245, g: 240, b: 232, alpha: 0 } })
    .png()
    .toFile('assets/icon.png');
  
  // Adaptive icon
  sharp(svgBuffer)
    .resize(1024, 1024, { fit: 'contain', background: { r: 245, g: 240, b: 232, alpha: 0 } })
    .png()
    .toFile('assets/adaptive-icon.png');
  
  // Notification icon (smaller)
  sharp(svgBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 245, g: 240, b: 232, alpha: 0 } })
    .png()
    .toFile('assets/notification-icon.png');
  
  console.log('SVG to PNG conversion complete!');
} catch (err) {
  console.error('sharp not installed. Run: npm install sharp');
  process.exit(1);
}
EOF
    node /tmp/svg2png.js
else
    echo "❌ No conversion tools found. Please install ImageMagick or Node sharp."
    echo ""
    echo "Options:"
    echo "1. Install ImageMagick: brew install imagemagick"
    echo "2. Install sharp: npm install sharp"
    echo "3. Use an online converter: https://convertio.co/svg-png/"
    exit 1
fi

echo "✅ Icon conversion complete!"
echo "Generated:"
echo "  - $ICON_PNG_1024 (main icon)"
echo "  - $ICON_PNG_ADAPTIVE (Android adaptive icon)"
echo "  - $ICON_NOTIFICATION (notification icon)"
