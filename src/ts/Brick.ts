export class Brick {
    private m_ctx:any;
    private m_x:number;
    private m_y:number;
    private m_w:number;
    private m_h:number;
    private m_state:string;
    private m_bonus:number;

    constructor(ctx, x, y, w, h) {
        this.m_ctx = ctx; 
        this.m_x = x;
        this.m_y = y;
        this.m_w = w;
        this.m_h = h;       
        this.m_state = "state1";
        this.m_bonus = 0;
    }

    public drawBrick() {        
        this.m_ctx.fillStyle = "#000";
        this.m_ctx.fillRect(this.m_x, this.m_y, this.m_w, this.m_h);
    }

    get brickX() {
        return this.m_x;
    }

    get brickY() {
        return this.m_y;
    }

    get brickW() {
        return this.m_w;
    }

    get brickH() {
        return this.m_h;
    }
}