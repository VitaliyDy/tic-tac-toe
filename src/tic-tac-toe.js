class TicTacToe {    
    constructor() {
        this.turnCount = 0;
        this.firstSymbol = 'x';      
        this.secondSymbol = 'o';    
        this.currentSymbol = this.firstSymbol;  
        this.marksStorage = [[],[],[]];        
        this.resultArr = []; 
        this.winner = null;      
    }
    /**
     * depending on the turnCount return certain symbol
     */
    getCurrentPlayerSymbol() {
        return this.currentSymbol = (this.turnCount%2 === 0) ?  this.firstSymbol : this.secondSymbol;
    }

    /**
     * fill the cell with currentsymbol and change turnCounter, if cell is empty. 
     * else ignore this turn
     * @param {*int} rowIndex 
     * @param {*int} columnIndex 
     */
    nextTurn(rowIndex, columnIndex) {  
                
        if (this.marksStorage[rowIndex][columnIndex]) {
             return false;
        } else {
            this.marksStorage[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();
            this.turnCount ++;
        }
        this.resultArr = this.transformToResultsArr(this.marksStorage);  
    }

    /**
     * check all variants of finish the game
     */
    isFinished() {  
       return  !!this.noMoreTurns() ||  !!this.getWinner() || !!this.isDraw();
    }

    /**
     * c check all symbols in each full line to be equal firstSymbol or secondSymbol
     * and change currentSymbol accordingly
     */
    getWinner() {

        for(let i = 0; i < this.resultArr.length; i++){

            if(this.resultArr[i].join('').length === 3){
                if(this.resultArr[i].every((x) => x === 'o'))
                   return this.winner =  this.secondSymbol;        
                             
                if(this.resultArr[i].every((x) => x === 'x'))
                   return this.winner =  this.firstSymbol;
            } 
        }        
        return this.winner;
    }

    /**
     * check if every line is full
     */
    noMoreTurns() {
        return this.marksStorage.every((x)=> x.join('').length === 3);
    }
    
    //simple check of winner or fullness of marksStorage cells
    isDraw() {     
        if(this.getWinner())
            return false;        
        if(this.noMoreTurns())
            return true;        
        return false;
   
    }
    /**
     * return certain cell from marks storage of exists, else null
     * @param {*int} rowIndex 
     * @param {*int} colIndex 
     */
    getFieldValue(rowIndex, colIndex) {
        return this.marksStorage[rowIndex][colIndex] || null;
    }

    /**
     * method for transformation marksStorage[] into array of lines variants for easy scan and check
     * @param {*string[[]]} array 
     */
    transformToResultsArr(array) {        
        let transformedArr=[],
            tempArr=[];
        //push all colls from array into transformedArr using tempArray
        for(let i = 0; i < array.length; i++ ){ 
            tempArr = []; 
            for(let j = 0; j< array.length; j++){              
                tempArr.push(array[j][i]);
            } 
            transformedArr.push(tempArr);
        }
         //push all rows from array into transformedArr 
         //push diagonal(left-top-> right-bottom) from array into transformedArr using tempArray
         tempArr = [];
        for(let i = 0; i < array.length; i++ ){           
            transformedArr.push(array[i])
            tempArr.push(array[i][i]); 
        }
        transformedArr.push(tempArr);
         //push diagonal(left-bottom-> right-top) from array into transformedArr using tempArray
        tempArr = [];
        for(let i = array.length-1, j = 0; i >= 0; i--, j++ ){  
            tempArr.push(array[i][j]); 
        }
        transformedArr.push(tempArr); 

        return transformedArr;
    }
}

module.exports = TicTacToe;