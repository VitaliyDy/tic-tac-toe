class TicTacToe {    
    constructor() {
        this.turnCount = 0;
        this.marksStorage = [[],[],[]];        
        this.resultArr = [];   
    }
    /**
     * depending on the turnCount return certain symbol
     */
    getCurrentPlayerSymbol() {
        return this.turnCount%2 === 0 ?  'x' : 'o';
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
        return this.resultArr = transformToResultsArr(this.marksStorage);  
    }

    /**
     * check all variants of finish the game
     */
    isFinished() {  
       return  !!this.noMoreTurns() ||  !!this.getWinner() || !!this.isDraw();
    }

    /**
     * check all symbols in each full line to be equal firstSymbol or secondSymbol
     * and change currentSymbol accordingly
     */
    getWinner() {
        let tempArr = this.resultArr.filter(filterArrforWinner);       
        return tempArr.length ? tempArr[0][0] : null;
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
   
}

module.exports = TicTacToe;

 /**
     * method for transformation marksStorage[] into array of lines variants for easy scan and check
     * @param {*string[[]]} array 
     */
    function transformToResultsArr(array) {        
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

    function filterArrforWinner(array) {
        if(array.join('').length === 3)
            return array.every((x) => x === 'o') || array.every((x) => x === 'x')
    }