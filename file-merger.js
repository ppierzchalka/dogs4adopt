const fs = require('fs');

// Shelter page specific scrapers registration
const lodz = require('./site-specific/lodz.js');
const dgorna = require('./site-specific/dgorna.js');

// Runs page scrapers
async function readAndMerge() {
  let data = []
  const lodzData = await lodz.getData_lodz(); // returns array of dogs
  const dgornaData = await dgorna.getData_dgorna();

  data = data.concat.apply([], [lodzData, dgornaData])

  data => fs.writeFileSync('./public/complete.json', JSON.stringify(data))

  //Get date and write scrape log
  let today = `Scrape: ${new Date().toString()}
`;
  fs.appendFileSync('./public/dates.log', today);

  return data
}

readAndMerge().then(data => console.log(data))
module.exports.readAndMerge = readAndMerge;