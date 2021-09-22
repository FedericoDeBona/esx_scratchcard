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
		TriggerServerEvent("esx_scratchcard:done")
	end
)

RegisterNUICallback(
	"scratchTable", function(data)
		TriggerServerEvent("esx_scratchcard:setData", data.potentialPrize, data.winningNumbers)
	end
)

RegisterNetEvent("esx_scratchcard:news")
AddEventHandler("esx_scratchcard:news", function(playerName, prize)
	ESX.Scaleform.ShowBreakingNews(_U('news_title'), playerName .. _U('news_middle') .. ESX.Math.GroupDigits(prize) .. "$".. _U('news_end'),  "", Config.bannerTimer)
end)

RegisterNetEvent("esx_scratchcard:open")
AddEventHandler("esx_scratchcard:open", function()
	if Config.usingEsxInventoryHud then
		TriggerEvent("esx_inventoryhud:closeHud")
	end
	ESX.UI.Menu.CloseAll()
	open()
end)