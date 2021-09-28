ESX = nil
session = {}

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterNetEvent("esx_scratchcard:done")
AddEventHandler("esx_scratchcard:done", function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)
	local playerName = xPlayer.getName()
	local prize = session[_source].prize
	xPlayer.addAccountMoney('bank', prize)
	if(Config.showBrakingNews == true and prize >= Config.showBrakingNewsAt) then
		TriggerClientEvent("esx_scratchcard:news", -1, playerName, prize)
	end
	session[_source].prize = nil
end)

RegisterNetEvent("esx_scratchcard:setData")
AddEventHandler("esx_scratchcard:setData", function(data1, data2)
	local _source = source
	if session[_source] == nil or session[_source].prize ~= nil then
		print(_source .. " tried to cheat with esx_scratchcard")
		return
	end
	local prize = 0
	for k, v in pairs(data1) do
		local n = tonumber(k-1)
		local p = v
		for k, v in pairs(data2) do
			local wN = tonumber(v)
			if n == wN then
				prize = prize + p
			end
		end
	end
	session[_source].prize = prize
end)

AddEventHandler('playerDropped', function()
	session[source] = nil
end)

ESX.RegisterUsableItem('scratchcard', function(playerId)
	local xPlayer = ESX.GetPlayerFromId(playerId)
	xPlayer.removeInventoryItem('scratchcard', 1)
	TriggerClientEvent("esx_scratchcard:open", playerId)
	session[playerId] = { prize = nil}
end)