<?php

include '../bd/conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD']=='GET') {
    if (isset($_GET['al1_codigo'])) {
        $query = "SELECT * FROM alumno where al1_codigo=".$_GET['id'];
        $resultado = metodoGet($query);
        echo json_encode(($resultado->fetch(PDO::FETCH_ASSOC)));
    
    } else {
        $query = "SELECT * FROM alumno";
        $resultado = metodoGet($query);
        echo json_encode($resultado->fetchAll());

    }

    header("HTTP/1.1 200 OK");
    exit();
}


if($_POST['METHOD'] == "POST") {
    unset($_POST['METHOD']);
    $al1_codigo = $_POST['al1_codigo'];
    $al1_cpaterno = $_POST['al1_cpaterno'];
    $al1_cmaterno = $_POST['al1_cmaterno'];
    $al1_cnombres= $_POST['al1_cnombres'];
    $al1_cdireccion = $_POST['al1_cdireccion'];
    $al1_cfecha = $_POST['al1_cfecha'];
    $al1_nedad = $_POST['al1_nedad'];

    $query = "insert into alumno(al1_codigo,al1_cpaterno,al1_cmaterno,al1_cnombres,al1_cdireccion,al1_cfecha,al1_nedad) values ('$al1_codigo', '$al1_cpaterno','$al1_cmaterno','$al1_cnombres','$al1_cdireccion','$al1_cfecha','$al1_nedad')";
  
    $queryAutoIncrement = "SELECT al1_codigo FROM  alumno WHERE al1_codigo = '$al1_codigo' ";
    $resultado=metodoPost($query, $queryAutoIncrement);
    
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD'] == 'PUT') {
    $al1_codigo = $_POST['al1_codigo'];
    $al1_cpaterno = $_POST['al1_cpaterno'];
    $al1_cmaterno = $_POST['al1_cmaterno'];
    $al1_cnombres= $_POST['al1_cnombres'];
    $al1_cdireccion = $_POST['al1_cdireccion'];
    $al1_cfecha = $_POST['al1_cfecha'];
    $al1_nedad = $_POST['al1_nedad'];

    $query = "UPDATE alumno set al1_cpaterno='$al1_cpaterno', al1_cmaterno='$al1_cmaterno', al1_cnombres='$al1_cnombres' , al1_cdireccion='$al1_cdireccion', al1_cfecha='$al1_cfecha', al1_nedad='$al1_nedad' where al1_codigo = '$al1_codigo' ";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD'] == 'DELETE') {
    unset($_POST['METHOD']);
    $al1_codigo = $_GET['al1_codigo'];
    $query = "DELETE FROM alumno where al1_codigo = '$al1_codigo' ";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");