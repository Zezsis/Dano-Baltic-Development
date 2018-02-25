// Based on an example:
//https://github.com/don/cordova-plugin-ble-central


// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

// ASCII only
function stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}

// this is ble hm-10 UART service
/*var blue= {
    serviceUUID: "0000FFE0-0000-1000-8000-00805F9B34FB",
    characteristicUUID: "0000FFE1-0000-1000-8000-00805F9B34FB"
};*/

//the bluefruit UART Service
var blue = {
    serviceUUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    txCharacteristic: '6e400002-b5a3-f393-e0a9-e50e24dcca9e', // transmit is from the phone's perspective
    rxCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e'  // receive is from the phone's perspective
}

var ConnDeviceId;
var deviceList = [];

function onLoad() {
    hideBeacons();
    document.addEventListener('deviceready', onDeviceReady, false);
    //bleDeviceList.addEventListener('touchstart', conn, false); // assume not scrolling
}

function onDeviceReady() {
    refreshDeviceList();
}

var beacons = {
    "D4:F7:2C:CD:54:BD": 1,
    "37:A4:93:A5:18:DF": 2,
    "9C:8C:6E:4F:28:1F": 3
};

function refreshDeviceList() {
    //document.getElementById("bleDeviceList").innerHTML = ''; // empties the list
    if (cordova.platformId === 'android') { // Android filtering is broken
        //Beacon1 D4:F7:2C:CD:54:BD
        ble.scan([], 5, onDiscoverDevice, onError);
    } else {
        //alert("Disconnected");
        ble.scan([blue.serviceUUID], 5, onDiscoverDevice, onError);
    }

}


function onDiscoverDevice(device) {
    var beacon = beacons[device.id];
    if (beacon) {
        hideBeacons("Beacon" + beacon);
        ShowBeacon(beacon);
    }
}


function conn() {

    var deviceTouch = event.srcElement.innerHTML;
    document.getElementById("debugDiv").innerHTML = ""; // empty debugDiv
    var deviceTouchArr = deviceTouch.split(",");
    ConnDeviceId = deviceTouchArr[1];
    //for debug:
    document.getElementById("debugDiv").innerHTML += "<br>" + deviceTouchArr[0] + "<br>" + deviceTouchArr[1];
    ble.connect(ConnDeviceId, onConnect, onConnError);
}

function onError(reason) {
    alert("ERROR: " + reason); // real apps should use notification.alert
}

var timer = setInterval(BeaconDetection, 1000);
var timer2 = setInterval(foo, 1000);

function foo() {
    onLoad();
}


function BeaconDetection() {
    refreshDeviceList();
}

function ShowBeacon(beacon) {
    var x = document.getElementById("Beacon" + beacon);
    x.style.display = "block";
}

function toggleDiv(room) {
    var x = document.getElementById(room);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function hideBeacons(beacon) {
    var beacons = document.getElementsByClassName("Beacon");
    for (var i = 0; i < beacons.length; i++) {
        if (beacon != beacons[i].id)
        beacons[i].style.display = "none";
    }
}
