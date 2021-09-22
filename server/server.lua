ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterNetEvent("esx_scratchcard:getPrize")
AddEventHandler("esx_scratchcard:getPrize", function(prize)
	local xPlayer = ESX.GetPlayerFromId(source)
    local playerName = xPlayer.getName()
    xPlayer.addAccountMoney('bank', tonumber(prize))
    if(Config.showBrakingNews == true and prize >= Config.showBrakingNewsAt) then
    	TriggerClientEvent("esx_scratchcard:news", -1, playerName, prize)
    end
end)

ESX.RegisterUsableItem('scratchcard', function(playerId)
    local xPlayer = ESX.GetPlayerFromId(playerId)
    xPlayer.removeInventoryItem('scratchcard', 1)
    xPlayer.triggerEvent("esx_scratchcard:open")
end)