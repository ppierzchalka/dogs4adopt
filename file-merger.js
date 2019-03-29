const fs = require('fs');

// Shelter page specific scrapers registration
const lodz = require('./site-specific/lodz.js');

// Runs page scrapers
async function readAndMerge() {
  let data = []
  const lodzData = await lodz.getData_lodz() // returns array of dogs

  data = data.concat(lodzData)
  data => fs.writeFileSync('./public/complete.json', JSON.stringify(data))

  console.log(data)

  //Get date and write scrape log
  let today = `Scrape: ${new Date().toString()}
`;
  fs.appendFileSync('./public/dates.log', today);
}
readAndMerge()
module.exports.readAndMerge = readAndMerge;