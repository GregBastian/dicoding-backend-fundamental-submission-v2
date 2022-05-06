const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { PostSongModel, GetAllSongsModel, GetSongModel } = require('../../utils/model/songs');

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

  // async checkAlbumIsExist(albumId) {
  //   const query = {
  //     text: 'SELECT id FROM albums WHERE id = $1',
  //     values: [albumId],
  //   };

  //   const result = await this._pool.query(query);

  //   if (result.rows.length === 0) {
  //     throw new NotFoundError(`Album dengan id ${albumId} tidak ditemukan`);
  //   }
  // }

  // async editAlbumById(albumId, payload) {
  //   await this.checkAlbumIsExist(albumId);

  //   const query = {
  //     text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
  //     values: new PutAlbumModel(payload, albumId).getUpdateModel(),
  //   };

  //   const result = await this._pool.query(query);

  //   if (!result.rows[0].id) {
  //     throw new InvariantError(`Data album dengan id ${albumId} gagal diperbarui`);
  //   }
  // }

  // async deleteAlbumById(albumId) {
  //   await this.checkAlbumIsExist(albumId);

  //   const query = {
  //     text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
  //     values: [albumId],
  //   };

  //   const result = await this._pool.query(query);

  //   if (!result.rows[0].id) {
  //     throw new InvariantError(`Data album dengan id ${albumId} gagal dihapus`);
  //   }
  // }
}

module.exports = SongsService;
