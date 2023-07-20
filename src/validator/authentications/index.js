const {
	postAuthenticationPayloadSchema,
	putAuthenticationPayloadSchema,
	deleteAuthenticationPayloadSchema
} = require("./schema")
const InvariantError = require("../../exceptions/InvariantError")

const AuthenticationsValidator = {
	validatePostAuthenticationPayload: payload => {
		const validation = postAuthenticationPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	},
	validatePutAuthenticationPayload: payload => {
		const validation = putAuthenticationPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	},
	validateDeleteAuthenticationPayload: payload => {
		const validation = deleteAuthenticationPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	}
}

module.exports = AuthenticationsValidator
