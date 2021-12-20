<?php

include '../bd/conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD']=='GET') {
    
    $query = "SELECT c.n_cont,e.n_est,x FROM `t_cont_estac` as ce left JOIN t_contenedores as c on c.id_contenedores=ce.id_contenedores left join t_estaciones as e on e.id_estaciones = ce.id_estaciones group by ce.id_contenedores,ce.id_estaciones";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());

    

    header("HTTP/1.1 200 OK");
    exit();
}


header("HTTP/1.1 400 Bad Request");