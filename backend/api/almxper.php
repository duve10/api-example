<?php

include '../bd/conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD']=='GET') {
    
    $query = "SELECT * FROM `t_alm_per`as ap LEFT join t_almacen as a on a.id_almacen=ap.id_almacen LEFT JOIN t_periodo as p on p.id_periodo=ap.id_periodo";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());

    

    header("HTTP/1.1 200 OK");
    exit();
}


header("HTTP/1.1 400 Bad Request");
?>