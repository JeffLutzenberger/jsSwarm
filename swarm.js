/* global document: false */
'use strict';

$(function () {
    /* global document, Canvas */
    var canvas = new Canvas($('canvas')[0]),
        swarm = new Swarm(canvas),
        debug = false;
    if (debug) {
        swarm.update();
    } else {
        setInterval(swarm.update.bind(swarm), 35);
    }

    $("#canvas").click(function (e) {
        var x = Math.floor((e.pageX - $("#canvas").offset().left)),
            y = Math.floor((e.pageY - $("#canvas").offset().top));
        swarm.wayPoint = new Vector(x, y);
    });
});

var Swarm = function (canvas) {
    
    var i, p,
        originX = 500,
        originY = 500,
        initialDispersion = 100;
    this.canvas = canvas;
    this.nParticles = 100;
    this.particles = [];
    this.wayPoint = new Vector(100, 100);

    for (i = 0; i < this.nParticles; i += 1) {
        p = new Particle(originX + Math.random() * initialDispersion,
                         originY + Math.random() * initialDispersion);
        this.particles[i] = p;
    }
};

Swarm.prototype = {
    
    update: function () {
        var i = 0, nearest, color;

        this.canvas.clear();
        
        this.drawWayPoint();

        for (i = 0; i < this.nParticles; i += 1) {
            nearest = this.nearestNeighbor(i);
            this.moveParticle(this.particles[i], this.wayPoint, nearest);
        }

        //draw points
        for (i = 0; i < this.nParticles; i += 1) {
            color = 'red';
            if (i % 3 === 0) {
                color = 'blue';
            } else if (i % 2 === 0) {
                color = 'green';
            }
            this.drawParticle(this.particles[i], color);
        }
        
    },

    nearestNeighbor: function (index) {
        /**
         * Find the particle closest to the particle at this index
         * @param {integer} index of particle to test against
         * @return {Particle} closest neighboring particle
         * */
        var i = 0,
            minD = 1e6,
            nearest,
            p = this.particles[index],
            d = minD;

        for (i = 0; i < this.nParticles; i += 1) {
            if (i !== index) {
                d = p.distanceSquared(this.particles[i]);
                if (d < minD) {
                    minD = d;
                    nearest = this.particles[i];
                }
            }
        }
        return nearest;
    },

    moveParticle: function (particle, wayPoint, nearestNeighbor) {
        /**
         * move our particle
         * @param {Particle} the particle to move
         * @param {Vector} wayPoint where we're headed
         * @param {Particle} nearest particle 
         * */
        var v1 = new Vector(wayPoint.x - particle.x, wayPoint.y - particle.y),
            d1 = v1.squaredLength(),
            v2,
            d2,
            velocity = 0.01;

        if (d1 > 1) {
            velocity = 0.02 * Math.sqrt(d1);
        } else {
            velocity = -0.1;
        }
        v1 = v1.normalize();
        if (nearestNeighbor) {
            v2 = new Vector(nearestNeighbor.x - particle.x, nearestNeighbor.y - particle.y);
            d2 = v2.squaredLength();
            if (d2 < 100) {
                v2 = v2.normalize();
                v2 = v2.scalar_multiply(10);
            }
        }
        v1 = v1.scalar_multiply(velocity);
        if (v2) {
            v1 = v1.add_new(v2);
        }
        particle.x += v1.x;
        particle.y += v1.y;
    },

    drawParticle: function (p, color) {
        this.canvas.circle(p.x, p.y, p.radius, color);
    },

    drawWayPoint: function () {
        this.canvas.circle(this.wayPoint.x, this.wayPoint.y, 5);
    }

};
