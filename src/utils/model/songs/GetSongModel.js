class GetAllSongsModel {
  constructor({ id, title, year, genre, performer, duration, album_id: albumId }) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.performer = performer;
    this.duration = duration;
    this.albumId = albumId;
  }

  getSelectModel() {
    return {
      id: this.id,
      title: this.title,
      year: this.year,
      genre: this.genre,
      performer: this.performer,
      duration: this.duration,
      albumId: this.albumId,
    };
  }
}

module.exports = GetAllSongsModel;
