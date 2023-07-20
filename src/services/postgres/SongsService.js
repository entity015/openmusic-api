const { nanoid } = require("nanoid")
const { Pool } = require("pg")
const { DBToModel } = require("../../utils")
const InvariantError = require("../../exceptions/InvariantError")
const NotFoundError = require("../../exceptions/NotFoundError")

class SongsService {
	constructor() {
		this._pool = new Pool()
	}

	async addSong({ title, year, genre, performer, duration, albumId }) {
		const id = `song-${nanoid(16)}`
		const query = {
			text: "INSERT INTO songs VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id",
			values: [id,title,year,genre,performer,duration,albumId]
		}
		const result = await this._pool.query(query)
		if(!result.rows[0].id) throw new InvariantError("Tambah lagu gagal")

		return result.rows[0].id
	}
	async getSongs() {
		const result = await this._pool.query("SELECT * FROM songs")

		return result.rows.map(DBToModel)
	}
	async getSongById(id) {
		const query = {
			text: "SELECT * FROM songs WHERE id = $1",
			values: [id]
		}
		const result = await this._pool.query(query)
		if(!result.rows.length) throw new NotFoundError("Id lagu tidak ditemukan")

		return DBToModel(result.rows[0])
	}
	async getSongsByAlbumId(albumId) {
		const query = {
			text: "SELECT * FROM songs WHERE album_id = $1",
			values: [albumId]
		}
		const result = await this._pool.query(query)

		return result.rows.map(({ id, title, performer }) => ({ id, title, performer }))
	}
	async getSongsByPlaylistId(playlistId) {
		const query = {
			text: `SELECT songs.*
			FROM songs INNER JOIN playlist_songs
			ON playlist_songs.song_id=songs.id
			WHERE playlist_songs.playlist_id=$1`,
			values: [playlistId]
		}
		const result = await this._pool.query(query)

		return result.rows.map(({ id, title, performer }) => ({ id, title, performer }))
	}
	async editSong({ title, year, genre, performer, duration, albumId }, id) {
		const query = {
			text: "UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id",
			values: [title,year,genre,performer,duration,albumId,id]
		}
		const result = await this._pool.query(query)
		if(!result.rows.length) throw new NotFoundError("Edit lagu gagal. Id lagu tidak ditemukan")
	}
	async deleteSong(id) {
		const query = {
			text: "DELETE FROM songs WHERE id = $1 RETURNING id",
			values: [id]
		}
		const result = await this._pool.query(query)
		if(!result.rows.length) throw new NotFoundError("Hapus lagu gagal. Id lagu tidak ditemukan")
	}
}

module.exports = SongsService