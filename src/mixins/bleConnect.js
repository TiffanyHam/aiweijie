/*
 * @Description: 蓝牙连接过程
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-12-11 11:02:24
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-03-02 14:08:34
 */

import { mapActions } from 'vuex'
import g from '../Util/global';
import { scale } from '../Util/tool'
export default {
    data() {
        return {
            // serviceId: "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
            // readCharacteristicId: "6e400003-b5a3-f393-e0a9-e50e24dcca9e",
            // writeCharacteristicId: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",

            deviceId: null,
            serviceId: "0000ffb0-0000-1000-8000-00805f9b34fb",
            writeCharacteristicId: "0000ffb1-0000-1000-8000-00805f9b34fb",
            readCharacteristicId: "0000ffb2-0000-1000-8000-00805f9b34fb",
            bleConnected: '',
            historyLog: '',
            initGetData58: true,
        }
    },
    created() {
        // 数据表示 55 58
        window.type55 = false;
        window.type58 = true;
    },
    mounted() {
        window.t0 = new Date().getTime()
        //console.log('進入頁面', 0);
        this.onBLEConnectionStateChange();
       // window.hilink && window.hilink.setTitleVisible && window.hilink.setTitleVisible(false);
        this.onBluetoothAdapterStateChange();
        this.getBluetoothAdapterState();
        this.openBluetoothAdapter()
    },
    computed: {
        connected() {  //已连接
            return this.$store.state.BleStatus.bleConnected
        }
    },
    watch: {
        connected(n, o) { //已连接
            if (n) {
                //this.writeData('55')
            }
        }
    },
    methods: {
        ...mapActions({
            call_update_bleConnected: 'BleStatus/call_update_bleConnected',
            call_update_binData: 'BleStatus/call_update_binData',
            call_update_logData: 'BleStatus/call_update_logData'
        }),

        /**
         * @description: 蓝牙连接第一步 获取设备蓝牙模块状态
         * @param {*}
         * @return {*}
         */
        getBluetoothAdapterState() {
            window.hilink && window.hilink.getBluetoothAdapterState && window.hilink.getBluetoothAdapterState(
                "getBluetoothAdapterStateCallback"
            );
            window.getBluetoothAdapterStateCallback = (res) => {
                let data = JSON.parse(res);
                if (data.available) {
                    this.getCurrentRegisteredDevice();
                    this.searchDevices()
                } else {
                    console.log('');
                }
            }
        },

        /**
         * @description: 打开蓝牙
         * @param {*}
         * @return {*}
         */
        openBluetoothAdapter() {
            window.hilink && window.hilink.openBluetoothAdapter && window.hilink.openBluetoothAdapter();
        },

        /**
         * @description: 去注册设备 第二步
         * @param {*}
         * @return {*}
         */
        getCurrentRegisteredDevice() {
            // 注册前先监听发现设备
            window.getCurrentRegisteredDeviceCallBack = res => {
                //console.log('注册前先监听发现设备', res);
                let data;
                if (window.ios) {
                    data = this.getIOSDevid(res)
                } else {
                    data = JSON.parse(res)
                }
                this.deviceId = data.deviceId;
                window.devId = data.deviceId;
                window.hilink && window.hilink.createBLEConnection && window.hilink.createBLEConnection(this.deviceId)
            }
            window.hilink && window.hilink.getCurrentRegisteredDevice && window.hilink.getCurrentRegisteredDevice('getCurrentRegisteredDeviceCallBack')
        },

        /**
         * @description: 监听连接设备结果
         * @param {*}
         * @return {*}
         */
        onBLEConnectionStateChange() {
            window.hilink && window.hilink.onBLEConnectionStateChange && window.hilink.onBLEConnectionStateChange('onBLEConnectionStateChangeCallBack')
            window.onBLEConnectionStateChangeCallBack = res => {
                res = JSON.parse(res)
                if (res.connected) {
                    this.call_update_bleConnected(true)
                    // 通知上层
                    this.onBLEServicesDiscovered()
                    //监听低功耗蓝牙设备的特征值变化
                    this.onBLECharacteristicValueChange()

                } else {
                    // 连接不成功 重新连接
                    this.searchDevices()
                    this.call_update_bleConnected(false)
                }
            }
        },

        /**
         * @description: 监听蓝牙是否打开
         * @param {*}
         * @return {*}
         */
        onBluetoothAdapterStateChange() {
            window.hilink && window.hilink.onBluetoothAdapterStateChange && window.hilink.onBluetoothAdapterStateChange('onBluetoothAdapterStateChangeCallBack')
            window.onBluetoothAdapterStateChangeCallBack = res => {
                res = JSON.parse(res);
                //console.log(' 4.监听连接设备结果', res);
                window.hilink && window.hilink.createBLEConnection && window.hilink.createBLEConnection(this.deviceId)
                if (res.available) {
                    this.getCurrentRegisteredDevice()
                } else {
                    this.openBluetoothAdapter()
                    // 蓝牙未打开
                    this.searchDevices()
                }
            }
        },

        /**
         * @description: // 通知上层
         * @param {*}
         * @return {*}
         */
        onBLEServicesDiscovered() {
            let that = this;
            let status;
            window.onBLEServicesDiscoveredCallback = res => {
                if (window.ios) {
                    if (res == 0) {
                        status = window.hilink && window.hilink.notifyBLECharacteristicValueChange && window.hilink.notifyBLECharacteristicValueChange(
                            that.deviceId,
                            that.serviceId,
                            that.readCharacteristicId,
                            true
                        );
                        if (status === 0) {
                            //监听低功耗蓝牙设备的特征值变化
                            that.onBLECharacteristicValueChange();
                            that.writeData('55');
                        }
                    }
                } else {
                    let data = JSON.parse(res);
                    if (data.errCode === 0) {
                        window.t3 = new Date().getTime()
                        status = window.hilink && window.hilink.notifyBLECharacteristicValueChange && window.hilink.notifyBLECharacteristicValueChange(
                            that.deviceId,
                            that.serviceId,
                            that.readCharacteristicId,
                            true
                        );
                        if (status === 0) {
                            that.onBLECharacteristicValueChange();
                            that.writeData('55');
                        }
                    }
                }
            }
            window.hilink && window.hilink.onBLEServicesDiscovered && window.hilink.onBLEServicesDiscovered("onBLEServicesDiscoveredCallback")
        },

        /**
         * @description: //监听低功耗蓝牙设备的特征值变化
         * @param {*}
         * @return {*}
         */
        onBLECharacteristicValueChange() {
            window.onBLECharacteristicValueChangeCallback = res => {
                let result = JSON.parse(res);
                this.historyLog += result.data;
                this.acceptType58Data(this.historyLog)
                this.acceptType55Data(this.historyLog)
            }
            window.hilink && window.hilink.onBLECharacteristicValueChange && window.hilink.onBLECharacteristicValueChange("onBLECharacteristicValueChangeCallback");
        },

        /**
         * @description: 搜索蓝牙设备
         * @param {*}
         * @return {*}
         */
        searchDevices() {
            let _ = this;
            window.onBluetoothDeviceFoundCallback = (res) => {
                let data;
                if (window.ios) {
                    data = _.getIOSDevid(res);
                    if (this.deviceId == data.deviceId) {  // ios
                        window.hilink && window.hilink.createBLEConnection && window.hilink.createBLEConnection(data.deviceId)
                        window.hilink && window.hilink.stopBluetoothDevicesDiscovery && window.hilink.stopBluetoothDevicesDiscovery()
                    }
                } else {
                    if (this.deviceId == JSON.parse(res)[0].deviceId) {  // 安卓
                        window.hilink && window.hilink.createBLEConnection && window.hilink.createBLEConnection(this.deviceId)
                        window.hilink && window.hilink.stopBluetoothDevicesDiscovery && window.hilink.stopBluetoothDevicesDiscovery()
                    }
                }
            }
            window.hilink && window.hilink.onBluetoothDeviceFound && window.hilink.onBluetoothDeviceFound("onBluetoothDeviceFoundCallback")
            if (window.ios) {
                window.hilink && window.hilink.startBluetoothDevicesDiscovery && window.hilink.startBluetoothDevicesDiscovery([], false, 1)
            } else {
                window.hilink && window.hilink.startBluetoothDevicesDiscovery && window.hilink.startBluetoothDevicesDiscovery([], true, 1)
            }
        },

        /**
         * @description: 解析ios devID
         * @param {*}
         * @return {*}
         */
        getIOSDevid(res) {
            let data = undefined;
            let dataStr = res;
            dataStr = dataStr.replace(/"{/g, '{');
            dataStr = dataStr.replace(/}"/g, '}');
            dataStr = dataStr.replace(/\\|\n|\r|\t|\f|\t/g, '');
            data = JSON.parse(dataStr);
            return data;
        },

        /**
         * @description:  蓝牙设备操控：对蓝牙设备发送数据
         * @param {*}
         * @return {*}
         */
        writeData(data) {
            if (data === '57' || data === '59') {
                window.type58 = true;
                window.type55 = false;
            } else {
                window.type58 = false;
                window.type55 = true;
            }
            ////console.log('蓝牙设备操控：对蓝牙设备发送数据');
            window.hilink && window.hilink.writeBLECharacteristicValue && window.hilink.writeBLECharacteristicValue(
                this.deviceId,
                this.serviceId,
                this.writeCharacteristicId,
                data,
                "writeBLECharacteristicValueCallBack"
            );
            window.writeBLECharacteristicValueCallBack = (res) => {
                let resVal = JSON.parse(res);
            };
        },

        /**
         * @description: 监听设备是否开机
         * @param {*} data
         * @return {*}
         */
        onMachineOpen(data) {
            if (scale.hextoBin(data.substr(4, 2))[7] === '0') {
                g.overWrite = true;
            }
            if (document.querySelector('.VideoPopu')) {
                return true;
            }
            if (scale.hextoBin(data.substr(4, 2))[7] === '1') {
                g.overWrite = false;
                this.$router.push({ path: '/guide_adult' })
            }
        },

        /**
         * @description:  接受 55 设备数据
         * @param {*} data
         * @return {*}
         */
        acceptType55Data(historyLog) {
            if(window.ios){
                historyLog = historyLog.substr(historyLog.indexOf('56'), 10);
            }else{
                historyLog = historyLog.substr(0, 10);
            }
            
            if (historyLog.includes('58') && historyLog.indexOf('58') === 0) {
                return true;
            }
            let sum = 0;
            for (let i = 2; i < historyLog.length - 2; i += 2) {
                sum += parseInt(historyLog.substr(i, 2), 16)
            }
            let verifyBool = sum === parseInt(historyLog.substr(historyLog.length - 2), 16);
            if (historyLog.includes('56') && historyLog.indexOf('56') === 0 && verifyBool) {
                this.call_update_binData(historyLog);
                this.onMachineOpen(historyLog)
                this.historyLog = '';
                if (this.initGetData58) {
                   setTimeout(() => {
                        this.writeData('57')
                    }, 1000);
                    this.initGetData58 = false;
                }
            }
        },

        /**
         * @description:  接受 58 设备数据
         * @param {*} data
         * @return {*}
         */
        acceptType58Data(historyLog) {
            if (historyLog.includes('56') && historyLog.indexOf('56') === 0) {
                return true;
            }
            let _ = this;
            let dataLen = parseInt(historyLog.substr(2, 2), 16);
            let FH = historyLog.indexOf('58');
            if (FH === 0 && dataLen > 90 && historyLog.length === 93 * 2) {
                _.writeData('59');
                return true;
            }
            // 带58和数据长度，不带校验和的历史数据
            let verify = this.verify58(historyLog);
            if (verify) {
                _.call_update_logData(historyLog);
                _.historyLog = '';
                return true;
            }
        },

        /**
         * @description:  校验 58 设备数据
         * @param {*} data
         * @return {*}
         */
        verify58(historyLog) {
            let byteLen = historyLog.length / 2;
            let ab = new ArrayBuffer(byteLen)
            let dv = new DataView(ab)
            let verify1 = 0, verify2 = 0, bool = false;
            try {
                for (let i = 0; i < byteLen; i++) {
                    dv.setUint8(i, parseInt(historyLog.substr(i * 2, 2), 16))
                }
                for (let index = 0; index < byteLen; index++) {
                    if (byteLen === 93) {
                        (index > 0 && index < byteLen - 1) ? verify1 += dv.getUint8(index) : '';
                    } else {
                        (index > 0 && index < 92) ? verify1 += dv.getUint8(index) : '';
                        (index > 93 && index < byteLen - 1) ? verify2 += dv.getUint8(index) : '';
                    }
                }
                if (byteLen === 93) {
                    bool = verify1 % 256 === dv.getUint8(byteLen - 1);
                } else {
                    bool = verify1 % 256 === dv.getUint8(92) && verify2 % 256 === dv.getUint8(byteLen - 1)
                }
            } catch (error) {
                console.log('');
            }
            return bool
        },
    },
}
