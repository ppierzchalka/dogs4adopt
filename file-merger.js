const fs = require('fs');
const lodz = require('./site-specific/lodz.js');
const dgorna = require('./site-specific/dgorna.js');
const jgora = require('./site-specific/jgora.js');

function readAndMerge() {
  // Working scrapers turned off to not ddos websites while developing
  lodz.getData_lodz();
  dgorna.getData_dgorna();
  jgora.getData_jgora();

  let data, lodzData, dgornaData;
  lodzData = JSON.parse(fs.readFileSync('./partial-json/dogs-lodz.json'));
  dgornaData = JSON.parse(fs.readFileSync('./partial-json/dogs-dgorna.json'));
  jgoraData = JSON.parse(fs.readFileSync('./partial-json/dogs-jgora.json'));
  data = lodzData.concat(dgornaData).concat(jgoraData);

  console.log(`Merging files, files.length sum = ${lodzData.length + dgornaData.length + jgoraData.length} Output data length: ${data.length}`);

  fs.writeFileSync('./public/complete.json', JSON.stringify(data));
}

module.exports.readAndMerge = readAndMerge;
