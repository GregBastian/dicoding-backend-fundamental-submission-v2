class AlbumGetModel {
  constructor({ id, name, year }) {
    this.id = id;
    this.name = name;
    this.year = year;
  }

  getSelectModel() {
    return {
      id: this.id, name: this.name, year: this.year,
    };
  }
}

module.exports = AlbumGetModel;
