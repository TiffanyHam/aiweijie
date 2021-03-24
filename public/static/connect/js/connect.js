window.onload = function() {
	
	internationalizes();
	if(window.hilink) {
        getSystemInfo();
    }
	
	//注册30s以上，提示连接超时
	setTimeout(() => {
		this.document.getElementById("btnContainer").style.cssText = "display:flex";
		if(isDark){
			this.document.getElementById("btnContainer").style.background = "#000000";
			this.document.getElementsByClassName("btn")[0].style.background = "#4D4D4D";
			this.document.getElementsByClassName("btn")[0].style.color = "#3F97E9 ";
		}
		this.document.getElementById("alertContainer").style.cssText = "display:block";
		this.document.getElementById("progressContainer").style.cssText = "display:none";
	}, 30 * 1000);
	
	let i = 1;
	let timer = setInterval(() => {
		if(i>=91){
			clearInterval(timer);
			return
		}
		this.document.getElementById("progressValue").innerHTML = i;
		i++;
	}, 150);
}
var isIOS = false;
var deviceId = '';
var mac = '';
var serviceId = "0000ffb0-0000-1000-8000-00805f9b34fb";
var characteristicId = "0000ffb2-0000-1000-8000-00805f9b34fb";
var fwv = '1.0';
var hwv = '1.0';
var isDark = false;
/*
 * 获取手机系统信息
 */
function getSystemInfo() {
	window.getSystemInfoSyncCallBack = info => {
		let data = JSON.parse(info);
		if(data.platform == "iOS") {
			console.log("iOS设备")
			isIOS = true;
		} else {
			console.log("andorid设备")
            isIOS = false;
            setDarkMode();
		}
		listeningBleChange();
		getBluetoothAdapterState();
	}
	window.hilink.getSystemInfoSync('getSystemInfoSyncCallBack')
}
/*
 * 监听蓝牙变化
 */
function listeningBleChange() {
	window.hilink.onBluetoothAdapterStateChange('onBlueToothAdapterStateChangeCallback') // 监听蓝牙状态
	window.onBlueToothAdapterStateChangeCallback = res => { // 监听蓝牙状态回调函数
		let data = JSON.parse(res)
		console.log('监听蓝牙状态', data)
		if(data.available) {
			getUnRegisterDeviceFun();
		} else {
			openBlueTooth();
		}
	}
}

/*
 * 获取蓝牙状态
 */
function getBluetoothAdapterState() {
	window.hilink.getBluetoothAdapterState("getBlueToothAdapterStateCallback")
	window.getBlueToothAdapterStateCallback = res => {
		let data = JSON.parse(res)
		console.log('1.蓝牙当前状态', data)
		if(data.available) {
			getUnRegisterDeviceFun();
		} else {
			openBlueTooth();
		}
	}
}

/**
 * 打开蓝牙
 */
function openBlueTooth() {
	window.hilink.openBluetoothAdapter() // 打开蓝牙
}

/**
 * 获取当前页面被选中的未注册的设备 
 */
function getUnRegisterDeviceFun() {

	window.getCurrentUnregisteredDeviceCallback = res => {
		let data = JSON.parse(res)
		deviceId = data.deviceId
		console.log('2.获取A的MAC地址(ios的uuid)', data)
		if(isIOS) {
			getIOSdevices();
		} else {
			mac = deviceId;
			connectDevice();
		}
	}
	window.hilink.getCurrentUnregisteredDevice('getCurrentUnregisteredDeviceCallback')
}
/**
 * 连接设备
 */
function connectDevice() {
	//去连接设备
	window.hilink.createBLEConnection(deviceId)
	window.hilink.onBLEConnectionStateChange('onBLEConnectionStateChangeCallback') // 监听蓝牙设备连接返回
	window.onBLEConnectionStateChangeCallback = res => { // 监听蓝牙设备连接返回函数
		let data = JSON.parse(res)
		console.log('3.连接监听结果', data)
		if(data.connected) {
			registerBleDevice(deviceId);
		} else {
			getSystemInfo();
		}
	}
}

/**
 * 注册设备
 */
function registerBleDevice(mac) {
	console.log('注册设备:', mac)
	window.hilink.registerBleDevice(mac, fwv, hwv, 'registerBleDeviceCallback')
	window.registerBleDeviceCallback = res => {
		console.log(res)
	}
}

/**
 * 获取ios的MAC地址
 */
function getIOSdevices() {
	window["onBluetoothDeviceFoundCallBack"] = info => {
		let data = JSON.parse(info);
        //let macInfo = this.getMAC(data);  hezhen change
        let macInfo = getMAC(data);
		if(macInfo[0] === 1) {
			mac = macInfo[1]
			connectDevice();
		} else if(macInfo[0] === 2) {
			console.log('manufacturerData 为空')
			getMacByRead()
		}

	}
	window.hilink.onBluetoothDeviceFound("onBluetoothDeviceFoundCallBack");
	window.hilink.startBluetoothDevicesDiscovery([], 0, 1);
}

