const autoBind = require("auto-bind")
const ClientError = require("../../exceptions/ClientError")

class SongsHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator

		autoBind(this)
	}

	async postSongHandler(request, h) {
		try {
			this._validator.validateSongPayload(request.payload)

			return h.response({
				status: "success",
				data: { songId: await this._service.addSong(request.payload) }
			}).code(201)
		} catch(error) {
			if(error instanceof ClientError) {
				return h.response({
					status: "fail",
					message: error.message
				}).code(error.statusCode)
			}

			console.log(error.message)
			return h.response({
				status: "error",
				message: "Maaf, terjadi kesalahan pada server"
			}).code(500)
		}
	}
	async getSongsHandler(request) {
		const { title, performer } = request.query

		const songs = await this._service.getSongs()
		let filteredSongs = songs.map(({ id, title, performer }) => ({ id, title, performer }))
		if(title) {
			filteredSongs = filteredSongs.filter(item => item.title.toLowerCase().includes(title.toLowerCase()))
		}
		if(performer) {
			filteredSongs = filteredSongs.filter(item => item.performer.toLowerCase().includes(performer.toLowerCase()))
		}

		return {
			status: "success",
			data: { songs: filteredSongs }
		}
	}
	async getSongByIdHandler(request, h) {
		try {
			const { id } = request.params

			return {
				status: "success",
				data: { song: await this._service.getSongById(id) }
			}
		} catch(error) {
			if(error instanceof ClientError) {
				return h.response({
					status: "fail",
					message: error.message
				}).code(error.statusCode)
			}

			console.log(error.message)
			return h.response({
				status: "error",
				message: "Maaf, terjadi kesalahan pada server"
			}).code(500)
		}
	}
	async putSongByIdHandler(request, h) {
		try {
			this._validator.validateSongPayload(request.payload)

			const { id } = request.params
			await this._service.editSong(request.payload,id)

			return {
				status: "success",
				message: "Edit lagu berhasil"
			}
		} catch(error) {
			if(error instanceof ClientError) {
				return h.response({
					status: "fail",
					message: error.message
				}).code(error.statusCode)
			}

			console.log(error.message)
			return h.response({
				status: "error",
				message: "Maaf, terjadi kesalahan pada server"
			}).code(500)
		}
	}
	async deleteSongByIdHandler(request, h) {
		try {
			const { id } = request.params
			await this._service.deleteSong(id)
			
			return {
				status: "success",
				message: "Hapus lagu berhasil"
			}
		} catch(error) {
			if(error instanceof ClientError) {
				return h.response({
					status: "fail",
					message: error.message
				}).code(error.statusCode)
			}

			console.log(error.message)
			return h.response({
				status: "error",
				message: "Maaf, terjadi kesalahan pada server"
			}).code(500)
		}
	}
}

module.exports = SongsHandler