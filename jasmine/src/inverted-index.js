'use strict';

class InvertedIndex {

    constructor(){
        this.data = [];
    }

    loadData(filePath){
        return ($.getJSON(filePath))
    }
}

