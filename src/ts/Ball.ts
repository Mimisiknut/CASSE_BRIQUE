export class Ball {
    private m_ctx:any;
    private m_x:number;
    private m_y:number;
    private m_w:number;
    private m_h:number;
    private m_radius:number
    private m_speed:number;
    private m_angle:number;
    private m_start:boolean;
    private m_angleMax:boolean;
    private m_angleTemp:number;
    private m_life:number;

    constructor(ctx, x, y) {
        this.m_ctx = ctx;
        this.m_x = x;
        this.m_y = y;
        this.m_radius = 9;
        this.m_speed = 10;
        this.m_angle = -150;
        this.m_start = false;
        this.m_angleMax = true;
        this.m_life = 3;
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

    public start() {
        window.addEventListener('keyup', (e) => {
            if(e.keyCode == 32) {
                this.m_start = true;
            }
        }, false);
    }

    public definedAngle() {
        if(!this.m_start) {
            if(this.m_angle >= -25) {
                this.m_angleMax = false;
            } else if(this.m_angle <= -150) {
                this.m_angleMax = true;
            }

            if(this.m_angleMax) {
                this.m_angle++;
            } else {
                this.m_angle--;
            }  
            
            console.log(this.m_angle);
        }                
    }

    public moveBall() {
        if(this.m_start) {
            this.m_angleTemp = (Math.PI * this.m_angle) / 180; 
            this.m_x += Math.round(this.m_speed * Math.cos(this.m_angleTemp));
            this.m_y += Math.round(this.m_speed * Math.sin(this.m_angleTemp));
        }
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