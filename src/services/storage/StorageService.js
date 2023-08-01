const fs = require("fs")
const path = require("path")

class StorageService {
	constructor(folder) {
		this._folder = folder

		if(!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
	}

	writeFile(file, meta) {
		const filename = +new Date() + meta.filename
		const filepath = path.resolve(this._folder, filename)
		const filedesc = fs.createWriteStream(filepath)

		return new Promise((resolve, reject) => {
			filedesc.on("error", error => reject(error))
			file.pipe(filedesc)
			file.on("end", () => resolve(filename))
		})
	}
}

module.exports = StorageService