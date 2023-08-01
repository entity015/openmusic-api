exports.up = pgm => {
	pgm.createTable("activities", {
		id: { type: "VARCHAR(64)" },
		username: { type: "VARCHAR(64)", notNull: true },
		title: { type: "TEXT", notNull: true },
		action: { type: "VARCHAR(8)", notNull: true },
		time: { type: "TEXT", notNull: true }
	})
	pgm.addConstraint("activities", "fk_activities.id_playlists.id", "FOREIGN KEY(id) REFERENCES playlists(id) ON DELETE CASCADE")
}

exports.down = pgm => {
	pgm.dropTable("activities")
}
