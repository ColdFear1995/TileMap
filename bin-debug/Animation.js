var Animation = (function () {
    function Animation(anime, bitmap, fps) {
        this.fps = 24;
        this.textureList = [];
        this.textureList = anime;
        this.bitmap = bitmap;
        this.fps = fps;
        this.timePass = 0;
        this.curF = 0;
    }
    var d = __define,c=Animation,p=c.prototype;
    p.playCur = function (timePass) {
        this.timePass += timePass;
        if (this.timePass >= 1000 / this.fps) {
            this.timePass -= (1000 / this.fps);
            this.curF = (++this.curF) % this.textureList.length;
            this.bitmap.texture = RES.getRes(this.textureList[this.curF]);
        }
    };
    p.playTarget = function (target, timePass) {
        this.timePass += timePass;
        if (this.timePass >= 1000 / this.fps) {
            this.timePass -= (1000 / this.fps);
            var list = this.textureList[target];
            if (this.curF < list.length) {
                this.bitmap.texture = RES.getRes(list[this.curF]);
                this.curF++;
            }
        }
    };
    return Animation;
}());
egret.registerClass(Animation,'Animation');
//# sourceMappingURL=Animation.js.map