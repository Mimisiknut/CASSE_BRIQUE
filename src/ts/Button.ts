interface ButtonOptions {
    ctx:any,
    name:string,
    color:string,
    background:string    
}

export class Button {
    private options:ButtonOptions;
    private x:number;
    private y:number;
    private w:number;
    private h:number;

    constructor(options:ButtonOptions) {
        this.options = options;
    }

    public drawButton(txt, xTxt, yTxt, x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.options.ctx.fillStyle = this.options.background;
        this.options.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.options.ctx.fillStyle = this.options.color;
        this.options.ctx.font = "10px Arial";
        this.options.ctx.textAlign = "center";
        this.options.ctx.fillText(txt, xTxt, yTxt);
    }

    public eventClickBtn(pointerX:number, pointerY:number, x:number, w:number, y:number, h:number, name:string) {
        if((pointerX > x && pointerX < (x+w)) && (pointerY > y && pointerY < (y+h))) {
            return name;
        } else {
            return false;
        }
    }

    get xButton() {
        return this.x;
    }

    get yButton() {
        return this.y;
    }

    get wButton() {
        return this.w;
    }

    get hButton() {
        return this.h;
    }

    get nameButton() {
        return this.options.name;
    }
}