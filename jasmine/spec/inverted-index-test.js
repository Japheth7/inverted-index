/**
 * Created by japheth on 4/23/16.
 */
describe('Inverted Index', function() {
  var invertedIndex;

  beforeEach(function() {
    invertedIndex = new InvertedIndex();
    expect(invertedIndex.index).toEqual({});
    invertedIndex.data = invertedIndex.loadData('books.json');
    invertedIndex.createIndex(invertedIndex.data);
    invertedIndex.index = invertedIndex.getIndex();
  });

  describe('Read book data', function() {
    it('checks that json file is not empty', function() {
      expect(invertedIndex.data.length).not.toEqual(0);
    });

    it('ensures each object in json array contain a property whose value is a string', function(){
      for (var obj in invertedIndex.data) {
        var keys = Object.keys(invertedIndex.data[obj]);
        keys.forEach(function(key) {
          expect(typeof(invertedIndex.data[obj][key])).toEqual('string');
        });
      }
    });

    it('throws an error when file is not found', function() {
      expect(function() {
        invertedIndex.loadData('not_exist.json');
      }).toThrow(new Error('unable to open file'));
    });

    it('throws an error when file is an empty json file', function() {
      expect(function() {
        invertedIndex.loadData('empty.json');
      }).toThrow(new Error('the file is empty'));
    });

    it('throws an error when the json file is invalid', function() {
      expect(function() {
        invertedIndex.loadData('invalid.json');
      }).toThrow(new Error('invalid json file'));
    });
  });

  describe('Populate Index', function() {
    it('checks if index is created', function() {
      expect(invertedIndex.index).toBeDefined();
      expect(invertedIndex.index).not.toEqual({});
    });

    it('checks if string keys map to the correct object in the object array', function() {
      expect(invertedIndex.index.alice).toEqual([0]);
      expect(invertedIndex.index.rings).toEqual([1]);
      expect(invertedIndex.index.a).toEqual([0, 1]);
    });
  });

  describe('Search Index', function() {
    it('returns the index of the object containing the searchIndex term', function() {
      expect(invertedIndex.searchIndex('alice')).toEqual([0]);
      expect(invertedIndex.searchIndex('alice has been to wonderland')).toEqual([0, -1, -1, 1, 0]);
      expect(invertedIndex.searchIndex('loRd Alice')).toEqual([1, 0]);
      expect(invertedIndex.searchIndex(['rings'])).toEqual([1]);
      expect(invertedIndex.searchIndex(['alice', 'rings'])).toEqual([0, 1]);
      expect(invertedIndex.searchIndex('a')).toEqual([0, 1]);
      expect(invertedIndex.searchIndex(['Japheth'])).toEqual([-1]);
    });
  });
});

