<?php

$remove[] = "'";

$result = '';
$lines = file($_SERVER['DOCUMENT_ROOT'].'/openWB/openwb.conf');
foreach($lines as $line) {
 	if(strpos($line, "displayaktiv=") !== false) {
		list(, $displayaktivold) = explode("=", $line);
	}
	if(strpos($line, "displayevumax=") !== false) {
		list(, $displayevumaxold) = explode("=", $line);
	}
	if(strpos($line, "displaypvmax=") !== false) {
		list(, $displaypvmaxold) = explode("=", $line);
	}
	if(strpos($line, "displayspeichermax=") !== false) {
		list(, $displayspeichermaxold) = explode("=", $line);
	}
	if(strpos($line, "displayhausanzeigen=") !== false) {
		list(, $displayhausanzeigenold) = explode("=", $line);
	}
	if(strpos($line, "displayhausmax=") !== false) {
		list(, $displayhausmaxold) = explode("=", $line);
	}
	if(strpos($line, "displaylp1max=") !== false) {
		list(, $displaylp1maxold) = explode("=", $line);
	}
	if(strpos($line, "displaylp2max=") !== false) {
		list(, $displaylp2maxold) = explode("=", $line);
	}
	if(strpos($line, "displaypinaktiv=") !== false) {
		list(, $displaypinaktivold) = explode("=", $line);
	}
	if(strpos($line, "displaypincode=") !== false) {
		list(, $displaypincodeold) = explode("=", $line);
	}
	if(strpos($line, "displaytheme=") !== false) {
		list(, $displaythemeold) = explode("=", $line);
	}
	if(strpos($line, "wallboxname=") !== false) {
		$wallboxname = str_replace($remove, "", explode('=', $line, 2)[1]);
	} else {
		$wallboxname = "openWB";
	}
}
$displaypincodeold = trim($displaypincodeold);
$wallboxname = str_replace($remove, "", $wallboxname);
?>
