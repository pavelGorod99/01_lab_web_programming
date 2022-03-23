<?php

require 'vendor/autoload.php';

class TodoDao {

    private $CONNECTION;

    public function __construct() {

        $_servername = "localhost";
        $_USERNAME = "root";
        $_PASSWORD = "";
        $_SCHEMA = "todo";
        $this->CONNECTION = new PDO("mysql:host=$_servername;dbname=$_SCHEMA", $_USERNAME, $_PASSWORD);
        $this->CONNECTION->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function get_by_id($_ID) {

        $_STMT = $this->CONNECTION->prepare("SELECT * FROM todos WHERE id=" . $_ID);
        $_STMT->execute();
        return $_STMT->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get_all() {
        $_STMT = $this->CONNECTION->prepare("SELECT * FROM todos");
        $_STMT->execute();
        return $_STMT->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($_DESCRIPTION, $_CREATED) {
        $_STMT = $this->CONNECTION->prepare("INSERT INTO todos (description, created) VALUES (:description, :created)");
        $_STMT->execute(['description' => $_DESCRIPTION, 'created' => $_CREATED]);
    }

    public function delete ($_ID) {
        $_STMT = $this->CONNECTION->prepare("DELETE FROM todos WHERE id=:id");
        $_STMT->bindParam(':id', $_ID);
        $_STMT->execute();
    }

    public function update ($_ID, $_DESCRIPTION, $_CREATED) {
        // $_ID=intval($_ID);
        $_STMT = $this->CONNECTION->prepare("UPDATE todos SET description=:description, created=:created WHERE id=:id");
        $_STMT->execute(['id' => $_ID, 'description' => $_DESCRIPTION, 'created' => $_CREATED]);
    }
}

?>