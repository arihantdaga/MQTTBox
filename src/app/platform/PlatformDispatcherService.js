const {ipcRenderer} = require('electron');

const MqttClientService = require('../services/MqttClientService');
const MqttLoadService = require('../services/MqttLoadService');
const CommonConstants = require('../utils/CommonConstants');

class PlatformDispatcherService {

    constructor() {
        ipcRenderer.on(CommonConstants.SERVICE_TYPE_MQTT_CLIENTS, this.processEvents.bind(this,CommonConstants.SERVICE_TYPE_MQTT_CLIENTS));
        ipcRenderer.on(CommonConstants.SERVICE_TYPE_MQTT_LOAD, this.processEvents.bind(this,CommonConstants.SERVICE_TYPE_MQTT_LOAD));
    }

    dispatcherAction(action,serviceType) {
        if(serviceType == CommonConstants.SERVICE_TYPE_MQTT_CLIENTS) {
            ipcRenderer.send(CommonConstants.SERVICE_TYPE_MQTT_CLIENTS,action);
        } else if(serviceType == CommonConstants.SERVICE_TYPE_MQTT_LOAD) {
            ipcRenderer.send(CommonConstants.SERVICE_TYPE_MQTT_LOAD,action);
        }
    }

    processEvents(channel,eventEmitter,eventObj) {
        if(channel == CommonConstants.SERVICE_TYPE_MQTT_CLIENTS) {
            MqttClientService.processEvents(eventObj);
        } else if(channel == CommonConstants.SERVICE_TYPE_MQTT_LOAD) {
            MqttLoadService.processEvents(eventObj);
        }
    }
}

module.exports = new PlatformDispatcherService();