class Board {
    grid:any[][];
    constructor(private Rows:number,private Columns:number,private Empty:number){
        this.grid =this.getEmptyBoard();
        
    }
    getEmptyBoard(){
        return Array.from({length:this.Rows},()=>Array(this.Columns).fill(this.Empty));
    }
}
export default Board;