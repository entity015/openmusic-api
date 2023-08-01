const DBToModel = ({
	id,
	title,
	year,
	genre,
	performer,
	duration,
	album_id: albumId
}) => ({
	id,
	title,
	year,
	genre,
	performer,
	duration,
	albumId
})

const DBtoAlbumModel = ({
	id,
	name,
	year,
	cover_url: coverUrl
}) => ({
	id,
	name,
	year,
	coverUrl
})


module.exports = { DBToModel, DBtoAlbumModel }