/**
 * @copyright 2015 Asimovian LLC
 * @license MIT https://github.com/asimovian/www.asimovian.software/blob/master/LICENSE.txt
 */
'use strict';

var gHexagonCanvas = (function() {
  let hexagonCanvas = null;

  WebFont.load({
    custom: {
      families: ['Quadaptor']
    },
    active: function() {
        $(document).ready(function() {
            let canvas = document.getElementById('hexagonCanvas');
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;

            hexagonCanvas = new HexagonCanvas(canvas, 30);
            hexagonCanvas.draw();
            console.log('Hexagonal canvas ready');
        });
    }
  });

  return hexagonCanvas;
})();