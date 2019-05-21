const mongoose = require('mongoose');
const fs = require('fs');
const Dog = require('./models/dog');
require('./db/mongoose');

// Shelter page specific scrapers registration
const dgorna = require('./site-specific/dgorna.js');
const lodz = require('./site-specific/lodz.js');
const jgora = require('./site-specific/jgora.js');
const ilawa = require('./site-specific/ilawa.js');
const gdynia = require('./site-specific/gdynia.js');

// Runs page scrapers
async function readAndMerge() {
  let data = []
  const lodzData = await lodz.getData_lodz(); // returns array of dogs
  const dgornaData = await dgorna.getData_dgorna();
  const jgoraData = await jgora.getData_jgora();
  const ilawaData = await ilawa.getData_ilawa();
  const gdyniaData = await gdynia.getData_gdynia();

  data = data.concat.apply([], [lodzData, dgornaData, jgoraData,ilawaData,gdyniaData])

  //Get date and write scrape log
  fs.appendFileSync('./logs/dates.log', `Scrape: ${new Date().toString()} /n`);

  return data
}

const saveDogs = async function(dogsData) {
  mongoose.connection.db.dropDatabase();
  Dog.insertMany(dogsData, function(error, docs){
    if (error) {
      console.log(error);
    fs.appendFileSync('./logs/errors.log', `${new Date()}: Error: ${error} \n`);
    }
  })
}

module.exports.readAndMerge = readAndMerge;
module.exports.saveDogs = saveDogs;