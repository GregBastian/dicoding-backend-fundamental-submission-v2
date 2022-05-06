class PutAlbumModel {
  constructor(albumId, { name, year }) {
    this.id = albumId;
    this.name = name;
    this.year = year;
  }

  getUpdateModel() {
    return [this.name, this.year, this.id];
  }
}

module.exports = PutAlbumModel;
