import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { RouterModule, Routes } from '@angular/router';
import { MsMainscreenComponent } from './ms-mainscreen/ms-mainscreen.component';
import { MsGameComponent } from './ms-game/ms-game.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const appRoutes:Routes = [
  {path:'',component:MinesweeperComponent, children: [
    {path:'',component:MsMainscreenComponent},
    {path:'msgame',component:MsGameComponent}
  ]},
]

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    MsMainscreenComponent,
    MsGameComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
