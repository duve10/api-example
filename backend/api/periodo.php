<?php

include '../bd/conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD']=='GET') {
    if (isset($_GET['id'])) {
        $query = "SELECT * FROM t_periodo where id_periodo=".$_GET['id'];
        $resultado = metodoGet($query);
        echo json_encode(($resultado->fetch(PDO::FETCH_ASSOC)));
    
    } else {
        $query = "SELECT * FROM t_periodo";
        $resultado = metodoGet($query);
        echo json_encode($resultado->fetchAll());

    }

  
    exit();
}


if($_POST['METHOD'] == "POST") {
    unset($_POST['METHOD']);
    $id_periodo = $_POST['id_periodo'];
    $n_per = $_POST['n_per'];

    $query = "insert into t_periodo(id_periodo,n_per) values ('$id_periodo', '$n_per')";
    $queryAutoIncrement = "SELECT id_periodo FROM  t_periodo WHERE id_periodo = '$id_periodo' ";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD'] == 'PUT') {
    $id_periodo = $_POST['id_periodo'];
    $n_per = $_POST['n_per'];

    $query = "UPDATE t_periodo set id_periodo='$id_periodo', n_per='$n_per' where id_periodo = '$id_periodo' ";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD'] == 'DELETE') {
    unset($_POST['METHOD']);
    $id_periodo = $_GET['id_periodo'];
    $query = "DELETE FROM t_periodo where id_periodo = '$id_periodo' ";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");