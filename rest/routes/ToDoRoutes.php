<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
// CRUD operations for todos entity

/**
 * @OA\Post(
 *     path="/get_all",
 *     description="Get data from any table by offset",
 *     tags={"todo"},
 *     @OA\RequestBody(description="Basic user info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="table", type="string", example="book",	description="Table name"),
*    				@OA\Property(property="offset", type="number", example=-1,	description="Rows offset" )
*        )
*     )),
 *     @OA\Response(
 *         response=200,
 *         description="Table response"
 *     ),
 *     @OA\Response(
 *         response="default",
 *         description="unexpected error"
 *     )
 * )
 */

Flight::route("POST /get_all", function () {

    $table = Flight::request()->data->table;
    $offset = Flight::request()->data->offset;

    Flight::json(Flight::todoDaoService()->get_all($table, $offset));
});

/**
 * @OA\POST(path="/books", tags={"todo"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all books from the API. ",
 *         @OA\Response( response=200, description="List of books")
 * )
 */

Flight::route("POST /books", function () {
    Flight::json(Flight::todoDaoService()->get_all("book", -1));
});

// Flight::route("GET /get_by_id/@table/@id", function($table, $id) {
//     Flight::json(Flight::todoDao()->get_by_id($table, $id));
// });

/**
 * @OA\Post(
 *     path="/get_by_title",
 *     description="Get a book by title",
 *     tags={"todo"},
 *     @OA\RequestBody(description="Basic user info", required=true,
 *       @OA\MediaType(mediaType="application/json",
 *    			@OA\Schema(
 *    				@OA\Property(property="title", type="string", example="My book",    description="Book name"),
 *    				@OA\Property(property="offset", type="number", example=10,	description="Rows offset" )
 *        )
 *     )),
 *     @OA\Response(
 *         response=200,
 *         description="Table response"
 *     ),
 *     @OA\Response(
 *         response="default",
 *         description="unexpected error"
 *     )
 * )
 */

Flight::route("POST /get_by_title", function() {

    $title = Flight::request()->data->title;
    $offset = Flight::request()->data->offset;

    Flight::json(Flight::todoDaoService()->get_by_title($title, $offset));
});

/**
 * @OA\POST(path="/get_book_count", tags={"todo"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return the count of books from the API. ",
 *         @OA\Response( response=200, description="Count of books")
 * )
 */

Flight::route("POST /get_book_count", function(){
    Flight::json(Flight::todoDaoService()->get_book_count());
});

/**
 * @OA\Post(
 *     path="/get_user",
 *     description="Get a user by id",
 *     tags={"todo"},
 *     @OA\RequestBody(description="Basic user info", required=true,
 *       @OA\MediaType(mediaType="application/json",
 *    			@OA\Schema(
 *    				@OA\Property(property="id", type="string", example=3,    description="User id")
 *        )
 *     )),
 *     @OA\Response(
 *         response=200,
 *         description="Table response"
 *     ),
 *     @OA\Response(
 *         response="default",
 *         description="unexpected error"
 *     )
 * )
 */

Flight::route("POST /get_user", function(){

    $id = Flight::request()->data->id;

    Flight::json(Flight::todoDaoService()->get_user_by_id($id));
});

/**
 * @OA\Post(
 *     path="/get_book_count_by_title",
 *     description="Get book count by title",
 *     tags={"todo"},
 *     @OA\RequestBody(description="Basic user info", required=true,
 *       @OA\MediaType(mediaType="application/json",
 *    			@OA\Schema(
 *    				@OA\Property(property="title", type="string", example="My book",    description="Book name")
 *        )
 *     )),
 *     @OA\Response(
 *         response=200,
 *         description="Table response"
 *     ),
 *     @OA\Response(
 *         response="default",
 *         description="unexpected error"
 *     )
 * )
 */

Flight::route("POST /get_book_count_by_title", function() {

    $title = Flight::request()->data->title;

    Flight::json(Flight::todoDaoService()->get_book_count_by_title($title));
});

