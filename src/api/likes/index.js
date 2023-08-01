const routes = require("./routes")
const LikesHandler = require("./handler")

module.exports = {
	name: "likes",
	version: "1.0.0",
	register: async (server, { likesService, cacheService }) => {
		const likesHandler = new LikesHandler(likesService, cacheService)
		server.route(routes(likesHandler))
	}
}