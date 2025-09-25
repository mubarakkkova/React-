function runA1() {
    console.clear();
    console.log("Running A1 — Prototypes");

    function Shape() {}
    Shape.prototype.getArea = function () { return 0; };
    Shape.prototype.describe = function () { return "Shape"; };


    function Rectangle(width, height) {
        Shape.call(this);
        this.width = width;
        this.height = height;  
    }

    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    Rectangle.prototype.getArea = function() { 
        return this.width * this.height;}

    Rectangle.prototype.describe = function() {
        const base = Shape.prototype.describe.call(this);
        return `${base} Rectangle ${this.width}x${this.height}`;
    }
    function Square(side) {
        Rectangle.call(this, side, side);
    }
    Square.prototype = Object.create(Rectangle.prototype);
    Square.prototype.constructor = Square;
    Square.prototype.describe = function() {
        const base = Rectangle.prototype.describe.call(this);
        return `${base} Square side=${this.width}`;
    }

    try {
        const r1 = new Rectangle(3, 4);
        const r2 = new Rectangle(5, 6);
        const sq = new Square(4);

        console.log("r1 area =", r1.getArea(), "(expect 12)");
        console.log("r2 area =", r2.getArea(), "(expect 30)");
        console.log("sq area =", sq.getArea(), "(expect 16)");

        
        console.log("shared getArea on Rectangle:", r1.getArea === r2.getArea, "(expect true)");

        console.log("Shape in chain (sq):", Shape.prototype.isPrototypeOf(sq), "(expect true)");
        console.log("Rectangle in chain (sq):", Rectangle.prototype.isPrototypeOf(sq), "(expect true)");

        console.log("sq.constructor === Square:", sq.constructor === Square, "(expect true)");
        console.log("r1.constructor === Rectangle:", r1.constructor === Rectangle, "(expect true)");


        console.log("r1.describe():", r1.describe(), '(expect includes "Shape" and "Rectangle 3x4")');
        console.log("sq.describe():", sq.describe(), '(expect includes "Rectangle 4x4" and "Square side=4")');

    } catch (e) {
        console.log("Runtime error:", e.message);
    }
}
runA1();