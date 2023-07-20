const PlaylistsHandler = require("./handler")
const routes = require("./routes")

module.exports = {
	name: "playlists",
	version: "1.0.0",
	register: async (server, { playlistsService, songsService, usersService, activitiesService, validator }) => {
		const playlistsHandler = new PlaylistsHandler(playlistsService, songsService, usersService, activitiesService, validator)
		server.route(routes(playlistsHandler))
	}
}