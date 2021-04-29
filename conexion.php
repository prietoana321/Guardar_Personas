<?php


public class Conexion {

	public function conectar () {
		$cn = new PDO(
			'mysqli:host=localhost;dbname=BD_Personas',
			'root',
			'',
			array(
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
				PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
			)
			
		);
	
		return $cn;
	}
}
