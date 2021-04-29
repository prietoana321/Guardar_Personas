<?php

require './conexion.php';

$statement = Conexion::conectar()->prepare("SELECT * FROM tbl_personas");
$statement->execute();

echo json_encode( $statement->fetchAll( PDO::FETCH_ASSOC ) );

$statement = null;