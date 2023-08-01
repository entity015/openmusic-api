const { ExportPlaylistPayloadSchema } = require("./schema")
const InvariantError = require("../../exceptions/InvariantError")

const ExportsValidator = {
	validateExportPlaylistPayload: payload => {
		const validation = ExportPlaylistPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	}
}

module.exports = ExportsValidator