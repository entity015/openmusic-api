const { Pool } = require("pg")
const { nanoid } = require("nanoid")
const AuthorizationError = require("../../exceptions/AuthorizationError")

class CollaborationsService {
	constructor(userService) {
		this._pool = new Pool()
		this._userService = userService
	}
	async addCollaboration(playlistId, userId) {
		//check if user exist
		await this._userService.getUserById(userId)
		const id = `collab-${nanoid(16)}`
		const query = {
			text: "INSERT INTO collaborations VALUES($1,$2,$3) RETURNING id",
			values: [id,playlistId,userId]
		}
		const result = await this._pool.query(query)

		return result.rows[0].id
	}
	async deleteCollaboration(playlistId, userId) {
		//check if user exist
		await this._userService.getUserById(userId)
		const query = {
			text: "DELETE FROM collaborations WHERE playlist_id=$1 AND user_id=$2 RETURNING id",
			values: [playlistId,userId]
		}
		await this._pool.query(query)
	}
	async verifyCollaborator(playlistId, userId) {
		const query = {
			text: "SELECT * FROM collaborations WHERE playlist_id=$1 AND user_id=$2",
			values: [playlistId,userId]
		}
		const result = await this._pool.query(query)
		if(!result.rows.length) throw new AuthorizationError("Anda tidak berhak mengakses resource ini")
	}
}

module.exports = CollaborationsService