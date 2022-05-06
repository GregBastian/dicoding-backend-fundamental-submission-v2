class PutSongModel {
  constructor(songId, {
    title, year, genre, performer, duration, albumId,
  }) {
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.performer = performer;
    this.duration = duration;
    this.albumId = albumId;
    this.id = songId;
  }

  getUpdateModel() {
    return [this.title, this.year, this.genre,
      this.performer, this.duration, this.albumId
    , this.id];
  }
}

module.exports = PutSongModel;
