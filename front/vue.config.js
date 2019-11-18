module.exports = {
	devServer: {
		open: false,
		proxy: {
			"/api": {
				target: "http://localhost:3300",
			}
		}
	}
};