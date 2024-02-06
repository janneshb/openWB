<!DOCTYPE html>
<html lang="de">


<head>
	<title>openWB</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">

	<meta name="description" content="openWB">
	<meta name="keywords" content="openWB">
	<meta name="author" content="Jannes Hühnerbein">

	<link rel="stylesheet" href="css/pico.min.css">
	<link rel="stylesheet" type="text/css" href="/openWB/web/fonts/font-awesome-5.8.2/css/all.css">
	<link rel="stylesheet" href="css/openWB_minimalist.css">

	<script src="js/main.js"></script>
</head>
<body>
		<?php include ("../web/display/simple/gaugevalues.php"); ?>
		<input type="hidden" name="displayevumax" id="displayevumax" value="<?php echo trim($displayevumaxold); ?>" />
		<input type="hidden" name="displaypvmax" id="displaypvmax" value="<?php echo trim($displaypvmaxold); ?>" />
		<input type="hidden" name="displayspeichermax" id="displayspeichermax" value="<?php echo trim($displayspeichermaxold); ?>" />
		<input type="hidden" name="displayhausanzeigen" id="displayhausanzeigen" value="<?php echo trim($displayhausanzeigenold); ?>" />
		<input type="hidden" name="displayhausmax" id="displayhausmax" value="<?php echo trim($displayhausmaxold); ?>" />
		<input type="hidden" name="displaylp1max" id="displaylp1max" value="<?php echo trim($displaylp1maxold); ?>" />
		<input type="hidden" name="displaylp2max" id="displaylp2max" value="<?php echo trim($displaylp2maxold); ?>" />
		<input type="hidden" name="displaypinaktiv" id="displaypinaktiv" value="<?php echo trim($displaypinaktivold); ?>" />
		<input type="hidden" name="displaypincode" id="displaypincode" value="<?php echo trim($displaypincodeold); ?>" />

		<?php
		if (trim($displaypinaktivold) != "1" || (isset($_GET["logged_in"]) && $_GET["logged_in"] == "true")) {
			?>
			<h4 class="switch_to_pro"><a href="/openWB/web/index.php?force_classic_ui=true">Profimodus&nbsp;<i class="fa fa-angle-right"></i></a></h4>
			<div class="container">
				<h1><?php echo $wallboxname; ?></h1>
				
			<?php
			include 'main.html';
			?>
			</div>
			<?php
		} else {
			include 'locked.html';
		}
		?>
</body>
</html>
