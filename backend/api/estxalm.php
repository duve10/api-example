<?php

include '../bd/conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD']=='GET') {
    
    $query = "SELECT ea.id_esalm,e.n_est,a.n_alm,ea.c_alm,ea.cost_alm FROM `t_est_alm`as ea LEFT join t_estaciones as e on e.id_estaciones=ea.id_estaciones 
    LEFT JOIN t_almacen as a on a.id_almacen=ea.id_almacen";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());

    

    header("HTTP/1.1 200 OK");
    exit();
}


header("HTTP/1.1 400 Bad Request");
?>