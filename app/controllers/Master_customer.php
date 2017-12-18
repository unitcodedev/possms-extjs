<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Master_customer extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_customer() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                $filter = explode('#-#', $val);
                $kolom = $filter[0];
                $nama = $filter[1];
                $where = "where upper($kolom) like '%" . strtoupper($nama) . "%'";
                $result = $this->query->get_query_grid("select * from ms_customer $where order by kode_customer");
                if ($result != NULL) {
                    echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
                } else {
                    echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
                }
            }
        }
    }

    public function simpan_customer_baru() {
        $this->db->trans_start();
        $data['mc_alamat'] = $this->input->post('mc_alamat');
        $data['mc_kecamatan'] = $this->input->post('mc_kecamatan');
        $data['mc_kabupaten'] = $this->input->post('mc_kabupaten');
        $data['mc_provinsi'] = $this->input->post('mc_provinsi');
        $data['mc_nama'] = $this->input->post('mc_nama');
        $data['mc_telp'] = $this->input->post('mc_telp');
        $data['mc_nohp'] = $this->input->post('mc_nohp');
        $data['mc_plafond'] = $this->input->post('mc_plafond');
        $data['mc_jatuh_tempo'] = $this->input->post('mc_jatuh_tempo');
        $data['mc_aktif'] = $this->input->post('mc_aktif');
        if ($this->input->post('id') > 0) {
            $this->db->update('ms_customer', $data, array('id' => $this->input->post('id')));
        } else {
            $seq = $this->query->get_query("SELECT last_value FROM ms_cutomer_id_seq", '1')->last_value + 1;
            if ($seq < 10) {
                $urutan = "000" . $seq;
            } else if ($seq < 100) {
                $urutan = "00" . $seq;
            } else if ($seq < 1000) {
                $urutan = "0" . $seq;
            } else {
                $urutan = $seq;
            }
            $kode_customer = "C-" . $urutan;
            $data['kode_customer'] = $kode_customer;
            $this->db->insert('ms_customer', $data);
        }
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

    public function update_aktif() {
        $this->db->trans_start();
        if ($this->input->post('aktif') == 'true') {
            $data['mc_aktif'] = 1;
        } else {
            $data['mc_aktif'] = 0;
        }
        $this->db->update('ms_customer', $data, array('id' => $this->input->post('id')));
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

}
