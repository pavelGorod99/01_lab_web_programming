<?php

    error_reporting(E_ALL);
    error_reporting(-1);
    ini_set('error_reporting', E_ALL);

    require_once __DIR__ . "/vendor/autoload.php";

    use Aws\S3\S3Client;

    $client = new Aws\S3\S3Client([
        'version' => 'latest',
        'region' => 'eu-west-1',
        'endpoint' => 'https://book.fra1.digitaloceanspaces.com',
        'credentials' => [
            'key' => 'VS7MLWMR32VFT4SWJNQC',
            'secret' => 'kFEZ6Kph1bEh3WgJUoiVyK4AJKN6ddEtCU/mm/uXdxM'
        ]
    ]);

    $response = $client->createBucket([
        'Bucket' => 'web-book-store-ibu'
    ]);

    // $spaces = $client->listBuckets();
    // foreach($spaces['Buckets'] as $space) {
    //     echo $space['Name'] . "\n";
    // }

    // $response = $client->putObject([
    //     'Bucket' => 'cdn.biznet.ba',
    //     'Key' => 'file.ext',
    //     'Body' => 'Bla bla bla',
    //     'ACL' => 'public-read'
    // ]);

    print_r($response);



?>