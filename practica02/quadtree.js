class Point {
    constructor(x, y, userData) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }
}
class Rectangle {
    constructor(x, y, w, h) {
        this.x = x; // center
        this.y = y;
        this.w = w; // half width
        this.h = h; // half height
    }
    // verifica si este objeto contiene un objeto Punto
    contains(point) {
        if(point.x <= this.x + this.w && point.x >= this.x - this.w)
            if(point.y <= this.y + this.h && point.y >= this.y - this.h)
                return true;
        return false;
        
    }
    // verifica si este objeto se intersecta con otro objeto Rectangle
    intersects(range) {
        return !(range.x - range.w > this.x + this.w || 
                range.x + range.w < this.x - this.w ||
                range.y - range.h >  this.y + this.h ||
                range.y + range.h < this.y - this.h)
    }
}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary; // Rectangle
        this.capacity = n; // capacidad maxima de cada cuadrante
        this.points = []; // vector , almacena los puntos a almacenar
        this.divided = false;
        this.northwest;
        this.northeast;
        this.southwest;
        this.southeast;
    }
    // divide el quadtree en 4 quadtrees
    subdivide() {
        this.northwest =new QuadTree(new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2), this.capacity);
        this.northeast =new QuadTree(new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2), this.capacity);
        this.southwest =new QuadTree(new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2), this.capacity);
        this.southeast =new QuadTree(new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2), this.capacity);

        this.divided = true;

        
    }
    insert(point) {
        if(!this.boundary.contains(point)){
            return;
        }
        if(this.points.length < this.capacity){
            this.points.push(point);
        }
        else{
            if(!this.divided)
                this.subdivide();
            this.northwest.insert(point);
            this.northeast.insert(point);
            this.southwest.insert(point);
            this.southeast.insert(point);
        }
        
    }
    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        if (this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }
        for (let p of this.points) {
            strokeWeight(4);
            point(p.x, p.y);
        }

    }
}