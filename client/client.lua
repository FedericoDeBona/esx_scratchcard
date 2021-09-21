ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(10)
	end
end)

function close()
	SendNUIMessage({
		action = "hide"
	})
	SetNuiFocus(false, false)
end

function open()
	SendNUIMessage({
		action = "display",
		prizeMultiplier = Config.prizeMultiplier
	})
	SetNuiFocus(true, true)
end

RegisterNUICallback(
	"NUIFocusOff", function(data)
		local prize = tonumber(data.totalPrize)
		close()
		if(prize ~= 0) then
			TriggerServerEvent("scratchandwin:getPrize", prize)
		end
	end
)

RegisterNetEvent("scratchandwin:news")
AddEventHandler("scratchandwin:news", function(playerName, prize)
	ESX.Scaleform.ShowBreakingNews(_U('news_title'), playerName .. _U('news_middle') .. ESX.Math.GroupDigits(prize) .. "$".. _U('news_end'),  "", Config.bannerTimer)
end)

RegisterNetEvent("scratchandwin:open")
AddEventHandler("scratchandwin:open", function()
	if Config.usingEsxInventoryHud then
		TriggerEvent("esx_inventoryhud:closeHud")
	end
	ESX.UI.Menu.CloseAll()
	open()
end)

