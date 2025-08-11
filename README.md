# ebacala.com - OG Image Generator

A tool to generate Open Graph (OG) images for ebacala.com using Puppeteer. Can be used as a command-line tool or imported as a library.

## Features

- Generate 1200x630px social media preview images
- Custom tag/category, article title, author name, and profile picture
- Beautiful gradient background design
- Use as CLI tool or import as Node.js module

## Quick start

```bash
# Install dependencies
pnpm install

# Generate an OG image
node generateOgImage.js --tag "Blog" --title "Your Article Title" --author "Author Name" --picture "path/to/picture.png"
```

## Usage

### Command-line

```bash
node generateOgImage.js --tag <tag> --title <title> --author <author> --picture <picture file path>
```

**Flags:**
- `--tag` - Tag/category for the image
- `--title` - Title text for the image  
- `--author` - Author name for the image
- `--picture` - Path to profile picture
- `--help` or `-h` - Show help message

### As a library

```javascript
const { generateOGImage } = require('./generateOgImage.js');

const screenshot = await generateOGImage({
  tag: "Blog",
  title: "Your Article Title",
  author: "Author Name", 
  picturePath: "path/to/picture.png"
});

// Save or process the screenshot buffer
fs.writeFileSync("og-image.png", screenshot);
```

## Supported formats

Profile pictures: PNG, JPG/JPEG, GIF, BMP, WebP, SVG

## Output

Generated image saved as `og-image.png` in the current directory.

## Development

Use `dev/index.html` to preview the template in a browser.
