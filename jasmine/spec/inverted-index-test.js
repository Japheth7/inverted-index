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
           var index = invertedIndex.createIndex(invertedIndex.data);
           expect(index).toBeDefined();
       });
       it("Checks if string keys map to the correct object in the object array", function(){
           var index = invertedIndex.createIndex(invertedIndex.data);
           expect(index[0]['keys']).toContain('alice');
           expect(index[1]['keys']).toContain('rings');
       });
   });
});