function getMAC(data) { //0 未扫描到设备, 1 匹配到设备, 2匹配到设备没有mac地址

	if(data.deviceId === deviceId) {
		console.log('匹配到设备:', data)
		//关闭扫描
		window.hilink.stopBluetoothDevicesDiscovery()
        console.log("匹配到设备id:" + data.deviceId)
        if(data.advertisData) {
            // hezhen change
			// let advertisData = data.advertisData;
			// advertisData = advertisData.replace(/ /g, '');
			// advertisData = advertisData.slice(advertisData.length - 13, advertisData.length - 1).toLocaleUpperCase();
			// let macAdress = this.analysisMac(advertisData);
            // console.log("ios mac", macAdress);
            var macAdress = data.advertisData.replace('<','').replace('>','').replace(' ','')
			return [1, macAdress];
		} else {
			return [2, '']
		}

	}
	return [0, ''];

}

function analysisMac(str) { // 解析mac地址
	str = str.slice(0, 6) + str.slice(-6)
	str = hexArarryAddSpace(str, 2)
	let arr = str.split(' ')
	arr.reverse()
	let result = '';
	arr.map(item => {
		result += item + ':'
	})
	result = result.slice(0, result.length - 1)
	return result
}

function hexArarryAddSpace(str, split_len = 2) { /** 16进制字符串 每2个字符用一个空格隔开 **/
	let result = '';
	for(let i = 0; i < str.length; i += split_len) {
		if(result !== '') result += ' ';
		result += str[i] + str[i + 1];
	}
	return result;
}

function getMacByRead() {
	window.onBLECharacteristicValueChangeCallback = res => {

	}
	window.hilink.onBLECharacteristicValueChange("onBLECharacteristicValueChangeCallback")

	window.hilink.createBLEConnection(deviceId)
	window.hilink.onBLEConnectionStateChange('onIOSBLEConnectionStateChangeCallback')
	window.onIOSBLEConnectionStateChangeCallback = res => {
		let data = JSON.parse(res)
		if(data.connected) {
			let timer = null
			clearInterval(timer);
			timer = setInterval(() => {
				let status = window.hilink.notifyBLECharacteristicValueChange(deviceId, serviceId, characteristicId, true)
				console.log('notify status:', status)
				if(status === 0) {
					clearInterval(timer);
					window.hilink.readBLECharacteristicValue(deviceId, serviceId, characteristicId, 'readBLECharacteristicValueCallback')
					window.readBLECharacteristicValueCallback = res => {
						console.log('readBLECharacteristicValueCallback:', res)
						registerBleDevice(res)
					}
				}
			}, 200)
		} else {
			getSystemInfo();
		}
	}

}

function finishDeviceActivity() {
	window.hilink && window.hilink.finishDeviceActivity();
}

function internationalizes(){
	this.currentLanguage = (function getAppLanguage() {
          // 判定规则:如果不是以'zh-'开始则显示为en-US
          let language,
            defualtLanguage = 'zh-CN';
          // let language = window.hilink.getAppLanguage();
          let reg = /^zh-/i;
          if (navigator && navigator.language) {
            language = reg.test(navigator.language) ? defualtLanguage : 'en-US';
          } else {
            language = defualtLanguage;
          }
          return language;
        })();
        
        if(this.currentLanguage !== 'zh-CN') {
        	this.document.getElementsByClassName("progressDes")[0].innerHTML = 'Connecting…'
        	this.document.getElementsByClassName("failConnect")[0].innerHTML = 'Unable to connect'
        	this.document.getElementsByClassName("details")[0].innerHTML = 'While connecting, make sure:'
        	this.document.getElementsByClassName("details")[1].innerHTML = '1.The phone\'s Bluetooth is enabled.'
        	this.document.getElementsByClassName("details")[2].innerHTML = '2.The device is within 5 meters of the phone.'
        	this.document.getElementsByClassName("details")[3].innerHTML = '3.The phone is connected to the Internet.'
        	this.document.getElementsByClassName("details")[4].innerHTML = '4.The device is not paired with the current account before.'
        	this.document.getElementsByClassName("btn")[0].innerHTML = 'Try again'
        } 
}

function setDarkMode(){
	isDark = window.hilink.getDarkMode && window.hilink.getDarkMode() === 2 ;
	if(isDark){
		this.document.getElementsByClassName("connect-content")[0].style.background = "#000000";
		this.document.getElementById("app").style.background = "#000000";
		this.document.getElementsByClassName("detail")[0].style.color = "rgba(255,255,255,0.66)";
		this.document.getElementsByClassName("failConnect")[0].style.color = "rgba(255,255,255,0.66)";
		this.document.getElementsByClassName("progress")[0].style.color = "rgba(255,255,255,0.66)";
		this.document.getElementsByClassName("progressDes")[0].style.color = "rgba(255,255,255,0.66)";
	}
}
