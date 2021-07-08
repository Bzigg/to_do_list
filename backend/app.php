<?php

require 'db.php';

$connect = connectDB();

if (isset($_POST['getDataNotes'])) {
    $data_note = $_POST['getDataNotes'];
    $answer = [];
    for ($count = 1; $count <= 3; $count++) {
        $query_note = 'SELECT * FROM `to_do_list`.`notes` WHERE `id_note` LIKE ' . $count . '';
        $result_note = $connect->query($query_note);
        $array_notes = $result_note->fetch_array(MYSQLI_ASSOC);
        if ($array_notes['status'] != 0) {
            array_push($answer, $array_notes);
        }

        // $answer .= json_encode( $array_notes );

    }
    echo json_encode($answer);
}

if (isset($_POST['deleteNote'])) {
    $id_note = $_POST['deleteNote'];
    $answer = 'done';
    $zero = 0;

    $query_delete = "UPDATE `to_do_list`.`notes` SET `status` = '$zero' WHERE `id_note` = '$id_note'";
    $result_delete = $connect->query($query_delete);

    echo json_encode($result_delete);
}
