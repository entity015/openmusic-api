const autoBind = require("auto-bind")

class CollaborationsHandler {
	constructor(collaborationsService, playlistsService, validator) {
		this._collaborationsService = collaborationsService
		this._playlistsService = playlistsService
		this._validator = validator

		autoBind(this)
	}

	async postCollaborationHandler(request, h) {
		this._validator.validateCollaborationPayload(request.payload)
		const { id: credentialId } = request.auth.credentials
		const { playlistId, userId } = request.payload

		await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId)
		return h.response({
			status: "success",
			data: { collaborationId: await this._collaborationsService.addCollaboration(playlistId, userId) }
		}).code(201)
	}
	async deleteCollaborationHandler(request, h) {
		this._validator.validateCollaborationPayload(request.payload)
		const { id: credentialId } = request.auth.credentials
		const { playlistId, userId } = request.payload

		await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId)
		await this._collaborationsService.deleteCollaboration(playlistId, userId)
		return {
			status: "success",
			message: "Kolaborasi berhasil dihapus"
		}
	}
}

module.exports = CollaborationsHandler