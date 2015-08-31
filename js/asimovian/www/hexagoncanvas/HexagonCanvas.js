/**
 * Hastily drafted proof of ui concept
 * @copyright 2015 Asimovian LLC
 * @license MIT
 */

var HexagonCanvas = (function() {
    'use strict';

var XY = function(x, y) {
    this.x = x;
    this.y = y;
};

var Rectangle = function(topLeftXY, bottomRightXY) {
    this.topLeftXY = topLeftXY;
    this.bottomRightXY = bottomRightXY;
};

Rectangle.prototype.contains = function(xy) {
    return ( xy.x >= this.topLeftXY.x && xy.x <= this.bottomRightXY.x
        && xy.y >= this.topLeftXY.y && xy.y <= this.bottomRightXY.y );
};

var Hexagon = function(size, centerXY) {
    this.size = size;
    this.centerXY = centerXY;
    this.vertices = Hexagon.calcVertices(size, centerXY);
    this.boundaryRectangle = Hexagon.calcBoundaryRectangle(size, centerXY);
    this.fillStyle = null;
};

Hexagon.calcVertices = function(size, centerXY) {
    var vertices = [];

    let vertex = new XY(
        centerXY.x +  size * Math.cos(0),
        centerXY.y +  size *  Math.sin(0) );

    vertices.push(vertex);

    for (let i = 1; i <= 6; ++i) {
        let vertex = new XY(
            centerXY.x + size * Math.cos(2*Math.PI * i / 6),
            centerXY.y + size * Math.sin(2*Math.PI * i / 6) );

         vertices.push(vertex);
    }

    return vertices;
};

Hexagon.calcBoundaryRectangle = function(size, centerXY) {
    var topLeftXY = new XY(centerXY.x - size, centerXY.y - size);
    var bottomRightXY = new XY(centerXY.x + size, centerXY.y + size);;
    return new Rectangle(topLeftXY, bottomRightXY);
};

Hexagon.prototype.getFillStyle = function() {
    return this.fillStyle;
};

Hexagon.prototype.setFillStyle = function(fillStyle) {
    this.fillStyle = fillStyle;
};

Hexagon.prototype.contains = function(xy) {
    //todo: check polygon boundries if within boundary rectangle
    return this.boundaryRectangle.contains(xy);
};

let HexagonCanvas = function(canvas, size, options) {
    this.canvas = canvas;
    this.hexagons = HexagonCanvas.createHexagons(canvas, size);

    // add listeners to canvas to handle mouse motion
    var self = this;
    canvas.addEventListener('mousemove', function() { self.onMouseMove(event); });
};

HexagonCanvas.createHexagons = function(canvas, size) {
    var hexagons = [];
    var yOffset = 0;

    for (let x = size; x < canvas.width; x += .5 * size + (2*size * Math.cos(2*Math.PI * 1/6))) { //todo: initialize and increment correctly
            if (x + .5*size > canvas.width)
                break; // don't draw clipped hexagons vertically

        // adjust yOffset to make hexagons overlap horizontally
        yOffset = ( x === size || (x !== size && yOffset + size !== size) ? 0 : size*Math.sin(2*Math.PI*1/6));
        for (let y = size + yOffset; y < canvas.height; y += 2*size*Math.sin(2*Math.PI*1/6)) { //todo: initialize and increment correctly
            if (y + .5*size > canvas.height)
                break; // don't draw clipped hexagons vertically
            let centerXY = new XY(x, y);
            let hexagon = new Hexagon(size, centerXY);
            hexagons.push(hexagon);
            //if (yOffset !== 0) return hexagons;
        }
    }

    return hexagons;
};

HexagonCanvas.prototype.draw = function() {
    var context = this.canvas.getContext('2d');

    //todo: this clears the entire canvas. only the affected boundry boxes should be cleared and redrawn.
    //      event based redraws at the hexagon level may be the better option
    context.clearRect(0, 0, canvas.width, canvas.height);

    // for each hexagon
    for (let o = 0; o < this.hexagons.length; ++o) {
        let hexagon = this.hexagons[o];
        let vertices = hexagon.vertices;
        let vertex = vertices[0];

        // begin designing the hex
        context.beginPath();
        // move cursor to first vertex
        context.moveTo(vertex.x, vertex.y);

        // for each vertex of the hexagon
        for (let v = 1; v < vertices.length; ++v) {
            // draw a line from the last vertex to the current
            let vertex = vertices[v];
            context.lineTo(vertex.x, vertex.y);
        }

        // finish designing the hex
        context.closePath();

        // apply style to the hex accordingly
        // if it has a fill style, fill it
        let fillStyle = hexagon.getFillStyle();
        if (fillStyle !== null) {
            context.fillStyle = fillStyle;
            context.strokeStyle = 'yellow';
            // fill the hex
            context.fill();
        } else { // show the default style
            context.strokeStyle = 'grey';
        }

        // draw the hex outline
        context.stroke();
    }

    // draw the asimovian text
    context.font = '128px Quadaptor';
    context.fillStyle = 'yellow';
    var textmetrics = context.measureText('asimovian');
    var x = ( canvas.width / 2 ) - ( textmetrics.width / 2 );
    var y = ( canvas.height / 2 ) - ( (textmetrics.actualBoundingBoxDescent - textmetrics.actualBoundingBoxAscent) / 2 );
    context.fillText('asimovian', x, (canvas.height / 2) - 56);
};

HexagonCanvas.prototype.onMouseMove = function(event) {
    var mouseXY = new XY(event.clientX, event.clientY);
    this.resetFillStyles();

    for (let h = 0; h < this.hexagons.length; ++h) {
        let hexagon = this.hexagons[h];
        if (hexagon.contains(mouseXY)) {
            hexagon.setFillStyle('yellow');
            this.draw();
            return;
        }
    }
};

HexagonCanvas.prototype.resetFillStyles = function() {
    for (let h = 0; h < this.hexagons.length; ++h) {
        this.hexagons[h].setFillStyle(null);
    }
};

return HexagonCanvas;
})();