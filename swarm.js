/* global document: false */
'use strict';

$(function () {
    /* global document, Canvas */
    var canvas = new Canvas($('canvas')[0]),
        cloth = new Swarm(canvas),
        inputs = {},
        point,
        key_down,
        mouse_down,
        mouse,
        position = function (event) {
            return canvas.adjust({
                x: event.page.x,
                y: event.page.y
            });
        },
        setPoint = function (inv_mass) {
            if (!point) {
                return;
            }
            if (mouse) {
                point.setCurrent(mouse);
                point.setPrevious(mouse);
            }
            point.inv_mass = inv_mass;
        };
   /*  
    document.addEvents({
        'keydown': function (event) {
            key_down = true;
        },
            
        'keyup': function () {
            key_down = false;
        },
                
        'mousedown': function (event) {
            mouse_down = true;
            mouse = position(event);
                    
            if (!mouse) {
                return;
            }

            point = cloth.getClosestPoint(mouse);
            setPoint(0);
        },
    
        'mouseup': function (event) {
            mouse_down = false;
            if (mouse) {
                setPoint(key_down ? 0 : 1);
            }
        },
        
        'mousemove': function (event) {
            if (!mouse_down) {
                return;
            }
                   
            mouse = position(event);
            setPoint(mouse ? 0 : 1);
        }
    });
    */
    //document.getElements('input').each(function (input) {
    //    inputs[input.getProperty('id')] = input;
    //});
    
    //inputs.points.addEvent('click', cloth.togglePoints.bind(cloth));
    //inputs.constraints.addEvent('click', cloth.toggleConstraints.bind(cloth));
    
    //cloth.draw_points = inputs.points.checked;
    //cloth.draw_constraints = inputs.constraints.checked;
    
    setInterval(cloth.update.bind(cloth), 35);
});

var Swarm = function (canvas) {
    
    var i,
        p;
    this.nPoints = 50;
    this.canvas = canvas;
    this.points = [];
    this.wayPoint = new Point(this.canvas, 100, 100);

    for (i = 0; i < this.nPoints; i += 1) {
        p = new Point(this.canvas, 400 + Math.random() * 100, 500 + Math.random() * 100);
        this.points[i] = p;
    }

};

Swarm.prototype = {
    
    update: function () {
        var i = 0, nearest;

        this.canvas.clear();
        
        //move each point 
        for (i = 0; i < this.nPoints; i += 1) {
            nearest = this.nearestNeighbor(i);
            //console.log(nearest);
            this.points[i].move(this.wayPoint.current, nearest);
        }

        //draw points
        for (i = 0; i < this.nPoints; i += 1) {
            this.points[i].draw(this.canvas);
        }
        //var p = new Point(100, 100);
        //this.canvas.circle(p.getCurrent(), 50);
        //this.canvas.ctx.arc(100, 100, 10, 0, Math.PI * 2, false);
    },

    nearestNeighbor: function (index) {
        var i = 0,
            minD = 1e6,
            nearest,
            p1 = this.points[index],
            v;

        for (i = 0; i < this.nPoints; i += 1) {
            if (i !== index) {
                var v = p1.current.subtract_new(this.points[i].current);
                //console.log(v);
                if (v.squaredLength() < minD) {
                    minD = v.squaredLength();
                    nearest = this.points[i].current;
                }
            }
        }
        return nearest;
    }
};
