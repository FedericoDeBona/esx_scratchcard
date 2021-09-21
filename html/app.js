//CHANGE HERE TO CHANGE LANGUAGE
var language = "en"
//CHANGE HERE TO CHANGE LANGUAGE


// Translation stuff
var locales = {}
locales.en = {
	title: "SCRATCH & WIN",
	winning_numbers: "WINNING NUMBERS",
	your_numebrs: "YOUR NUMBERS",
	info_box: "If in \"YOUR NUMBERS\" you find one or more \"WINNING NUMBERS\" you win the prize or the sum of the corresponding prizes.",
	prize_title : "TOTAL PRIZE",
	lose_title: "MAYBE NEXT TIME",
	win_title: "CONGRATULATIONS",
	button_next: "Next",
	button_close: "Accept"
}
locales.it = {
	title: "GRATTA E VINCI",
	winning_numbers: "NUMERI VINCENTI",
	your_numebrs: "I TUOI NUMERI",
	info_box: "Se ne \"I TUOI NUMERI\" trovi, una o piu' volte, uno o piu' \"NUMERI VINCENTI\" vinci il premio o la somma dei premi corrispondenti.",
	prize_title : "PREMIO TOTALE",
	lose_title: "RITENTA E SARAI PIÙ FORTUNATO",
	win_title: "CONGRATULAZIONI",
	button_next: "Avanti",
	button_close: "Accetta"
}


$(".all").hide();
var locale = locales[language]
document.getElementsByClassName("title")[0].getElementsByTagName("h2")[0].innerHTML = locale.title
document.getElementsByClassName("box-title")[0].innerHTML = locale.winning_numbers
document.getElementsByClassName("box-title")[1].innerHTML = locale.your_numebrs
document.getElementsByClassName("info-box")[0].innerHTML = locale.info_box
document.getElementsByClassName("prize-title-text")[0].innerHTML = locale.prize_title
document.getElementsByClassName("prize-title-text")[1].innerHTML = locale.prize_title
document.getElementsByClassName("prize-title-2")[0].innerHTML = locale.lose_title
document.getElementsByClassName("prize-title-2")[1].innerHTML = locale.win_title
document.getElementsByClassName("btn-next")[0].innerHTML = locale.button_next
document.getElementsByClassName("btn-close")[0].innerHTML = locale.button_close
document.getElementsByClassName("btn-close")[1].innerHTML = locale.button_close

