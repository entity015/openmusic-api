const { Pool } = require("pg")

class ActivitiesService {
	constructor() {
		this._pool = new Pool()
	}

	async addActivity({ id, username, title, action }) {
		const time = new Date().toISOString()
		const query = {
			text: "INSERT INTO activities VALUES($1,$2,$3,$4,$5) RETURNING action",
			values: [id,username,title,action,time]
		}
		await this._pool.query(query)
	}
}

module.exports = ActivitiesService