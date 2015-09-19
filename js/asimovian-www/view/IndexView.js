var IndexView = function() {
    this.canvas = document.getElementById('hexagonCanvas');;
    this.hexagonCanvas = null;
};

IndexView.prototype.init = function() {
    var self = this;

    // pre-load fonts
    WebFont.load({
        custom: {
            families: ['Quadaptor']
        },
    active: function() {
        $(document).ready(function() {
            self.onReady();
        });
    }
    });

    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.hexagonCanvas = new HexagonCanvas(this.canvas, 30);
    this.hexagonCanvas.draw();

    console.log('Hexagonal canvas ready');
};

IndexView.prototype.onReady = function() {
    // draw the asimovian text
    const txt = 'asimovian';
    var canvas = this.canvas;
    var context = canvas.getContext('2d');

    context.font = '128px Quadaptor';
    context.fillStyle = 'yellow';

    var txtSize = context.measureText(txt);
    var x = ( canvas.width / 2 ) - ( txtSize.width / 2 );
    var y = ( canvas.height / 2 ) - ( (txtSize.actualBoundingBoxDescent - txtSize.actualBoundingBoxAscent) / 2 );

    context.fillText(txt, x, (canvas.height / 2) - 56);
};