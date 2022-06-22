<?php

    class Config {

        public static function DB_HOST() {
            // return Config::get_env("DB_HOST", "localhost");
            return Config::get_env("DB_HOST", "ibu-sql-2022.adnan.dev");
        }

        public static function DB_USERNAME() {
            // return Config::get_env("DB_USERNAME", "root");
            return Config::get_env("DB_USERNAME", "user_pavel");
        }

        public static function DB_PASSWORD() {
            // return Config::get_env("DB_PASSWORD", "");
            return Config::get_env("DB_PASSWORD", "VL973N");
        }

        public static function DB_SCHEME() {
            // return Config::get_env("DB_SCHEME", "book_store");
            return Config::get_env("DB_SCHEME", "db_pavel");
        }

        public static function DB_PORT() {
            return Config::get_env("DB_PORT", "3306");
        }

        public static function get_env($name, $default) {
            return isset($_ENV[$name]) && trim($_ENV[$name]) != '' ? $_ENV[$name] : $default;
        }

        public static function JWT_SECRET(){
            return Config::get_env("JWT_SECRET", "ezcb9s8UcF");
        }
    }

?>