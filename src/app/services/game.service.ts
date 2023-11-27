import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { mineFeld } from './mineFeld.module';
@Injectable({ providedIn: 'root' })
export class mineGameSerivce {
    mineFelder: mineFeld[][];
    mineCount: number = 0;
    felderCount: number = 0;
    gameOver: boolean;
    won: boolean;
    firstClick: boolean;
    mode: string = 'Mining';
    felderToWin: number = 0;
    difficultySelected = 'easy';

    constructor() {
        this.restart();
    }

    init() {
        this.felderCount = 10;
        for (let i = 0; i < this.felderCount; i++) {
            this.mineFelder[i] = [];
            for (let j = 0; j < this.felderCount; j++) {
                this.mineFelder[i][j] = new mineFeld();
                this.mineFelder[i][j].posX = i;
                this.mineFelder[i][j].posY = j;
                this.mineFelder[i][j].isHidden = true;
            }
        }
    }

    setMine() {
        this.mineCount = 0;
        let count = 0;
        switch (this.difficultySelected) {
            case 'easy':
                count = 5;
                break;
            case 'med':
                count = 15;
                break;
            case 'hard':
                count = 25;
                break;
            default:
                count = 3;
                break;
        }

        while (this.mineCount < count) {
            let row = Math.floor(Math.random() * this.felderCount);
            let col = Math.floor(Math.random() * this.felderCount);
            while (this.mineFelder[row][col].isMine || !this.mineFelder[row][col].isHidden) {
                row = Math.floor(Math.random() * this.felderCount);
                col = Math.floor(Math.random() * this.felderCount);
            }
            this.mineFelder[row][col].isMine = true;
            this.mineCount++;
        }
    }

    checkMines() {
        for (let i = 0; i < this.felderCount; i++) {
            for (let j = 0; j < this.felderCount; j++) {
                this.checkMine(i, j);
            }
        }
    }

    checkMine(i: number, j: number) {
        if (this.mineFelder[i][j].isMine) return;
        //Top-Left
        if (!(i - 1 <= 0) && !(j - 1 < 0)) {
            if (this.mineFelder[i - 1][j - 1].isMine) this.mineFelder[i][j].mineCount++;
        }
        //Top
        if (!(i - 1 < 0)) {
            if (this.mineFelder[i - 1][j].isMine) this.mineFelder[i][j].mineCount++;
        }
        //Top-Right
        if (!(i - 1 < 0) && !(j + 1 > this.felderCount - 1)) {
            if (this.mineFelder[i - 1][j + 1].isMine) this.mineFelder[i][j].mineCount++;
        }
        //Mid-left
        if (!(j - 1 < 0)) {
            if (this.mineFelder[i][j - 1].isMine) this.mineFelder[i][j].mineCount++;
        }
        //Mid-right
        if (!(j + 1 > this.felderCount - 1)) {
            if (this.mineFelder[i][j + 1].isMine) this.mineFelder[i][j].mineCount++;
        }
        //Bot-left
        if (!(i + 1 > this.felderCount - 1) && !(j - 1 < 0)) {
            if (this.mineFelder[i + 1][j - 1].isMine) this.mineFelder[i][j].mineCount++;
        }
        //Bot
        if (!(i + 1 > this.felderCount - 1)) {
            if (this.mineFelder[i + 1][j].isMine) this.mineFelder[i][j].mineCount++;
        }
        //Bot-right
        if (!(i + 1 > this.felderCount - 1) && !(j + 1 > this.felderCount - 1)) {
            if (this.mineFelder[i + 1][j + 1].isMine) this.mineFelder[i][j].mineCount++;
        }
    }

