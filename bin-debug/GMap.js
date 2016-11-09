var mapconfig = [
    { x: 0, y: 0, walkable: true, image: "ground_png" },
    { x: 0, y: 1, walkable: true, image: "ground_png" },
    { x: 0, y: 2, walkable: true, image: "ground_png" },
    { x: 0, y: 3, walkable: true, image: "ground_png" },
    { x: 0, y: 4, walkable: true, image: "ground_png" },
    { x: 0, y: 6, walkable: true, image: "ground_png" },
    { x: 0, y: 7, walkable: true, image: "ground_png" },
    { x: 0, y: 8, walkable: true, image: "ground_png" },
    { x: 0, y: 9, walkable: true, image: "ground_png" },
    { x: 1, y: 4, walkable: true, image: "ground_png" },
    { x: 1, y: 6, walkable: true, image: "ground_png" },
    { x: 1, y: 9, walkable: true, image: "ground_png" },
    { x: 2, y: 0, walkable: true, image: "ground_png" },
    { x: 2, y: 1, walkable: true, image: "ground_png" },
    { x: 2, y: 2, walkable: true, image: "ground_png" },
    { x: 2, y: 3, walkable: true, image: "ground_png" },
    { x: 2, y: 4, walkable: true, image: "ground_png" },
    { x: 2, y: 6, walkable: true, image: "ground_png" },
    { x: 2, y: 8, walkable: true, image: "ground_png" },
    { x: 2, y: 9, walkable: true, image: "ground_png" },
    { x: 3, y: 0, walkable: true, image: "ground_png" },
    { x: 3, y: 6, walkable: true, image: "ground_png" },
    { x: 4, y: 0, walkable: true, image: "ground_png" },
    { x: 4, y: 1, walkable: true, image: "ground_png" },
    { x: 4, y: 2, walkable: true, image: "ground_png" },
    { x: 4, y: 3, walkable: true, image: "ground_png" },
    { x: 4, y: 4, walkable: true, image: "ground_png" },
    { x: 4, y: 6, walkable: true, image: "ground_png" },
    { x: 4, y: 5, walkable: true, image: "ground_png" },
    { x: 4, y: 7, walkable: true, image: "ground_png" },
    { x: 4, y: 8, walkable: true, image: "ground_png" },
    { x: 4, y: 9, walkable: true, image: "ground_png" },
    { x: 5, y: 3, walkable: true, image: "ground_png" },
    { x: 5, y: 9, walkable: true, image: "ground_png" },
    { x: 6, y: 0, walkable: true, image: "ground_png" },
    { x: 6, y: 1, walkable: true, image: "ground_png" },
    { x: 6, y: 2, walkable: true, image: "ground_png" },
    { x: 6, y: 3, walkable: true, image: "ground_png" },
    { x: 6, y: 4, walkable: true, image: "ground_png" },
    { x: 6, y: 5, walkable: true, image: "ground_png" },
    { x: 6, y: 6, walkable: true, image: "ground_png" },
    { x: 6, y: 7, walkable: true, image: "ground_png" },
    { x: 6, y: 9, walkable: true, image: "ground_png" },
    { x: 7, y: 0, walkable: true, image: "ground_png" },
    { x: 7, y: 4, walkable: true, image: "ground_png" },
    { x: 7, y: 6, walkable: true, image: "ground_png" },
    { x: 7, y: 9, walkable: true, image: "ground_png" },
    { x: 8, y: 0, walkable: true, image: "ground_png" },
    { x: 8, y: 2, walkable: true, image: "ground_png" },
    { x: 8, y: 4, walkable: true, image: "ground_png" },
    { x: 8, y: 6, walkable: true, image: "ground_png" },
    { x: 8, y: 7, walkable: true, image: "ground_png" },
    { x: 8, y: 8, walkable: true, image: "ground_png" },
    { x: 8, y: 9, walkable: true, image: "ground_png" },
    { x: 9, y: 0, walkable: true, image: "ground_png" },
    { x: 9, y: 2, walkable: true, image: "ground_png" },
    { x: 9, y: 3, walkable: true, image: "ground_png" },
    { x: 9, y: 4, walkable: true, image: "ground_png" },
    { x: 9, y: 6, walkable: true, image: "ground_png" },
    { x: 0, y: 5, walkable: false, image: "wall_png" },
    { x: 1, y: 0, walkable: false, image: "wall_png" },
    { x: 1, y: 1, walkable: false, image: "wall_png" },
    { x: 1, y: 2, walkable: false, image: "wall_png" },
    { x: 1, y: 3, walkable: false, image: "wall_png" },
    { x: 1, y: 5, walkable: false, image: "wall_png" },
    { x: 1, y: 7, walkable: false, image: "wall_png" },
    { x: 1, y: 8, walkable: false, image: "wall_png" },
    { x: 2, y: 5, walkable: false, image: "wall_png" },
    { x: 2, y: 7, walkable: false, image: "wall_png" },
    { x: 3, y: 1, walkable: false, image: "wall_png" },
    { x: 3, y: 2, walkable: false, image: "wall_png" },
    { x: 3, y: 3, walkable: false, image: "wall_png" },
    { x: 3, y: 4, walkable: false, image: "wall_png" },
    { x: 3, y: 5, walkable: false, image: "wall_png" },
    { x: 3, y: 7, walkable: false, image: "wall_png" },
    { x: 3, y: 8, walkable: false, image: "wall_png" },
    { x: 3, y: 9, walkable: false, image: "wall_png" },
    { x: 4, y: 4, walkable: false, image: "wall_png" },
    { x: 5, y: 0, walkable: false, image: "wall_png" },
    { x: 5, y: 1, walkable: false, image: "wall_png" },
    { x: 5, y: 2, walkable: false, image: "wall_png" },
    { x: 5, y: 4, walkable: false, image: "wall_png" },
    { x: 5, y: 5, walkable: false, image: "wall_png" },
    { x: 5, y: 6, walkable: false, image: "wall_png" },
    { x: 5, y: 7, walkable: false, image: "wall_png" },
    { x: 5, y: 8, walkable: false, image: "wall_png" },
    { x: 6, y: 8, walkable: false, image: "wall_png" },
    { x: 7, y: 1, walkable: false, image: "wall_png" },
    { x: 7, y: 2, walkable: false, image: "wall_png" },
    { x: 7, y: 3, walkable: false, image: "wall_png" },
    { x: 7, y: 5, walkable: false, image: "wall_png" },
    { x: 7, y: 7, walkable: false, image: "wall_png" },
    { x: 7, y: 8, walkable: false, image: "wall_png" },
    { x: 8, y: 1, walkable: false, image: "wall_png" },
    { x: 8, y: 3, walkable: false, image: "wall_png" },
    { x: 8, y: 5, walkable: false, image: "wall_png" },
    { x: 9, y: 1, walkable: false, image: "wall_png" },
    { x: 9, y: 5, walkable: false, image: "wall_png" },
    { x: 9, y: 7, walkable: false, image: "wall_png" },
    { x: 9, y: 8, walkable: false, image: "wall_png" },
    { x: 9, y: 9, walkable: false, image: "wall_png" },
];
var GMap = (function (_super) {
    __extends(GMap, _super);
    function GMap() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=GMap,p=c.prototype;
    p.init = function () {
        for (var i = 0; i < mapconfig.length; i++) {
            var data = mapconfig[i];
            var tile = new MapTile(data);
            this.addChild(tile);
        }
    };
    GMap.tilesize = 64;
    return GMap;
}(egret.DisplayObjectContainer));
egret.registerClass(GMap,'GMap');
var MapTile = (function (_super) {
    __extends(MapTile, _super);
    function MapTile(data) {
        _super.call(this);
        this.init(data);
    }
    var d = __define,c=MapTile,p=c.prototype;
    p.init = function (data) {
        this.x = data.x * GMap.tilesize;
        this.y = data.y * GMap.tilesize;
        this.walkable = data.walkable;
        this.image = data.image;
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(this.image);
        this.addChild(bitmap);
    };
    return MapTile;
}(egret.DisplayObjectContainer));
egret.registerClass(MapTile,'MapTile');
//# sourceMappingURL=GMap.js.map