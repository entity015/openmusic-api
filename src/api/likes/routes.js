const routes = handler => [
	{
		path: "/albums/{id}/likes",
		method: "POST",
		handler: handler.postAlbumLikeHandler,
		options: {
			auth: "openmusic_jwt"
		}
	},
	{
		path: "/albums/{id}/likes",
		method: "GET",
		handler: handler.getAlbumLikesHandler
	},
	{
		path: "/albums/{id}/likes",
		method: "DELETE",
		handler: handler.deleteAlbumLikeHandler,
		options: {
			auth: "openmusic_jwt"
		}
	}
]

module.exports = routes