require("dotenv").config()

const Hapi = require("@hapi/hapi")
const Jwt = require("@hapi/jwt")

//albums
const albums = require("./api/albums")
const AlbumsService = require("./services/postgres/AlbumsService")
const AlbumsValidator = require("./validator/albums")

//songs
const songs = require("./api/songs")
const SongsService = require("./services/postgres/SongsService")
const SongsValidator = require("./validator/songs")

//users
const users = require("./api/users")
const UsersService = require("./services/postgres/UsersService")
const UsersValidator = require("./validator/users")

//playlists
const playlists = require("./api/playlists")
const PlaylistsService = require("./services/postgres/PlaylistsService")
const PlaylistsValidator = require("./validator/playlists")

const ActivitiesService = require("./services/postgres/ActivitiesService")

//authentications
const authentications = require("./api/authentications")
const AuthenticationsService = require("./services/postgres/AuthenticationsService")
const AuthenticationsValidator = require("./validator/authentications")
const tokenManager = require("./tokenize/TokenManager")

//collaborations
const collaborations = require("./api/collaborations")
const CollaborationsService = require("./services/postgres/CollaborationsService")
const CollaborationsValidator = require("./validator/collaborations")

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
	const usersService = new UsersService()
	const collaborationsService = new CollaborationsService(usersService)
	const activitiesService = new ActivitiesService()
	const playlistsService = new PlaylistsService(songsService, collaborationsService, usersService, activitiesService) 
	const authenticationsService = new AuthenticationsService()

	await server.register({
		plugin: Jwt,
	})
	server.auth.strategy("openmusic_jwt","jwt",{
		keys: process.env.ACCESS_TOKEN_KEY,
		verify: {
			aud: false,
			iss: false,
			sub: false,
			maxAgeSec: process.env.ACCESS_TOKEN_AGE
		},
		validate: artifacts => ({
			isValid: true,
			credentials: { id: artifacts.decoded.payload.id }
		})
	})

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
		},
		{
			plugin: users,
			options: {
				service: usersService,
				validator: UsersValidator
			}
		},
		{
			plugin: authentications,
			options: {
				authenticationsService,
				usersService,
				tokenManager,
				validator: AuthenticationsValidator
			}
		},
		{
			plugin: playlists,
			options: {
				playlistsService,
				songsService,
				usersService,
				activitiesService,
				validator: PlaylistsValidator
			}
		},
		{
			plugin: collaborations,
			options: {
				collaborationsService,
				playlistsService,
				validator: CollaborationsValidator
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