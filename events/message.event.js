exports.run = async (bot, msg) => {
	if (!msg.guild) return;
	if (msg.author.bot) return;

	if (!msg.content.startsWith(bot.config.prefix)) return;

	const args = msg.content.slice(bot.config.prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (!cmd.length) return;

	const command = bot.commands.get(cmd) || bot.command.get(bot.aliases.get(cmd));

	if (!command) return;

	const e = await command.run({ bot, msg, args, cmd }).catch(e => e);

	if (e instanceof Error) {
		msg.channel.send(e.toString());
		console.log(e);
	}
}