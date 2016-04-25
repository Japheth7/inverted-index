'use strict';

class InvertedIndex {

    constructor(){
        this.data = [];
    }

    loadData(filePath){
        return ($.getJSON(filePath))
    }
}


//var index = new InvertedIndex();
//console.log(index.loadData('../books.json'));