const fs = require('fs');
const rp = require('request-promise');
const $ = require('cheerio');

function getData() {
  rp("http://schroniskodg.pl/psy-do-adopcji")
    .then(html => {
      let urls = ["http://schroniskodg.pl/psy-do-adopcji"];

      $('a.pagenav', html).each(function(i, elem) {
        if (urls.indexOf("http://schroniskodg.pl" + $(this).attr('href')) === -1) {
          urls[i+1] = "http://schroniskodg.pl" + $(this).attr('href');
        }
      })
      return urls
    })
    .then(urls => {
      let dogs = [];
      urls.forEach(url => {
        rp(url)
          .then(html => {
            $('.itemContainer', html).each(function(elem) {
              dogs.push({
                name: $('img', this).attr('alt'),
                image: "http://schroniskodg.pl" + $('img', this).attr('src'),
                link: "http://schroniskodg.pl" + $('a', this).attr('href'),
                location: "Dłużyna Górna"
              })
            })
            fs.writeFileSync('./partial-json/dogs-dgorna.json', JSON.stringify(dogs));
          })
      })
    })
    .catch(err => console.log(err))
}

module.exports.getData_dgorna = getData;
