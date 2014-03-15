var activeTroponins = [];		//Contains the troponins of the last refresh
var refreshedTroponins = [];	//Contains the troponins of the actual refresh

function refresh(data) {
console.log(data);
	//Init
	//========================================================
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
	var playTroponinSound = false;

	var greemItems = [];
	var orangeItems = [];
	var redItems = [];

	//New wave of data...
	//========================================================
	activeTroponins = refreshedTroponins;
	refreshedTroponins = [];
	
	//Parse the server data
	//========================================================
	for (i = 0; i < data.data.length; i++) {
	
		//A bit of parsing
		d = data.data[i];
		delta = d.enteredTime - serverTimeStamp;
		minutes = Math.floor(delta / 60) % 60;

		//Try to add a troponin to the list.
		//If it's a new one, play the sound!
		if (d.type == 'troponin') {
			added = addTroponinToList(d.id);
			if (added){
				playTroponinSound = true;
			}
		}

		//Distribute the test results per categories
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

	//Troponin Treatments
	//========================================================
	alertDiv = document.getElementById('alertNotifications');

	//remove all childs
	while (alertDiv.hasChildNodes()) {
		alertDiv.removeChild(alertDiv.lastChild);
	}
	
	//Play troponin sound if a new troponin has been detected
	if (playTroponinSound) {
		sound.play();
		//console.log('PLAY');
	}
	
	//Display the troponin alert banner if there is at least one troponin
	if (activeTroponins.length != 0){
		troponinAlert = document.createElement("hhets-notification");
		troponinAlert.value = "Troponin Alert!";
		troponinAlert.color = "blue";
		alertDiv.appendChild(troponinAlert);
	}
	
	//Clear the old troponins
	clearProcessedTroponins();
	//console.log(activeTroponins);
	//console.log(refreshedTroponins);
}

/**
 * Try to add a new troponin to the list.
 * If a new troponin was added, return true.
 * Else, return false if it was already in the list.
*/
function addTroponinToList(troponin_id){

	indexActive = activeTroponins.indexOf(troponin_id);
	indexRefresh = refreshedTroponins.indexOf(troponin_id);
	
	if (indexRefresh === -1){
		refreshedTroponins.push(troponin_id);
	}
	if (indexActive === -1){
		return true;
	}
	return false;
}

/**
 * This function will compared the refreshed troponins with the active troponins.
 * If a troponin was active and is not in the refresh list then it has been processed 
 * and shall be removed from the list.
*/
function clearProcessedTroponins(){
	for (var i=0; i<activeTroponins.length; i++){
		if (refreshedTroponins.indexOf(activeTroponins[i]) === -1){
			activeTroponins.splice(i, 1);
		}
	}
}