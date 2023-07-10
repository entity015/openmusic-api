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


module.exports = { DBToModel }