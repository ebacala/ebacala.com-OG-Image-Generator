# ebacala.com - OG Image Generator

A simple tool to generate Open Graph (OG) images for ebacala.com using Puppeteer.

## What it does

This tool generates social media preview images (1200x630px) with:
- Custom tag/category
- Article title
- Author name and profile picture
- Beautiful gradient background design

## Quick start

```bash
# Install dependencies
pnpm install

# Generate an OG image
node main.js
```

The generated image will be saved as `og-image.png`.

## Customization

Edit the `main.js` file to change:
- Tag text
- Article title  
- Author name
- Visual styling (in the HTML template)

## Development

The `dev/index.html` file contains the same template for previewing changes in a browser.

## Dependencies

- **Puppeteer** - For headless browser screenshot generation
- **Node.js** - Runtime environment

## Output

Generates a 1200x630 PNG image optimized for social media sharing on platforms like Twitter, Facebook, and LinkedIn.