const { nanoid } = require("nanoid")
const { Pool } = require("pg")
const { DBtoAlbumModel } = require("../../utils")
const InvariantError = require("../../exceptions/InvariantError")
const NotFoundError = require("../../exceptions/NotFoundError")

class AlbumsService {
	constructor() {
		this._pool = new Pool()
	}
	
	async addAlbum({ name, year }) {
		const id = `album-${nanoid(16)}`
		const query = {
			text: "INSERT INTO albums VALUES($1,$2,$3) RETURNING id",
			values: [id,name,year]
		}
		const result = await this._pool.query(query)
		if(!result.rows[0].id) throw new InvariantError("Tambah album gagal")

		return result.rows[0].id
	}
	async getAlbumById(id) {
		const query = {
			text: "SELECT * FROM albums WHERE id = $1",
			values: [id]
		}
		const result = await this._pool.query(query)
		if(!result.rows.length) throw new NotFoundError("Id album tidak ditemukan")

		return DBtoAlbumModel(result.rows[0])
	}
	async editAlbum({ name, year }, id) {
		const query = {
			text: "UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id",
			values: [name,year,id]
		}
		const result = await this._pool.query(query)
		if(!result.rows.length) throw new NotFoundError("Edit album gagal. Id album tidak ditemukan")
	}
	async deleteAlbum(id) {
		const query = {
			text: "DELETE FROM albums WHERE id = $1 RETURNING id",
			values: [id]
		}
		const result = await this._pool.query(query)
		if(!result.rows.length) throw new NotFoundError("Hapus album gagal. Id album tidak ditemukan")
	}
	async addCoverUrlByAlbumId(coverUrl, id) {
		const query = {
			text: "UPDATE albums SET cover_url = $1 WHERE id = $2",
			values: [coverUrl,id]
		}
		await this._pool.query(query)
	}
}

module.exports = AlbumsService