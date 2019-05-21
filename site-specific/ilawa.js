const rp = require('request-promise');
const $ = require('cheerio');

const getLinks = function(data, array) {
  $('a.page-numbers', data).each(function (i, elem) {
    if (array.indexOf($(this).attr('href')) === -1) {
        array.push($(this).attr('href'));
    }
  })
}

const getDogs = function (data, arr) {
  $('.product_cat-pies', data).each(function (elem) {
    arr.push({
      name: $('h2.woocommerce-loop-product__title', this).text(),
      image: $('img', this).attr('src').replace("-300x300", ""),
      link: $('a', this).attr('href'),
      location: "Iława",
      dataLocation: 'ilawa'
    })
  })
}

async function getData() {
  let urls = ["http://ilawa.otoz.pl/kategoria-produktu/adopt/pies/"];
  let dogs = [];
  const data = await rp(urls[0])

  getLinks(data, urls)

  const responses = await Promise.all(urls.map(url => rp(url)))

  responses.map(html => getDogs(html, dogs))

  return dogs
}

module.exports.getData_ilawa = getData;