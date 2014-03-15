function refresh(data) {

	var sound = document.getElementById("sound");
	if (data === null) {
		alert('No data received from server!');
		return;
	}

	var serverTimeStamp = data.metadata.servertime;
	if (Math.floor(Math.random() * 2)) {
		data.data[0].type = 'troponin';
	}

	var greenCount = 0;
	var orangeCount = 0;
	var redCount = 0;
	var thereIsTroponin = false;

	var greemItems = [];
	var orangeItems = [];
	var redItems = [];

	//Parse the server data
	//========================================================
	for (i = 0; i < data.data.length; i++) {
		d = data.data[i];

		delta = d.enteredTime - serverTimeStamp;
		minutes = Math.floor(delta / 60) % 60;

		if (d.type == 'troponin') {
			thereIsTroponin = true;
		}

		if (minutes < 10) {
			redCount++;
			redItems.push(d.id + (d.type ? ' ' + d.type : ''));
		}
		else if (minutes < 14) {
			orangeCount++;
			orangeItems.push(d.id + (d.type ? ' ' + d.type : ''));
		}
		else { //> 15
			greenCount++;
			if (d.type) {
				greemItems.push(d.id + (d.type ? ' ' + d.type : ''));
			}
		}
	}

	//Update the UI
	//========================================================
	greenCounter = document.getElementById('greenCounter');
	orangeCounter = document.getElementById('orangeCounter');
	redCounter = document.getElementById('redCounter');

	greenList = document.getElementById('greenList');
	orangeList = document.getElementById('orangeList');
	redList = document.getElementById('redList');

	troponinAlert = document.getElementById('notificationTab');

	//Update values
	greenCounter.value = greenCount;
	orangeCounter.value = orangeCount;
	redCounter.value = redCount;

	greenList.data = greemItems;
	orangeList.data = orangeItems;
	redList.data = redItems;

	//Troponin
	//========================================================
	alertDiv = document.getElementById('alertNotifications');

	//remove all childs
	while (alertDiv.hasChildNodes()) {
		alertDiv.removeChild(alertDiv.lastChild);
	}
	if (thereIsTroponin) {
		//sound.play();
		//      <hhets-notification id="notificationTab" value="Troponin Alert!" color="blue"></hhets-notification>

		troponinAlert = document.createElement("hhets-notification");
		troponinAlert.value = "Troponin Alert!";
		troponinAlert.color = "blue";
		alertDiv.appendChild(troponinAlert);
	}

}