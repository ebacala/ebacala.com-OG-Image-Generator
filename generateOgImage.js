const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Parse command line arguments with flags
function parseArguments() {
  const args = process.argv.slice(2);

  let tag = null;
  let title = null;
  let author = null;
  let picturePath = null;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--tag":
        tag = args[++i];
        break;
      case "--title":
        title = args[++i];
        break;
      case "--author":
        author = args[++i];
        break;
      case "--picture":
        picturePath = args[++i];
        break;
      case "--help":
      case "-h":
        console.log(
          "Usage: node generateOgImage.js --tag <tag> --title <title> --author <author> --picture <picture file path>"
        );
        console.log(
          "Example: node generateOgImage.js --tag 'Blog' --title 'How I fixed Apple Photos dates?' --author 'Evann BACALA' --picture '~/picture.png'"
        );
        console.log("\nFlags:");
        console.log("  --tag       The tag/category for the image");
        console.log("  --title     The title text for the image");
        console.log("  --author    The author name for the image");
        console.log("  --picture   The path of the picture for the image");
        console.log("  --help, -h  Show this help message");
        process.exit(0);
        break;
      default:
        console.error(`Unknown argument: ${args[i]}`);
        console.error("Use --help for usage information");
        process.exit(1);
    }
  }

  if (!tag || !title || !author || !picturePath) {
    console.error("Error: All four arguments (--tag, --title, --author, --picture) are required");
    console.error("Use --help for usage information");
    process.exit(1);
  }

  return { tag, title, author, picturePath };
}

async function generateOGImage(data) {
  // Validate picture file
  if (!fs.existsSync(data.picturePath)) {
    throw new Error(`Picture file does not exist: ${data.picturePath}`);
  }

  const ext = path.extname(data.picturePath).toLowerCase();
  const validExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg"];

  if (!validExtensions.includes(ext)) {
    throw new Error(
      `Invalid image file format. Supported formats: ${validExtensions.join(", ")}`
    );
  }

  // Convert picture to base64
  const pictureBuffer = fs.readFileSync(data.picturePath);
  const pictureBase64 = pictureBuffer.toString("base64");
  const mimeType = `image/${ext.slice(1) === "jpg" ? "jpeg" : ext.slice(1)}`;
  const pictureDataUrl = `data:${mimeType};base64,${pictureBase64}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport to OG image dimensions
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  const html = `
    <!DOCTYPE html>
<html>
  <head>
    <style>
      * {
        box-sizing: border-box;
      }

      [debug] {
        * {
          outline: 1px solid red;
        }
      }

      :root {
        --color-foreground: hsl(0, 0%, 10%);
      }

      html {
        background-color: white;
        font-size: 16px;
        margin: 0;
        padding: 0;
      }

      body {
        background: linear-gradient(to top right, #dadbd4, #f7f7f3);
        color: var(--color-foreground);
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        height: 630px;
        margin: 0;
        padding: 4rem;
        width: 1200px;
        box-sizing: border-box;
      }

      .tag {
        align-self: flex-start;
        background: transparent;
        border: 1px solid var(--color-foreground);
        border-radius: 20px;
        font-size: 1rem;
        margin-top: 8rem;
        padding: 8px 16px;
      }

      .title {
        align-items: center;
        display: flex;
        flex: 1;
        font-size: 3.5rem;
        line-height: 1.2;
        margin-bottom: 4rem;
      }

      .author {
        align-items: center;
        display: flex;
        gap: 1rem;
      }

      .profile-pic {
        background: url(${pictureDataUrl})
          center center;
        background-size: cover;
        border: 1px solid white;
        border-radius: 50%;
        height: 6rem;
        width: 6rem;
      }

      .author-name {
        font-size: 2rem;
      }
    </style>
  </head>
  <body>
    <div class="tag">${data.tag}</div>
    <div class="title">${data.title}</div>
    <div class="author">
      <div class="profile-pic"></div>
      <div class="author-name">${data.author}</div>
    </div>
  </body>
</html>
  `;

  await page.setContent(html);
  const screenshot = await page.screenshot({ type: "png" });

  await browser.close();
  return screenshot;
}

// Check if this file is being run directly or imported as a module
if (require.main === module) {
  // Running directly with Node.js - parse arguments and generate image
  try {
    const data = parseArguments();
    
    generateOGImage(data)
      .then((screenshot) => {
        fs.writeFileSync("og-image.png", screenshot);
        console.log("OG image generated successfully as 'og-image.png'");
      })
      .catch((error) => {
        console.error("Error generating OG image:", error);
        process.exit(1);
      });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
} else {
  // Imported as a module - export the generateOGImage function
  module.exports = { generateOGImage };
}
