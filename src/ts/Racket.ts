export class Racket {
    private m_ctx:any;
    private m_x:number;
    private m_y:number;
    private m_w:number;
    private m_h:number;    
    private m_speed:number
    private m_left:boolean;
    private m_right:boolean;

    constructor(ctx, x, y, w, h) {
        this.m_ctx = ctx;
        this.m_x = x;
        this.m_y = y;
        this.m_w = w;
        this.m_h = h;
        this.m_speed = 15;
        this.m_left = false;
        this.m_right = false;
    }

    public keyBoardEvent() {
        window.addEventListener("keydown", (e) => {
            switch(e.keyCode) {
                case 37:
                    this.m_left = true;
                break;

                case 39:
                    this.m_right = true;
                break;
            }
        }, false);

        window.addEventListener("keyup", (e) => {
            switch(e.keyCode) {
                case 37:
                    this.m_left = false;
                break;

                case 39:
                    this.m_right = false;
                break;
            }
        }, false);
    }

    public drawRacket() {
        this.m_ctx.fillStyle = "#000000";
        this.m_ctx.fillRect(this.m_x, this.m_y, this.m_w, this.m_h);
    }

    public reset(x:number, y:number) {
        this.m_x = x;
        this.m_y = y;
    }

    public moveRacket() {
        this.m_ctx.fillStyle = "#000000";
        
        if(this.m_left) {
            if(this.m_x > 0) {
                this.m_ctx.fillRect(this.m_x -= this.m_speed, this.m_y, this.m_w, this.m_h);
            } else {
                this.m_ctx.fillRect(0, this.m_y, this.m_w, this.m_h);
            }            
        }

        if(this.m_right) {
            if((this.m_x + this.m_w) < window.innerWidth) {
                this.m_ctx.fillRect(this.m_x += this.m_speed, this.m_y, this.m_w, this.m_h);
            } else {
                this.m_ctx.fillRect(window.innerWidth - this.m_w, this.m_y, this.m_w, this.m_h);
            }            
        }        
    }

    get racketX() {
        return this.m_x;
    }

    get racketY() {
        return this.m_y;
    }

    get racketW() {
        return this.m_w;
    }

    get racketH() {
        return this.m_h;
    }
}