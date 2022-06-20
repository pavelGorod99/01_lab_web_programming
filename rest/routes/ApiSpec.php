<?php 

/**
 * @OA\Info(title="ToDo API Specs", version="0.2", @OA\Contact(email="pavel.gorodetchi@stu.ibu.edu.ba", name="Gorodetchi Pavel"))
 * @OA\OpenApi(
 *    @OA\Server(url="http://localhost/Book_store/rest", description="Development Environment" ),
 *    @OA\Server(url="https://todos.biznet.ba/rest", description="Production Environment" )
 * ),
 * @OA\SecurityScheme(securityScheme="ApiKeyAuth", type="apiKey", in="header", name="Authorization" )
 */
?>