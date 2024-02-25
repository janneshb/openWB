/**
 * Functions to update graph and gui values via MQTT-messages
 *
 * @author Kevin Wieland
 * @author Michael Ortenstein
 * @author Lutz Bender
 * @author Jannes Hühnerbein
 */
var charging = false;

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
	console.log("processDisplayConfigMessages not implemented for minimal interface (" + mqttmsg + "; " + mqttpayload + ")");
}

function processPvConfigMessages(mqttmsg, mqttpayload) {
	console.log("processPvConfigMessages not implemented for minimal interface (" + mqttmsg + "; " + mqttpayload + ")");
	/*
	if ( mqttmsg == 'openWB/config/get/pv/priorityModeEVBattery' ) {
		// sets button color in charge mode modal and sets icon in mode select button
		switch (mqttpayload) {
			case '0':
				// battery priority
				$('#evPriorityBtn').removeClass('btn-success');
				$('#batteryPriorityBtn').addClass('btn-success');
				$('.priorityEvBatteryIcon').removeClass('fa-car').addClass('fa-car-battery')
				break;
			case '1':
				// ev priority
				$('#evPriorityBtn').addClass('btn-success');
				$('#batteryPriorityBtn').removeClass('btn-success');
				$('.priorityEvBatteryIcon').removeClass('fa-car-battery').addClass('fa-car')
				break;
		}
	}
	else if ( mqttmsg == 'openWB/config/get/pv/nurpv70dynact' ) {
		//  and sets icon in mode select button
		switch (mqttpayload) {
			case '0':
				// deaktiviert
				$('#70ModeBtn').addClass('hide');
				break;
			case '1':
				// activiert
				$('#70ModeBtn').removeClass('hide');
				break;
		}
	}
	else if ( mqttmsg == 'openWB/config/get/pv/minCurrentMinPv' ) {
		setInputValue('minCurrentMinPv', mqttpayload);
	}
	*/
}

function processSofortConfigMessages(mqttmsg, mqttpayload) {
	console.log("processSofortConfigMessages not yet implemented (" + mqttmsg + "; " + mqttpayload + ")");
	/*
	var elementId = mqttmsg.replace('openWB/config/get/sofort/', '');
	var element = $('#' + $.escapeSelector(elementId));
	if ( element.attr('type') == 'range' ) {
		setInputValue(elementId, mqttpayload);
	} else if ( element.hasClass('btn-group-toggle') ) {
		setToggleBtnGroup(elementId, mqttpayload);
	}
	*/
}

function processEvuMessages(mqttmsg, mqttpayload) {
	console.log("processEvuMessages not implemented for minimal interface");
}

function processGlobalMessages(mqttmsg, mqttpayload) {
	if ( mqttmsg == 'openWB/global/WHouseConsumption' ) {
		console.log("openWB/global/WHouseConsumption not implemented for minimal interface");
	}
	else if ( mqttmsg == 'openWB/global/WAllChargePoints') {
		// not implemented
	}
	else if ( mqttmsg == 'openWB/global/strLastmanagementActive' ) {
		console.log("openWB/global/strLastmanagementActive not implemented for minimal interface");
	}
	else if ( mqttmsg == 'openWB/global/ChargeMode' ) {
		// set radio buttons depending on charge mode
		switch (mqttpayload) {
			case '0':
				// mode sofort
				console.log("ChargeMode switched to SOFORT");
				setChargeModeInterface("0");
				break;
			default:
				// mode min + pv
				setChargeModeInterface("1");
				console.log("ChargeMode defaulting to Min+PV");
		}
	}
	else if ( mqttmsg == 'openWB/global/rfidConfigured' ) {
		console.log("RFID not configured in minimal interface")
		/*
		if ( mqttpayload == '0' ) {
			// disable manuel Rfid Code
			$('#rfidCodeBtn').addClass('hide');
		} else {
			// enable manuel Rfid Code
			$('#rfidCodeBtn').removeClass('hide');
		}
		*/
	}
}

function processHousebatteryMessages(mqttmsg, mqttpayload) {
	// processes mqttmsg for topic openWB/housebattery
	// called by handlevar
	console.log("processHousebatteryMessages not implemented for minimal interface");
}

function processSystemMessages(mqttmsg, mqttpayload) {
	// processes mqttmsg for topic openWB/system
	// called by handlevar
	// console.log(mqttmsg+': '+mqttpayload);
	console.log("processSystemMessages not implemented for minimal interface");
}

var pv1 = 0;
var pv2 = 0;
function processPvMessages(mqttmsg, mqttpayload) {
	console.log("processPvMessages not implemented for minimal interface");
}

