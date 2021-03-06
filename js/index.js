// Based on an example:
//https://github.com/don/cordova-plugin-ble-central

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
    "FD:80:46:B7:ED:2C": 2,
    "D4:79:09:AC:61:BF": 3
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
