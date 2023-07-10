const { AlbumPayloadSchema } = require("./schema")
const InvariantError = require("../../exceptions/InvariantError")

const AlbumsValidator = {
	validateAlbumPayload: payload => {
		const validation = AlbumPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	}
}

module.exports = AlbumsValidator