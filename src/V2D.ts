class V2D {

	private Posx = 0;
    private Posy = 0;
    public constructor(x: number = 0, y: number = 0) {
        this.Posx = x;
        this.Posy = y;
    }
    public get x(): number {
        return this.Posx;
    }
    public set x(x: number) {
        this.Posx = x;
    }
    public get y(): number {
        return this.Posy;
    }
    public set y(y: number) {
        this.Posy = y;
    }
}