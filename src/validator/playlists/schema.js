const Joi = require("joi")

const postPlaylistPayloadSchema = Joi.object({
	name: Joi.string().required()
})
const postPlaylistSongPayloadSchema = Joi.object({
	songId: Joi.string().required()
})
const deletePlaylistSongPayloadSchema = Joi.object({
	songId: Joi.string().required()
})

module.exports =  { 
	postPlaylistPayloadSchema,
	postPlaylistSongPayloadSchema,
	deletePlaylistSongPayloadSchema
}