const fs = require('fs');

// Shelter page specific scrapers registration
const lodz = require('./site-specific/lodz.js'),
      dgorna = require('./site-specific/dgorna.js'),
      jgora = require('./site-specific/jgora.js');

// Runs page scrapers
function readAndMerge() {
  lodz.getData_lodz();
  dgorna.getData_dgorna();
  jgora.getData_jgora();

  let data, lodzData, dgornaData;
  // Read data recieved from page scrapers
  lodzData = JSON.parse(fs.readFileSync('./partial-json/dogs-lodz.json'));
  dgornaData = JSON.parse(fs.readFileSync('./partial-json/dogs-dgorna.json'));
  jgoraData = JSON.parse(fs.readFileSync('./partial-json/dogs-jgora.json'));
  data = lodzData.concat(dgornaData).concat(jgoraData);

  // Write all data to single file
  fs.writeFileSync('./public/complete.json', JSON.stringify(data));

  //Get date and write scrape log
  let today = `Scrape: ${new Date().toString()}
`;
  fs.appendFileSync('./public/dates.log', today );
}

module.exports.readAndMerge = readAndMerge;
