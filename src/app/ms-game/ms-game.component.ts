import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mineGameSerivce } from '../services/game.service';
import { mineFeld } from '../services/mineFeld.module';
@Component({
  selector: 'app-ms-game',
  templateUrl: './ms-game.component.html',
  styleUrls: ['./ms-game.component.css']
})
export class MsGameComponent implements OnInit {

  mineFelder;
  mode:string;
  felderToWin:number;
  won:boolean;
  gameOver:boolean;
  mineCount:number;
  timerStarted:boolean;
  minutes:number;
  seconds:number;
  intervall;


  constructor(private mineGame:mineGameSerivce,private router:Router, private activRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.mineFelder = this.mineGame.mineFelder;
    this.mode = this.mineGame.mode;
    this.mineCount = this.mineGame.mineCount;
    this.timerStarted = false;
    this.minutes = 0;
    this.seconds = 0;    
  }

  checkFeld(feld:mineFeld){
    if(!this.timerStarted) {
      this.timerStarted = true;
      this.intervall = setInterval(() => {
        this.seconds++;
        if(this.seconds == 60){
          this.minutes++;
          this.seconds = 0;
        }
      },1000);
    }
    this.mineGame.checkFeld(feld);
    this.felderToWin = this.mineGame.felderToWin;
    this.won = this.mineGame.won;
    this.gameOver = this.mineGame.gameOver;
    if(this.gameOver) clearInterval(this.intervall);
  }

  switchMode(){
    if(this.gameOver) return;
    this.mineGame.switchMode();
    this.mode = this.mineGame.mode;
  }

  restart(){
    clearInterval(this.intervall);
    this.seconds = 0;
    this.minutes = 0;
    this.timerStarted = false;
    this.mineGame.restart();
    this.mineFelder = this.mineGame.mineFelder;
    this.mineCount = this.mineGame.mineCount;
    this.won = false;
    this.gameOver = false;
  }

  startTimer(){
    this.seconds++;
  }

  back(){
    let confirm = window.confirm("Are you sure to go back ?");
    if(confirm){
      this.restart();
      this.router.navigate(['../'],{relativeTo:this.activRoute});
    }
    else{
      return;
    }
  }

}
