const { readdirSync } = require("fs");
const { Collection } = require("discord.js");

exports.init = (bot) => {
	if (!bot.commands) bot.commands = new Collection();
	if (!bot.aliases) bot.aliases = new Collection();

	readdirSync("./commands/").forEach(dir => {
		readdirSync(`./commands/${dir}/`).filter(x => x.endsWith(".command.js") && !x.startsWith("--")).forEach(file => {
			try {
				const command = require(`../commands/${dir}/${file}`);

				if (!command.name || !command.run) return bot.logger.warn(`Nie można załadować ${file} ponieważ brakuje name lub run`);

				if (bot.commands.has(command.name)) return bot.logger.warn(`Nie można załadować ${file} ponieważ ta nazwa jest już zajęta!`);

				bot.commands.set(command.name, command);

				bot.logger.info(`Załadowano ${file} jako ${command.name}`);

				if (!command.aliases || !Array.isArray(command.aliases)) return;

				command.aliases.forEach(alias => {
					if (bot.aliases.has(alias)) return;

					bot.aliases.set(alias, command.name);
				});
			} catch (e) {
				bot.logger.error(`Wystąpił błąd podczas ładowania ${file}`);
				console.log(e);
			}
		});
	});
}