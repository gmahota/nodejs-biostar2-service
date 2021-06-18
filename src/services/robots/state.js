const fs = require("fs");
const contentFilePath = './content.json'

 function save(data, filename, extension) {
  let buff = new Buffer.from(data, 'base64');
  return fs.writeFileSync(
    `${contentFilePath}${filename}.${extension}`,
    buff
  );
}

function saveJson(content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(
    contentFilePath,contentString
  );
}

function saveScript(content) {
  const contentString = JSON.stringify(content);
  const scriptString = `var content = ${contentString}`;
  return fs.writeFileSync(contentFilePath, scriptString);
}

function load() {
  const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
}

module.exports = {
  save,
  saveJson,
  saveScript,
  load,
};
