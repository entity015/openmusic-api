const autoBind = require("auto-bind")

class PlaylistsHandler {
	constructor(playlistsService, songsService, validator) {
		this._playlistsService = playlistsService
		this._songsService = songsService
		this._validator = validator

		autoBind(this)
	}

	async postPlaylistHandler(request, h) {
		this._validator.validatePostPlaylistPayload(request.payload)

		const { name } = request.payload
		const { id: credentialId } = request.auth.credentials

		return h.response({
			status: "success",
			data: { playlistId: await this._playlistsService.addPlaylist({ name, owner: credentialId }) }
		}).code(201)
	}
	async getPlaylistsHandler(request, h) {
		const { id: credentialId } = request.auth.credentials

		return {
			status: "success",
			data: { playlists: await this._playlistsService.getPlaylists(credentialId) }
		}
	}
	async deletePlaylistHandler(request, h) {
		const { id: credentialId } = request.auth.credentials
		const { id } = request.params

		await this._playlistsService.verifyPlaylistOwner(id, credentialId)
		await this._playlistsService.deletePlaylist(id)

		return {
			status: "success",
			message: "Playlist berhasil dihapus"
		}
	}

	async postPlaylistSongHandler(request, h) {
		this._validator.validatePostPlaylistSongPayload(request.payload)

		const { id: credentialId } = request.auth.credentials
		const { id } = request.params
		const { songId } = request.payload

		await this._playlistsService.verifyPlaylistAccess(id, credentialId)
		await this._playlistsService.addPlaylistSong(id, songId)

		return h.response({
			status: "success",
			message: "Lagu berhasil ditambahkan ke playlist"
		}).code(201)
	}
	async getPlaylistSongsHandler(request, h) {
		const { id: credentialId } = request.auth.credentials
		const { id } = request.params
		await this._playlistsService.verifyPlaylistAccess(id, credentialId)

		const playlist = await this._playlistsService.getPlaylistById(id)
		const songs = await this._songsService.getSongsByPlaylistId(id)

		return {
			status: "success",
			data: { playlist: {...playlist, songs } }
		}
	}
	async deletePlaylistSongHandler(request, h) {
		this._validator.validateDeletePlaylistSongPayload(request.payload)
		const { id: credentialId } = request.auth.credentials
		const { id } = request.params
		const { songId } = request.payload
		await this._playlistsService.verifyPlaylistAccess(id, credentialId)

		await this._playlistsService.deletePlaylistSong(id, songId)
		return {
			status: "success",
			message: "Lagu berhasil dihapus dari playlist"
		}
	}
}

module.exports = PlaylistsHandler