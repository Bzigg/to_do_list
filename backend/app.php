<?php

require 'db.php';

$connect = connectDB();

$query_length_notes = "SELECT * FROM `to_do_list`.`notes`";
$result_length_notes = $connect->query($query_length_notes);
$length_notes = $result_length_notes->num_rows;


if (isset($_POST['getDataNotes'])) {
    $data_note = $_POST['getDataNotes'];
    $answer = [];
    for ($count = 1; $count <= $length_notes; $count++) {
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

// if (isset($_POST['note'])) {
//     $resolve = json_encode(true);
//     echo $resolve;
// }

// if (isset($_POST['note'])) {
//     $note = json_decode($_POST['note']);

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

if (isset($data['note'])) {

    $note = $data['note'];
    // echo json_encode($note);
    $title = $note['note__title'];
    $discription = $note['note__discription'];
    $today = date('Y') . date('m') . date('d');
    $status = 1;

    $query_add_note = "INSERT INTO `to_do_list`.`notes` (`title`,`discription`,`date`,`status` ) VALUES ( '$title','$discription','$today','$status' ) ";
    $query_result_add_note = $connect->query($query_add_note);

    echo json_encode($query_result_add_note);
}
