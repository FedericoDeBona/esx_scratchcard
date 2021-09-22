Config = {}
-- You need to change also the 'language' variable in app.js
Config.Locale = 'en'

-- Prizes are: 1, 2, 3, 5, 10, 20, 30, 150, 250, 500 multiplied by this value (if you want to change the % of drop play with app.js, it's based on prime numbers)
Config.prizeMultiplier = 100
-- Show a news banner for big wins
Config.showBrakingNews = true
-- Shows a banner news when prize is >= of this value
Config.showBrakingNewsAt = 25000
-- Timer for the banner in seconds
Config.bannerTimer = 10

-- set to false if you are not using esx_inventoryhud
Config.usingEsxInventoryHud = true