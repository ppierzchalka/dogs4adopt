const fs = require('fs');
const rp = require('request-promise');
const $ = require('cheerio');

function getData() {
  rp("http://schronisko.mpgk.jgora.pl/zwierzaki/psy/")
    .then(html => {
      let urls = ["http://schronisko.mpgk.jgora.pl/zwierzaki/psy/"];

      $('a.page-numbers', html).each(function(i, elem) {
        if (urls.indexOf($(this).attr('href')) === -1) {
          urls[i+1] = $(this).attr('href');
        }
      })
      return urls
    })
    .then(urls => {
      let dogs = [];
      urls.forEach(url => {
        rp(url)
          .then(html => {
            $('.entry-row', html).each(function(elem) {
              dogs.push({
                name: $('a', this).attr('href').replace('http://schronisko.mpgk.jgora.pl/','').replace('/', ''),
                image: $('img', this).attr('src'),
                link: $('a', this).attr('href'),
                location: "Jelenia Góra"
              })
            })
            fs.writeFileSync('./partial-json/dogs-jgora.json', JSON.stringify(dogs));
          })
      })
    })
    .catch(err => console.log(err))
}

module.exports.getData_jgora = getData;
