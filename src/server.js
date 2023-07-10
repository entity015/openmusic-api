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
				service: albumsService,
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

	await server.start()
	console.log(`Listening on http://${process.env.HOST}:${process.env.PORT} ...`)
}

init()