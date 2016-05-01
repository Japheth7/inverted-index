'use strict';

class InvertedIndex {

    constructor() {
        this.data = [];
        this.index = [];
    }

    // Uses JQuery for convenient loading of data from a json file
    loadData(filePath) {
        return ($.getJSON(filePath));
    }

    // Creates an inverted index from the json file
    getIndex(data) {
        var index = [];
        data.forEach(function (element) {
            var keys = Object.keys(element);
            var concat = " ";

            // creates a string of the objects values
            keys.forEach(function(key){
                concat += ' ' + element[key];
            });

            // returns an array of lowercase words from the string created
            var normalised = concat.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase().split(" ");

            // convert the array to a Set datatype with unique values
            var uniqueKeys = new Set(normalised);
            // converts the set datatype to an array
            var uniqueKeysArray = Array.from(uniqueKeys);

            index.push({'title': element['title'], 'keys': uniqueKeysArray});
        });

        return index
    }

    searchIndex(terms){
        var result = [];
        for(var i = 0; i < this.index.length; i++) {
            for (var t = 0; t < terms.length; t++) {
                // if the object's array unique keys contains the term
                // push the object index into the result array.
                if ($.inArray(terms[t], this.index[i]['keys']) !== -1) {
                    result.push(i)
                }
            }
        }
        var uniqueResult = new Set(result);
        var UniqueResultArray = Array.from(uniqueResult);
        return UniqueResultArray;
    }
}