    checkFeld(feld: mineFeld) {
        if (this.gameOver || !feld.isHidden) return;
        else if (feld.isFlag && this.mode != 'Flagging') return;
        // else if(feld.isFlag && this.mode != 'Flagging') return;
        //Check if game is Over
        else if (this.mode == 'Flagging') {
            feld.isFlag = !feld.isFlag;
            return;
        }
        //Check if Mine = gameOver
        else if (feld.isMine) {
            this.revealMines();
            this.gameOver = true;
            return;
        }
        //Display Feld
        else {
            const nachbarn = this.nachbarn(feld);
            feld.isHidden = false;
            feld.background = '#CCCCCC';
            // feld.background = '#b3b3b3';
            feld.isFlag = false;
            this.felderToWin--;
            if (feld.mineCount == 0) {
                nachbarn.forEach(nachbar => {
                    if (!nachbar.isMine) this.checkFeld(nachbar);
                });
            }
            this.checkWin();
        }
    }

    nachbarn(feld: mineFeld) {
        let nachbarFelder = [];
        this.comb.forEach(element => {
            if (feld.posX + element[0] < 0 || feld.posY + element[1] < 0 || feld.posX + element[0] >= this.mineFelder.length || feld.posY + element[1] >= this.mineFelder.length) {
            }
            else nachbarFelder.push(this.mineFelder[feld.posX + element[0]][feld.posY + element[1]]);
        })
        return nachbarFelder;
    }

    setColor() {
        for (let i = 0; i < this.felderCount; i++) {
            for (let j = 0; j < this.felderCount; j++) {
                switch (this.mineFelder[i][j].mineCount) {
                    case 0:
                        this.mineFelder[i][j].color = '#fff';
                        break;
                    case 1:
                        this.mineFelder[i][j].color = '#0275d8';
                        break;
                    case 2:
                        this.mineFelder[i][j].color = '#5cb85c';
                        break;
                    case 3:
                        this.mineFelder[i][j].color = 'red';
                        break;
                    case 4:
                        this.mineFelder[i][j].color = '#292b2c';
                        break;
                    case 5:
                        this.mineFelder[i][j].color = '#283618';
                        break;
                    case 6:
                        this.mineFelder[i][j].color = '#5f0f40';
                        break;
                    case 7:
                        this.mineFelder[i][j].color = '#fb5607';
                        break;
                }
            }
        }
    }



    comb = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 0],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];


    setF(x: number, y: number) {
        if (this.mineFelder[x][y].isMine) return;
        else if (this.mineFelder[x][y].mineCount == 0) {
            this.mineFelder[x][y].isHidden = false;
            this.mineFelder[x][y].background = '#006400';
        }
        else if (this.mineFelder[x][y].mineCount > 0) {
            this.mineFelder[x][y].isHidden = false;
            this.mineFelder[x][y].background = '#006400';
            return;
        }
    }

    restart() {
        this.mineFelder = [];
        this.init();
        this.setMine();
        this.checkMines();
        this.setColor();
        this.felderToWin = (this.felderCount * this.felderCount) - this.mineCount;
        this.gameOver = false;
        this.won = false;
        this.firstClick = true;
    }

    switchMode() {
        this.mode == 'Mining' ? this.mode = 'Flagging' : this.mode = 'Mining';
    }

    revealMines() {
        for (let i = 0; i < this.felderCount; i++) {
            for (let j = 0; j < this.felderCount; j++) {
                if (this.mineFelder[i][j].isMine && this.mineFelder[i][j].isFlag) {
                    this.mineFelder[i][j].isHidden = false;
                    this.mineFelder[i][j].background = '#5cb85c';
                }
                else if (this.mineFelder[i][j].isMine) {
                    this.mineFelder[i][j].isHidden = false;
                    this.mineFelder[i][j].background = '#d90429';
                }
            }
        }
    }

    revealWin() {
        for (let i = 0; i < this.felderCount; i++) {
            for (let j = 0; j < this.felderCount; j++) {
                if (this.mineFelder[i][j].isMine) {
                    this.mineFelder[i][j].isHidden = false;
                    this.mineFelder[i][j].background = '#5cb85c';
                }
            }
        }
    }

    checkWin() {
        if (this.felderToWin == 0) {
            this.gameOver = true;
            this.won = true;
            this.revealWin();
        }
    }
}