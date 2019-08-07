const fs = require("fs");
const path = require("path");
const superagent = require("superagent");
const mime = require("mime-types");

const data = require("../src/data.json");

const images = data =>
  Object.keys(data).map(key => data[key].images.map(image => require(image)));

const getImage = (url, name) =>
  superagent.get(url).then(res => {
    const ext = mime.extension(res.headers["content-type"]);
    const folder = path.resolve(__dirname, "..", "public");
    const file = path.resolve(path.resolve(folder, "images"), `${name}.${ext}`);

    fs.writeFileSync(file, res.body);

    return path.relative(folder, file);
  });

const manually = data =>
  Promise.all(
    Object.keys(data).map(key => {
      const { logo, images } = data[key];

      return Promise.all([
        getImage(logo, `${key}-logo`),
        ...images.map((image, i) =>
          getImage(image, `${key}-image-${i.toString().padStart(2, "0")}`)
        )
      ]).then(result =>
        result.reduce((p, c, i) => {
          if (i === 0) {
            p = { key, logo: c, images: [] };
          } else {
            p.images.push(c);
          }

          return p;
        }, {})
      );
    })
  ).then(result =>
    result.reduce((p, c) => ({ ...p, [c.key]: { ...c, key: undefined } }), {})
  );

manually(data)
  .then(result => {
    console.log({ result });
    fs.writeFileSync(
      path.resolve(__dirname, "..", "public", "images.json"),
      JSON.stringify(result, null, 2)
    );
  })
  .catch(err => console.log(err));
