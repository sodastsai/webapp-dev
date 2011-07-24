// JavaScript Document

// Alternative Img
// We change the image source via jQuery
if (isMobileDevice()) $("img#pic").attr("src","media/meat.png");
else $("img#pic").attr("src","media/xmas.jpeg");
// ----------------------------- //

// On Mobile Devices, thers's no hover event for user. So we detect the device type first.
if (!isMobileDevice()) {
	// nav bar hover effect
	$("nav ul li").hover(
		// Hover In
		function(){
			$(this).addClass("hover");
		},
		// Hover Out
		function(){
			$(this).removeClass("hover");
		}
	);
}
// ----------------------------- //

// Env Detection
// We can check user/client environment via javascript
$("#envDetection div.content").append("<br><br>"+navigator.userAgent);
if (isAndroid()) $("#envDetection div.content").append('<br><br>This is an Android Phone!');
else if (isIphone()) $("#envDetection div.content").append('<br><br>This is an iPhone!');
else if (isIpod()) $("#envDetection div.content").append('<br><br>This is an iPod!');
// Detection
function isAndroid() {
   if (navigator.userAgent.toLowerCase().search("android") > -1) return true;
   else return false;
}
function isIphone() {
   if (navigator.userAgent.toLowerCase().search("iphone") > -1) return true;
   else return false;
}
function isIpod() {
   if (navigator.userAgent.toLowerCase().search("ipod") > -1) return true;
   else return false;
}
function isMobileDevice() { return (isAndroid()||isIphone()||isIpod()); }
// ----------------------------- //

// Input
// We can make input more easily, and also do some content check.
$("input[type='text'], input[type='tel'], input[type='number'], input[type='email']").focus(
	function(){
		$(this).addClass("focus");
	}
);
$("input[type='text'], input[type='tel'], input[type='number'], input[type='email']").blur(
	function(){
		$(this).removeClass("focus");
	}
);
$("input[type='tel']").blur(
	function(){
		// Check Content
		if ($(this).val().length!=10 && $(this).val().length!=0) alert('May be Error!');
	}
);
// ----------------------------- //

// GeoLocation
if (navigator.geolocation)
	navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError);
else
	error('not supported');
// Fecth Location Success
function geoLocationSuccess(position) {
	// Define an Object to save user location
	// Note that javascript object is not like objects in other OOP.
	// It's more like Java HashMap or Objective-C Dictionary.
	userLocation  = {
		latitude: position.coords.latitude.toFixed(3),
		longitude: position.coords.longitude.toFixed(3)
	};
	// Update Msg Board
	$("#geoLocationMsg").fadeOut();
	$("#geoLocationMsg").html('');
	$("#geoLocationMsg").fadeIn();
	// Update Coordinate
	$("#lat").html(userLocation.latitude);
	$("#lon").html(userLocation.longitude);
	// Here, we use jQuery AJAX to update address
	$.ajax({
		url: "http://maps.google.com/maps/api/geocode/json",
		type: 'GET',
		data: {
			latlng: userLocation.latitude+","+userLocation.longitude,
			language: 'zh_TW',
			sensor: isMobileDevice()
		},
		dataType: 'json',
		success: geoCodingAjaxSuccess,
		error: geoCodingAjaxFailed
	});
	// --- //
	// Following is a more detail but useless jQuery AJAX Example
	/*jQuery.ajax({
		// Connection Setting
		async: true,
		cache: false,
		global: true,
		// Target and Data transfer
		url: '',
		type: 'GET',
		data: {
			a:'b'
		},
		// Return type
		dataType: 'html',
		// Event
		beforeSend: null,
		error: null,
		success: null,
		complete: null,
	});*/
}
// Fetch Location Failed
function geoLocationError(msg) {
	$("#geoLocationMsg").fadeOut();
	$("#geoLocationMsg").html(msg);
	$("#geoLocationMsg").fadeIn();
}
// Geocoding API Sccuess
function geoCodingAjaxSuccess(data) {
	$("div#addr span").fadeOut();
	// Get JSON content directly via dot operator
	$("div#addr span").html(data.results[0].formatted_address);
	$("div#addr span").fadeIn();
}
// Geocoding API Failed
function geoCodingAjaxFailed(xhr) {
	$("#geoLocationMsg").fadeOut();
	$("#geoLocationMsg").html('Geocoding Ajax failed');
	$("#geoLocationMsg").fadeIn();
}
// ----------------------------- //

// Button
$("button").mousedown(function(){ $(this).addClass('clicked'); }).mouseup(function(){ $(this).removeClass('clicked'); });
$("#updateTS").click(updateTS);
$("#clearLS").click(clearLS);
$("#inputLS").blur(submitData);
// ----------------------------- //

