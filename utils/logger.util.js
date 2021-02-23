const dayjs = require("dayjs");
const { blue, red, green, yellow } = require("chalk");

const timestamp = () => {
	return dayjs(Date.now()).format("DD:MM:YYYY HH:mm:ss");
}

exports.logger = {
	info: (content) => {
		console.log(blue(`[INFO] [${timestamp()}] ${content}`));
	},
	ready: (content) => {
		console.log(green(`[READY] [${timestamp()}] ${content}`));
	},
	warn: (content) => {
		console.log(yellow(`[WARN] [${timestamp()}] ${content}`));
	},
	error: (content) => {
		console.log(red(`[ERROR] [${timestamp()}] ${content}`));
	}
}