const { nanoid } = require('nanoid');

class NewAlbumModel{
    constructor({ payload: { name, year }}){
        this.id = `album-${nanoid(10)}`
        this.name = name;
        this.year = year;
    }

    getInsertModel(){
        return [this.id, this.name, this.year];    
    }
}

module.exports = NewAlbumModel;