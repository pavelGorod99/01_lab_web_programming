<?php

    require_once __DIR__.'/../dao/TodoDao.class.php';

    class ToDoService {

        protected $dao;

        public function __construct() {
            $this->dao = new TodoDao();
        }

        public function get_all($table, $offset) {
            return $this->dao->get_all($table, $offset);
        }

        public function get_by_id($table, $id) {
            return $this->dao->get_by_id($table, $id);
        }

        public function get_by_title($title, $offset) {
            return $this->dao->getBooksByTitle($title, $offset);
        }

        public function get_book_count() {
            return $this->dao->getBookCount();
        }

        public function get_book_count_by_title($title) {
            return $this->dao->getBookCountByTitle($title);
        }

        public function add_book($title, $idPublishingHouse, $idAuthor, $year, $pages, $description, $category, $price, $filename) {
            return $this->dao->add_book($title, $idPublishingHouse, $idAuthor, $year, $pages, $description, $category, $price, $filename);
        }

        public function edit_book($id, $title, $idAuthor, $idPublishingHouse, $year, $pages, $description, $category, $price, $filename) {
            return $this->dao->updateBook($id, $title, $idAuthor, $idPublishingHouse, $year, $pages, $description, $category, $price, $filename);
        }

        public function check_if_user_exists($email) {
            return $this->dao->checkIfUserExists($email);
        }

        public function create_user($username, $email, $pass) {
            return $this->dao->createUser($username, $email, $pass);
        }

        public function check_if_admin($login, $pass) {
            return $this->dao->checkIfAdmin($login, $pass);
        }
    }
?>