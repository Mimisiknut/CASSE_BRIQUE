export class Menu {
    protected ctx;
    protected x;
    protected y;
    protected w;
    protected h;

    constructor(ctx:any, x:number, y:number, w:number, h:number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public drawMenu(background:string = "#000") {
        this.ctx.fillStyle = background;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}