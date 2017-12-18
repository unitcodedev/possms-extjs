<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Data extends REST_Controller {

    public $_db;

    function __construct() {
        // Construct our parent class
        parent::__construct();

        // Configure limits on our controller methods. Ensure
        // you have created the 'limits' table and enabled 'limits'
        // within application/config/rest.php
        $this->methods['user_get']['limit'] = 500; //500 requests per hour per user/key
        $this->methods['user_post']['limit'] = 100; //100 requests per hour per user/key
        $this->methods['user_delete']['limit'] = 50; //50 requests per hour per user/key

        $this->load->model('Data_m');
        $this->_db = $this->Data_m;
    }

    function user_get() {
        if (!$this->get('id')) {
            $this->response(NULL, 400);
            return;
        }
        $search[] = array('param' => "where", 'field' => 'mk_cabang >=', 'value' => '1');
        $search[] = array('param' => "where", 'field' => 'stat_karyawan <>', 'value' => '5');
        $search[] = array('param' => "where", 'field' => 'id', 'value' => $this->get('id'));
        $select = "id,username,mk_nama,mk_cabang,msc_nama,password";
        $user = $this->query->get_table_grid($select, 'v_sdm', $search);
        if ($user['data'] != null) {
            $return = array("succes" => "true", "count" => $user['count'], "data" => $user['data']);
            $this->response($return, 200); // 200 being the HTTP response code
        } else {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'User not found'), 404);
        }
    }

    function user_post() {
        //$this->some_model->updateUser( $this->get('id') );
        $message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

        $this->response($message, 200); // 200 being the HTTP response code
    }

    function users_get() {
        $search = array();
        $opt = array();
        // Filter
        $search[] = array('param' => "where", 'field' => 'mk_cabang >=', 'value' => '1');
        $search[] = array('param' => "where", 'field' => 'stat_karyawan <>', 'value' => '5');
        if ($this->get('filter') != null) {
            $filter = json_decode($this->get('filter'), true);
            foreach ($filter as $filter_data) {
                $field = $filter_data['property'];
                $param = isset($filter_data['param']) ? $filter_data['param'] : 'where';
                $val = $filter_data['value'];
                $search[] = array('param' => $param, 'field' => $field, 'value' => $val);
            }
        }
        // Sort
        if ($this->get('sort') != null) {
            $sort = json_decode($this->get('sort'), true);
            foreach ($sort as $key) {
                $opt['sortBy'] = $key['property'];
                $opt['sortDirection'] = $key['dir'] == null ? "ASC" : $key['dir'];
            }
        }
        // Limit
        if ($this->get('limit') > 0) {
            $opt['limit'] = $this->get('limit');
        }
        $select = "id,username,mk_nama,mk_cabang,msc_nama,password";
        $users = $this->query->get_table_grid($select, 'v_sdm', $search, $opt);
        if ($users['data']) {
            $resp = array('succes' => "true", 'count' => $users['count'], 'data' => $users['data']);
            $this->response($resp, 200); // 200 being the HTTP response code
        } else {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'No data found'), 404);
        }
    }

    function doctor_get() {
        $this->load->model('cabang', 'con_cab');
        $this->con_cab->db2 = $this->load->database(strval(2), TRUE);
        $search = array();
        if (!$this->get('id')) {
            $this->response(NULL, 400);
            return;
        }
        $search[] = array('param' => "where", 'field' => 'kode_dokter', 'value' => $this->get('id'));
        $select = "kode_dokter as id,gelar_depan,nama_dokter as md_namadokter,gelar_belakang,md_alamat_rumah,md_alamat_praktek1 as location_1,md_kota_1,md_alamat_praktek2 as location_2,md_kota_2,md_alamat_praktek3 as location_3,md_kota_3,id_sdm";
        $users = $this->con_cab->get_table_grid($select, 'ms_dokter', $search);
        if ($users) {
            $resp = array('succes' => true, 'count' => $users['count'], 'data' => $users['data']);
            $this->response($resp, 200); // 200 being the HTTP response code
        } else {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'No data found'), 404);
        }
        $this->con_cab->db_close();
    }

    function doctor_post() {
        //$this->some_model->updateUser( $this->get('id') );
        $message = array('id' => $this->get('id'), 'name' => $this->post('name'), 'email' => $this->post('email'), 'message' => 'ADDED!');

        $this->response($message, 200); // 200 being the HTTP response code
    }

    function doctors_get() {
        $this->load->model('cabang', 'con_cab');
        $this->con_cab->db2 = $this->load->database(strval(2), TRUE);
        $search = array();
        $opt = array();

        if ($this->get('filter') != null) {
            $filter = json_decode($this->get('filter'), true);
            foreach ($filter as $filter_data) {
                switch ($filter_data['property']) {
                    case "id":
                        $field = 'kode_dokter';
                        break;
                    case "md_namadokter":
                        $field = 'nama_dokter';
                        break;
                    case "location_1":
                        $field = 'md_alamat_praktek1';
                        break;
                    case "location_2":
                        $field = 'md_alamat_praktek2';
                        break;
                    case "location_3":
                        $field = 'md_alamat_praktek3';
                        break;
                    default:
                        $field = $filter_data['property'];
                        break;
                }
                $param = isset($filter_data['param']) ? $filter_data['param'] : 'where';
                $val = $filter_data['value'];
                $search[] = array('param' => $param, 'field' => $field, 'value' => $val);
            }
        }

        if ($this->get('sort') != null) {
            $sort = json_decode($this->get('sort'), true);
            foreach ($sort as $key) {
                $opt['sortBy'] = $key['property'];
                $opt['sortDirection'] = $key['dir'] == null ? "ASC" : $key['dir'];
            }
        }
        if ($this->get('limit') > 0) {
            $opt['limit'] = $this->get('limit');
        }

        $select = "kode_dokter as id,gelar_depan,nama_dokter as md_namadokter,gelar_belakang,md_alamat_rumah,md_alamat_praktek1 as location_1,md_kota_1,md_alamat_praktek2 as location_2,md_kota_2,md_alamat_praktek3 as location_3,md_kota_3,id_sdm";
        $users = $this->con_cab->get_table_grid($select, 'ms_dokter', $search, $opt);
        $this->con_cab->get_log();
        if ($users) {
            $resp = array('succes' => true, 'count' => $users['count'], 'data' => $users['data']);
            $this->response($resp, 200); // 200 being the HTTP response code
        } else {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'No data found'), 404);
        }
        $this->con_cab->db_close();
    }

    function omzets_get() {
        $this->load->model('cabang', 'con_cab');
        $this->con_cab->db2 = $this->load->database(strval(2), TRUE);
        $search = array();
        $opt = array();
        $result = array();

        if ($this->get('filter') != null) {
            $filter = json_decode($this->get('filter'), true);
            foreach ($filter as $filter_data) {
                switch ($filter_data['property']) {
                    case "id":
                        $field = 'kode_dokter';
                        break;
                    case "md_namadokter":
                        $field = 'nama_dokter';
                        break;
                    case "location_1":
                        $field = 'md_alamat_praktek1';
                        break;
                    case "location_2":
                        $field = 'md_alamat_praktek2';
                        break;
                    case "location_3":
                        $field = 'md_alamat_praktek3';
                        break;
                    default:
                        $field = $filter_data['property'];
                        break;
                }
//                $field = $filter_data['property'];
                $param = isset($filter_data['param']) ? $filter_data['param'] : 'where';
                $val = $filter_data['value'];
                $search[] = array('param' => $param, 'field' => $field, 'value' => $val);
            }
        }

        if ($this->get('sort') != null) {
            $sort = json_decode($this->get('sort'), true);
            foreach ($sort as $key) {
                $opt['sortBy'] = $key['property'];
                $opt['sortDirection'] = $key['dir'] == null ? "DESC" : $key['dir'];
            }
        } else {
            $opt['sortBy'] = 'omzet';
            $opt['sortDirection'] = 'DESC';
        }

        if ($this->get('limit') > 0) {
            $opt['limit'] = $this->get('limit');
        } else {
            $opt['limit'] = 5;
        }
        $search[] = array('param' => 'join', 'field' => 'ms_dokter', 'value' => 'ms_dokter.kode_dokter = trx_pasien.kode_pengirim');
        $search[] = array('param' => 'where', 'field' => 'pengirim', 'value' => 2);
        $select = "distinct(kode_pengirim),kode_dokter, gelar_depan, nama_dokter,gelar_belakang,md_alamat_praktek1,md_kota_1,md_alamat_praktek2, md_kota_2,md_alamat_praktek3, md_kota_3";
        $selectopt = "coalesce((select sum(rp_netto) from trx_pasien where pengirim = 2 and kode_pengirim = ms_dokter.kode_dokter),0) as omzet";
        $results = $this->con_cab->get_table_grid($select, 'trx_pasien', $search, $opt, $selectopt);
        $this->con_cab->get_log();
//        $search[] = array('param' => 'where', 'field' => 'kode_wilayah', 'value' => '02');
//        $select = "kode_dokter, gelar_depan, nama_dokter,gelar_belakang,md_alamat_praktek1,md_kota_1,md_alamat_praktek2, md_kota_2,md_alamat_praktek3, md_kota_3";
//        $selectopt = "coalesce((select sum(rp_netto) from trx_pasien where pengirim = 2 and kode_pengirim = ms_dokter.kode_dokter),0) as omzet";
//        $results = $this->con_cab->get_table_grid($select, 'ms_dokter', $search, $opt, $selectopt);

        if ($results) {
            $resp = array('succes' => true, 'count' => $results['count'], 'data' => $results['data']);
            $this->response($resp, 200); // 200 being the HTTP response code
        } else {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'No data found'), 404);
        }
        $this->con_cab->db_close();
    }

    function omzet_get() {
        $this->load->model('cabang', 'con_cab');
        $this->con_cab->db2 = $this->load->database(strval(2), TRUE);
        $search = array();
        $opt = array();
        $result = array();
        if ($this->get('id')) {
            $search[] = array('param' => 'where', 'field' => 'id_sdm', 'value' => $this->get('id'));
        }
        if ($this->get('filter') != null) {
            $filter = json_decode($this->get('filter'), true);
            foreach ($filter as $filter_data) {
                $field = $filter_data['property'];
                $param = isset($filter_data['param']) ? $filter_data['param'] : 'where';
                $val = $filter_data['value'];
                $search[] = array('param' => $param, 'field' => $field, 'value' => $val);
            }
        }

        if ($this->get('sort') != null) {
            $sort = json_decode($this->get('sort'), true);
            foreach ($sort as $key) {
                $opt['sortBy'] = $key['property'];
                $opt['sortDirection'] = $key['dir'] == null ? "DESC" : $key['dir'];
            }
        } else {
            $opt['sortBy'] = 'omzet';
            $opt['sortDirection'] = 'DESC';
        }

        if ($this->get('limit') > 0) {
            $opt['limit'] = $this->get('limit');
        } else {
            $opt['limit'] = 5;
        }
        $search[] = array('param' => 'where', 'field' => 'kode_wilayah', 'value' => '02');
        $select = "kode_dokter, gelar_depan, nama_dokter,gelar_belakang,md_alamat_praktek1,md_kota_1,md_alamat_praktek2, md_kota_2,md_alamat_praktek3, md_kota_3, id_sdm";
        $selectopt = "coalesce((select sum(rp_netto) from trx_pasien where pengirim = 2 and kode_pengirim = ms_dokter.kode_dokter),0) as omzet";
        $results = $this->con_cab->get_table_grid($select, 'ms_dokter', $search, $opt, $selectopt);
        $this->con_cab->get_log();
        if ($results) {
            $resp = array('succes' => true, 'count' => $results['count'], 'data' => $results['data']);
            $this->response($resp, 200); // 200 being the HTTP response code
        } else {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'No data found'), 404);
        }
        $this->con_cab->db_close();
    }

    function visits_get() {
        $params = array();
        $opts = array();
        $result = array();

        if ($this->get('filter') != null) {
            $filter = json_decode($this->get('filter'), true);
            $params = $this->_db->generate_db_query($filter);
        }

        if ($this->get('sort') != null) {
            $sort = json_decode($this->get('sort'), true);
            foreach ($sort as $key) {
                $opts['sortBy'] = $key['property'];
                $opts['sortDirection'] = $key['dir'] == null ? "ASC" : $key['dir'];
            }
        }

        if ($this->get('limit') > 0) {
            $opts['limit'] = $this->get('limit');
        }

        $results = $this->_db->get_kunjungan($params, $opts);

        if ($results) {
            foreach ($results['data'] as $key => $value) {
                $result[] = array(
                    'dokter_id' => $value->dokter_id,
                    'md_namadokter' => strtoupper($value->md_namadokter),
                    'performent' => $value->performent,
                    'pencapaian' => $value->pencapaian,
                    'target' => $value->target
                );
            }

            $resp = array('succes' => true, 'count' => $results['count'], 'data' => $result);
            $this->response($resp, 200); // 200 being the HTTP response code
        } else {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'No data found'), 404);
        }
    }

}
