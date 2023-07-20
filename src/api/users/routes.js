const routes = handler => [
	{
		path: "/users",
		method: "POST",
		handler: handler.postUserHandler
	}
]

module.exports = routes