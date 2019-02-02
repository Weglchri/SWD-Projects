<?php 
	
	if(!defined("WEGL")) die ("NOT ALLOWED");
	
	function getUserData() {
		$login = simplexml_load_file("XML/logindata.xml") or die("Error: Couldn't find file");
		$verifiedUser = $login->user->name;
		return $verifiedUser;
	}
	
	function getPassData() {
		$login = simplexml_load_file("XML/logindata.xml") or die("Error: Couldn't find file");
		$verifiedPass = $login->user->password;
		return $verifiedPass;
	}
	
?>