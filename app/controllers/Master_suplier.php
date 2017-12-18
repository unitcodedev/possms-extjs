<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Master_suplier extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_suplier() {
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
                $result = $this->query->get_query_grid("select * from ms_suplier $where order by kode_suplier");
                if ($result != NULL) {
                    echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
                } else {
                    echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
                }
            }
        }
    }

    public function simpan_suplier_baru() {
        $this->db->trans_start();
        $data['ms_nama'] = $this->input->post('ms_nama');
        $data['ms_alamat'] = $this->input->post('ms_alamat');
        $data['ms_kota'] = $this->input->post('ms_kota');
        $data['ms_provinsi'] = $this->input->post('ms_provinsi');
        $data['ms_telp'] = $this->input->post('ms_telp');
        $data['ms_nama_person'] = $this->input->post('ms_nama_person');
        $data['ms_nohp_person'] = $this->input->post('ms_nohp_person');
        $data['ms_jatuh_tempo'] = $this->input->post('ms_jatuh_tempo');
        $data['ms_aktif'] = $this->input->post('ms_aktif');
        if ($this->input->post('id') > 0) {
            $this->db->update('ms_suplier', $data, array('id' => $this->input->post('id')));
        } else {
            if ($this->query->get_query("SELECT last_value FROM ms_suplier_id_seq", '1')->last_value == 0) {
                $seq = 1;
            } else {
                $seq = $this->query->get_query("SELECT last_value FROM ms_suplier_id_seq", '1')->last_value + 1;
            }
            if ($seq < 10) {
                $urutan = "000" . $seq;
            } else if ($seq < 100) {
                $urutan = "00" . $seq;
            } else if ($seq < 1000) {
                $urutan = "0" . $seq;
            } else {
                $urutan = $seq;
            }
            $kode_suplier = "S-" . $urutan;
            $data['kode_suplier'] = $kode_suplier;
            $this->db->insert('ms_suplier', $data);
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
            $data['ms_aktif'] = 1;
        } else {
            $data['ms_aktif'] = 0;
        }
        $this->db->update('ms_suplier', $data, array('id' => $this->input->post('id')));
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

}
