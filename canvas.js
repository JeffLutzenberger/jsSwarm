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
    
    circle: function (x, y, r, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.arc(x, y, r, 0, Math.PI * 2, false);
        this.ctx.fill();
    },
    
    line: function (p1, p2, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }
};

