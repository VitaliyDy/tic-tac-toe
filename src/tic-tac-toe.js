class TicTacToe {    
    constructor() {
        this.turn = 0;
        this.firstSymbol = 'x';      
        this.secondSymbol = 'o';      
        this.marksStorage = [[],[],[]];//this.init(3);
        this.winner = null;
        this.resultArr = [];  
        this.currentSymbol = this.firstSymbol;      
    }

    // init(num){
    //     for(let i = 0; i < num; i++ ){ 
    //         this.marksStorage = []; 
    //         for(let j = 0; j< num; j++){              
    //             this.marksStorage.push(false);
    //         } 
    //     }
    //     return  this.marksStorage;
    // }

    getCurrentPlayerSymbol() {
        return this.currentSymbol = (this.turn%2 === 0) ?  this.firstSymbol : this.secondSymbol;
        // if (this.turn%2 === 0)
        //     return this.firstSymbol;
        // else
        //     return this.secondSymbol;
    }

    nextTurn(rowIndex, columnIndex) {  
        
        if (this.marksStorage[rowIndex][columnIndex]) {
             return false;
        } else {
            this.marksStorage[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();
            this.turn ++;
        }
        this.resultArr = this.transformToResultsArr(this.marksStorage);

       // console.log( this.marksStorage);        
    }

    isFinished() {
        
     
        //console.log(this.marksStorage);
        // console.log(this.resultArr.some(this.checkWin) );
        // console.log(this.resultArr.every(this.checkNoTurns));
        // console.log(this.resultArr.every(this.checkDraw));
       return  !!this.noMoreTurns() ||  !!this.getWinner() || !!this.isDraw();
        // return (this.resultArr.some(this.checkWin) 
        //         || this.resultArr.every(this.checkNoTurns) 
        //         || this.resultArr.every(this.checkDraw));

            
       
    }

    getWinner() {
       // console.log(this.resultArr); 
        for(let i = 0; i < this.resultArr.length; i++){
           //console.log(this.resultArr[i].join('').length );
            if(this.resultArr[i].join('').length === 3){
                if(this.resultArr[i].every((x) => x === 'o')){
                    this.winner = 'o';   
                    return 'o';    
                }  if(this.resultArr[i].every((x) => x === 'x')){
                    this.winner = 'x'; 
                    return 'x';
                } 
            } 
        }        
        return this.winner;
    }

    noMoreTurns() {
        return this.marksStorage.every(this.checkNoTurns);
    }

    isDraw() {     
        if(this.getWinner())
            return false;        
        if(this.noMoreTurns())
            return true;        
        return false;
   
    }

    getFieldValue(rowIndex, colIndex) {
        return this.marksStorage[rowIndex][colIndex] || null;
    }

    checkNoTurns(element, index, array) {
        return (element.join('').length === 3)
        // if(element.length === 2){
        //     return fasle
        // }
       // return element.every((x) => !!x);
        // array.length === 3;
        // array.every((x) => x !== undefined);            
     }

    // checkDraw(element, index, array){
    //     //  let tempString = array.join(''); 

    //     // return (tempString.length === 2 && tempString[0] !== tempString[1]);

    //  }
     
    // checkWin(element, index, array) {
    //     if(element.every((x) => x === 'o')){
    //         Twinner = 'o';
    //         return true;             
    //     } else if(element.every((x) => x === 'x')){
    //         Twinner = 'x';
    //         return true;
             
    //     } else {                       
    //         return false;
    //     }
    // }

    transformToResultsArr(array) {        
        let transformedArr=[],
            tempArr=[];

        for(let i = 0; i < array.length; i++ ){ 
            tempArr = []; 
            for(let j = 0; j< array.length; j++){              
                tempArr.push(array[j][i]);
            } 
            transformedArr.push(tempArr);
        }
        tempArr = [];
        for(let i = 0; i < array.length; i++ ){           
            transformedArr.push(array[i])
            tempArr.push(array[i][i]); 
        }
        transformedArr.push(tempArr);
        tempArr = [];
        for(let i = array.length-1, j = 0; i >= 0; i--, j++ ){  
            tempArr.push(array[i][j]); 
        }
        transformedArr.push(tempArr); 
        return transformedArr;
    }
}

module.exports = TicTacToe;
