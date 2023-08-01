const Joi = require("joi")

const AlbumCoverHeadersSchema = Joi.object({
	"content-type": Joi.string().valid("image/apng","image/png","image/jpeg","image/gif","image/avif").required()
}).unknown()

module.exports = { AlbumCoverHeadersSchema }