// Local Storage
// Get Local Storage Length
lsCount = window.localStorage.length;
lsCountStr = "0 key";
if (lsCount>1) lsCountStr = window.localStorage.length+" keys";
else lsCountStr = window.localStorage.length+" key";
$("#lsCount").html(lsCountStr);
// Show Previous Data
lastTimeStamp = window.localStorage.getItem("visitTS");
if (!lastTimeStamp) lastTimeStamp = "No Previous Data";
$("#visitTS").html(lastTimeStamp);
lastEmail = window.localStorage.getItem("userData");
if (!lastEmail) lastEmail = "No Previous Data";
$("#inputData").html(lastEmail);
// Button Action
function updateTS() {
	date = new Date();
	timeStamp = (date.getMonth()+1)+"/"+date.getDate()+" "+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	window.localStorage.setItem("visitTS", timeStamp);
	$("#visitTS").html( window.localStorage.getItem("visitTS") );
}
function clearLS() {
	window.localStorage.clear();
	$("#lsCount").html("0 key");
}
function submitData() {
	window.localStorage.setItem("userData", $("#inputLS").val());
	$("#inputData").html( window.localStorage.getItem("userData") );
}
// ----------------------------- //

// Web SQL Database
db = window.openDatabase("contact", 1, "Example SQL From sodas mpp99A talk", 200000);
function initDB() {
	if (window.openDatabase) {
		if (db) {
			db.transaction(function(tx){
				tx.executeSql("CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age NUMBER, phone TEXT)", [],
								function(tx, results){ $("#webSQLHandler").html("S"); },
								function(tx, errors){ $("#webSQLHandler").html("E"); }
				);
			});
		} else $("#webSQLHandler").html("Failed to open database.");
	} else $("#webSQLHandler").html("Your browser is not support Web SQL.");
}
// Write
function writeDB(name, age, phone) {
	if (window.openDatabase) {
		if (db) {
			db.transaction(function(tx){
				tx.executeSql("INSERT INTO contact (name,age,phone) VALUES (?, ?, ?)", [name, age, phone],
								function(tx, results){ $("#webSQLHandler").html("Success to write database."); },
								function(tx, errors){ $("#webSQLHandler").html("Failed to write database."); }
				);
			});
		} else $("#webSQLHandler").html("Failed to open database.");
	} else $("#webSQLHandler").html("Your browser is not support Web SQL.");
}
// Read specific name
function readDB(id) {
	if (window.openDatabase) {
		if (db) {
			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM contact WHERE id=?", [id],
								function(tx, results){
									$("#webSQLHandler").html("Success to read database.");
									result = {
										id: results.rows.item(0).id,
										name: results.rows.item(0).name,
										age: results.rows.item(0).age,
										phone: results.rows.item(0).phone
									};
									postRead(result); 
								},
								function(tx, errors){ $("#webSQLHandler").html("Failed to read database."); alert(errors.code+", "+errors.message); errorCallback(tx, error); }
				);
			});
		} else $("#webSQLHandler").html("Failed to open database.");
	} else $("#webSQLHandler").html("Your browser is not support Web SQL.");
}
// Read whole database
function loadDB() {
	if (window.openDatabase) {
		if (db) {
			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM contact", [],
								function(tx, results){
									$("#webSQLHandler").html("Success to read whole database.");
									resultArray = new Array();
									for (i=0; i<results.rows.length; i++) {
										result = {
											id: results.rows.item(i).id,
											name: results.rows.item(i).name,
											age: results.rows.item(i).age,
											phone: results.rows.item(i).phone
										};
										resultArray.push(result);
									}
									postLoadDB(resultArray); 
								},
								function(tx, errors){ $("#webSQLHandler").html("Failed to read  wholedatabase."); }
				);
			});
		} else $("#webSQLHandler").html("Failed to open database.");
	} else $("#webSQLHandler").html("Your browser is not support Web SQL.");
}
// Post Read
function postRead(person) {
	$("#webSQLResult").html("id="+person.id+", name="+person.name+", age="+person.age+", phone="+person.phone);
}
function postLoadDB(personArray) {
	$("#SQLresult").html('<tr class="header"><td>id</td><td>name</td><td>age</td><td>phone</td></tr>');
	for (i=0; i<personArray.length; i++)
		$("#SQLresult").append('<tr><td>'+personArray[i].id+'</td><td>'+personArray[i].name+'</td><td>'+personArray[i].age+'</td><td>'+personArray[i].phone+'</td></tr>');
}
// Form method
$("#addToDB").click(function(){
	name = $("#dbForm input[name='name']").val();
	age = $("#dbForm input[name='age']").val();
	phone = $("#dbForm input[name='phone']").val();
	privacy = $("#dbForm input[name='privacy']").is(':checked');
	
	// Check Empty
	if (!name||!age||!phone||!privacy) {
		alert('Please fill all field!');
		return;
	}
	
	writeDB(name, age, phone);
	loadDB();
});
// ----------------------------- //