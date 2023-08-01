const amqp = require("amqplib")
const config = require("../../utils/config")

const ProducerService = {
	sendMessage: async (queue, message) => {
		const conn = await amqp.connect(config.rabbitmq.server)
		const chan = await conn.createChannel()

		await chan.assertQueue(queue, { durable: true })
		await chan.sendToQueue(queue, Buffer.from(message))

		setTimeout(() => {
			conn.close()
		}, 1500)
	}
}

module.exports = ProducerService