/**
 * @OA\Post(
 *     path="/add_book",
 *     description="Insert a book into database",
 *     tags={"todo"},
 *     @OA\RequestBody(description="Basic user info", required=true,
 *         @OA\MediaType(mediaType="multipart/form-data",
 *    			@OA\Schema(
 *    				@OA\Property(property="book_name", type="string", example="My book 70",    description="Book name"),
 *                  @OA\Property(property="book_author", type="number", example=2,    description="Author id"),
 *                  @OA\Property(property="book_publish_house", type="number", example=2,    description="Publishing house id"),
 *                  @OA\Property(property="book_year", type="number", example=2014,    description="Book year"),
 *                  @OA\Property(property="book_nr_of_pages", type="number", example=200,    description="Number of pages"),
 *                  @OA\Property(property="book_price", type="number", example=250,    description="Book price"),
 *                  @OA\Property(property="book_description", type="string", example="Some description",    description="Book description"),
 *                  @OA\Property(property="book_category", type="number", example=2,    description="Book category"),
 *                  @OA\Property(
 *                     description="file to upload",
 *                     property="book_image",
 *                     type="string",
 *                     format="binary",
 *                 )
 *              )
 *          ),
 *      ),
 *     @OA\Response(
 *         response=200,
 *         description="Table response",
 *          @OA\MediaType(mediaType="application/json")
 *     ),
 *     @OA\Response(
 *         response="default",
 *         description="unexpected error"
 *     )
 * )
 */

Flight::route("POST /add_book", function() {

    $filename = $_FILES['book_image']['name'];

    $location = SITE_ROOT . "/img/".$filename;

    $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
    $imageFileType = strtolower($imageFileType);

    $valid_extensions = array("jpg","jpeg","png");

    if(in_array(strtolower($imageFileType), $valid_extensions)) {

        if(move_uploaded_file($_FILES['book_image']['tmp_name'], $location)) {

            $title = Flight::request()->data->book_name;
            $idAuthor = Flight::request()->data->book_author;
            $idPublishingHouse = Flight::request()->data->book_publish_house;
            $year = Flight::request()->data->book_year;
            $pages = Flight::request()->data->book_nr_of_pages;
            $price = Flight::request()->data->book_price;
            $description = Flight::request()->data->book_description;
            $category = Flight::request()->data->book_category;

            Flight::json(Flight::todoDaoService()->add_book(   $title, 
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

/**
 * @OA\Post(
 *     path="/upload_file",
 *     description="Insert a book into database",
 *     tags={"todo"},
 *     @OA\RequestBody(description="Basic user info", required=true,
 *         @OA\MediaType(mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     description="file to upload",
 *                     property="book_image",
 *                     type="string",
 *                     format="binary",
 *                 )
 *             )
 *         )
 *      ),
 *     @OA\Response(
 *         response=200,
 *         description="Table response",
 *          @OA\MediaType(mediaType="application/json")
 *     ),
 *     @OA\Response(
 *         response="default",
 *         description="unexpected error"
 *     )
 * )
 */

define ('SITE_ROOT', realpath(dirname(__FILE__, 3)));

Flight::route("POST /upload_file", function() {

    $filename = $_FILES['book_image']['name'];

    $location = SITE_ROOT . "/img/".$filename;

    move_uploaded_file($_FILES['book_image']['tmp_name'], $location);

    Flight::json($_FILES['book_image']);
});

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


/**
* @OA\Post(
*     path="/login",
*     description="Login to the system",
*     tags={"todo"},
*     @OA\RequestBody(description="Basic user info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="email", type="string", example="dino.keco@gmail.com",	description="Email"),
*    				@OA\Property(property="pass", type="string", example="1234",	description="Password" )
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="JWT Token on successful response"
*     ),
*     @OA\Response(
*         response=404,
*         description="Wrong Password | User doesn't exist"
*     )
* )
*/
Flight::route("POST /login", function() {
    
    $email = Flight::request()->data->email;

    $pass = Flight::request()->data->pass;

    if (count(Flight::todoDaoService()->check_if_admin($email, $pass)) == 1) {
        Flight::json("admin");
    } else {

        $user = Flight::todoDaoService()->check_if_user_exists($email);

        if (count($user) == 1) {

            if ($user[0]['password'] == $pass) {
                unset($user['password']);

                $rememberMe = Flight::request()->data->remember_me;

                $jwt = JWT::encode($user, Config::JWT_SECRET(), 'HS256');
                $user['token'] = $jwt;
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