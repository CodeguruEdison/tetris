import { I } from "./Tertrominoes";



/**
 * 
 */ 
 export default class TetrisPiece
 {
    private tetrominos :number[][][];
    private tetroMinoIndex =0;
    private activeTetromino:number[][];
    private x:number;
    private y:number;
    private isReachedBottom =false
     TotalRows = 20;
     TotalColumns = 10;
     EMPTY =0;
     board =[];
     OCCUPIED =1;
    constructor(tetrominos:number[][][],board:any[],TotalRows:number,TotalColumns:number,startingXPos:number){
        this.tetrominos =tetrominos;
        this.activeTetromino= this.tetrominos[this.tetroMinoIndex];
        this.x =startingXPos;
        this.y =-2
        this.board =board;
        this.TotalColumns =TotalColumns;
        this.TotalRows =TotalRows;
        this.isReachedBottom =false;
    }
    moveDown(){
         if(!this.collision(0,1,this.activeTetromino)){
            this.y++;
         }
         else{ 
            // we landed the bottom 
             this.lock();
             this.isReachedBottom =true;
         }
    }
    canMoveDown(){
        return !this.isReachedBottom;
    }
    
    /***
     * check if row is locked
     */
    lock(){
        for(let row =0; row<this.activeTetromino.length; row++){
            for(let column =0; column<this.activeTetromino.length; column++){
                // skip the vacant place
                 if(!this.activeTetromino[row][column]){
                    continue;
                 }
                 // pieces to lock on top = no more row avilable 
                 if(this.y+row < 0){
                     console.log("No more row space available ");
                     break;
                 }
                 const newY = this.y+row;
                 // lock the piece
                 this.board[newY][this.x+column]=this.OCCUPIED;
            }
        }
       this.removeFullRows(this.TotalRows,this.TotalColumns);

    }
    /**
     *  Remove the row, if it is full.
     * @param TotalRows 
     * @param TotalColumns 
     */
    removeFullRows(TotalRows: number,TotalColumns:number): void {
        for(let row = 0; row < TotalRows; row++) {
            let isRowFull =true;
            for(let column = 0; column < TotalColumns; column++){
                isRowFull = isRowFull && (this.board[row][column] !== this.EMPTY);
            }
            if(isRowFull){
                // if the row is full, then delete the full row and move down all the rows above it.
                for(let y =row;y>1;y--){
                    for(let column =0; column <TotalColumns;column++){
                        this.board[y][column] = this.board[y-1][column]
                    }
                }
                // ignore the top row
                for(let column =0; column <TotalColumns; column++){
                    this.board[0][column] = this.EMPTY
                }
            }

        }
    }
    /**
     * find the height of the Tower
     */
    getTowerHeight(){
      let height= this.board.reduce((sum,row:string[])=>{
             if (row.some(item=>Number(item) !== this.EMPTY)){
                 return sum+1   
             }
             else{ 
                 return sum;
             }
         },0);
         return height;
       
    }
 
 /**
  * check if Piece is outside of edge of
  * @param x 
  * @param y 
  * @param tetrisPiece 
  * @returns 
  */
    collision(x:number,y:number,tetrisPiece:any){

        for(let row =0; row<tetrisPiece.length; row++){
            for(let column =0; column<tetrisPiece.length; column++){
                 if(!tetrisPiece[row][column]){
                     continue;
                 }
                 //coordinates of the piece after movement
                 let newX = (this.x +column+x) 
                 let newY = this.y + row+y;
                 // conditions
                  if(newX < 0 || newX >= this.TotalColumns|| newY >= this.TotalRows ){
                      return true;
                  }
                     // skip newY < 0; board[-1] will crush our game
                    if(newY < 0){
                        continue;
                    }
                     // check if there is a locked piece already in place
                if( this.board[newY][newX] !== this.EMPTY){
                    return true;
                }

            }     

        }
        return false;
    }
}