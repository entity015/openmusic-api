const autoBind = require("auto-bind")
const ClientError = require("../../exceptions/ClientError")

class AlbumsHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator

		autoBind(this)
	}
	
	async postAlbumHandler(request, h) {
		try {
			this._validator.validateAlbumPayload(request.payload)

			return h.response({
				status: "success",
				data: { albumId: await this._service.addAlbum(request.payload) }
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
	async getAlbumByIdHandler(request, h) {
		try {			
			const { id } = request.params
			const album = await this._service.getAlbumById(id)

			return {
				status: "success",
				data: { album }
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
	async putAlbumByIdHandler(request, h) {
		try {
			this._validator.validateAlbumPayload(request.payload)
	
			const { id } = request.params
			await this._service.editAlbum(request.payload,id)

			return {
				status: "success",
				message: "Edit album berhasil"
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
	async deleteAlbumByIdHandler(request, h) {
		try {			
			const { id } = request.params
			await this._service.deleteAlbum(id)
			
			return {
				status: "success",
				message: "Hapus album berhasil"
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

module.exports = AlbumsHandler