const { nanoid } = require('nanoid');

class PostSongModel {
  constructor({
    title, year, genre, performer, duration, albumId,
  }) {
    this.id = `song-${nanoid(10)}`;
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.performer = performer;
    this.duration = duration;
    this.albumId = albumId;
  }

  getInsertModel() {
    return [this.id, this.title, this.year, this.genre,
      this.performer, this.duration, this.albumId];
  }
}

module.exports = PostSongModel;
