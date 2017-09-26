import {MainMenu} from './MainMenu';
import {PauseMenu} from './PauseMenu';
import {Hitbox} from './Hitbox';
import {Button} from './Button';
import {Racket} from './Racket';
import {Ball} from './Ball';
import {Brick} from './Brick';

(() => {
    let canvas = <HTMLCanvasElement> document.getElementById("canvas");
    let context = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let event = new Event('state');
    let stateMachine:any = "state2";

    let requestAnimFrame;

    // initialisation du menu principal
    let menu = new MainMenu(context, 0, 0, canvasWidth, canvasHeight);

    // initialisation des boutons du menu principal
    let buttons = new Array(3);

    for(let i = 0; i < buttons.length; i++) {
        buttons[i] = new Button({
            ctx: context,
            name: "state"+(i+1),
            color: "#ffffff",
            background: "#ff0000"
        });
    }

    //initialisation du menu pause
    let pause = new PauseMenu(context, (canvasWidth * .5) - 150, (canvasHeight * .5) - 250, 300, 500);
    // initialisation des events du menu pause
    pause.eventPause();     

    // initialisation des boutons du menu pause
    let btnPauses = new Array(2);              
    
    for(let i = 0; i < btnPauses.length; i++){  
        btnPauses[i] = new Button({
            ctx: context,
            name: i == 0 ? "state0" :"state"+(i+1),
            color: "#ffffff",
            background: "#000"
        });
    }

    //init des bricks
    let bricks = Array();

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 5; j++) {
            bricks.push(new Brick(context, (105 * i) + ((canvasWidth * .5) - (105 * 5)), (55 * j) + 50, 100, 50));
        }        
    }

    //init de la racket
    let racket = new Racket(context, (canvasWidth * .5) - 100, canvasHeight - 10, 200, 7);
    racket.keyBoardEvent();

    //init de la ball
    let ball = new Ball(context, (canvasWidth * .5), canvasHeight - 20);

    canvas.addEventListener("click", (e) => {
        switch(stateMachine) {
            case "state1" :
                app.clickEvents.clickBtnPauseMenu(e);
            break;

            case "state2" :
                app.clickEvents.clickBtnMainMenu(e);
            break;

            default:
            break;
        }             
    }, false);

    let app = {
        initMainMenu: () => {    
            menu.drawMenu();
            
            for(let i = 0; i < buttons.length; i++) {                       
                switch(i) {
                    case 0: 
                        buttons[i].drawButton(
                            "JOUER", 
                            canvasWidth * .5, 
                            ((canvasHeight * .5) - ((55 * 3) * .5) + i * 55) + 27.5, 
                            (canvasWidth * .5) - 100,
                            (canvasHeight * .5) - ((55 * 3) * .5) + i * 55,
                            200,
                            50
                        );            
                    break;
            
                    case 1: 
                        buttons[i].drawButton(
                            "MEILLEURES SCORES", 
                            canvasWidth * .5, 
                            ((canvasHeight * .5) - ((55 * 3) * .5) + i * 55) + 27.5,
                            (canvasWidth * .5) - 100,
                            (canvasHeight * .5) - ((55 * 3) * .5) + i * 55,
                            200,
                            50
                        );
                    break;
                    
                    case 2:
                        buttons[i].drawButton(
                            "OPTIONS", 
                            canvasWidth * .5, 
                            ((canvasHeight * .5) - ((55 * 3) * .5) + i * 55) + 27.5,
                            (canvasWidth * .5) - 100,
                            (canvasHeight * .5) - ((55 * 3) * .5) + i * 55,
                            200,
                            50
                        );
                    break;
            
                    default:
                    break;
                }
            }                                           
        },
        initGameLoop: () => {     
            let counter = 3;    
            let temp = 1;
            let i = 0;
              
            let gameLoop = () => {
                
                if(pause.statePause) {
                    // Le jeu commence ici                   
                    context.clearRect(0, 0, canvasWidth, canvasHeight);                     
                    //console.log(ball.angle);

                    bricks.map((obj) => obj.drawBrick());

                    racket.drawRacket();
                    racket.moveRacket();

                    ball.drawBall();
                    ball.moveBall();                                                               
                    
                    if(ball.ballX <= 0 || (ball.ballX + ball.ballW) >= canvasWidth) {
                        ball.verticalRebound();                 
                    }

                    if(ball.ballY <= 0) {
                        ball.horizontalRebound();
                    }

                    if(((ball.ballY + ball.ballH) >= racket.racketY) && (ball.ballX >= racket.racketX) && ((ball.ballX + ball.ballW) <= (racket.racketX + racket.racketW))) {    
                        if(ball.ballX > (racket.racketX + (racket.racketW * .5))) {
                            temp = Math.round(Math.abs(racket.racketW - (ball.ballX - racket.racketX)));
                        } else {
                            temp = Math.round(Math.abs(ball.ballX - racket.racketX));
                        }                                    

                        temp = (temp * 100) / racket.racketW; 
                        ball.setAngle = Math.round(temp * Math.PI);
                       
                        ball.horizontalRebound();                        
                        counter--;

                        if(counter == 0) {
                            ball.upSpeed();
                            counter = 3
                        }                        
                    }

                    for(i = 0; i < bricks.length; i++) {
                        if((ball.ballX + ball.ballW) >= bricks[i].brickX && ball.ballX <= (bricks[i].brickX + bricks[i].brickW) && (ball.ballY + ball.ballH) > bricks[i].brickY && ball.ballY <= (bricks[i].brickY + bricks[i].brickH)) {                                                  
                            switch(true) {
                                case (ball.ballX > bricks[i].brickX && (ball.ballX + ball.ballW) < (bricks[i].brickX + bricks[i].brickW)):                                
                                    ball.horizontalRebound();
                                break;

                                case ((ball.ballY + ball.ballH) > bricks[i].brickY && ball.ballY < (bricks[i].brickY + bricks[i].brickH)):
                                    ball.verticalRebound();
                                break;

                                default:
                                break;
                            }

                            bricks.splice(i, 1);                                                
                        }
                    }
                } else {
                    pause.drawMenu("#3e5481");

                    for(let i = 0; i < btnPauses.length; i++) {
                        switch(i) {
                            case 0: 
                            btnPauses[i].drawButton(
                                "REPRENDRE", 
                                btnPauses[i].xButton + (btnPauses[i].wButton* .5), 
                                (btnPauses[i].yButton + 2.5) + (btnPauses[i].hButton * .5),
                                (canvasWidth * .5) - 100,
                                (canvasHeight * .5) - ((55 * 3) * .5) + i * 55,
                                200,
                                50
                            );            
                            break;
                    
                            case 1: 
                            btnPauses[i].drawButton(
                                "MENU PRINCIPAL", 
                                btnPauses[i].xButton + (btnPauses[i].wButton* .5), 
                                (btnPauses[i].yButton + 2.5) + (btnPauses[i].hButton * .5),
                                (canvasWidth * .5) - 100,
                                (canvasHeight * .5) - ((55 * 3) * .5) + i * 55,
                                200,
                                50
                            );
                            break;                    
                    
                            default:
                            break;
                        }
                    }                    
                }                        

                requestAnimFrame = window.requestAnimationFrame(gameLoop);
            }

            gameLoop();
        },
        clickEvents: {
            clickBtnMainMenu: (e) => {
                let name:any = false;
                
                for(let i = 0; i < buttons.length; i++){                    
                    name = buttons[i].eventClickBtn(e.clientX, e.clientY, buttons[i].xButton, buttons[i].wButton, buttons[i].yButton, buttons[i].hButton, buttons[i].nameButton);

                    if(name) {  
                        stateMachine = name;
                        window.dispatchEvent(event);                                           
                        break;
                    }
                } 
            },
            clickBtnPauseMenu: (e) => {
                let name:any = false;
                
                //si pause.statePause est égale à false alors le jeu est en pause                       
                if(pause.statePause == false) {
                    for(let i = 0; i < btnPauses.length; i++){                                                           
                        name = btnPauses[i].eventClickBtn(e.clientX, e.clientY, btnPauses[i].xButton, btnPauses[i].wButton, btnPauses[i].yButton, btnPauses[i].hButton, btnPauses[i].nameButton);
                        
                        if(name) {  
                            if(name == "state0") {
                                pause.hidePauseMenu();
                                break;
                            } else {                         
                                stateMachine = name;
                                pause.hidePauseMenu();
                                cancelAnimationFrame(requestAnimFrame);
                                window.dispatchEvent(event);                                           
                                break;  
                            }                                                                                       
                        }
                    }  
                }
            }
        }
    }

    window.addEventListener("state", () => {
        switch(stateMachine) {
            case "state1":              
                app.initGameLoop();
            break;

            case "state2":
                app.initMainMenu();                
            break;

            case "state3":            
            break;

            default:
            break;
        }        
    }, false);    

    window.addEventListener("load", () => {
        app.initMainMenu();
    }, false);
})();