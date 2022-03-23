<?php 

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once("rest/dao/TodoDao.class.php");

    require 'vendor/autoload.php';

    Flight::register('todoDao', 'TodoDao');

    Flight::route("GET /get_all", function () {
        Flight::json(Flight::todoDao()->get_all());
    });

    Flight::route("GET /get_by_id/@id", function($id) {
        Flight::json(Flight::todoDao()->get_by_id($id));
    });

    Flight::route("POST /add/@description/@created", function($description, $created) {
        Flight::json(Flight::todoDao()->add($description, $created));
    });

    Flight::route("PUT /update/@id/@description/@created", function($id, $description, $created) {
        Flight::json(Flight::todoDao()->update($id, $description, $created));
    });

    Flight::route("DELETE /delete/@id", function($id) {
        Flight::json(Flight::todoDao()->delete($id));
    });

    Flight::start();

    
?>