'use strict';

class InvertedIndex {

    constructor() {
        this.data = [];
    }

    loadData(filePath) {
        return ($.getJSON(filePath));
    }


    createIndex(data) {
        var index = [];
        data.forEach(function (element) {
            var keys = Object.keys(element);
            var concat = " ";

            keys.forEach(function(key){
                concat += ' ' + element[key];
            });
            var normalised = concat.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase().split(" ");
            index.push({'title': element['title'], 'keys': normalised});
        });

        return index
    }
}





