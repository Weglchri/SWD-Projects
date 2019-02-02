<?php
	
	if(!defined("WEGL")) die ("NOT ALLOWED");

	session_start();	
		
	if(isset($_POST["subbutton"])){
		
	 	if (($_POST["Username"] == getUserData()) AND ($_POST["Password"] == getPassData())){
		   	$_SESSION["logged"] = true;
		}else{
	   		echo "Username or Password are incorrect!";	   		
	   		exit;
		} 	
	}
?>
	
	
