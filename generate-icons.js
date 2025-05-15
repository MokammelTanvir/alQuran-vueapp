/**
 * PWA Icon Generator for Al-Quran App
 * 
 * This script generates PWA icons with proper styling for the Al-Quran app.
 * It requires the sharp image processing library.
 * 
 * To use this script:
 * 1. Install sharp: npm install sharp
 * 2. Run this script: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Paths
const SOURCE_LOGO = path.join(__dirname, 'src/assets/al-quran.png');
const OUTPUT_DIR = path.join(__dirname, 'public');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Icon configurations
const icons = [
  {
    name: 'apple-touch-icon.png',
    size: 192,
    isRound: true
  },
  {
    name: 'android-chrome-192x192.png',
    size: 192,
    isRound: false,
    borderRadius: 40
  },
  {
    name: 'android-chrome-512x512.png',
    size: 512,
    isRound: true
  },
  {
    name: 'favicon.ico',
    size: 64,
    isRound: false,
    borderRadius: 12
  }
];

// Generate icons
async function generateIcons() {
  try {
    console.log('Loading source image...');
    const sourceImage = await loadImage(SOURCE_LOGO);
    
    for (const icon of icons) {
      console.log(`Generating ${icon.name}...`);
      
      // Create canvas
      const canvas = createCanvas(icon.size, icon.size);
      const ctx = canvas.getContext('2d');
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, icon.size, 0);
      gradient.addColorStop(0, '#1d4ed8'); // Blue 700
      gradient.addColorStop(1, '#3b82f6'); // Blue 500
      
      ctx.fillStyle = gradient;
      
      // Draw background shape (round or rounded square)
      if (icon.isRound) {
        ctx.beginPath();
        ctx.arc(icon.size / 2, icon.size / 2, icon.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const radius = icon.borderRadius;
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(icon.size - radius, 0);
        ctx.quadraticCurveTo(icon.size, 0, icon.size, radius);
        ctx.lineTo(icon.size, icon.size - radius);
        ctx.quadraticCurveTo(icon.size, icon.size, icon.size - radius, icon.size);
        ctx.lineTo(radius, icon.size);
        ctx.quadraticCurveTo(0, icon.size, 0, icon.size - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();
        ctx.fill();
      }
      
      // Calculate logo size (70% of container)
      const logoSize = Math.floor(icon.size * 0.7);
      const logoX = (icon.size - logoSize) / 2;
      const logoY = (icon.size - logoSize) / 2;
      
      // Draw glow effect
      ctx.save();
      ctx.beginPath();
      ctx.arc(icon.size / 2, icon.size / 2, logoSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.filter = `blur(${icon.size > 100 ? 15 : 6}px)`;
      ctx.fill();
      ctx.restore();
      
      // Draw logo with border
      ctx.save();
      ctx.beginPath();
      ctx.arc(icon.size / 2, icon.size / 2, logoSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      // Draw the image
      ctx.drawImage(sourceImage, logoX, logoY, logoSize, logoSize);
      
      // Draw border
      ctx.beginPath();
      ctx.arc(icon.size / 2, icon.size / 2, logoSize / 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = icon.size > 100 ? 4 : 2;
      ctx.stroke();
      ctx.restore();
      
      // Save the image
      const outPath = path.join(OUTPUT_DIR, icon.name);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(outPath, buffer);
      
      console.log(`✅ Created ${icon.name}`);
    }
    
    console.log('All icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

// NOTE: The above script uses the canvas library which needs to be installed:
// npm install canvas
// If you have issues installing canvas, you can use the HTML templates provided instead.
console.log("This is a template for generating PWA icons.");
console.log("To use it, you'll need to install the 'canvas' library:");
console.log("npm install canvas");
console.log("\nAlternatively, use the HTML generator files:");
console.log("- public/logo-generator.html");
console.log("- public/favicon-generator.html"); 