'use strict';

var Vector = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype = {

    addNew: function (v) {
        var nx, ny;
        nx = this.x + v.x;
        ny = this.y + v.y;
        return new Vector(nx, ny);
    },

    squaredLength: function () {
        return (this.x * this.x) + (this.y * this.y);
    },

    length: function () {
        return Math.sqrt(this.squaredLength());
    },

    scalarMultiply: function (num) {
        this.x *= num;
        this.y *= num;
        return this;
    },

    normalize: function () {
        var l = this.length();
        this.x /= l;
        this.y /= l;
        return this;
    },

    toString: function () {
        return "[" + this.x + "," + this.y + "]";
    }

};
