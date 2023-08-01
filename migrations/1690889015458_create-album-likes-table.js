exports.up = pgm => {
	pgm.createTable("album_likes", {
		id: { type: "VARCHAR(64)", primaryKey: true },
		user_id: { type: "VARCHAR(64)", notNull: true },
		album_id: { type: "VARCHAR(64)", notNull: true }
	})
	pgm.addConstraint("album_likes", "fk_album_likes.user_id_users.id", "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE")
	pgm.addConstraint("album_likes", "fk_album_likes.album_id_albums.id", "FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE")
	pgm.addConstraint("album_likes", "unique_user_id_and_abum_id", "UNIQUE(user_id,album_id)")
}

exports.down = pgm => {
	pgm.dropTable("album_likes")
}
