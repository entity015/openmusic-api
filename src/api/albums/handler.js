const autoBind = require("auto-bind")
const ClientError = require("../../exceptions/ClientError")

class AlbumsHandler {
	constructor(albumsService, songsService, validator) {
		this._albumsService = albumsService
		this._songsService = songsService
		this._validator = validator

		autoBind(this)
	}
	
	async postAlbumHandler(request, h) {
		this._validator.validateAlbumPayload(request.payload)

		return h.response({
			status: "success",
			data: { albumId: await this._albumsService.addAlbum(request.payload) }
		}).code(201)
	}
	async getAlbumByIdHandler(request, h) {
		const { id } = request.params
		const album = await this._albumsService.getAlbumById(id)
		const songs = await this._songsService.getSongsByAlbumId(id)

		return {
			status: "success",
			data: { album: { ...album, songs } }
		}
	}
	async putAlbumByIdHandler(request, h) {
		this._validator.validateAlbumPayload(request.payload)

		const { id } = request.params
		await this._albumsService.editAlbum(request.payload,id)

		return {
			status: "success",
			message: "Edit album berhasil"
		}
	}
	async deleteAlbumByIdHandler(request, h) {
		const { id } = request.params
		await this._albumsService.deleteAlbum(id)
		
		return {
			status: "success",
			message: "Hapus album berhasil"
		}
	}
}

module.exports = AlbumsHandler