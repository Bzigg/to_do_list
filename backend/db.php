<?php
    function connectDB() {
        $host = 'localhost';
	    $login = 'user';
	    $pass =']NE*MZ038.atvBFh';
	    $db = 'to_do_list';

	    $connection =new mysqli ($host,$login,$pass,$db);

	    return $connection;

        if(!$connection){
            echo 'Проблемы при соединении с базой данных';
        }
    }
?>