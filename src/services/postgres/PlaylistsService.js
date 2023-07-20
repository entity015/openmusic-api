const { Pool } = require("pg")
const { nanoid } = require("nanoid")
const NotFoundError = require("../../exceptions/NotFoundError")
const AuthorizationError = require("../../exceptions/AuthorizationError")

class PlaylistsService {
	constructor(songService) {
		this._pool = new Pool()
		this._songService = songService
	}

	async addPlaylist({ name, owner }) {
		const id = `playlist-${nanoid(16)}`
		const query = {
			text: "INSERT INTO playlists VALUES($1,$2,$3) RETURNING id",
			values: [id,name,owner]
		}
		const result = await this._pool.query(query)

		return result.rows[0].id
	}
	async verifyPlaylistOwner(playlistId, owner) {
		const query = {
			text: "SELECT * FROM playlists WHERE id=$1",
			values: [playlistId]
		}
		const result = await this._pool.query(query)
		if(!result.rows.length) throw new NotFoundError("Playlist tidak ditemukan")
		if(owner !== result.rows[0].owner) throw new AuthorizationError("Anda tidak berhak mengakses resource ini")
	}
	async getPlaylists(owner) {
		const query = {
			text: `SELECT playlists.id, playlists.name, users.username
			FROM playlists INNER JOIN users
			ON playlists.owner=users.id
			WHERE playlists.owner=$1`,
			values: [owner]
		}
		const result = await this._pool.query(query)

		return result.rows
	}
	async getPlaylistById(playlistId) {
		const query = {
			text: `SELECT playlists.id, playlists.name, users.username
			FROM playlists INNER JOIN users
			ON playlists.owner=users.id
			WHERE playlists.id=$1`,
			values: [playlistId]
		}
		const result = await this._pool.query(query)

		return result.rows[0]
	}
	async deletePlaylist(playlistId) {
		const query = {
			text: "DELETE FROM playlists WHERE id=$1",
			values:[playlistId]
		}
		await this._pool.query(query)
	}

	async addPlaylistSong(playlistId, songId) {
		//check if songId exist
		await this._songService.getSongById(songId)
		const id = `playlist-songs-${nanoid(16)}`
		const query = {
			text: "INSERT INTO playlist_songs VALUES($1,$2,$3) RETURNING id",
			values: [id,playlistId,songId]
		}
		await this._pool.query(query)
	}
	async deletePlaylistSong(playlistId, songId) {
		//check if songId exist
		await this._songService.getSongById(songId)
		const query = {
			text: "DELETE FROM playlist_songs WHERE playlist_id=$1 AND song_id=$2",
			values: [playlistId,songId]
		}
		await this._pool.query(query)
	}
}

module.exports = PlaylistsService