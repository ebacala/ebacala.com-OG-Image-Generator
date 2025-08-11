import generateOGImage from "./generateOgImage.js";

import fs from "fs";

const data = {
  tag: "My tag",
  title: "Hello World!",
  picturePath: "./dev/profile-picture.png",
  author: "Evann BACALA",
};

const ogImage = await generateOGImage(data);

fs.writeFileSync("./dev/og-image.png", ogImage);
