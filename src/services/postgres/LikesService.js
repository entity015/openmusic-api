const { Pool } = require("pg")
const { nanoid } = require("nanoid")
const InvariantError = require("../../exceptions/InvariantError")

class LikesService {
	constructor(albumsService) {
		this._pool = new Pool()
		this._albumsService = albumsService
	}

	async addAlbumLike(userId, albumId) {
		await this._albumsService.getAlbumById(albumId)	
		await this.checkAlbumLike(userId, albumId)

		const id = `album-like-${nanoid(16)}`
		const query = {
			text: "INSERT INTO album_likes VALUES($1,$2,$3)",
			values: [id,userId,albumId]
		}
		await this._pool.query(query)
	}
	async checkAlbumLike(userId, albumId) {
		const query = {
			text: "SELECT * FROM album_likes WHERE user_id = $1 AND album_id = $2",
			values: [userId, albumId]
		}
		const result = await this._pool.query(query)
		if(result.rows[0]) throw new InvariantError("Gagal menambahkan like")
	}
	async getAlbumLikes(albumId) {
		const query = {
			text: "SELECT * FROM album_likes WHERE album_id = $1",
			values: [albumId]
		}
		const result = await this._pool.query(query)

		return result.rows.length
	}
	async deleteAlbumLike(userId, albumId) {
		const query = {
			text: "DELETE FROM album_likes WHERE user_id = $1 AND album_id = $2",
			values: [userId,albumId]
		}
		await this._pool.query(query)
	}
}

module.exports = LikesService