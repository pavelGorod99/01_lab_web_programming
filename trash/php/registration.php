<?php

    require 'vendor/autoload.php';

    require_once("../rest/services/sendsms.php");

    Flight::register('smsService', 'SMSConfirmationNumber');

    SMSConfirmationNumber::testMethod();

?>