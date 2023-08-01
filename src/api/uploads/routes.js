const routes = handler => [
	{
		path: "/albums/{id}/covers",
		method: "POST",
		handler: handler.postAlbumCoverHandler,
		options: {
			payload: {
				allow: "multipart/form-data",
				multipart: true,
				output: "stream",
				maxBytes: 512000
			}
		}
	},
	{
		path: "/upload/{param*}",
		method: "GET",
		handler: {
			directory: {
				path: require("path").resolve(__dirname, "file")
			}
		}
	}
]

module.exports = routes