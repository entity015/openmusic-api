const { postPlaylistPayloadSchema,
	postPlaylistSongPayloadSchema,
	deletePlaylistSongPayloadSchema
} = require("./schema")
const InvariantError = require("../../exceptions/InvariantError")

const PlaylistsValidator = {
	validatePostPlaylistPayload: payload => {
		const validation = postPlaylistPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	},
	validatePostPlaylistSongPayload: payload => {
		const validation = postPlaylistSongPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	},
	validateDeletePlaylistSongPayload: payload => {
		const validation = deletePlaylistSongPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	}
}

module.exports = PlaylistsValidator