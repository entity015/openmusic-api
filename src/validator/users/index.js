const { userPayloadSchema } = require("./schema")
const InvariantError = require("../../exceptions/InvariantError")

const UsersValidator = {
	validateUserPayload: payload => {
		const validation = userPayloadSchema.validate(payload)
		if(validation.error) throw new InvariantError(validation.error.message)
	}
}

module.exports = UsersValidator