'use strict';

var Canvas = function (canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = this.ctx.strokeStyle = 'black';
    this.width = this.canvas.width;
    this.height = this.canvas.height;
 
};

Canvas.prototype = {

    clear: function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },
    
    circle: function (p, r) {
        var x = p.x * this.width,
            y = p.y * this.height;
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2, false);
        this.ctx.fill();
    },
    
    line: function (x1, x2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1.x * this.width, x1.y * this.height);
        this.ctx.lineTo(x2.x * this.width, x2.y * this.height);
        this.ctx.stroke();
    }
};

