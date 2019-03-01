import {Creator} from './creator.js';
import {Draw} from './draw.js';

document.addEventListener("DOMContentLoaded",function() {
  const draw = new Draw(document.getElementById("canvas"));
  const creator = new Creator(draw, document.getElementById("coords"));
  creator.initialise(window.addEventListener);
});