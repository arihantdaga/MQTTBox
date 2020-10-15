const getmac = require('getmac');
const request = require('request');
const compareVersions = require('compare-versions');
const {shell} = require('electron');

const CommonConstants = require('../../utils/CommonConstants');
const CommonActions = require('../../actions/CommonActions');

class PlatformUtils {

    static init() {
        getmac.getMac(function(err,macAddress) {
            var reqUrl = 'http://workswithweb.com/api/application/version?currentversion='+CommonConstants.APP_VERSION;

            if(process!=null && process.platform!=null) {
                reqUrl = reqUrl+'&platform='+process.platform;
            } else {
                reqUrl = reqUrl+'&platform=unknown';
            }

            if (!err)  {
                reqUrl = reqUrl+'&uuid='+macAddress;
            } else {
                reqUrl = reqUrl+'&uuid=nouuid';
            }

            request(reqUrl,function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var latestVersion = JSON.parse(body).latestVersion;
                    if(compareVersions(latestVersion, CommonConstants.APP_VERSION) ==1) {
                        CommonActions.showMessageToUser({message:'New version of MQTTBox is available for download - '+latestVersion});
                    }
                }
            });
        });

    }

    static openExternalLink(url) {
        shell.openExternal(url);
    }
}

module.exports = PlatformUtils;