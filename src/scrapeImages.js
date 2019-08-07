const fs = require("fs");
const path = require("path");
const superagent = require("superagent");
var mime = require("mime-types");

const data = require("./src/data.json");

const getImage = (url, name) =>
  superagent.get(url).then(res => {
    const ext = mime.extension(res.headers["content-type"]);
    const file = path.resolve("public", "images", `${name}.${ext}`);

    console.log({ url: url.toJSON, file });

    fs.writeFileSync(file, res.body);
  });

Object.keys(data).map(key => {
  const { logo, images } = data[key];

  Promise.all([
    getImage(logo, `${key}-logo`),
    ...images.map((image, i) =>
      getImage(image, `${key}-image-${i.toString().padStart(2, "0")}`)
    )
  ])
    .then(() => console.log("done"))
    .catch(err => console.log({ err }));
});
