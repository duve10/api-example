<?php

include '../bd/conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD']=='GET') {
    if (isset($_GET['id'])) {
        $query = "SELECT * FROM t_estaciones where id_estaciones=".$_GET['id'];
        $resultado = metodoGet($query);
        echo json_encode(($resultado->fetch(PDO::FETCH_ASSOC)));
    
    } else {
        $query = "SELECT * FROM t_estaciones";
        $resultado = metodoGet($query);
        echo json_encode($resultado->fetchAll());

    }

    header("HTTP/1.1 200 OK");
    exit();
}


if($_POST['METHOD'] == "POST") {
    unset($_POST['METHOD']);
    $id_estaciones = $_POST['id_estaciones'];
    $n_est = $_POST['n_est'];
    $cap_m = $_POST['cap_m'];
    $cap_t = $_POST['cap_t'];

    $query = "insert into t_estaciones(id_estaciones,n_est,cap_m,cap_t) values ('$id_estaciones', '$n_est', '$cap_m', '$cap_t')";
    $queryAutoIncrement = "SELECT id_estaciones FROM  t_estaciones WHERE id_estaciones = '$id_estaciones' ";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD'] == 'PUT') {
    $id_estaciones = $_POST['id_estaciones'];
    $n_est = $_POST['n_est'];
    $cap_m = $_POST['cap_m'];
    $cap_t = $_POST['cap_t'];

    $query = "UPDATE t_estaciones set id_estaciones='$id_estaciones', n_est='$n_est', cap_m='$cap_m', cap_t='$cap_t' where id_estaciones = '$id_estaciones' ";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD'] == 'DELETE') {
    unset($_POST['METHOD']);
    $id_estaciones = $_GET['id_estaciones'];
    $query = "DELETE FROM t_estaciones where id_estaciones = '$id_estaciones' ";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");