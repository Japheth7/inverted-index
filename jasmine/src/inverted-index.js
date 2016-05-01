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

            // Set converts the array to a Set datatype with unique values
            var uniqueKeys = new Set(normalised);
            // converts the set datatype to an array
            var uniqueKeysArray = Array.from(uniqueKeys);

            index.push({'title': element['title'], 'keys': uniqueKeysArray});
        });

        return index
    }
}





