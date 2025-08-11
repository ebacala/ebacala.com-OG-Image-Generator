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

# Generate an OG image with required parameters
node main.js --tag "Blog" --title "Your Article Title" --author "Author Name" --picture "path/to/picture.png"
```

## Usage

The tool requires four command-line arguments:

```bash
node main.js --tag <tag> --title <title> --author <author> --picture <picture file path>
```

### Example

```bash
node main.js --tag 'Blog' --title 'How I fixed Apple Photos dates?' --author 'Evann BACALA' --picture '~/picture.png'
```

### Command-line flags

- `--tag` - The tag/category for the image
- `--title` - The title text for the image
- `--author` - The author name for the image
- `--picture` - The path of the picture for the image
- `--help` or `-h` - Show help message

### Supported image formats

The tool supports the following image formats for the profile picture:

- PNG, JPG/JPEG, GIF, BMP, WebP, SVG

## Output

The generated image will be saved as `og-image.png` in the current directory.

## Development

The `dev/index.html` file contains the same template for previewing changes in a browser.

## Dependencies

- **Puppeteer** - For headless browser screenshot generation
- **Node.js** - Runtime environment

## Features

- **Command-line interface** - Easy to integrate into build scripts and automation
- **Flexible input** - Customize tag, title, author, and profile picture
- **Image validation** - Checks file existence and validates supported formats
- **High-quality output** - Generates 1200x630 PNG images optimized for social media sharing
- **Modern design** - Clean, gradient background with professional typography
