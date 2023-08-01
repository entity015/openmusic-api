const { AlbumCoverHeadersSchema } = require("./schema")
const InvariantError = require("../../exceptions/InvariantError")

const UploadsValidator = {
	validateAlbumCoverHeaders: payload => {
		const validation = AlbumCoverHeadersSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	}
}

module.exports = UploadsValidator