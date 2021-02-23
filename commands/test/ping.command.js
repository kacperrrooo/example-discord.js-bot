module.exports = {
	name: "ping",
	run: async ({ bot, msg }) => {
		msg.channel.send(`Pong! 🏓 \`${bot.ws.ping}ms\``);
	}
}