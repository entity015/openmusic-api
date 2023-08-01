const autoBind = require("auto-bind")

class UploadsHandler {
	constructor(storageService, albumsService, validator) {
		this._storageService = storageService
		this._albumsService = albumsService
		this._validator = validator

		autoBind(this)
	}

	async postAlbumCoverHandler(request, h) {
		const { id: albumId } = request.params
		const { cover } = request.payload
		this._validator.validateAlbumCoverHeaders(cover.hapi.headers)

		const filename = await this._storageService.writeFile(cover, cover.hapi)

		const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/upload/covers/${filename}`
		await this._albumsService.addCoverUrlByAlbumId(coverUrl, albumId)

		return h.response({
			status: "success",
			message: "Sampul berhasil diunggah"
		}).code(201)
	}
}

module.exports = UploadsHandler