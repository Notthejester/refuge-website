// Mobile menu
(function () {
  var header = document.querySelector('header');
  var btn = document.querySelector('.menu-toggle');
  if (!header || !btn) return;
  btn.addEventListener('click', function () {
    var open = header.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

  // Live member count from Discord (public invite info, no token needed). Refreshes every 2 minutes.
  (function() {
    var el = document.getElementById('crew-count');
    if (!el) return;
    function update() {
      fetch('https://discord.com/api/v10/invites/RWwkpZxaM5?with_counts=true')
        .then(function(res) { return res.json(); })
        .then(function(data) {
          var count = data && data.approximate_member_count;
          if (typeof count === 'number') el.textContent = count.toLocaleString();
        })
        .catch(function() { /* keep the last number if Discord can't be reached */ });
    }
    update();
    setInterval(update, 120000);
  })();

  // Events running now and upcoming, from the site's own /api/events (Netlify function). Refreshes every 2 minutes.
  (function() {
    var running = document.getElementById('events-count');
    var upcoming = document.getElementById('upcoming-count');
    if (!running && !upcoming) return;
    function update() {
      fetch('/api/events')
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (!data) return;
          if (running && typeof data.running === 'number') running.textContent = data.running.toLocaleString();
          if (upcoming && typeof data.upcoming === 'number') upcoming.textContent = data.upcoming.toLocaleString();
        })
        .catch(function() { /* keep the last number */ });
    }
    update();
    setInterval(update, 120000);
  })();
