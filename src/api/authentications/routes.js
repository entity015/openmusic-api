const routes = handler => [
	{
		path: "/authentications",
		method: "POST",
		handler: handler.postAuthenticationHandler
	},
	{
		path: "/authentications",
		method: "PUT",
		handler: handler.putAuthenticationHandler
	},
	{
		path: "/authentications",
		method: "DELETE",
		handler: handler.deleteAuthenticationHandler
	}
]

module.exports = routes