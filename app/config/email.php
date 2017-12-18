<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

$config['protocol'] = 'smtp';
$config['smtp_host']= 'ssl://smtp.gmail.com';
//$config['smtp_host']= 'ssl://smtp.googlemail.com';
$config['newline']    = "\r\n";
$config['mailtype'] = 'html'; // or html
$config['validation'] = TRUE;
$config['smtp_timeout'] = '30';
//$config['smtp_user']= 'purchasing.labparahita@gmail.com';
$config['smtp_user']= 'muchtar.arekti@gmail.com';
$config['smtp_pass']= 'mucht41208';
$config['smtp_port']= '465';
#$config['mailpath'] = '/usr/bin/msmtp';
#$config['mailpath'] = '/usr/bin/msmtp';
$config['charset'] = 'iso-8859-1';
$config['wordwrap'] = TRUE;
//$this->email->initialize($config);
