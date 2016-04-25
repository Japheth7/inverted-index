/**
 * Created by japheth on 4/23/16.
 */
describe("inverted index", function(){
    var invertedIndex;

    beforeEach(function(done){
        invertedIndex = new InvertedIndex();
        invertedIndex.loadData('./books.json').done(function(data){
            invertedIndex.data = data;
            console.log(invertedIndex.data);
            done();
        })
    });

   describe("read book data", function(){
        it("checks that json file is not empty", function(){
            expect(invertedIndex.data).toBeDefined();
            expect(invertedIndex.data.length).not.toEqual(0);
        })
   })

});
