# ebacala.com - OG Image Generator

A tool to generate Open Graph (OG) images for ebacala.com using Puppeteer. Can be used as a command-line tool or imported as a library.

## Features

- Generate 1200x630px social media preview images
- Custom tag/category, article title, author name, and profile picture
- Beautiful gradient background design
- Use as CLI tool or import as Node.js module
- Supports multiple image formats (PNG, JPG/JPEG, GIF, BMP, WebP, SVG)

## Installation

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build
```

## Usage

### As a Library

```javascript
import { generateOGImage } from './generateOgImage.js';

const screenshot = await generateOGImage({
  tag: "Blog",
  title: "Your Article Title",
  author: "Author Name", 
  picturePath: "path/to/picture.png"
});

// Save or process the screenshot buffer
fs.writeFileSync("og-image.png", screenshot);
```

### As a Standalone CLI

```bash
# Run the script directly
node script.js

# Or use the built version
node dist/index.js
```

**Required Parameters:**
- `tag` - Tag/category for the image
- `title` - Title text for the image  
- `author` - Author name for the image
- `picturePath` - Path to profile picture

## Development

Use `dev/index.html` to preview the template in a browser.

```bash
# Start development server
pnpm start
```

## Output

Generated image saved as `og-image.png` in the specified output directory.

## Supported Formats

Profile pictures: PNG, JPG/JPEG, GIF, BMP, WebP, SVG
