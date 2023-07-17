const autoBind = require("auto-bind")
const ClientError = require("../../exceptions/ClientError")

class AlbumsHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator

		autoBind(this)
	}
	
	async postAlbumHandler(request, h) {
		this._validator.validateAlbumPayload(request.payload)

		return h.response({
			status: "success",
			data: { albumId: await this._service.addAlbum(request.payload) }
		}).code(201)
	}
	async getAlbumByIdHandler(request, h) {
		const { id } = request.params
		const album = await this._service.getAlbumById(id)

		return {
			status: "success",
			data: { album }
		}
	}
	async putAlbumByIdHandler(request, h) {
		this._validator.validateAlbumPayload(request.payload)

		const { id } = request.params
		await this._service.editAlbum(request.payload,id)

		return {
			status: "success",
			message: "Edit album berhasil"
		}
	}
	async deleteAlbumByIdHandler(request, h) {
		const { id } = request.params
		await this._service.deleteAlbum(id)
		
		return {
			status: "success",
			message: "Hapus album berhasil"
		}
	}
}

module.exports = AlbumsHandler