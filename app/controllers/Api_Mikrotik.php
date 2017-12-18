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

class Api_Mikrotik extends Auth_Controller {

    function __construct() {
        parent::__construct();

//        $this->address = $this->query->get_table('setting', array('id' => 6))->value_setting;
//        $this->port = $this->query->get_table('setting', array('id' => 7))->value_setting;
//        $this->user = $this->query->get_table('setting', array('id' => 8))->value_setting;
//        $this->password = $this->query->get_table('setting', array('id' => 9))->value_setting;
        $this->address = '7aec07bd6f31.sn.mynetname.net';
        $this->user = 'daffa';
        $this->password = 'd4ff42016';
        $this->port = '130';
//        $this->address = $this->query->get_table('setting', array('id' => 6))->value_setting;
//        $this->user = 'daffa';
//        $this->password = 'd4ff42016';
    }

//    public function __check_usergr() {
//        parent::__check_usergr();
//    }

//    public function koneksi() {
//        $addres = $this->query->get_table('setting', array('id' => 6))->value_setting;
//        $port = $this->query->get_table('setting', array('id' => 7))->value_setting;
//        $user = $this->query->get_table('setting', array('id' => 8))->value_setting;
//        $password = $this->query->get_table('setting', array('id' => 9))->value_setting;
//        require_once(APPPATH . 'libraries/PEAR2/Autoload.php');
//        $util = new RouterOS\Util(
//                $client = new RouterOS\Client("$this->addres", "$this->user", "$this->password", "$this->port")
////                $client = new RouterOS\Client("$addres", "$user", "$password", "$port")
//        );
//        return $util;
//    }

    public function list_active_hotspot() {
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
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_active() {

        require_once(APPPATH . 'libraries/PEAR2/Autoload.php');
//        require_once 'PEAR2/Autoload.php';

        $util = new RouterOS\Util(
                $client = new RouterOS\Client("$this->address", "$this->user", "$this->password")
        );
        $util->setMenu('/ip hotspot active');
        $list = '';
        foreach ($util->getAll() as $item) {
            $data['user'] = $item->getProperty('user');
            $data['address'] = $item->getProperty('address');
            $data['uptime'] = $item->getProperty('uptime');
            $list[] = $data;
        }
        if ($list != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $list, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_sdm() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                $filter = explode('-', $val);
                $where = " mk_cabang = '$filter[0]' and mk_nama like '%$filter[1]%'";
                $result = $this->query->get_query_grid("select id, username, mk_nama, active as aktif from ms_karyawan where $where and stat_karyawan <> 5");
                if ($result != NULL) {
                    echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
                } else {
                    echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
                }
            }
        }
    }

    public function list_sdm_group() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                $filter = explode('-', $val);
                $cabang = $filter[1];
                $sdm = $filter[0];
                $this->load->model('query2', 'cabang');
                $this->cabang->db2 = $this->load->database(strval($cabang), TRUE);
                if ($this->user->mk_cabang == 1) {
                    $where = '';
                } else {
                    $where = " where id > 2";
                }
                $result = $this->cabang->get_query_grid("select * from akses_group $where order by urutan ASC");
                $this->cabang->get_log();
                $list = '';
                foreach ($result as $value) {
                    $data['id'] = $value->id;
                    $data['group'] = $value->ag_nama;
                    $cek_akses = $this->cabang->count_table('akses_sdm_group', array('asg_sdm_id' => $sdm, 'asg_group_id' => $value->id));
                    if ($cek_akses > 0) {
                        $status = 1;
                    } else {
                        $status = 0;
                    }
                    $data['status'] = $status;
                    $list[] = $data;
                }
                if ($list != NULL) {
                    echo json_encode(array('success' => 'true', 'data' => $list, 'title' => 'Info', 'msg' => 'List All Cabang'));
                } else {
                    echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
                }
            }
        }
    }

    public function simpan_sdm_group() {
        $cabang = $this->input->post('cabang');
        $status = $this->input->post('status');
        $this->load->model('query2', 'cabang');
        $this->cabang->db2 = $this->load->database(strval($cabang), TRUE);
        $data['asg_sdm_id'] = $this->input->post('sdm_id');
        $data['asg_group_id'] = $this->input->post('group');
        if ($status == 'true') {
            $result = $this->cabang->insert('akses_sdm_group', $data);
        } else {
            $result = $this->cabang->delete('akses_sdm_group', $data);
        }
        if (!$result) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->cabang->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Berhasil'));
        }
    }

}
