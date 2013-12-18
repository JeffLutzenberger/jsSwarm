'use strict';

var Particle = function (x, y) {
    this.x = x;
    this.y = y;
    this.dir = new Vector(1, 0);
    this.vel = new Vector(1, 0);
    this.mass = this.inv_mass = 1;
    this.radius = 3;
};

Particle.prototype = {

    distanceSquared: function (p) {
        var dx = this.x - p.x,
            dy = this.y - p.y;
        return dx * dx + dy * dy;
    }
};