window.addEventListener("message", function (event) {
	if (event.data.action == "display") {
		$(".all").show();
		
		var prizeMultiplier = event.data.prizeMultiplier
		var canvas=document.getElementById("winning-numbers-image");
		var ctx=canvas.getContext("2d");

		var cover = new Image();
		cover.onload = start;
		cover.src = "img/cover.png";
		var brush = new Image();
		brush.onload = start;
		brush.src = "img/brush.png";
		var imageCount=3;

		// My numbers
		var canvas2=document.getElementById("my-numbers-image");
		var ctx2=canvas2.getContext("2d");

		var cover2 = new Image();
		cover2.onload = start;
		cover2.src = "img/cover_2.png";

		var container2 = document.getElementsByClassName("my-numbers")[0]

		var winningNumbers = []
		var myNumbers = []
		var prizes = []

		for (var i = 0; i < 15; i++) {
			myNumbers[i] = Math.floor(Math.random() * 89) + 11;
		}
		for (var i = 0; i < 5; i++) {
			var num = Math.floor(Math.random() * 89) + 11;
			while (winningNumbers.lastIndexOf(num) !== -1) {
		        num = Math.floor(Math.random() * 89) + 11;
		    }
			winningNumbers[i] = num
			
		}

		for (var i = 0; i < 1000; i++) {
			if(i%2==0)
				prizes[i] = 1
			else if(i%3==0)
				prizes[i] = 2
			else if(i%5==0)
				prizes[i] = 3
			else if(i%7==0)
				prizes[i] = 5
			else if(i%9==0)
				prizes[i] = 10
			else if(i%13==0)
				prizes[i] = 20
			else if(i%17==0)
				prizes[i] = 30
			else if(i%131==0)
				prizes[i] = 150
			else if(i%191==0)
				prizes[i] = 250
			else if(i%1000==0) // one chance in a thousand
				prizes[i] = 500
			else
				prizes[i] = 1
		}

		winningPrize = []
		winningPrize.length = winningNumbers.length
		for (var i = 0; i < 101; i++) {
			winningPrize[i] = prizes[Math.floor(Math.random() * prizes.length)]
		}

		potentialPrize = []
		potentialPrize.length = myNumbers.length
		for (var i = 0; i < potentialPrize.length; i++) {
			potentialPrize[myNumbers[i]] = winningPrize[myNumbers[i]] * prizeMultiplier
		}

		for (var i = 0; i < winningNumbers.length; i++) {
			document.getElementsByClassName("winning-number")[i].textContent = winningNumbers[i]
		}

		for (var i = 0; i < myNumbers.length; i++) {
			var num = document.getElementsByClassName("my-number")[i]
			num.innerHTML = myNumbers[i] + "<div style='font-size: 15px;'>" + "$" + potentialPrize[myNumbers[i]].toLocaleString()  + "</div>"
		}

		var mouseDown = false;
		document.body.onmousedown = function() { 
		  mouseDown = true
		}
		document.body.onmouseup = function() {
		  mouseDown = false
		}

		var container = document.getElementsByClassName("winning-numbers")[0]
		function start(){
			// wait for all images to load
			if(--imageCount>0){return;}

			// resize the canvas to jellybean size
			canvas.width=cover.width;
			canvas.height=cover.height;
			canvas2.width=cover2.width;
			canvas2.height=cover2.height;

			// draw the cover on the canvas
			ctx.drawImage(cover,0,0);
			ctx2.drawImage(cover2,0,0);
		}

		canvas.addEventListener('mousemove', function(mouseEvent) {
			if(mouseDown) { 
				var xPosition = mouseEvent.clientX - container.getBoundingClientRect().left - (brush.clientWidth / 2);
				var yPosition = mouseEvent.clientY - container.getBoundingClientRect().top - (brush.clientHeight / 2);

				ctx.globalCompositeOperation='destination-out';
				ctx.drawImage(brush,xPosition-(brush.width/2),yPosition-(brush.height/2));
				ctx.globalCompositeOperation='source-over';
			}
		});

		document.getElementsByTagName("html")[0].addEventListener('mouseup', function(mouseEvent) {
			var alpha1 = getAlphaPerc(ctx, cover)
			var alpha2 = getAlphaPerc(ctx2, cover2)
			if (alpha1 >= 85 && alpha2 >= 50){
				//Check if win
				var totalPrize = 0
				for (var i = 0; i < winningNumbers.length; i++) {
					for (var j = 0; j < myNumbers.length; j++) {
						if(winningNumbers[i] == myNumbers[j]){
							totalPrize += potentialPrize[winningNumbers[i]]
						}
					}
				}
				document.getElementsByClassName("info-box")[0].style.display = 'none'
				document.getElementsByClassName("btn-next")[0].style.display = 'block'

				$(".btn-next").click(function() {
					document.getElementsByClassName("container")[0].style.display = 'none'
					if(totalPrize == 0){
						document.getElementsByClassName("win-screen-lose")[0].style.display = 'block'
					}else{
						document.getElementsByClassName("win-screen-win")[0].style.display = 'block'
						document.getElementsByClassName("prize-dollars")[0].innerHTML = "$ " + totalPrize.toLocaleString()
					}
					$(".btn-close").unbind('click').bind("click", function(e) {	
						$.post("http://esx_scratchcard/NUIFocusOff", JSON.stringify({totalPrize}));
						location.reload();
						return false;
					});
				});
			}
		});

		function getAlphaPerc(theContex, theCover){
			var imgd = theContex.getImageData(0, 0, theCover.width, theCover.height)
			var pix = imgd.data

			var cont = 0
			for (var i = 0, n = pix.length; i < n; i += 4) {
				if(pix[i+3] == 0){
					cont++
				}
			}
			return Math.round((cont/pix.length)*100*4) // *4 because i, i+1, i+2, (r,g,b) pixels are ignored
		}

		// MY NUMBERS
		canvas2.addEventListener('mousemove', function(mouseEvent) {
			if(mouseDown) { 
				var xPosition = mouseEvent.clientX - container2.getBoundingClientRect().left - (brush.clientWidth / 2);
				var yPosition = mouseEvent.clientY - container2.getBoundingClientRect().top - (brush.clientHeight / 2);

				ctx2.globalCompositeOperation='destination-out';
				ctx2.drawImage(brush,xPosition-(brush.width/2),yPosition-(brush.height/2));
				ctx2.globalCompositeOperation='source-over';
			}
		});
	}
	if(event.data.action == "hide") {
		$(".all").hide();
	}
})
