/**
 * Functions to update graph and gui values via MQTT-messages
 *
 * @author Kevin Wieland
 * @author Michael Ortenstein
 * @author Lutz Bender
 * @author Jannes Huehnerbein
 */

function reloadDisplay() {
    /** @function reloadDisplay
     * triggers a reload of the current page
     */
    // wait some seconds to allow other instances receive this message
    setTimeout(function(){
        publish( "0", "openWB/set/system/reloadDisplay" );
        // wait again to give the broker some time and avoid a reload loop
        setTimeout(function(){
            location.reload();
        }, 2000);
    }, 2000);
}

function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
        column.push(matrix[i][col]);
    }
    return column;
}

function convertToKw(dataColum) {
    var convertedDataColumn = [];
    dataColum.forEach((value) => {
        convertedDataColumn.push(value / 1000);
    });
    return convertedDataColumn;
}

function getIndex(topic) {
    // get occurrence of numbers between / / in topic
    // since this is supposed to be the index like in openwb/lp/4/w
    // no lookbehind supported by safari, so workaround with replace needed
    var index = topic.match(/(?:\/)([0-9]+)(?=\/)/g)[0].replace(/[^0-9]+/g, '');
    if ( typeof index === 'undefined' ) {
        index = '';
    }
    return index;
}
 
 function handlevar(mqttmsg, mqttpayload) {
    //console.log("Topic: "+mqttmsg+" Message: "+mqttpayload);
    // receives all messages and calls respective function to process them
    if ( mqttmsg.match( /^openwb\/evu\//i) ) { processEvuMessages(mqttmsg, mqttpayload); }
    else if ( mqttmsg.match( /^openwb\/global\//i) ) { processGlobalMessages(mqttmsg, mqttpayload); }
    else if ( mqttmsg.match( /^openwb\/housebattery\//i) ) { processHousebatteryMessages(mqttmsg, mqttpayload); }
    else if ( mqttmsg.match( /^openwb\/system\//i) ) { processSystemMessages(mqttmsg, mqttpayload); }
    else if ( mqttmsg.match( /^openwb\/pv\//i) ) { processPvMessages(mqttmsg, mqttpayload); }
    else if ( mqttmsg.match( /^openwb\/lp\//i) ) { processLpMessages(mqttmsg, mqttpayload); }
    else if ( mqttmsg.match( /^openwb\/config\/get\/sofort\/lp\//i) ) { processSofortConfigMessages(mqttmsg, mqttpayload); }
    else if ( mqttmsg.match( /^openwb\/config\/get\/pv\//i) ) { processPvConfigMessages(mqttmsg, mqttpayload); }
    else if ( mqttmsg.match( /^openwb\/config\/get\/display\//i) ) { processDisplayConfigMessages(mqttmsg, mqttpayload); }
}  // end handlevar
 
 function processDisplayConfigMessages(mqttmsg, mqttpayload) {
    // FANCY: not implemented
    //console.log("Msg: "+mqttmsg+": "+mqttpayload);
    if ( mqttmsg == 'openWB/config/get/display/showHouseConsumption' ) {
    }
    else if ( mqttmsg == 'openWB/config/get/display/chartHouseConsumptionMax' ) {
    }
    else if ( mqttmsg == 'openWB/config/get/display/chartEvuMinMax' ) {
    }
    else if ( mqttmsg == 'openWB/config/get/display/chartBatteryMinMax' ) {
    }
    else if ( mqttmsg == 'openWB/config/get/display/chartPvMax' ) {
    }
    else if ( mqttmsg.match( /^openwb\/config\/get\/display\/chartLp\/[1-9][0-9]*\/max$/i ) ) {
    }
 }
 
 function processPvConfigMessages(mqttmsg, mqttpayload) {
    // FANCY: not implemented
    if ( mqttmsg == 'openWB/config/get/pv/priorityModeEVBattery' ) {
        // sets button color in charge mode modal and sets icon in mode select button
        switch (mqttpayload) {
            case '0':
                // battery priority
                break;
            case '1':
                // ev priority
                break;
        }
    }
    else if ( mqttmsg == 'openWB/config/get/pv/nurpv70dynact' ) {
        //  and sets icon in mode select button
        switch (mqttpayload) {
            case '0':
                // deaktiviert
                break;
            case '1':
                // activiert
                break;
        }
    }
    else if ( mqttmsg == 'openWB/config/get/pv/minCurrentMinPv' ) {
    }
 }
 
 function processSofortConfigMessages(mqttmsg, mqttpayload) {
    // processes mqttmsg for topic openWB/config/get/sofort/
    // called by handlevar
    var elementId = mqttmsg.replace('openWB/config/get/sofort/', '');
    var element = $('#' + $.escapeSelector(elementId));
    if ( element.attr('type') == 'range' ) {
    // setInputValue(elementId, mqttpayload);
    } else if ( element.hasClass('btn-group-toggle') ) {
        setToggleBtnGroup(elementId, mqttpayload);
    }
 }
 
 function processEvuMessages(mqttmsg, mqttpayload) {
    // FANCY: not implemented
    // processes mqttmsg for topic openWB/evu
    // called by handlevar
    if ( mqttmsg == 'openWB/evu/W' ) {
    }
 }
 
 function processGlobalMessages(mqttmsg, mqttpayload) {
    // processes mqttmsg for topic openWB/global
    // called by handlevar
    if ( mqttmsg == 'openWB/global/WHouseConsumption' ) {
    }
    else if ( mqttmsg == 'openWB/global/WAllChargePoints') {
        /*
        var unit = ' W';
        var powerAllLp = parseInt(mqttpayload, 10);
        if ( isNaN(powerAllLp) ) {
            powerAllLp = 0;
        }
        powerAllLpText = powerAllLp.toString();
        if (powerAllLp > 999) {
            powerAllLpText = (powerAllLp / 1000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
            unit = ' kW';
        }
        var element = $('#gesamtll');
        var elementChart = $('#gesamtllchart');
        */
    }
    else if ( mqttmsg == 'openWB/global/strLastmanagementActive' ) {
        // FANCY: not implemented
        if ( mqttpayload.length >= 5 ) {
        } else {
        }
    }
    else if ( mqttmsg == 'openWB/global/ChargeMode' ) {
        // set modal button colors depending on charge mode
        // set visibility of divs
        // set visibility of priority icon depending on charge mode
        // (priority icon is encapsulated in another element hidden/shown by house battery configured or not)
        switch (mqttpayload) {
            case '0':
                // mode sofort
                console.log("Charge Mode switched to SOFORT");
                setChargeModeInterface("0");
                break;
            case '1':
                // mode min+pv
                console.log("Charge Mode switched to Min+PV");
                setChargeModeInterface("1");
                break;
            case '2':
                // mode pv
                // FANCY: not implemented
                break;
            case '3':
                // mode stop --> stop charging
                console.log("Charge Mode switched to STOP");
                stopCharging();
                setChargeMode("1"); // set standard charge mode Min+PV
                break;
            case '4':
                // mode standby
                // FANCY: not implemented
                setChargeModeInterface("1");
                break;
        }
    }
    else if ( mqttmsg == 'openWB/global/rfidConfigured' ) {
        if ( mqttpayload == '0' ) {
            // disable manuel Rfid Code
        } else {
            // enable manuel Rfid Code
        }
    }
 }
 
 function processHousebatteryMessages(mqttmsg, mqttpayload) {
    // processes mqttmsg for topic openWB/housebattery
    // called by handlevar
    if ( mqttmsg == 'openWB/housebattery/W' ) {
        // FANCY: not implemented
    }
    else if ( mqttmsg == 'openWB/housebattery/%Soc' ) {
        // FANCY: not implemented
    }
    else if ( mqttmsg == 'openWB/housebattery/boolHouseBatteryConfigured' ) {
        // FANCY: not implemented
        if ( mqttpayload == 1 ) {
        } else {
        }
    }
 }
 
 function processSystemMessages(mqttmsg, mqttpayload) {
    // processes mqttmsg for topic openWB/system
    // called by handlevar
    // FANCY: not implemented
    if ( mqttmsg == 'openWB/system/Timestamp') {
    } else if ( mqttmsg == 'openWB/system/IpAddress') {
    } else if ( mqttmsg == 'openWB/system/wizzardDone' ) {
    } else if ( mqttmsg == 'openWB/system/reloadDisplay' ) {
        if( mqttpayload == '1' ){
            reloadDisplay();
        }
    } else if ( mqttmsg == 'openWB/system/Uptime' ) {
    } else if ( mqttmsg =='openWB/system/Version' ) {
    }
 }
 
 var pv1 = 0;
 var pv2 = 0;
 function processPvMessages(mqttmsg, mqttpayload) {
    // processes mqttmsg for topic openWB/pv
    // called by handlevar
    if ( mqttmsg == 'openWB/pv/W') {
        // FANCY: not implemented
    }
    else if ( mqttmsg == 'openWB/pv/bool70PVDynStatus') {
        // FANCY: not implemented
    }
    else if ( mqttmsg.match(/^openWB\/pv\/[1-2]+\/boolPVConfigured$/i) ) {
        // FANCY: not implemented
    }
 }
 
 function processLpMessages(mqttmsg, mqttpayload) {
    // processes mqttmsg for topic openWB/lp
    // called by handlevar
    if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/w$/i ) ) {
        var index = getIndex(mqttmsg);  // extract number between two / /
        var actualPower = parseInt(mqttpayload, 10);
        var unit = 'W';
        if ( isNaN(actualPower) ) {
            actualPower = 0;
        }
        var actualPowerText = actualPower.toString();
        if (actualPower > 999) {
            actualPowerText = (actualPower / 1000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
            unit = 'kW';
        }
        setPower(actualPower, unit);
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/kWhchargedsinceplugged$/i ) ) {
        // energy charged since ev was plugged in
        // also calculates and displays km charged
        var index = getIndex(mqttmsg);  // extract number between two / /
        var energyCharged = parseFloat(mqttpayload, 10);
        if ( isNaN(energyCharged) ) {
            energyCharged = 0;
        }
        setEnergyCharged(energyCharged.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}), "kWh");
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/kWhactualcharged$/i ) ) { // TODO!
        // FANCY: not implemented
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/\%soc$/i ) ) {
        // FANCY: not implemented
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/timeremaining$/i ) ) {
        // FANCY: not implemented
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolchargeatnight$/i ) ) {
        // FANCY: not implemented
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolplugstat$/i ) ) {
        // status ev plugged in or not
        var index = getIndex(mqttmsg);  // extract number between two / /
        if ( mqttpayload == 1 ) {
        } else {
        }
        console.log("boolplugstat " + index + ": " + mqttmsg);
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolchargestat$/i ) ) {
        var index = getIndex(mqttmsg);  // extract number between two / /
        if ( mqttpayload == 1 ) {
        } else {
        }
        console.log("boolchargestat " + index + ": " + mqttmsg);
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/strchargepointname$/i ) ) {
        var index = getIndex(mqttmsg);  // extract number between two / /
        if( mqttpayload != 'LP'+index ){
        }
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/chargepointenabled$/i ) ) {
        var index = getIndex(mqttmsg);  // extract number between two / /
        if ( mqttpayload == 0 ) {
        } else {
        }
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/countphasesinuse/i ) ) {
        // FANCY: not implemented
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/aconfigured$/i ) ) {
        // FANCY: not implemented
        // target current value at charge point
        var index = getIndex(mqttmsg);  // extract number between two / /
        var targetCurrent = parseInt(mqttpayload, 10);
        if ( isNaN(targetCurrent) ) {
        } else {
        }
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolsocconfigured$/i ) ) {
        // FANCY: not implemented
        // soc-module configured for respective charge point
        var index = getIndex(mqttmsg);  // extract number between two / /
        if (mqttpayload == 1) {
        } else {
        }
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolsocmanual$/i ) ) {
        // FANCY: not implemented
        // console.log(mqttmsg+': '+mqttpayload);
        // manual soc-module configured for respective charge point
        var index = getIndex(mqttmsg);  // extract number between two / /
        if (mqttpayload == 1) {
        } else {
        }
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolchargepointconfigured$/i ) ) {
        // FANCY: not implemented
        // respective charge point configured
        var index = getIndex(mqttmsg);  // extract number between two / /
        // now show/hide element containing data-lp attribute with value=index
        switch (mqttpayload) {
            case '0':
                break;
            case '1':
                break;
        }
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/autolockconfigured$/i ) ) {
        // FANCY: not implemented
        var index = getIndex(mqttmsg);  // extract first match = number from
        if ( mqttpayload == 0 ) {
        } else {
        }
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/autolockstatus$/i ) ) {
        // FANCY: not implemented
        // values used for AutolockStatus flag:
        // 0 = standby
        // 1 = waiting for autolock
        // 2 = autolock performed
        // 3 = auto-unlock performed
        var index = getIndex(mqttmsg);  // extract number between two / /
        console.log("autolock message with payload " + mqttpayload);
        switch ( mqttpayload ) {
            case '0':
                // remove animation from span and set standard colored key icon
                break;
            case '1':
                // add animation to standard icon
                break;
            case '2':
                // add red locked icon
                break;
            case '3':
                // add green unlock icon
                break;
        }
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/energyconsumptionper100km$/i ) ) {
        // FANCY: not implemented
        // store configured value in element attribute
        // to calculate charged km upon receipt of charged energy
        var index = getIndex(mqttmsg);  // extract number between two / /
        var consumption = parseFloat(mqttpayload);
        if ( isNaN(consumption) ) {
            consumption = 0;
        }
    }
    else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolfinishattimechargeactive$/i ) ) {
        // FANCY: not implemented
        // respective charge point configured
        var index = getIndex(mqttmsg);  // extract number between two / /
        if (mqttpayload == 1) {
        } else {
        }
    }
 }
 