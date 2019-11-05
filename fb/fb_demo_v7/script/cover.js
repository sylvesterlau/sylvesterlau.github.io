// https://github.com/VincentGarreau/particles.js

//doesn't work with a function, have to reload for a different colour.
// function random_hex(){
//     return '#' + Math.floor(Math.random()*16777215).toString(16);
// }

// var color = random_hex();



var config = {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": ["#7C67E3", "#ECCB4C", "#F57477", "#427BE6", "#47C8BB", "#06B0EC", "#F88F07", "#83B8F5"]
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#111820"
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 2,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 12,
      "random": false
    },
    "line_linked": {
      "enable": false,
      "distance": 50,
      "color": "#fff",
      "opacity": 1,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 5,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "in",
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "push": {
        "particles_nb": 3
      }
    }
  },
  "retina_detect": true
};


particlesJS('particles', config);