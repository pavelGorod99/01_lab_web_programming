<?php

require 'vendor/autoload.php';

class TodoDao {

    private $CONNECTION;

    public function __construct() {

        $_servername = "localhost";
        $_USERNAME = "root";
        $_PASSWORD = "";
        $_SCHEMA = "library";
        $this->CONNECTION = new PDO("mysql:host=$_servername;dbname=$_SCHEMA", $_USERNAME, $_PASSWORD);
        $this->CONNECTION->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function get_by_id($_TABLE, $_ID) {

        $_STMT = $this->CONNECTION->prepare("SELECT * FROM " . $_TABLE . " WHERE Id_Author=" . $_ID);
        $_STMT->execute();
        return $_STMT->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_all($_TABLE) {
        $_STMT = $this->CONNECTION->prepare("SELECT * FROM " . $_TABLE);
        $_STMT->execute();
        return $_STMT->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add_author($_NAME, $_NR_BOOKS) {
        $_STMT = $this->CONNECTION->prepare("INSERT INTO author (Name, Nr_Books) VALUES (:_NAME, :_NR_BOOKS)");
        $_STMT->execute(['_NAME' => $_NAME, '_NR_BOOKS' => $_NR_BOOKS]);
    }

    public function add_book($_TITLE, $_ID_PUBLISHING_HOUSE, $_ID_AUTHOR, $_YEAR, $_NR_PAGES, $_PRICE) {
        $_STMT = $this->CONNECTION->prepare("INSERT INTO book (Title, Id_publishing_house, Id_Author, `Year`, Nr_Pages, Price) 
                                             VALUES (:_TITLE, :_ID_PUBLISHING_HOUSE, :_ID_AUTHOR, :_YEAR, :_NR_PAGES, :_PRICE)");
        $_STMT->execute([   '_TITLE' => $_TITLE, 
                            '_ID_PUBLISHING_HOUSE' => $_ID_PUBLISHING_HOUSE,
                            '_ID_AUTHOR' => $_ID_AUTHOR,
                            '_YEAR' => $_YEAR,
                            '_NR_PAGES' => $_NR_PAGES,
                            '_PRICE' => $_PRICE]);
    }

    public function add_publishing_house($_NAME, $_NR_BOOKS, $_ADDRESS, $_PHONE_NUMBER) {
        $_STMT = $this->CONNECTION->prepare("INSERT INTO publishing_house (Name, Nr_Books, Address, Phone_number) 
                                             VALUES (:_NAME, :_NR_BOOKS, :_ADDRESS, :_PHONE_NUMBER)");
        $_STMT->execute([   '_NAME' => $_NAME, 
                            '_NR_BOOKS' => $_NR_BOOKS,
                            '_ADDRESS' => $_ADDRESS,
                            '_PHONE_NUMBER' => $_PHONE_NUMBER]);
    }

    public function add_reader($_NAME, $_SURNAME, $_ADDRESS, $_PHONE_NUMBER) {
        $_STMT = $this->CONNECTION->prepare("INSERT INTO reader (Name, Surname, Address, Phone_number) 
                                             VALUES (:_NAME, :_SURNAME, :_ADDRESS, :_PHONE_NUMBER)");
        $_STMT->execute([   '_NAME' => $_NAME, 
                            '_SURNAME' => $_SURNAME,
                            '_ADDRESS' => $_ADDRESS,
                            '_PHONE_NUMBER' => $_PHONE_NUMBER]);
    }

    public function add_reading_sheet($_ID_BOOK, $_ID_READER, $_LOAN_DATE) {
        $_STMT = $this->CONNECTION->prepare("INSERT INTO reading_sheet (Id_Book, Id_Reader, Loan_date) 
                                             VALUES (:_ID_BOOK, :_ID_READER, :_LOAN_DATE)");
        $_STMT->execute([   '_ID_BOOK' => $_ID_BOOK, 
                            '_ID_READER' => $_ID_READER,
                            '_LOAN_DATE' => $_LOAN_DATE]);
    }

    public function delete_from_table_by_id ($_TABLE, $_ID) {
        $_STMT = $this->CONNECTION->prepare("DELETE FROM " . $_TABLE . " WHERE Id_Book=:_ID");
        $_STMT->bindParam(':_ID', $_ID);
        $_STMT->execute();
    }

    public function update_table($_TABLE, $_ARRAY_0, $_ARRAY_1, $_ARRAY_2) {

        $_QUERY = "";
        for ($i = 1; $i < count($_ARRAY_1); $i++) {
            
            $_QUERY .= $_ARRAY_2[$i] . '=:' . $_ARRAY_0[$i];
            if ($i != count($_ARRAY_1) - 1)
                $_QUERY .= ',';
        }
         
        $_STMT = $this->CONNECTION->prepare('UPDATE ' . $_TABLE . ' SET ' . $_QUERY . ' WHERE ' . $_ARRAY_2[0] . '=:' . $_ARRAY_0[0]);

        $_QUERY = array();
        for ($i = 0; $i < count($_ARRAY_1); $i++)
            $_QUERY[$_ARRAY_0[$i]] = $_ARRAY_1[$i];

        $_STMT->execute($_QUERY); 
    }

    public function update_book ($_ID, $_TITLE, $_ID_PUBLISHING_HOUSE, $_ID_AUTHOR, $_YEAR, $_NR_PAGES, $_PRICE, $_IMAGE_PATH) {
        $_STMT = $this->CONNECTION->prepare("UPDATE book SET    Title=:_TITLE, 
                                                                Id_publishing_house=:_ID_PUBLISHING_HOUSE,
                                                                Id_Author=:_ID_AUTHOR,
                                                                `Year`=:_YEAR,
                                                                Nr_Pages=:_NR_PAGES,
                                                                Price=:_PRICE,
                                                                Image_Path=:_IMAGE_PATH WHERE Id_Book=:_ID");
        $_STMT->execute([   '_ID' => $_ID, 
                            '_TITLE' => $_TITLE, 
                            '_ID_PUBLISHING_HOUSE' => $_ID_PUBLISHING_HOUSE,
                            '_ID_AUTHOR' => $_ID_AUTHOR,
                            '_YEAR' => $_YEAR,
                            '_NR_PAGES' => $_NR_PAGES,
                            '_PRICE' => $_PRICE,
                            '_IMAGE_PATH' => $_IMAGE_PATH
                        ]);
    }
}

?>