function processLpMessages(mqttmsg, mqttpayload) {
	// processes mqttmsg for topic openWB/lp
	// called by handlevar
	console.log("processLpMessages " + mqttmsg + "; " + mqttpayload);
	if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/w$/i ) ) {
		var index = getIndex(mqttmsg);  // extract number between two / /
		var parent = $('[data-lp="' + index + '"]');  // get parent row element for charge point
		var element = parent.find('.ladepunktll');  // now get parents respective child element
		var actualPower = parseInt(mqttpayload, 10);
		var unit = ' W';
		if ( isNaN(actualPower) ) {
			actualPower = 0;
		}

		// disable charging point if not charging
		if (actualPower == 0) {
			console.log("Not charging, disabling charging point " + index);
			stopCharging();
		} else {
			charging = true;
		}

		var actualPowerText = actualPower.toString();
		if (actualPower > 999) {
			actualPowerText = (actualPower / 1000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
			unit = ' kW';
		}

		if (charging) {
			showChargingInterface();
			setPower(actualPowerText, unit);
		}
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/kWhchargedsinceplugged$/i ) ) {
		// energy charged since ev was plugged in
		// also calculates and displays km charged
		var index = getIndex(mqttmsg);  // extract number between two / /
		var parent = $('[data-lp="' + index + '"]');  // get parent row element for charge point
		var element = parent.find('.energyChargedLp');  // now get parents respective child element
		var energyCharged = parseFloat(mqttpayload, 10);
		if ( isNaN(energyCharged) ) {
			energyCharged = 0;
		}

		setEnergyCharged(energyCharged.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}), "kWh");
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/kWhactualcharged$/i ) ) { // TODO!
		// energy charged since reset of limitation
		console.log("kWhactualcharged not implemented for minimal interface");
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/\%soc$/i ) ) {
		// soc of ev at respective charge point
		// not implemented
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/timeremaining$/i ) ) {
		// time remaining for charging to target value
		console.log("timeremaining not implemented for minimal interface");
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolchargeatnight$/i ) ) {
		console.log("boolchargeatnight not implemented for minimal interface");
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolplugstat$/i ) ) {
		// status ev plugged in or not
		var index = getIndex(mqttmsg);  // extract number between two / /
		var parent = $('[data-lp="' + index + '"]');  // get parent row element for charge point
		var element = parent.find('.plugstatLp');  // now get parents respective child element
		if ( mqttpayload == 1 ) {
			element.removeClass('hide');
		} else {
			element.addClass('hide');
		}
		console.log("boolplug stat " + index + " " + mqttpayload);
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolchargestat$/i ) ) {
		var index = getIndex(mqttmsg);  // extract number between two / /
		var parent = $('[data-lp="' + index + '"]');  // get parent row element for charge point
		var element = parent.find('.plugstatLp');  // now get parents respective child element
		if ( mqttpayload == 1 ) {
			element.removeClass('text-warning').addClass('text-success');
		} else {
			element.removeClass('text-success').addClass('text-warning');
		}
		console.log("bool charge stat " + index + " " + mqttpayload);
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/strchargepointname$/i ) ) {
		// not implemented
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/chargepointenabled$/i ) ) {
		var index = getIndex(mqttmsg);  // extract number between two / /
		var parent = $('[data-lp="' + index + '"]');  // get parent row element for charge point
		var element = parent.find('.enableLp');  // now get parents respective child element
		if ( mqttpayload == 0 ) {
			element.addClass('lpDisabledStyle');
		} else {
			element.removeClass('lpDisabledStyle');
		}
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/countphasesinuse/i ) ) {
		// not implemented
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/aconfigured$/i ) ) {
		// target current value at charge point
		var index = getIndex(mqttmsg);  // extract number between two / /
		var parent = $('[data-lp="' + index + '"]');  // get parent row element for charge point
		var element = parent.find('.targetCurrentLp');  // now get parents respective child element
		var targetCurrent = parseInt(mqttpayload, 10);
		if ( isNaN(targetCurrent) ) {
			element.text(' 0 A');
		} else {
			element.text(' ' + targetCurrent + ' A');
		}
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolsocconfigured$/i ) ) {
		// soc-module configured for respective charge point
		var index = getIndex(mqttmsg);  // extract number between two / /
		var parent = $('[data-lp="' + index + '"]');  // get parent row element for charge point
		var elementIsConfigured = $(parent).find('.socConfiguredLp');  // now get parents respective child element
		var elementIsNotConfigured = $(parent).find('.socNotConfiguredLp');  // now get parents respective child element
		if (mqttpayload == 1) {
			$(elementIsNotConfigured).addClass('hide');
			$(elementIsConfigured).removeClass('hide');
		} else {
			$(elementIsNotConfigured).removeClass('hide');
			$(elementIsConfigured).addClass('hide');
		}
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolsocmanual$/i ) ) {
		// console.log(mqttmsg+': '+mqttpayload);
		// manual soc-module configured for respective charge point
		var index = getIndex(mqttmsg);  // extract number between two / /
		var parent = $('[data-lp="' + index + '"]');  // get parent row element for charge point
		var elementIsConfigured = $(parent).find('.socConfiguredLp');  // now get parents respective child element
		if (mqttpayload == 1) {
			$(elementIsConfigured).addClass('manualSoC');
			$(elementIsConfigured).find('.manualSocSymbol').removeClass('hide');
			$(elementIsConfigured).find('.socSymbol').addClass('hide');
		} else {
			$(elementIsConfigured).removeClass('manualSoC');
			$(elementIsConfigured).find('.manualSocSymbol').addClass('hide');
			$(elementIsConfigured).find('.socSymbol').removeClass('hide');
		}
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolchargepointconfigured$/i ) ) {
		// respective charge point configured
		var index = getIndex(mqttmsg);  // extract number between two / /
		var element = $('[data-lp="' + index + '"]');
		// now show/hide element containing data-lp attribute with value=index
		switch (mqttpayload) {
			case '0':
				element.addClass('hide');
				break;
			case '1':
				element.removeClass('hide');
				break;
		}
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/autolockconfigured$/i ) ) {
		// not implemented
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/autolockstatus$/i ) ) {
		// implemented in lock_unlock.js
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/energyconsumptionper100km$/i ) ) {
		// not implemented
	}
	else if ( mqttmsg.match( /^openwb\/lp\/[1-9][0-9]*\/boolfinishattimechargeactive$/i ) ) {
		// not implemented
	}
}
