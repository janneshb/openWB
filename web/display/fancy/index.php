<!DOCTYPE html>
<html lang="de">
<head>
    <base href="/openWB/web/">
    <meta charset="UTF-8">

    <title>openWB</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="description" content="openWB">
    <meta name="keywords" content="openWB">
    <meta name="author" content="Jannes Hühnerbein">

    <link rel="stylesheet" href="display/fancy/css/pico.min.css">
    <link rel="stylesheet" type="text/css" href="/openWB/web/fonts/font-awesome-5.8.2/css/all.css">
    <link rel="stylesheet" href="display/fancy/css/style.css">

    <!-- jQuery -->
    <script src="/openWB/web/js/jquery-3.6.0.min.js"></script>
    <script src="js/bootstrap-4.4.1/bootstrap.bundle.min.js"></script>
    
    <!-- Other JS -->
    <script src="js/mqttws31.js"></script>
    <script src="display/fancy/js/helperFunctions.js"></script>
    <script src="display/fancy/js/processAllMqttMsg.js"></script>
    <script src="display/fancy/js/setupMqttServices.js"></script>
</head>
<body>
<div class="bodylike hidden" id="locked_body">
    <!-- LOCKED INTERFACE -->
    <div class="container" id="lock_container" style="margin: 0;">
        <button class="big_button big_button_abolute glowing" onclick="showPinInterface();">
            <i class="fa fa-lock"></i>
        </button>
    </div>
    
    <div class="pin_container" id="pin_container" style="visibility: hidden;">
        <input type="password" enabled="false" maxlength=1 id="pin_1" next="pin_2", prev="pin_1" />
        <input type="password" enabled="false" maxlength=1 id="pin_2" next="pin_3", prev="pin_1" />
        <input type="password" enabled="false" maxlength=1 id="pin_3" next="pin_4", prev="pin_2" />
        <input type="password" enabled="false" maxlength=1 id="pin_4" next="pin_4", prev="pin_3" />
        <button class="pin_btn" onclick="pinClick(1);">1</button>
        <button class="pin_btn" onclick="pinClick(2);">2</button>
        <button class="pin_btn" onclick="pinClick(3);">3</button>
        <button class="pin_btn" onclick="pinClick(4);">4</button>
        <button class="pin_btn" onclick="pinClick(5);">5</button>
        <button class="pin_btn" onclick="pinClick(6);">6</button>
        <button class="pin_btn" onclick="pinClick(7);">7</button>
        <button class="pin_btn" onclick="pinClick(8);">8</button>
        <button class="pin_btn" onclick="pinClick(9);">9</button>
        <button class="pin_btn borderless" style="visibility: hidden;">0</button> <!-- placeholder -->
        <button class="pin_btn" onclick="pinClick(0);">0</button>
        <button class="pin_btn borderless" onclick="clearPin();"><i class="fa fa-backspace"></i></button>
        <p class="pin_text" id="wrong_pin_msg" style="visibility: hidden;">Falsche PIN</p>
    </div>
</div>
<div class="bodylike hidden" id="charging_body">
    <!-- UNLOCKED AND CHARGING INTERFACE -->
    <button class="big_button big_button_relative glowing" id="stop_charging_button" onclick="stopCharging();">
        <i class="fa fa-pause"></i>
    </button>

    <button class="big_button big_button_relative no_background inline" id="the_bolt" disabled>
        <i class="fa fa-bolt"></i>
    </button>
    <div class="loading-dots inline-block" id="charging_dots"></div>
    <button class="big_button big_button_relative no_background inline" id="the_car" disabled>
        <i class="fa fa-car"></i>
    </button>

    <div class="power_energy_container" id="power_energy_container">
        <span class="kWspan" id="powerSpan">0 kW</span>&nbsp;|&nbsp;<span class="kWspan" id="energySpan">0 kWh</span>
    </div>
</div>
<div class="bodylike vertically_centered hidden rotating" id="loading_body">
    <button class="big_button big_button_relative" id="loading_charging_button" disabled>
        <i class="fa fa-spinner"></i>
    </button>
</div>
<div class="bodylike hidden" id="not_charging_body" style="padding-top: 25px">
    <!-- UNLOCKED BUT NOT CHARGING INTERFACE -->
    <button class="big_button big_button_relative glowing" id="start_charging_button" onclick="startCharging();">
        <i class="fa fa-bolt"></i>
    </button>

    <div class="container centered" id="charging_speed_container">
        <div class="radio_container">
            <label for="solar"><i class="fa fa-sun"></i></label>
            <input type="radio" checked="checked" name="charging_speed" value="solar" class="chargeModeRadioBtn" id="chargeModeRadioBtnMin" data-chargeMode="1">
            <span>min + PV</span>
        </div>
        <!--<div class="radio_container">
            <label for="slow"><i class="fa fa-frog"></i></label>
            <input type="radio" name="charging_speed" value="slow">
            <span>11kW</span>
        </div>-->
        <div class="radio_container">
            <label for="fast"><i class="fa fa-running"></i></label>
            <input type="radio" name="charging_speed" value="fast" class="chargeModeRadioBtn" id="chargeModeRadioBtnSofort" data-chargeMode="0">
            <span>Sofort</span>
        </div>
    </div>
</div>
<script>
    $(document).ready(function(){
        // set charge mode on Radio Button Change
        $('input[type=radio][name=charging_speed]').change(function() {
            var chargeMode = $(this).attr("data-chargeMode");
            setChargeMode(chargeMode);
        });

        // display lock
        $.get(
            { url: "display/cards/checklock.php?lock=1", cache: false },
            function(data){
                if( data == "1" ){
                    displaypinaktiv = 1;
                    lock();
                } else {
                    displaypinaktiv = 0;
                    unlock();
                }
            }
        );
    });
</script>
<footer class="hidden" id="the_footer">
    <p class="settings" style="visibility: hidden;"><a href="/openWB/web_min/settings.php"><i class="fa fa-cog"></i>&nbsp;Einstellungen</a></p>
    <p class="footer_title"><?php echo $wallboxname; ?></p>
    <p class="switch_to_pro"><a href="/openWB/web/display/cards/">Henze-Modus&nbsp;<i class="fa fa-angle-right"></i></a></p>
</footer>
</body>
</html>