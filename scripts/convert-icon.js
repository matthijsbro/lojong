#!/usr/bin/env node
/**
 * Convert SVG icon to PNG formats for Lojong app
 * Usage: node scripts/convert-icon.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../assets/icon.svg');
const iconPath = path.join(__dirname, '../assets/icon.png');
const adaptiveIconPath = path.join(__dirname, '../assets/adaptive-icon.png');
const notificationIconPath = path.join(__dirname, '../assets/notification-icon.png');

async function convertIcon() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    const bg = { r: 245, g: 240, b: 232, alpha: 1 };

    console.log('Converting SVG icon to PNG...');

    // Main icon (1024x1024)
    await sharp(svgBuffer, { density: 150 })
      .resize(1024, 1024, {
        fit: 'contain',
        background: bg,
      })
      .png()
      .toFile(iconPath);
    console.log(`✓ Created ${iconPath}`);

    // Adaptive icon (1024x1024)
    await sharp(svgBuffer, { density: 150 })
      .resize(1024, 1024, {
        fit: 'contain',
        background: bg,
      })
      .png()
      .toFile(adaptiveIconPath);
    console.log(`✓ Created ${adaptiveIconPath}`);

    // Notification icon (192x192)
    await sharp(svgBuffer, { density: 150 })
      .resize(192, 192, {
        fit: 'contain',
        background: bg,
      })
      .png()
      .toFile(notificationIconPath);
    console.log(`✓ Created ${notificationIconPath}`);

    console.log('\n✅ Icon conversion complete!');
    console.log('The app is ready to build and deploy.');
  } catch (error) {
    console.error('❌ Error converting icon:', error.message);
    process.exit(1);
  }
}

convertIcon();
