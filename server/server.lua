ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterNetEvent("scratchandwin:getPrize")
AddEventHandler("scratchandwin:getPrize", function(prize)
	local xPlayer = ESX.GetPlayerFromId(source)
    local playerName = xPlayer.getName()
    xPlayer.addAccountMoney('bank', tonumber(prize))
    if(Config.showBrakingNews == true and prize >= Config.showBrakingNewsAt) then
    	TriggerClientEvent("scratchandwin:news", -1, playerName, prize)
    end
end)

ESX.RegisterUsableItem('scratchcard', function(playerId)
    local xPlayer = ESX.GetPlayerFromId(playerId)
    xPlayer.removeInventoryItem('scratchcard', 1)
    xPlayer.triggerEvent("scratchandwin:open")
end)

RegisterCommand("tt", function(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    local playerName = xPlayer.getName()
    TriggerClientEvent("scratchandwin:news", -1, playerName, 500000)
end)