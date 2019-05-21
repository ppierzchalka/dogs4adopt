// to be adjusted to new scraping method
const rp = require('request-promise');
const $ = require('cheerio');

const getLinks = function (data, array) {
  $('a.page-numbers', data).each(function (i, elem) {
    if (array.indexOf($(this).attr('href')) === -1) {
      array.push($(this).attr('href'));
    }
  })
}

const getDogs = function (data, arr) {
  $('.entry-row', data).each(function (elem) {
    arr.push({
      name: $('h4', this).text().split('\t')[6],
      image: $('img', this).attr('src'),
      link: $('a', this).attr('href'),
      location: "Jelenia Góra",
      dataLocation: 'jgora'
    })
  })
}

async function getData() {
  let urls = ["http://schronisko.mpgk.jgora.pl/zwierzaki/psy/"];
  let dogs = [];
  const data = await rp(urls[0])

  getLinks(data, urls)

  const responses = await Promise.all(urls.map(url => rp(url)))

  responses.map(html => getDogs(html, dogs))
  return dogs
}

module.exports.getData_jgora = getData;