const rp = require('request-promise').defaults({ encoding: null });
const $ = require('cheerio');
const iconv = require('iconv-lite');
const Entities = require('html-entities').XmlEntities;

const entities = new Entities();

const getLinks = function (data, arr) {
  $('.abase_page_link', data).each(function (i, elem) {
    arr.push("http://www.schronisko-lodz.pl/" + $(this).attr('href'))
  })
}

const getDogs = function (data, arr) {
  $('.animal_box', data).each(function (elem) {
    arr.push({
      name: entities.decode($('span', this).html()),
      image: "http://www.schronisko-lodz.pl/" + $('img', this).attr('src'),
      link: "http://www.schronisko-lodz.pl/" + $('a', this).attr('href'),
      location: "Łódź",
      dataLocation: 'lodz'
    })
  })
}

async function getData() {
  let urls = ["http://www.schronisko-lodz.pl/?p=adopcje&a=search&type=pies&order=added_desc"];
  let dogs = [];
  const data = await rp(urls[0]);
  const decoded = iconv.decode(data, 'ISO8859-2')
  getLinks(decoded, urls)

  const responses = await Promise.all(urls.map(async url => {
    const data = await rp(url);
    const decoded = iconv.decode(data, 'ISO8859-2');

    return decoded;
  }))

  responses.map(html => getDogs(html, dogs))
  return dogs
}

module.exports.getData_lodz = getData;