/* eslint-disable camelcase */

exports.up = pgm => {
	pgm.createTable("albums", {
		id: { type:"VARCHAR(64)", primaryKey: true },
		name: { type:"TEXT", notNull: true },
		year: { type:"SMALLINT", notNull: true }
	})
	pgm.createTable("songs", {
		id: { type:"VARCHAR(64)", primaryKey: true },
		title: { type:"TEXT", notNull: true },
		year: { type:"SMALLINT", notNull: true },
		genre: { type:"TEXT", notNull: true },
		performer: { type:"TEXT", notNull: true },
		duration: { type:"SMALLINT" },
		album_id: { type:"TEXT" }
	})
}

exports.down = pgm => {
	pgm.dropTable("albums")
	pgm.dropTable("songs")
}
