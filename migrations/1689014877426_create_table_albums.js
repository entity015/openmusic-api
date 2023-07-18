/* eslint-disable camelcase */

exports.up = pgm => {
	pgm.createTable("albums", {
		id: { type:"VARCHAR(64)", primaryKey: true },
		name: { type:"TEXT", notNull: true },
		year: { type:"SMALLINT", notNull: true }
	})
}

exports.down = pgm => {
	pgm.dropTable("albums")
}