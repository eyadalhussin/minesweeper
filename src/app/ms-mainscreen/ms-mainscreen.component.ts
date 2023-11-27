import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mineGameSerivce } from '../services/game.service';

@Component({
  selector: 'app-ms-mainscreen',
  templateUrl: './ms-mainscreen.component.html',
  styleUrls: ['./ms-mainscreen.component.css']
})

export class MsMainscreenComponent implements OnInit {

  diffSelected: string = "";

  constructor(private router:Router, private activatedRoute: ActivatedRoute, private minegame:mineGameSerivce) { }

  ngOnInit(): void {
    this.diffSelected = 'easy';
    this.minegame.difficultySelected = 'easy';
  }

  start(){
    this.minegame.restart();
    this.router.navigate(['msgame'],{relativeTo:this.activatedRoute});
  }

  selectDiff(diff:string){
    this.diffSelected = diff;
    this.minegame.difficultySelected = diff;
  }

}
