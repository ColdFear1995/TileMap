class Animation {

	timePass:number;
	fps = 24;
	textureList = [];
	curF:number;
	bitmap:egret.Bitmap;

	public constructor(anime:any,bitmap:egret.Bitmap,fps:number) {

		this.textureList = anime;
		this.bitmap = bitmap;
		this.fps = fps;
		this.timePass = 0;
		this.curF = 0;

	}

	public playCur(timePass:number) {

		this.timePass += timePass;

		if(this.timePass >= 1000/this.fps) {

			this.timePass -= (1000/this.fps);
			this.curF = (++this.curF) % this.textureList.length;
			this.bitmap.texture = RES.getRes(this.textureList[this.curF]);
		}
	}

	public playTarget(target:string,timePass:number) {

		this.timePass += timePass;
		if(this.timePass >= 1000/this.fps) {

			this.timePass -= (1000/this.fps);
			var list = this.textureList[target];

			if(this.curF < list.length) {

				this.bitmap.texture = RES.getRes(list[this.curF]);
				this.curF++;
			}
		}
	}

}