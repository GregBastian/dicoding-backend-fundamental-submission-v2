const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { AlbumPostModel, AlbumGetModel } = require('../../utils/model/albums');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum(payload) {
    const newAlbum = new AlbumPostModel(payload);

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: newAlbum.getInsertModel(),
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

    return new AlbumGetModel(result.rows[0]).getSelectModel();
  }
}

module.exports = AlbumsService;
