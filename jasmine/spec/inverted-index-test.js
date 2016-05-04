/**
 * Created by japheth on 4/23/16.
 */
describe('Inverted Index', function(){
    var invertedIndex;

    beforeEach(function(done){
        invertedIndex = new InvertedIndex();
        expect(invertedIndex.index).toEqual({});
        invertedIndex.loadData('./books.json').done(function(data){
            invertedIndex.data = data;
            invertedIndex.index = invertedIndex.getIndex(data);
            done();
        });
    });

   describe('Read book data', function(){
        it('Checks that json file is not empty', function(){
            expect(invertedIndex.data.length).not.toEqual(0);
            console.log(invertedIndex.index);
        })
   });

   describe('Populate Index', function(){
       it("Checks if index is created", function(){
           expect(invertedIndex.index).toBeDefined();
           expect(invertedIndex.index).not.toEqual({});
       });
       it("Checks if string keys map to the correct object in the object array", function(){
           expect(invertedIndex.index['alice']).toEqual([0]);
           expect(invertedIndex.index['rings']).toEqual([1]);
           expect(invertedIndex.index['a']).toEqual([0, 1]);
       });
   });
    describe("Search Index", function(){
        it("returns the index of the object containing the searchIndex term", function(){
            expect(invertedIndex.searchIndex('alice')).toEqual([0]);
            expect(invertedIndex.searchIndex('loRd Alice')).toEqual([1, 0]);
            expect(invertedIndex.searchIndex(['rings'])).toEqual([1]);
            expect(invertedIndex.searchIndex(['alice', 'rings'])).toEqual([0, 1]);
            expect(invertedIndex.searchIndex('a')).toEqual([0, 1]);
            expect(invertedIndex.searchIndex(['Japheth'])).toEqual([-1]);
        })
    });
});
