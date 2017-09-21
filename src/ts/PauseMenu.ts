import {Menu} from './Menu';

export class PauseMenu extends Menu {
    private m_pause:boolean;

    constructor(ctx:any, x:number, y:number, w:number, h:number) {
        super(ctx, x, y, w, h);   
        
        // si this.m_pause = true alors le menu de pause est désactivé
        this.m_pause = true;
    }    

    public eventPause() {
        window.addEventListener("keyup", (e) => {
            if(e.keyCode == 27) {
                this.m_pause = !this.m_pause;
            }
        });        
    }

    public hidePauseMenu() {
        this.m_pause = true;
    }

    public showPauseMenu() {
        this.m_pause = false;
    }

    get statePause() {
        return this.m_pause;
    }
}