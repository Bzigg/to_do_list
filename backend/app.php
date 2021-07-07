<?php

require 'db.php';

$connect = connectDB();

if (isset($_POST['getDataNotes'])) {
    $data_note = $_POST['getDataNotes'];
    $answer = [];
    for ($count = 1; $count <= 3; $count++){  
        $query_note = 'SELECT * FROM `to_do_list`.`notes` WHERE `id_note` LIKE '.$count.'';
        $result_note = $connect -> query( $query_note );
        $array_notes = $result_note -> fetch_array(MYSQLI_ASSOC);
        array_push($answer, $array_notes);
        // $answer .= json_encode( $array_notes );

    }
    echo json_encode($answer);
}