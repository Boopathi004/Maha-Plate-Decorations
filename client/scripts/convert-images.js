import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');

async function convertImages() {
  if (!fs.existsSync(imagesDir)) {
    console.error(`Directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);
  console.log(`Found ${files.length} files in ${imagesDir}`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const inputPath = path.join(imagesDir, file);
      const outputName = path.basename(file, ext) + '.webp';
      const outputPath = path.join(imagesDir, outputName);

      console.log(`Converting ${file} -> ${outputName}...`);
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        const originalStats = fs.statSync(inputPath);
        const webpStats = fs.statSync(outputPath);
        const ratio = ((webpStats.size / originalStats.size) * 100).toFixed(1);
        console.log(`Success: ${originalStats.size} bytes -> ${webpStats.size} bytes (${ratio}%)`);

        // Delete the original file
        fs.unlinkSync(inputPath);
        console.log(`Deleted original: ${file}`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err);
      }
    }
  }
}

convertImages();
