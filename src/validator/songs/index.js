const { SongPayloadSchema } = require("./schema")
const InvariantError = require("../../exceptions/InvariantError")

const SongsValidator = {
	validateSongPayload: payload => {
		const validation = SongPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	}
}

module.exports = SongsValidator