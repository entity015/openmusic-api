const config = {
	app: {
		host: process.env.HOST,
		port: process.env.PORT
	},
	jwt: {
		access_key: process.env.ACCESS_TOKEN_KEY,
		access_age: process.env.ACCESS_TOKEN_AGE,
		refresh_key: process.env.REFRESH_TOKEN_KEY
	},
	rabbitmq: {
		server: process.env.RABBITMQ_SERVER
	},
	redis: {
		host: process.env.REDIS_SERVER
	}
}

module.exports = config