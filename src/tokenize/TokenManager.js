const Jwt = require("@hapi/jwt")
const InvariantError = require("../exceptions/InvariantError")
const config = require("../utils/config")

const TokenManager = {
	generateAccessToken: payload => Jwt.token.generate(payload, config.jwt.access_key),
	generateRefreshToken: payload => Jwt.token.generate(payload, config.jwt.refresh_key),
	verifyRefreshToken: refreshToken => {
		try {
			const artifacts = Jwt.token.decode(refreshToken)
			Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY)
			const { payload } = artifacts.decoded
			return payload
		} catch(error) {
			throw new InvariantError("Refresh token tidak valid")
		}
	}
}

module.exports = TokenManager
