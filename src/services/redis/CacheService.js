const config = require("../../utils/config")
const redis = require("redis")

class CacheService {
	constructor() {
		this._client = redis.createClient({
			socket: { host: config.redis.host }
		})
		this._client.on("error", error => console.log(error))
		this._client.connect()
	}

	set(key, val, EX = 1800 ) {
		return this._client.set(key,val, { EX })
	}
	async get(key) {
		const result = await this._client.get(key)
		if(!result) throw new Error("Cache tidak ditemukan")
		return result
	}
	delete(key) {
		return this._client.del(key)
	}
}

module.exports = CacheService