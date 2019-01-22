$(document).ready(function() {
  $(window).scroll(function(e) {
    parallax();
  });

  function parallax() {
    var scrolled = $(window).scrollTop();
    $('.hero').css('top', -(scrolled * 0.0315) + 'rem');
    $('.hero-copy > h1').css('top', -(scrolled * -0.005) + 'rem');
    $('.hero-copy > h1').css('opacity', 1 - (scrolled * .00175));
    $('.hero-copy > h3').css('top', -(scrolled * -0.005) + 'rem');
    $('.hero-copy > h3').css('opacity', 1 - (scrolled * .00175));
  };

  const input = document.querySelector('#filter-input');
  const list = [...document.querySelectorAll('.filterable')];
  const listParent = document.querySelector('#filter-list');

  input.addEventListener('input', filterShelters);

  function filterShelters(e) {
    const value = e.target.value;
    const filtered = list.filter(item => item.innerText.toLowerCase().includes(value.toLowerCase()));
    listParent.innerHTML = ""


    filtered.forEach(elem => {
      listParent.appendChild(elem);
    })
  }
});
