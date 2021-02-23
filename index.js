const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const { config } = require("dotenv");

config({
	path: "./.env"
});

class Bot extends Client {
	constructor(clientOptions) {
		super(clientOptions);

		// Dołączanie loggera do obiektu bota
		this.logger = require("./utils/logger.util").logger;

		// Dołączanie configu do obiektu bota
		this.config = require("./config.json");

		// Wczytywanie handlerów
		readdirSync("./handlers/").filter(x => x.endsWith(".handler.js") && !x.startsWith("--")).forEach(file => {
			try {
				const { init } = require(`./handlers/${file}`);

				if (!init) return this.logger.warn(`Nie można załadować ${file}`);

				init(this);

				this.logger.info(`Załadowano ${file}`);
			} catch (e) {
				this.logger.error(`Wystąpił błąd podczas ładowania ${file}`);
				console.log(e);
			}
		});

		this.login(process.env.BOT_TOKEN);
	}
}

new Bot({ disableMentions: "everyone" });