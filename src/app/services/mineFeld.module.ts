export class mineFeld{
    mineCount:number;
    isHidden:boolean;
    isMine:boolean;
    isFlag:boolean;
    color: string;
    background:string;
    posX:number;
    posY:number;

    constructor(){
        this.mineCount = 0;
        this.isHidden = true;
        this.isMine = false;
        this.isFlag = false;
        this.color = '#fff';
        this.background = '#002586';
        this.posX = 0;
        this.posY = 0;
    }
}