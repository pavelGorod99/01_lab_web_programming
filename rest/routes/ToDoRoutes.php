<?php

// CRUD operations for todos entity

Flight::route("POST /get_all", function () {

    $table = Flight::request()->data->table;
    $offset = Flight::request()->data->offset;

    Flight::json(Flight::todoDaoService()->get_all($table, $offset));
});

Flight::route("GET /get_by_id/@table/@id", function($table, $id) {
    Flight::json(Flight::todoDao()->get_by_id($table, $id));
});

Flight::route("POST /get_by_title", function() {

    $title = Flight::request()->data->title;
    $offset = Flight::request()->data->offset;

    Flight::json(Flight::todoDaoService()->get_by_title($title, $offset));
});

Flight::route("POST /get_book_count", function(){
    Flight::json(Flight::todoDaoService()->get_book_count());
});

Flight::route("POST /get_book_count_by_title", function() {

    $title = Flight::request()->data->title;

    Flight::json(Flight::todoDaoService()->get_book_count_by_title($title));
});

// Flight::route("POST /add_author/@name/@nr_books", function($name, $nr_books) {
//     Flight::json(Flight::todoDao()->add_author($name, $nr_books));
// });

Flight::route("POST /add_book", function() {

    $filename = $_FILES['book_image']['name'];

    $location = "img/".$filename;
    $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
    $imageFileType = strtolower($imageFileType);

    $valid_extensions = array("jpg","jpeg","png");

    if(in_array(strtolower($imageFileType), $valid_extensions)) {

        if(move_uploaded_file($_FILES['book_image']['tmp_name'], $location)) {

            // $title = $_POST['book_name'];
            $title = Flight::request()->data->book_name;
            // $idAuthor = $_POST['book_author'];
            $idAuthor = Flight::request()->data->book_author;
            // $idPublishingHouse = $_POST['book_publish_house'];
            $idPublishingHouse = Flight::request()->data->book_publish_house;
            // $year = $_POST['book_year'];
            $year = Flight::request()->data->book_year;
            // $pages = $_POST['book_nr_of_pages'];
            $pages = Flight::request()->data->book_nr_of_pages;
            // $price = $_POST['book_price'];
            $price = Flight::request()->data->book_price;
            // $description = $_POST['book_description'];
            $description = Flight::request()->data->book_description;
            // $category = $_POST['book_category'];
            $category = Flight::request()->data->book_category;

            Flight::json(Flight::todoDao()->add_book(   $title, 
                                                        $idPublishingHouse, 
                                                        $idAuthor, 
                                                        $year, 
                                                        $pages, 
                                                        $description,
                                                        $category,
                                                        $price,
                                                        $filename));
        }
    }
});

// Flight::route("POST /add_publishing_house/@name/@nr_books/@address/@phone_number", function($name, $nr_books, $address, $phone_number) {
//     Flight::json(Flight::todoDao()->add_publishing_house($name, $nr_books, $address, $phone_number));
// });

// Flight::route("POST /add_reader/@name/@surname/@address/@phone_number", function($name, $surname, $address, $phone_number) {
//     Flight::json(Flight::todoDao()->add_reader($name, $surname, $address, $phone_number));
// });

// Flight::route("POST /add_reading_sheet/@id_book/@id_reader/@loan_date", function($id_book, $id_reader, $loan_date) {
//     Flight::json(Flight::todoDao()->add_reading_sheet($id_book, $id_reader, $loan_date));
// });

Flight::route("DELETE /delete_from_table_by_id/@table/@id", function($table, $id) {
    Flight::json(Flight::todoDao()->deleteFromTableById($table, $id));
});

Flight::route("POST /registration", function() {

    $username = Flight::request()->data->input_username;

    $pass = Flight::request()->data->input_password;

    $email = Flight::request()->data->input_email;
    
    if (count(Flight::todoDaoService()->check_if_user_exists($email)) > 0) {
        Flight::json("User with this email already exists");
    } else {
        Flight::json(Flight::todoDaoService()->create_user($username, $email, $pass));
    }
});

Flight::route("POST /login", function() {
    
    $email = Flight::request()->data->email;

    $pass = Flight::request()->data->pass;

    if (count(Flight::todoDaoService()->check_if_admin($email, $pass)) == 1) {
        Flight::json("admin");
    } else {

        $user = Flight::todoDaoService()->check_if_user_exists($email);

        if (count($user) == 1) {

            if ($user[0]['password'] == $pass) {

                $rememberMe = Flight::request()->data->remember_me;

                Flight::json($user);

            } else {
                Flight::json("User password is wrong");
            }
        
        } else {
            Flight::json("User with this email doesn't exist");
        }
    }
});

Flight::route("POST /update_book", function() {
    // if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $result = 0;

        if (!empty($_FILES['image']['name'])) {
            
            $filename = $_FILES['image']['name'];

            $location = "img/".$filename;
            $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
            $imageFileType = strtolower($imageFileType);

            $valid_extensions = array("jpg","jpeg","png");

            if(in_array(strtolower($imageFileType), $valid_extensions)) {

                if(move_uploaded_file($_FILES['image']['tmp_name'], $location)) {

                    $result = 1;
                }
            }
        }

        // $id = $_POST['id'];
        $id = Flight::request()->data->id;
        // $title = $_POST['title_book'];
        $title = Flight::request()->data->title_book;
        // $idAuthor = $_POST['author'];
        $idAuthor = Flight::request()->data->author;
        // $idPublishingHouse = $_POST['publish_house'];
        $idPublishingHouse = Flight::request()->data->publish_house;
        // $year = $_POST['year'];
        $year = Flight::request()->data->year;
        // $pages = $_POST['pages'];
        $pages = Flight::request()->data->pages;
        // $description = $_POST['description'];
        $description = Flight::request()->data->description;
        // $category = $_POST['category'];
        $category = Flight::request()->data->category;
        // $price = $_POST['price'];
        $price = Flight::request()->data->price;

        if ($result == 1) {

            Flight::json(Flight::todoDaoService()->edit_book($id, $title, $idAuthor, $idPublishingHouse, $year, $pages, $description, $category, $price, $filename));

        } else {

            // $image = $_POST['image'];
            $image = Flight::request()->data->image;

            Flight::json(Flight::todoDaoService()->edit_book($id, $title, $idAuthor, $idPublishingHouse, $year, $pages, $description, $category, $price, $image));
        }
    // }
    // Flight::json($username = Flight::request()->data->imageBook);
    // Flight::json(Flight::todoDao()->updateBook($id, $title, $idAuthor, $idPublishingHouse, $year, $nrPages, $description, $category, $price, $imagePath));
});

?>