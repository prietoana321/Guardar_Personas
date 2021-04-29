<?php


 require './conexion.php';


if ( isset($_POST['nombre'])) {
  $statament = Conexion::conectar()->prepare("INSERT INTO tbl_personas (nombre,apellido) VALUES (:nombre, :apellido)");
  $statament->bindParam( ':nombre', $_POST['nombre'], PDO::PARAM_STR);
  $statament->bindParam( ':apellido', $_POST['apellido'], PDO::PARAM_STR);
  if ( $statament->execute()==true) {
    echo json_encode ('ok');
  } else {
    echo json_encode ('fail');
  }
} 