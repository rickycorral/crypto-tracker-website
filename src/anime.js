// create 100 stars
for (var i = 0; i < 100; i++) {
    var star = document.createElement('div');
    star.className = 'star';
    var xy = getRandomPosition();
    star.style.top = xy[0] + 'px';
    star.style.left = xy[1] + 'px';
    document.getElementById('stars').appendChild(star);
  }
  
  // randomize star positions
  function getRandomPosition() {
    var y = window.innerWidth;
    var x = window.innerHeight;
    var randomX = Math.floor(Math.random()*x);
    var randomY = Math.floor(Math.random()*y);
    return [randomX,randomY];
  }
  
  // animate stars
  var starAnimation = anime({
    targets: '.star',
    translateX: function() { return anime.random(-2000, 2000); },
    translateY: function() { return anime.random(-2000, 2000); },
    scale: function() { return anime.random(1, 2); },
    opacity: function() { return anime.random(0.1, 1); },
    easing: 'linear',
    duration: 5000,
    loop: true
  });
  