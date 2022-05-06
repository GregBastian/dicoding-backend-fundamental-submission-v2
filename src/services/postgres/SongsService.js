const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {
  PostSongModel, GetAllSongsModel, GetSongModel, PutSongModel, GetSongsByAlbumIdModel,
} = require('../../utils/model/songs');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong(payload) {
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: new PostSongModel(payload).getInsertModel(),
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Song gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAllSongs() {
    const query = {
      text: 'SELECT id, title, performer FROM songs',
    };

    const result = await this._pool.query(query);

    return new GetAllSongsModel(result).getSelectAllModel();
  }

  async checkSongIsExist(songId) {
    const query = {
      text: 'SELECT id FROM songs WHERE id = $1',
      values: [songId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError(`Song dengan id ${songId} tidak ditemukan`);
    }
  }

  async getSongById(songId) {
    await this.checkSongIsExist(songId);
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [songId],
    };

    const result = await this._pool.query(query);
    return new GetSongModel(result.rows[0]).getSelectModel();
  }

  async editSongById(songId, payload) {
    await this.checkSongIsExist(songId);

    const query = {
      text: `UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, 
      duration = $5, album_id = $6 WHERE id = $7 RETURNING id`,
      values: new PutSongModel(songId, payload).getUpdateModel(),
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError(`Data song dengan id ${songId} gagal diperbarui`);
    }
  }

  async deleteSongById(songId) {
    await this.checkSongIsExist(songId);

    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError(`Data song dengan id ${songId} gagal dihapus`);
    }
  }

  async getSongByAlbumId(albumId) {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    return new GetSongsByAlbumIdModel(result).getSelectAllModel();
  }
}

module.exports = SongsService;
