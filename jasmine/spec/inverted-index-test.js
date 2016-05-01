/**
 * Created by japheth on 4/23/16.
 */
describe('Inverted Index', function(){
    var invertedIndex;

    beforeEach(function(done){
        invertedIndex = new InvertedIndex();
        invertedIndex.index = [];
        invertedIndex.loadData('./books.json').done(function(data){
            invertedIndex.data = data;
            invertedIndex.index = invertedIndex.getIndex(data);
            done();
        });
    });

   describe('Read book data', function(){
        it('Checks that json file is not empty', function(){
            expect(invertedIndex.data).toBeDefined();
            expect(invertedIndex.data.length).not.toEqual(0);
        })
   });

   describe('Populate Index', function(){
       it("Checks if index is created", function(){
           expect(invertedIndex.index).toBeDefined();
           expect(invertedIndex.index).not.toEqual([]);
       });
       it("Checks if string keys map to the correct object in the object array", function(){
           expect(invertedIndex.index[0]['keys']).toContain('alice');
           expect(invertedIndex.index[1]['keys']).toContain('rings');
           console.log(invertedIndex.index)
       });
   });
});
