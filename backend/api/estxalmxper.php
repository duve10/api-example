<?php

include '../bd/conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD']=='GET') {
    
    $query = "SELECT eap.id_esalper,es.n_est,al.n_alm,pe.n_per,eap.Y FROM `t_est_alm_per`as eap LEFT JOIN t_estaciones as es on es.id_estaciones=eap.id_estaciones LEFT JOIN t_almacen as al on al.id_almacen=eap.id_almacen LEFT JOIN t_periodo as pe on pe.id_periodo=eap.id_periodo";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());

    

    exit();
}


header("HTTP/1.1 400 Bad Request");
?>