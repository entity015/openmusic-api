const autoBind = require("auto-bind")

class LikesHandler {
	constructor(likesService, cacheService) {
		this._likesService = likesService
		this._cacheService = cacheService

		autoBind(this)
	}

	async postAlbumLikeHandler(request, h) {
		const { id: userId } = request.auth.credentials
		const { id: albumId } = request.params
		await this._likesService.addAlbumLike(userId, albumId)

		await this._cacheService.delete(`likes:${albumId}`)
		return h.response({
			status: "success",
			message: "Album berhasil ditambahkan ke kesukaan"
		}).code(201)
	}
	async getAlbumLikesHandler(request, h) {
		const { id: albumId } = request.params
		try {
			const likes = JSON.parse(await this._cacheService.get(`likes:${albumId}`))
			return h.response({
				status: "success",
				data: { likes }
			}).header("X-Data-Source","cache")
		} catch(error) {
			const likes = await this._likesService.getAlbumLikes(albumId)
			await this._cacheService.set(`likes:${albumId}`, likes)
			return {
				status: "success",
				data: { likes }
			}
		}
	}
	async deleteAlbumLikeHandler(request, h) {
		const { id: userId } = request.auth.credentials
		const { id: albumId } = request.params
		await this._likesService.deleteAlbumLike(userId, albumId)

		await this._cacheService.delete(`likes:${albumId}`)
		return {
			status: "success",
			message: "Album berhasil dihapus dari kesukaan"
		}
	}
}

module.exports = LikesHandler