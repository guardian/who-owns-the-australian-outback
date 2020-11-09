// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// https://doi.pangaea.de/10.1594/PANGAEA.910894

import mines from 'shared/data/permits.json'
import states from 'shared/data/au-states.json'
import places from 'shared/data/places.json'
import settings from 'shared/data/settings'
import { Ownership } from 'shared/js/ownership'
import scroll from 'shared/js/scroll'

var conf = {

	rootMargin: '0px 0px 550px 0px',

	threshold: 0

}

let boom = new IntersectionObserver(function(entries, exit) {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      handle(entry.target.getAttribute('data-loader'))

      exit.unobserve(entry.target);

    }

  });

}, conf);

const components = document.querySelectorAll('[data-loader]');

components.forEach(component => {

  boom.observe(component);

});

function handle(load) {

	switch(load) {
	  case 'map-1':
	  	var ownership = new Ownership(settings, mines, states, places)
	    break;
	  case 'map-2':
       	scroll.init("#scrolly-2")
	    break;
	  case 'map-3':
	    scroll.init("#scrolly-3")
	    break;
	  default:
	}

}