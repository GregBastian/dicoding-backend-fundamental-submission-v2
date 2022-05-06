const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { PostAlbumModel, GetAlbumModel, PutAlbumModel } = require('../../utils/model/albums');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum(payload) {
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: new PostAlbumModel(payload).getInsertModel(),
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbum(albumId) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError(`Album dengan id ${albumId} tidak ditemukan`);
    }

    return new GetAlbumModel(result.rows[0]).getSelectModel();
  }

  async checkAlbumIsExist(albumId){
      const query = {
          text: 'SELECT id FROM albums WHERE id = $1',
          values: [albumId]
      }

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
        throw new NotFoundError(`Album dengan id ${albumId} tidak ditemukan`);
      }
  }

  async editAlbumById(albumId, payload){
      await this.checkAlbumIsExist(albumId);

      const query = {
        text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
        values: new PutAlbumModel(payload, albumId).getUpdateModel(),
    }

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
        throw new InvariantError('Album gagal ditambahkan');
      }
  }
}

module.exports = AlbumsService;
