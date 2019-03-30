const rp = require('request-promise');
const $ = require('cheerio');

const getLinks = function(data, array) {
  $('a.pagenav', data).each(function (i, elem) {
    if (array.indexOf("http://schroniskodg.pl" + $(this).attr('href')) === -1) {
      array.push("http://schroniskodg.pl" + $(this).attr('href'));
    }
  })
}

const getDogs = function (data, arr) {
  $('.itemContainer', data).each(function (elem) {
    arr.push({
      name: $('img', this).attr('alt'),
      image: "http://schroniskodg.pl" + $('img', this).attr('src'),
      link: "http://schroniskodg.pl" + $('a', this).attr('href'),
      location: "Dłużyna Górna",
      dataLocation: 'dgorna'
    })
  })
}

async function getData() {
  let urls = ["http://schroniskodg.pl/psy-do-adopcji"];
  let dogs = [];
  const data = await rp(urls[0])

  getLinks(data, urls)

  const responses = await Promise.all(urls.map(url => rp(url)))

  responses.map(html => getDogs(html, dogs))
  return dogs
}

module.exports.getData_dgorna = getData;