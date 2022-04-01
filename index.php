<?php 

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require_once("rest/dao/TodoDao.class.php");

    require 'vendor/autoload.php';

    Flight::register('todoDao', 'TodoDao');

    Flight::route("GET /get_all/@table", function ($table) {
        Flight::json(Flight::todoDao()->get_all($table));
    });

    Flight::route("GET /get_by_id/@table/@id", function($table, $id) {
        Flight::json(Flight::todoDao()->get_by_id($table, $id));
    });

    Flight::route("POST /add_author/@name/@nr_books", function($name, $nr_books) {
        Flight::json(Flight::todoDao()->add_author($name, $nr_books));
    });

    Flight::route("POST /add_book/@title/@id_publishing_house/@id_author/@year/@nr_pages/@price", function($title, $id_publishing_house, $id_author, $year, $nr_pages, $price) {
        Flight::json(Flight::todoDao()->add_book($title, $id_publishing_house, $id_author, $year, $nr_pages, $price));
    });

    Flight::route("POST /add_publishing_house/@name/@nr_books/@address/@phone_number", function($name, $nr_books, $address, $phone_number) {
        Flight::json(Flight::todoDao()->add_publishing_house($name, $nr_books, $address, $phone_number));
    });

    Flight::route("POST /add_reader/@name/@surname/@address/@phone_number", function($name, $surname, $address, $phone_number) {
        Flight::json(Flight::todoDao()->add_reader($name, $surname, $address, $phone_number));
    });

    Flight::route("POST /add_reading_sheet/@id_book/@id_reader/@loan_date", function($id_book, $id_reader, $loan_date) {
        Flight::json(Flight::todoDao()->add_reading_sheet($id_book, $id_reader, $loan_date));
    });

    Flight::route("DELETE /delete_from_table_by_id/@table/@id", function($table, $id) {
        Flight::json(Flight::todoDao()->delete_from_table_by_id($table, $id));
    });
    

    Flight::route("PUT /update_book/@id/@title/@id_publishing_house/@id_author/@year/@nr_pages/@price/@image_path", function($id, $title, $id_publishing_house, $id_author, $year, $nr_pages, $price, $image_path) {
        
        Flight::json(Flight::todoDao()->update_book($id, $title, $id_publishing_house, $id_author, $year, $nr_pages, $price, $image_path));
    });

    Flight::route("PUT /update_table/@table/@parameters", function($table, $parameters) {

        $parameters = explode("|", $parameters);

        $_ARRAY_0 = array();
        $_ARRAY_2 = array();

        switch($table) {

            case 'author': 
                $_ARRAY_0 = ['_ID_AUTHOR', '_NAME', '_NR_BOOKS'];
                $_ARRAY_2 = ['Id_Author', 'Name', 'Nr_Books'];
            break;
            case 'book':
                $_ARRAY_0 = ['_ID_BOOK', '_TITLE', '_ID_PUBLISHING_HOUSE', '_ID_AUTHOR', '_YEAR', '_NR_PAGES', '_PRICE'];
                $_ARRAY_2 = ['Id_Book', 'Title', 'Id_publishing_house', 'Id_Author', 'Year', 'Nr_Pages', 'Price'];
            break;
            case 'publishing_house':
                $_ARRAY_0 = ['_ID_PUBLISHING_HOUSE', '_NAME', '_NR_BOOKS', '_ADDRESS', '_PHONE_NUMBER'];
                $_ARRAY_2 = ['Id_publishing_house', 'Name', 'Nr_Books', 'Address', 'Phone_number'];
            break;
            case 'reader':
                $_ARRAY_0 = ['_ID_READER', '_NAME', '_SURNMAE', '_ADDRESS', '_PHONE_NUMBER'];
                $_ARRAY_2 = ['Id_Reader', 'Name', 'Surname', 'Address', 'Phone_number'];
            break;
            case 'reading_sheet':
                $_ARRAY_0 = ['_ID_SHEET', '_ID_BOOK', '_ID_READER', '_LOAN_DATE'];
                $_ARRAY_2 = ['Id_Sheet', 'Id_Book', 'Id_Reader', 'Loan_date'];
            break;
        }
        
        Flight::json(Flight::todoDao()->update_table($table, $_ARRAY_0, $parameters, $_ARRAY_2));
    });

    Flight::start();

    
?>

