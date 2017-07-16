<?php

$env = strstr($_SERVER['HTTP_HOST'], 'localhost') ? 'dev' : 'prod';

if($_GET["action"] && $_SERVER['REQUEST_METHOD'] !== "OPTIONS"){
	$action = $_GET["action"];
	$pdo = connectDB($env);
	if($pdo){
		switch($action){
			case "remove":
				$id = $_GET["id"];
				if($id) removeComments($pdo, $id);
				break;
			case "add":
				$user = $_GET["user"];
				$comment = $_GET["comment"];
				if($user && $comment) addComments($pdo, $user, $comment);
				break;
			default:
				getComments($pdo);
				break;
		}
	}
}

function connectDB($env){
	if('prod' === $env){
		$servername = "localhost";
		$username = "id159023_web9061_db";
		$password = "web9061_db";
		$dbname = "id159023_web9061_db";
	} else{
		$servername = "localhost";
		$username = "local";
		$password = "pass";
		$dbname = "web9061_db";
	}

	$pdo = null;

	// Create connection
	try {
		$pdo = new PDO(
			'mysql:host='.$servername.';dbname='.$dbname,
			$username,
			$password
		);
	} catch(PDOException $ex) {
		//echo json_encode(array("error" => $ex->getMessage()));
	}
	
	return $pdo;
}

function getComments($db){
	try {
	    //connect as appropriate as above
		$sql = "SELECT * FROM comments ORDER BY date DESC;";
		$stmt = $db->query($sql);
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($results);
	} catch(PDOException $ex) {
		echo json_encode(array("error" => $ex->getMessage()));
	}
}

function addComments($db, $user, $comment){
	try {
	    //connect as appropriate as above
		$sql = "INSERT INTO comments (date, user, comment) VALUES (?, ?, ?);";
		$stmt = $db->prepare($sql);
		$stmt->execute(array(date('Y-m-d H:i:s'), $user, $comment));
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	} catch(PDOException $ex) {
		//echo json_encode(array("error" => $ex->getMessage()));
	}
}

function removeComments($db, $id){
	try {
	    //connect as appropriate as above
		$sql = "DELETE FROM comments WHERE id=?";
		$stmt = $db->prepare($sql);
		$stmt->execute(array($id));
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	} catch(PDOException $ex) {
		//echo json_encode(array("error" => $ex->getMessage()));
	}
}



?>