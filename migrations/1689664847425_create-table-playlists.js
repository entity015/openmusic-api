/* eslint-disable camelcase */

exports.up = pgm => {
	pgm.createTable("playlists", {
		id: { type: "VARCHAR(64)", primaryKey: true },
		name: { type: "TEXT", notNull: true },
		owner: { type: "VARCHAR(64)" }
	})
}

exports.down = pgm => {
	pgm.dropTable("playlists")
}
