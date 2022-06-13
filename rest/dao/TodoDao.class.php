<?php

// require 'vendor/autoload.php';
// require '../../vendor/autoload.php';
// require_once '../Config.php';

class TodoDao {

    private $CONNECTION;

    public function __construct() {

        $_servername = "localhost";
        $_USERNAME = "root";
        $_PASSWORD = "";
        $_SCHEMA = "book_store";
        $this->CONNECTION = new PDO("mysql:host=$_servername;dbname=$_SCHEMA", $_USERNAME, $_PASSWORD);
        $this->CONNECTION->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function get_by_id($_TABLE, $_ID) {

        $_STMT = $this->CONNECTION->prepare("SELECT * FROM " . $_TABLE . " WHERE Id_Author=" . $_ID);
        $_STMT->execute();
        return $_STMT->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_all($table, $offset) {
        $sql = "";
        if ($offset == -1) {
            $sql = "SELECT * FROM " . $table . ";";
        } else {
            $sql = "SELECT * FROM " . $table . " LIMIT 6 OFFSET " . $offset . ";";
        }
        $stmt = $this->CONNECTION->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBookCount() {
        $stmt = $this->CONNECTION->prepare("SELECT COUNT(id_book) FROM book");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBooksByTitle($title, $offset) {
        $stmt = $this->CONNECTION->prepare("SELECT * FROM book WHERE title LIKE '%" . $title . "%' LIMIT 6 OFFSET " . $offset . ";");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBookCountByTitle($title) {
        $stmt = $this->CONNECTION->prepare("SELECT COUNT(id_book) FROM book WHERE title LIKE '%" . $title . "%';");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add_author($_NAME, $_NR_BOOKS) {
        $_STMT = $this->CONNECTION->prepare("INSERT INTO author (Name, Nr_Books) VALUES (:_NAME, :_NR_BOOKS)");
        $_STMT->execute(['_NAME' => $_NAME, '_NR_BOOKS' => $_NR_BOOKS]);
    }

    public function createUser($username, $email, $password) {
        $stmt = $this->CONNECTION->prepare("INSERT INTO user (user_name, password, email) VALUES (:username, :pass, :email)");
        $stmt->execute([
            'username' => $username,
            'pass' => $password,
            'email' => $email
        ]);
    }

    public function getUserById($id) {
        $stmt = $this->CONNECTION->prepare("SELECT * FROM user WHERE id_user=:_id");
        $stmt->execute([
            '_id' => $id
        ]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function checkIfUserExists($email) {
        $stmt = $this->CONNECTION->prepare("SELECT * FROM user WHERE email=:_email");
        $stmt->execute([
            '_email' => $email
        ]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function checkIfAdmin($login, $pass) {
        $stmt = $this->CONNECTION->prepare("SELECT * FROM admin WHERE login=:_login AND pass=:_pass");
        $stmt->execute([
            '_login' => $login,
            '_pass' => $pass
        ]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add_book($title, $publishing_house, $author, $year, $pages, $description, $category, $price, $bookImage) {
        $_STMT = $this->CONNECTION->prepare("INSERT INTO book (title, publishing_house, author, `year`, pages, `description`, category, price, book_image) 
                                             VALUES (:_title, :_idPublishingHouse, :_idAuthor, :_year, :_pages, :_description, :_category, :_price, :_bookImage)");
        
        $bookImage = 'img/' . $bookImage;
        $_STMT->execute([   '_title' => $title, 
                            '_idPublishingHouse' => $publishing_house,
                            '_idAuthor' => $author,
                            '_year' => $year,
                            '_pages' => $pages,
                            '_description' => $description,
                            '_category' => $category,
                            '_price' => $price,
                            '_bookImage' => $bookImage
                        ]);
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

    public function deleteFromTableById ($table, $id) {
        $stmt = $this->CONNECTION->prepare("DELETE FROM " . $table . " WHERE id_book=:id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
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

    public function updateBook ($id, $title, $idAuthor, $idPublishingHouse, $year, $nrPages, $description, $category, $price, $imagePath) {
        $stmt = $this->CONNECTION->prepare("UPDATE book SET    title=:title, 
                                                                author=:idAuthor,
                                                                publishing_house=:idPublishingHouse,
                                                                `year`=:_year,
                                                                pages=:nrPages,
                                                                `description`=:_description,
                                                                category=:category,
                                                                price=:price,
                                                                book_image=:imagePath WHERE id_book=:id");
        $imagePath = 'img/' . $imagePath;
        $stmt->execute([   'id' => $id, 
                            'title' => $title, 
                            'idAuthor' => $idAuthor,
                            'idPublishingHouse' => $idPublishingHouse,
                            '_year' => $year,
                            'nrPages' => $nrPages,
                            '_description' => $description,
                            'category' => $category,
                            'price' => $price,
                            'imagePath' => $imagePath
                        ]);
    }
}

?>