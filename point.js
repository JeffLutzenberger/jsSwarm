'use strict';

var Point = function (canvas, x, y) {
    this.canvas = canvas;
    this.current = new Vector(x, y);
    this.previous = this.current;
    this.mass = this.inv_mass = 1;
    //this.force = new Vector(0.0,0.5).multiply(0.05 * 0.05);
    this.radius = 5;
};


Point.prototype = {

    draw: function (canvas) {
        canvas.circle(this.current, this.radius);
    },

    move: function (wayPoint, nearestNeighbor) {
        //move toward way point and away from nearest neighbor
        //get distance to way ponit
        var v1 = wayPoint.subtract_new(this.current),
            v2,
            d2,
            d1 = v1.squaredLength(),
            velocity = 0.01;

        if (d1 > 1) {
            velocity = 0.02 * Math.sqrt(d1);
        } else {
            velocity = -0.5;//return;
        }
        this.previous = this.current;
        //normalize the vector between the way point and our
        v1 = v1.normalize();
        //TODO: if we're close to a neighbor we should move away from it
        if (nearestNeighbor) {
            //claculate v2 and d2, if d2 is less than some threshold modify v1
            v2 = nearestNeighbor.subtract_new(this.current);
            d2 = v2.squaredLength();
            if (d2 < 100) {
                v2 = v2.normalize();
                v2 = v2.scalar_multiply(20);
            }
            //console.log(v2);
        }
        //now move in that direction at our calculated velocity
        //this.current = new Vector()
        v1 = v1.scalar_multiply(velocity);
        if (v2) {
            v1 = v1.add_new(v2);
        }
        this.current = this.current.add_new(v1);
    }
};


