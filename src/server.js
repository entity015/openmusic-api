require("dotenv").config()

const Hapi = require("@hapi/hapi")

//albums
const albums = require("./api/albums")
const AlbumsService = require("./services/postgres/AlbumsService")
const AlbumsValidator = require("./validator/albums")

//songs
const songs = require("./api/songs")
const SongsService = require("./services/postgres/SongsService")
const SongsValidator = require("./validator/songs")

const ClientError = require("./exceptions/ClientError")

const init = async () => {
	const server = Hapi.server({
		port: process.env.PORT,
		host: process.env.HOST,
		routes: {
			cors: {
				origin: ["*"]
			}
		}
	})

	const albumsService = new AlbumsService()
	const songsService = new SongsService()

	await server.register([
		{
			plugin: albums,
			options: {
				albumsService,
				songsService,
				validator: AlbumsValidator
			}
		},
		{
			plugin: songs,
			options: {
				service: songsService,
				validator: SongsValidator
			}
		}
	])
	server.ext("onPreResponse", (request, h) => {
		const { response } = request

		if(response instanceof Error) {
			if(response instanceof ClientError) {	
				//user defined
				return h.response({
					status: "fail",
					message: response.message
				}).code(response.statusCode)
			}
			//other client errors
			if(!response.isServer) return h.continue

			//server errors
			console.log(response.message)
			return h.response({
				status: "error",
				message: "Maaf, terjadi kesalahan pada server"
			}).code(500)
		}

		//default
		return h.continue
	})

	await server.start()
	console.log(`Listening on http://${process.env.HOST}:${process.env.PORT} ...`)
}

init()