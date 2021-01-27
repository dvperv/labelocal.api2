const fs = require("fs")
const struct = require("objpack")

function read_file(path) {
  let nbands, npoints, metaSize = 0;

  let buffer = fs.readFileSync(path);
  const bufferStr = buffer.toString().split("\n");
  for (let i = 0; i < 24; i++) {
    metaSize += bufferStr[i].length + 1;
    let split = bufferStr[i].split(RegExp("\\s+"));
    if (split[0] === "nbands") {
      nbands = parseInt(split[1]) + 1;
    } else if (split[0] === "npoints") {
      npoints = parseInt(split[1]);
    }
  }
  const imageSize = npoints * nbands;
  buffer = buffer.slice(metaSize, metaSize + imageSize * 4)
  let imageFlat = struct.unpack("f<".repeat(imageSize), buffer)

  let image = [];
  for (let offset = 0; offset < nbands; offset++) {
    let line = [];
    for (let i = 0; i < npoints; i++) {
      line.push(imageFlat[offset + i * 33]);
    }
    image.push(line);
  }
  image.pop();

  return image;
}

read_file('../000339.pnt')