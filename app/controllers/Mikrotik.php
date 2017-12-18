<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
use PEAR2\Net\RouterOS;

class Mikrotik extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->address = '7aec07bd6f31.sn.mynetname.net';
        $this->user = 'daffa';
        $this->password = 'd4ff42016';
        $this->port = '130';
//        $this->address = $this->query->get_table('setting', array('id' => 6))->value_setting;
//        $this->port = $this->query->get_table('setting', array('id' => 7))->value_setting;
//        $this->user = $this->query->get_table('setting', array('id' => 8))->value_setting;
//        $this->password = $this->query->get_table('setting', array('id' => 9))->value_setting;
    }

    public function list_hotspot_active() {
        // API
        require_once(APPPATH . 'libraries/PEAR2/Autoload.php');
        $util = new RouterOS\Util(
                $client = new RouterOS\Client("$this->address", "$this->user", "$this->password", " $this->port")
        );
        ini_set("memory_limit", "512M");
        $util->setMenu('/ip hotspot active');
        $list = '';
        foreach ($util->getAll() as $item) {
            $data['user'] = $item->getProperty('user');
            $data['address'] = $item->getProperty('address');
            $data['uptime'] = $item->getProperty('uptime');
            $list[] = $data;
        }
        log_message('error', print_r($list, true));
        return;
        //
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

}
