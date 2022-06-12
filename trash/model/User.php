<?php

/**
 * @license Apache 2.0
 */

namespace OpenApi\Examples\Petstore30\Models;

/**
 * @OA\Schema(
 *     title="User model",
 *     description="User model",
 * )
 */
class User
{
    /**
     * @OA\Property(
     *     description="Username",
     *     title="Username",
     * )
     *
     * @var string
     */
    private $username;

    /**
     * @OA\Property(
     *     format="email",
     *     description="Email",
     *     title="Email",
     * )
     *
     * @var string
     */
    private $email;

        /**
     * @OA\Property(
     *     format="msisdn",
     *     description="Phone",
     *     title="Phone",
     * )
     *
     * @var string
     */
    private $phone;

    /**
     * @OA\Property(
     *     format="int64",
     *     description="Password",
     *     title="Password",
     *     maximum=255
     * )
     *
     * @var string
     */
    private $password;
}

?>