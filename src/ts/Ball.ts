export class Ball {
    private m_ctx:any;
    private m_x:number;
    private m_y:number;
    private m_w:number;
    private m_h:number;
    private m_radius:number
    private m_speed:number;
    private m_angle:number;

    constructor(ctx, x, y) {
        this.m_ctx = ctx;
        this.m_x = x;
        this.m_y = y;
        this.m_radius = 9;
        this.m_speed = 5;
        this.m_angle = -25;
    }

    public drawBall() {
        this.m_ctx.beginPath();
        this.m_ctx.fillStyle="#FF4422"
        this.m_ctx.arc(this.m_x, this.m_y, this.m_radius, 0, 2 * Math.PI);
        this.m_ctx.fill();

    }

    public horizontalRebound() {
        this.m_angle = 360 - this.m_angle;
    }

    public verticalRebound() {
        this.m_angle = 180 - this.m_angle;
    }

    public moveBall() {
        let temp = (Math.PI * this.m_angle) / 180; 
        this.m_x += Math.round(this.m_speed * Math.cos(temp));
        this.m_y += Math.round(this.m_speed * Math.sin(temp));
    }

    public upSpeed() {
        if(this.m_speed < 20) {
            this.m_speed += 1;
        } else {
            this.m_speed = 20;
        }        
    }

    get ballX() {
        return this.m_x - this.m_radius;
    }

    get ballY() {
        return this.m_y - this.m_radius;
    }

    get ballW() {
        return this.m_radius * 2;
    }

    get ballH() {
        return this.m_radius * 2;
    }    

    get angle() {
        return  this.m_angle;
    }

    set setAngle(value:number) {
        this.m_angle = value;
    }
}