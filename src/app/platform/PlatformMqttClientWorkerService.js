const MqttClientConnectionWorker = require('../workers/MqttClientConnectionWorker');
const MqttClientConstants = require('../utils/MqttClientConstants');

class PlatformMqttClientWorkerService {
    constructor() {
        this.mqttClientConnectionWorker = new MqttClientConnectionWorker();
        this.mqttClientConnectionWorker.addChangeListener(this.processEvents.bind(this));

        process.on('message',function(action) {
            this.mqttClientConnectionWorker.processAction(action);
        }.bind(this),false);
    }

    processEvents(eventObj) {
        process.send(eventObj);
        if(eventObj.event == MqttClientConstants.EVENT_MQTT_CLIENT_CONNECTION_CLOSED) {
            process.exit();
        }
    }
}

module.exports = new PlatformMqttClientWorkerService();