<?php

require './conexion.php';

if ( isset($_POST['id'])) {

  $statement = Conexion::conectar()->prepare("DELETE FROM tbl_personas WHERE id = :id");
  $statement->bindParam(':id', $_POST['id'], PDO::PARAM_INT);

  if ( $statement->execute() ) {
    echo json_encode('ok');
    truncate();
  } else {
    echo json_encode('fail');
  }

}

function truncate() {
  $statement = Conexion::conectar()->prepare("ALTER TABLE tbl_personas AUTO_INCREMENT = 1");
  $statement->execute();
  $statement = null;
}