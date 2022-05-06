class AlbumPutModel {
  constructor({ name, year }) {
    this.name = name;
    this.year = year;
  }

  getInsertModel() {
    return [this.name, this.year];
  }
}

module.exports = AlbumPutModel;
