var V2D = (function () {
    function V2D(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.Posx = 0;
        this.Posy = 0;
        this.Posx = x;
        this.Posy = y;
    }
    var d = __define,c=V2D,p=c.prototype;
    d(p, "x"
        ,function () {
            return this.Posx;
        }
        ,function (x) {
            this.Posx = x;
        }
    );
    d(p, "y"
        ,function () {
            return this.Posy;
        }
        ,function (y) {
            this.Posy = y;
        }
    );
    return V2D;
}());
egret.registerClass(V2D,'V2D');
//# sourceMappingURL=V2D.js.map