<?php

include '../bd/conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD']=='GET') {
    if (isset($_GET['id'])) {
        $query = "SELECT * FROM t_contenedores where id_contenedores=".$_GET['id'];
        $resultado = metodoGet($query);
        echo json_encode(($resultado->fetch(PDO::FETCH_ASSOC)));
    
    } else {
        $query = "SELECT * FROM t_contenedores";
        $resultado = metodoGet($query);
        echo json_encode($resultado->fetchAll());

    }

    header("HTTP/1.1 200 OK");
    exit();
}


if($_POST['METHOD'] == "POST") {
    unset($_POST['METHOD']);
    $id_contenedores = $_POST['id_contenedores'];
    $n_cont = $_POST['n_cont'];
    $cap_c = $_POST['cap_c'];

    $query = "insert into t_contenedores(id_contenedores,n_cont,cap_c) values ('$id_contenedores', '$n_cont','$cap_c')";
    $queryAutoIncrement = "SELECT id_contenedores FROM  t_contenedores WHERE id_contenedores = '$id_contenedores' ";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD'] == 'PUT') {
    $id_contenedores = $_POST['id_contenedores'];
    $n_cont = $_POST['n_cont'];
    $cap_c = $_POST['cap_c'];

    $query = "UPDATE t_contenedores set id_contenedores='$id_contenedores', n_cont='$n_cont', cap_c='$cap_c' where id_contenedores = '$id_contenedores' ";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD'] == 'DELETE') {
    unset($_POST['METHOD']);
    $id_contenedores = $_GET['id_contenedores'];
    $query = "DELETE FROM t_contenedores where id_contenedores = '$id_contenedores' ";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");