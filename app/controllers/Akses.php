<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Akses extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_cabang() {
        $idsdm = $this->user->id;
        $result = $this->query->get_query_grid("select ms_cabang.* from ms_karyawan_listcabang left join ms_cabang on ms_cabang.id = ms_karyawan_listcabang.id_cabang where id_sdm = '$idsdm'");
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
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
