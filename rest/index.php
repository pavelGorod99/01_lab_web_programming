<?php 

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require '../vendor/autoload.php';

    require_once './Config.php';

    require "./services/ToDoService.php";

    Flight::register('todoDaoService', 'ToDoService');

    Flight::route('GET /docs.json', function() {
        $openapi = \OpenApi\scan('routes');
        header('Content-Type: application/json');
        echo $openapi->toJson();
    });

    require './routes/ToDoRoutes.php';

    Flight::start();

    
?>

