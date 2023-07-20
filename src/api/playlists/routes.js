const routes = handler => [
	{
		path: "/playlists",
		method: "POST",
		handler: handler.postPlaylistHandler,
		options: {
			auth: "openmusic_jwt"
		}
	},
	{
		path: "/playlists",
		method: "GET",
		handler: handler.getPlaylistsHandler,
		options: {
			auth: "openmusic_jwt"
		}
	},
	{
		path: "/playlists/{id}",
		method: "DELETE",
		handler: handler.deletePlaylistHandler,
		options: {
			auth: "openmusic_jwt"
		}
	},
	//playlists song
	{
		path: "/playlists/{id}/songs",
		method: "POST",
		handler: handler.postPlaylistSongHandler,
		options: {
			auth: "openmusic_jwt"
		}
	},
	{
		path: "/playlists/{id}/songs",
		method: "GET",
		handler: handler.getPlaylistSongsHandler,
		options: {
			auth: "openmusic_jwt"
		}
	},
	{
		path: "/playlists/{id}/songs",
		method: "DELETE",
		handler: handler.deletePlaylistSongHandler,
		options: {
			auth: "openmusic_jwt"
		}
	}
]

module.exports = routes