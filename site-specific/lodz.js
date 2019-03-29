const rp = require('request-promise');
const $ = require('cheerio');

const getLinks = function (data, arr) {
  $('.abase_page_link', data).each(function (i, elem) {
    arr.push("http://www.schronisko-lodz.pl/" + $(this).attr('href'))
  })
}

const getDogs = function (data, arr) {
  $('.animal_box', data).each(function (elem) {
    arr.push({
      name: $('span', this).html(),
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
  const data = await rp("http://www.schronisko-lodz.pl/?p=adopcje&a=search&type=pies&order=added_desc");

  getLinks(data, urls)

  const responses = await Promise.all(urls.map(url => rp(url)))

  responses.map(html => getDogs(html, dogs))
  return dogs
}

module.exports.getData_lodz = getData;