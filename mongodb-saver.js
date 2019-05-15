const mongoose = require('mongoose')
const Dog = require('./models/dog')
const fs = require('fs')
require('./db/mongoose')

// Shelter page specific scrapers registration
const dgorna = require('./site-specific/dgorna.js');
const lodz = require('./site-specific/lodz.js');

// Runs page scrapers
async function readAndMerge() {
  let data = []
  const lodzData = await lodz.getData_lodz(); // returns array of dogs
  const dgornaData = await dgorna.getData_dgorna();

  data = data.concat.apply([], [lodzData, dgornaData])

  //Get date and write scrape log
  let today = `Scrape: ${new Date().toString()}
`;
  fs.appendFileSync('./logs/dates.log', today);

  return data
}

const saveDogs = async function(dogsData) {
  mongoose.connection.db.dropDatabase();
  Dog.insertMany(dogsData, function(error, docs){
    if (error) {
      console.log(error);
    }
  })
}

module.exports.readAndMerge = readAndMerge;
module.exports.saveDogs = saveDogs;