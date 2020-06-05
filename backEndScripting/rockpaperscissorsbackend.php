<?php //header("Content-type: application/json", true); ?>

<?php

// Database Connection

$localhost = "localhost";

$username = "root";

$password = "root";

$databaseName = "Practica";

//$databaseConnection = mysqli_connect($localhost, $username, $password, $databaseName);

// if (!$databaseConnection) {
//     die("Error: " . mysqli_error($connection));
// } else {
//     echo("The database went through properly!");
// }

$connection = mysqli_connect($localhost, $username, $password, $databaseName);

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();   
} else {
    echo "Database Connection Fine!";
}

// POST Requests

//$theinformation = JSON_decode($_POST);

//$informationtesting = $_POST['information'];

// if(isset($_POST)) {
//     $data = $_POST;
//     echo $data;
//     $datafinal = json_encode($data);
//     echo $datafinal;
//     //header("Content-type:application/json");
// }

// $raw_post = file_get_contents('php://input');
// echo var_dump($raw_post);
// $raw_post_decode = json_decode($raw_post, true);
// echo $raw_post_decode;

if (isset($_POST['nameWinner'])) {
    echo "Post saved";
    $thenameWinner = $_POST['nameWinner'];
    echo var_dump($thenameWinner);
}

if (isset($_POST['winningHand'])) {
    echo "Post saved";
    $thewinningHand = $_POST['winningHand'];
    echo var_dump($thewinningHand);
}

if (isset($_POST['scoreUser'])) {
    echo "Post saved";
    $scoreuserString = $_POST['scoreUser'];
    $thescoreUser = intval($scoreuserString);
    echo var_dump($thescoreUser);
}

if (isset($_POST['scoreCpu'])) {
    echo "Post saved";
    $scorecpustring = $_POST['scoreCpu'];
    $thescoreCpu = intval($scorecpustring);
    echo var_dump($thescoreCpu);
}

// GET Requests

if(isset($_GET['information'])) {
    echo "The information was captured in GET!";
    $datalastattempt = $_GET['information'];
} else {
    echo "The GET is not right!";
}

//echo var_dump($datalastattempt);

// Table Creation

$newsqltable = "CREATE TABLE IF NOT EXISTS RockPaperScissors (
    id INT(6) AUTO_INCREMENT PRIMARY KEY, 
    namewinner VARCHAR(30) NOT NULL,
    winninghand VARCHAR(30) NOT NULL,
    userscore INT(11) NOT NULL,
    computerscore INT(11) NOT NULL, 
    reg_date TIMESTAMP   
    )";

$sqlnewtablecreation = mysqli_query($connection, $newsqltable);

//if (!$sqlnewtablecreation)

if (!$sqlnewtablecreation) {
    echo "Something happened creating the table!";
} else {
    echo "Table created successfully or it already exists!";
}


// Inserting the data 

//$insertingthedata = mysqli_query($connection, $datatoinsert);

$datatoinsert = "INSERT INTO RockPaperScissors (namewinner, winninghand, userscore, computerscore)
       VALUES ('$thenameWinner', '$thewinningHand', '$thescoreUser', '$thescoreCpu')"; 

$insertingthedata = mysqli_query($connection, $datatoinsert);

if (!$insertingthedata) {
    echo("Error description: " . mysqli_error($connection));
} else {
    echo "The data was apparently inserted properly";
}

// Deleting Database

$deleteAll = "DELETE FROM RockPaperScissors";

//$deletingAllElements = mysqli_query($connection, $deleteAll);

if (!$deletingAllElements) {
    echo "The database apparently was not erased properly";
} else {
    echo "The database was successfully erased!";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>

    #different-title:hover {
        color: red;
    }

    

    </style>
</head>

<body>

    <h1><?php echo $thenameWinner; ?></h1>
    <h2><?php echo $thewinningHand; ?></h2>
    <h3 style="margin-top:20px"><?php echo $thescoreUser; ?></h3>
    <h4 style="font-size:40px;color:red"><?php // echo $informationtesting; ?></h4>
    <h4 style="font-size:40px;color:red"><?php echo $thescoreCpu; ?></h4>
    <h1 id="different-title" style="color:blue"><?php // echo $datalastattempt; ?></h1>
    <h1 id="different-title" style="color:blue"><?php $_POST['winningHand']; ?></h1>
</body>
</html>

<!-- Trying to insert data in the database -->

<?php

mysqli_close($databaseConnection);

?>



