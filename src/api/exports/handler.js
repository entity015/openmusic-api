const autoBind = require("auto-bind")

class ExportsHandler {
	constructor(producerService, playlistsService, validator) {
		this._producerService = producerService
		this._playlistsService = playlistsService
		this._validator = validator

		autoBind(this)
	}

	async postExportPlaylistByIdHandler(request, h) {
		const { id: credentialId } = request.auth.credentials
		const { id: playlistId } = request.params
		await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId)

		this._validator.validateExportPlaylistPayload(request.payload)
		const { targetEmail } = request.payload

		const message = JSON.stringify({ playlistId, targetEmail })

		await this._producerService.sendMessage("export:playlist", message)

		return h.response({
			status: "success",
			message: "Permintaan Anda sedang kami proses"
		}).code(201)
	}
}

module.exports = ExportsHandler