<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Datamaster extends CI_Model {

    public $db2;

    function __construct() {
        parent::__construct();
        $this->load->model('query2');
        $this->query2->db2 = $this->db2;
    }

}
