const routes = handler => [
	{
		path: "/collaborations",
		method: "POST",
		handler: handler.postCollaborationHandler,
		options: {
			auth: "openmusic_jwt"
		}
	},
	{
		path: "/collaborations",
		method: "DELETE",
		handler: handler.deleteCollaborationHandler,
		options: {
			auth: "openmusic_jwt"
		}
	}
]

module.exports = routes