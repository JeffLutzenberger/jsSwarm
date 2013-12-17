'use strict';

var Vector = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype = {

    scalar_add_new: function (num) {
        return new Vector(this.x + num, this.y + num);
    },

    add_new: function (v) {
        var nx, ny;
        nx = this.x + v.x;
        ny = this.y + v.y;
        return new Vector(nx, ny);
    },

    scalar_add: function (num) {
        this.x += num;
        this.y += num;
        return this;
    },

    add: function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    },

    subtract_new: function (v) {
        var nx, ny;
        nx = this.x - v.x;
        ny = this.y - v.y;
        return new Vector(nx, ny);
    },

    dot: function (v) {
        return ((this.x * v.x) + (this.y * v.y));
    },

    squaredLength: function () {
        return (this.x * this.x) + (this.y * this.y);
    },

    length: function () {
        return Math.sqrt(this.squaredLength());
    },

    scalar_multiply_new: function (num) {
        return new Vector(this.x * num, this.y * num);
    },

    multiply_new: function (v) {
        return new Vector(this.x * v.x, this.y * v.y);
    },

    scalar_multiply: function (num) {
        this.x *= num;
        this.y *= num;
        return this;
    },

    multiply: function (v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    },

    sum: function () {
        return this.x + this.y;
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
