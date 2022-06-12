<?php

    class SMSConfirmationNumber {

        static function send_sms($phone, $code) {

            $ch = curl_init();
    
            curl_setopt($ch, CURLOPT_URL, 'https://rest.nexmo.com/sms/json');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "from=Vonage APIs&text=Your code is $code&to=$phone&api_key=8e074fe8&api_secret=ujK56sPPs56JvqsK");
    
            $headers = array();
            $headers[] = 'Content-Type: application/x-www-form-urlencoded';
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
            $result = curl_exec($ch);
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            }
            curl_close($ch);
    
            print_r($result);
        }

        static function testMethod() {
            print_r("TEST METHOD");
        }
    }

    // SMSConfirmationNumber::send_sms("40733218387", '2436');

?>