import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export async function generateOgImage(data) {
  const { title, tag, author, picturePath } = data;
  // Validate required data fields
  if (!tag) {
    throw new Error("Tag is required");
  }

  if (!title) {
    throw new Error("Title is required");
  }

  if (!author) {
    throw new Error("Author is required");
  }

  if (!picturePath) {
    throw new Error("Picture path is required");
  }

  // Validate picture file
  if (!fs.existsSync(picturePath)) {
    throw new Error(`Picture file does not exist: ${picturePath}`);
  }

  // Validate picture file extension
  const pictureFileExtension = path.extname(picturePath).toLowerCase();
  const validPictureExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg"];

  if (!validPictureExtensions.includes(pictureFileExtension)) {
    throw new Error(
      `Invalid image file format. Supported formats: ${validPictureExtensions.join(", ")}`
    );
  }

  // Convert picture to base64
  const pictureBuffer = fs.readFileSync(picturePath);
  const pictureBase64 = pictureBuffer.toString("base64");
  const mimeType = `image/${
    pictureFileExtension.slice(1) === "jpg" ? "jpeg" : pictureFileExtension.slice(1)
  }`;
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
    <div class="tag">${tag}</div>
    <div class="title">${title}</div>
    <div class="author">
      <div class="profile-pic"></div>
      <div class="author-name">${author}</div>
    </div>
  </body>
</html>
  `;

  await page.setContent(html);
  const screenshot = await page.screenshot({ type: "png" });

  await browser.close();
  return screenshot;
}

export default generateOgImage;
