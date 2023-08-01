const routes = handler => [
	{
		path: "/export/playlists/{id}",
		method: "POST",
		handler: handler.postExportPlaylistByIdHandler,
		options: {
			auth: "openmusic_jwt"
		}
	}
]

module.exports = routes