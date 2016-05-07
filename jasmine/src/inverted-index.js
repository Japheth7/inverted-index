'use strict';

class InvertedIndex {

  constructor() {
    this.data = [];
    this.index = {};
  }

  // Loads data from file in the path given
  loadData(filepath) {
    var request = new XMLHttpRequest();
    request.open('GET', filepath, false);
    request.send(null);
    if (request.status === 200) {
      if (request.responseText.trim().length === 0) {
        throw new Error('the file is empty');
      }
      try {
        return JSON.parse(request.responseText);
      } catch (e) {
        throw new Error('invalid json file');
      }
    }
    throw new Error('unable to open file');
  }

  /**
  * Takes data from a json file an returns an index object
  * @param data
  * @returns {{}|*}
  */
  createIndex(data) {
    for (var doc = 0; doc < data.length; doc++) {

      // get the unique words from the object content
      var words = this.getUniqueWords(data[doc]);

      for (var word in words) {
        
        // if word is not in index assign it the value of the object's position
        if (!(words[word] in this.index)) {
          this.index[words[word]] = [doc];
        } else {

          // else push the other objects position, ie if it was {a: [0]} now will be {a: [0, 1]}
          this.index[words[word]].push(doc);
        }
      }
    }

  }

  getIndex() {
    return this.index;
  }

  /**
  * Takes a term or list of terms and returns the index of the document its present in
  * @param terms
  * @returns {Array} an array of results
  */
  searchIndex(terms) {
    var termsArray = [];
    if (typeof(terms) === 'string') {
            
    // if the search term is a string, break it down to an array of unique words
    termsArray = this.processText(terms);
    } else {
      termsArray = terms;
    }
    var results = [];
    for (var term = 0; term < termsArray.length; term++) {
      
      // check if the term is in the index
      if (termsArray[term] in this.index) {
        
        // if it is push it value to the results array
        results = results.concat(this.index[termsArray[term]]);
        } else {
        
        // if it's not push -1 into the results array
        results = results.concat([-1]);
      }
    }
    return results;
  }


  /**
  * It takes a book object an returns an array of unique terms
  * @param bookDocument a book object
  * @returns {Array} array of unique words
  */
  getUniqueWords(bookDocument) {
        var content = bookDocument.title +' '+ bookDocument.text;
        return this.processText(content);
  }

  /**
  * It takes a book object's content and returns an array of unique values
  * @param text  contents of the book object
  * @returns {Array} array of unique words
  */
  processText(text) {
    var normalised = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase().split(' ');
    var uniqueWords = new Set(normalised);
    return Array.from(uniqueWords);
  }
}

