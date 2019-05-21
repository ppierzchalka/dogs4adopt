const rp = require('request-promise');
const $ = require('cheerio');

const getLinks = function(data, array, url) {
    const pagesCount = $('a.page-numbers', data).eq(-2).text()

    for (i = 2; i <= pagesCount; i++) {
        array.push(`${url}/page/${i}`)
    }
}

const getDogs = function (data, arr) {
  $('.category-psy_do_adopcji', data).each(function (elem) {
    arr.push({
      name: $('.entry-title', this).text().replace(/\s/g,''),
      image:$('img', this).attr('src').replace("-150x100", "").replace("-150x99", ""),
      link: $('.more-link', this).attr('href'),
      location: "Gdynia",
      dataLocation: 'gdynia'
    })
  })
}

async function getData() {
  let urls = ["http://www.ciapkowo.pl/kategoria/psy_do_adopcji/psy","http://www.ciapkowo.pl/kategoria/psy_do_adopcji/suczki"];
  let dogs = [];

  const malesData = await rp(urls[0])
  const femalesData = await rp(urls[1])

  getLinks(malesData, urls, urls[0])
  getLinks(femalesData, urls, urls[1])

  const responses = await Promise.all(urls.map(url => rp(url)))

  responses.map(html => getDogs(html, dogs))

  return dogs
}

module.exports.getData_gdynia = getData;