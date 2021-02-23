const { readdirSync } = require("fs");

exports.init = (bot) => {
	readdirSync("./events/").filter(x => x.endsWith(".event.js") && !x.startsWith("--")).forEach(file => {
		try {
			const { run } = require(`../events/${file}`);

			if (!run) return bot.logger.warn(`Nie można załadować ${file} ponieważ nie posiada run!`);

			bot.on(file.split(".")[0], (...args) => run(bot, ...args));

			bot.logger.info(`Załadowano ${file} jako ${file.split(".")[0]}`);
		} catch (e) {
			bot.logger.error(`Wystąpił błąd podczas ładowania ${file}`);
			console.log(e);
		}
	});
}