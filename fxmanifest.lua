fx_version 'adamant'

game 'gta5'

ui_page 'html/index.html'

files {
	"html/index.html",
	"html/app.js",
	"html/main.css",

	"html/img/background.jpg",
	"html/img/brush.png",
	"html/img/cover.png",
	"html/img/cover_2.png",
}

client_scripts {
	'@es_extended/locale.lua',
	'locales/en.lua',
	'locales/it.lua',
	'config.lua',
	'client/client.lua',
}

server_scripts {
	'server/server.lua',
	'config.lua'
}