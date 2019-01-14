const fs = require('fs');
const rp = require('request-promise');
const $ = require('cheerio');

function getData() {
  rp("http://www.schronisko-lodz.pl/?p=adopcje&a=search&type=pies&order=added_desc")
    .then(html => {
      let urls = ["http://www.schronisko-lodz.pl/?p=adopcje&a=search&type=pies&order=added_desc"];

      $('.abase_page_link', html).each(function(i, elem) {
        urls[i+1] = "http://www.schronisko-lodz.pl/" + $(this).attr('href');
      })
      return urls
    })
    .then(urls => {
      let dogs = [];
      urls.forEach(url => {
        rp(url)
          .then(html => {
            $('.animal_box', html).each(function(elem) {
              dogs.push({
                name: $('span', this).html(),
                image: "http://www.schronisko-lodz.pl/" + $('img', this).attr('src'),
                link: "http://www.schronisko-lodz.pl/" + $('a', this).attr('href'),
                location: "Łódź"
              })
            })
            fs.writeFileSync('./partial-json/dogs-lodz.json', JSON.stringify(dogs));
          })
      })
    })
    .catch(err => console.log(err))
}

module.exports.getData_lodz = getData;
