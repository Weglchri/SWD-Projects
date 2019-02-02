<?php 
	
	if(!defined("WEGL")) die ("NOT ALLOWED");
	
	if(isset($_SESSION["logged"]) == true){
		include_once("HTML/Countryfile.html");
	}else{
		include_once("HTML/Loginfile.html");
	}
?>


