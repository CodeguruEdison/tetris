import { I, J, L, Q, S, T, Z } from "./tertrominoes";
import fs  from 'fs';
import TetrisPiece from "./TetrisPiece";
import Board  from './Board'

 const TotalRows =20;
 const TotalColumns=10;
 const EMPTY =0;

let blocksMap = new Map<string,any>(
 [
    ["Z",Z],
    ["S",S],
    ["T",T],
    ["Q",Q],
    ["L",L],
    ["I",I],
    ["J",J]
]);

const generateTetrisBlockAndDropDown =(line:string)=>{
   const dataArray = line.split(',');
   let board =new Board(TotalRows,TotalColumns,EMPTY);
   let remainingHeight =0;
   for(let i =0 ; i <dataArray.length ; i++){
        const [symbol,xPos] = dataArray[i].split('');
        // console.log({symbol,xPos});
         let block = blocksMap.get(symbol);
        const tetrisPiece = new TetrisPiece(block,board.grid,TotalRows,TotalColumns,Number(xPos));
        while(tetrisPiece.canMoveDown()){
            tetrisPiece.moveDown();
        }
        remainingHeight = tetrisPiece.getTowerHeight();
   }
   console.table(board.grid);
   console.log(`Final height after ${line} is ${remainingHeight}`);

}


 
fs.readFile('input.txt', function(err, data) {
    if(err) throw err;
    const arr = data.toString().replace(/\r\n/g,'\n').split('\n');
    for(let line of arr) {
        if(line){
            console.log(line);
            generateTetrisBlockAndDropDown(line);
        }
    }
});
