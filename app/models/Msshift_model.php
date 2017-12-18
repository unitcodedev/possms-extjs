<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of data_model
 *
 * @author Azelia
 */
class Msshift_model extends MY_Model {

    function __construct() {
        parent::__construct();
        $this->load->dbforge();
    }
}