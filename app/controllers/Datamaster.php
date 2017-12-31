<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Datamaster extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_jenisusaha() {
        $result = $this->query->get_query_grid("SELECT * FROM jenisusaha");
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function hapus_jenisusaha() {
        $this->db->trans_start();
        $this->db->delete('jenisusaha', array('ID' => $this->input->post('id')));
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Hapus Berhasil'));
        }
    }

    public function simpan_jenisusaha() {
        $this->db->trans_start();
        $arr['Kode'] = $this->input->post('kode');
        $arr['Keterangan'] = $this->input->post('keterangan');
        if ($this->input->post('id') == '0') {
            // Insert
            $this->db->insert('jenisusaha', $arr);
            $msg = "Proses Simpan Berhasil";
        } else {
            // Update
            $this->db->update('jenisusaha', $arr, array('ID' => $this->input->post('id')));
            log_message('error', $this->db->last_query());
            $msg = "Proses Update Berhasil";
        }
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => $msg));
        }
    }

// Gudang
    public function list_gudang() {
        $result = $this->query->get_query_grid("SELECT * FROM gudang");
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function hapus_gudang() {
        $this->db->trans_start();
        $this->db->delete('gudang', array('ID' => $this->input->post('id')));
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Hapus Berhasil'));
        }
    }

    public function simpan_gudang() {
        $this->db->trans_start();
        $arr['Kode'] = $this->input->post('kode');
        $arr['Keterangan'] = $this->input->post('keterangan');
        $arr['Jenis'] = $this->input->post('jenis');
        if ($this->input->post('id') == '0') {
            // Insert
            $this->db->insert('gudang', $arr);
            $msg = "Proses Simpan Berhasil";
        } else {
            // Update
            $this->db->update('gudang', $arr, array('ID' => $this->input->post('id')));
            log_message('error', $this->db->last_query());
            $msg = "Proses Update Berhasil";
        }
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => $msg));
        }
    }

// Kota
    public function list_kota() {
        $result = $this->query->get_query_grid("SELECT * FROM kota");
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function hapus_kota() {
        $this->db->trans_start();
        $this->db->delete('kota', array('ID' => $this->input->post('id')));
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Hapus Berhasil'));
        }
    }

    public function simpan_kota() {
        $this->db->trans_start();
        $arr['Kode'] = $this->input->post('kode');
        $arr['Keterangan'] = $this->input->post('keterangan');
        if ($this->input->post('id') == '0') {
            // Insert
            $this->db->insert('kota', $arr);
            $msg = "Proses Simpan Berhasil";
        } else {
            // Update
            $this->db->update('kota', $arr, array('ID' => $this->input->post('id')));
            log_message('error', $this->db->last_query());
            $msg = "Proses Update Berhasil";
        }
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => $msg));
        }
    }
// Top
    public function list_top() {
        $result = $this->query->get_query_grid("SELECT * FROM tpo");
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function hapus_top() {
        $this->db->trans_start();
        $this->db->delete('tpo', array('ID' => $this->input->post('id')));
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Hapus Berhasil'));
        }
    }

    public function simpan_top() {
        $this->db->trans_start();
        $arr['Tempo'] = $this->input->post('kode');
        $arr['Keterangan'] = $this->input->post('keterangan');
        if ($this->input->post('id') == '0') {
            // Insert
            $this->db->insert('tpo', $arr);
            $msg = "Proses Simpan Berhasil";
        } else {
            // Update
            $this->db->update('tpo', $arr, array('ID' => $this->input->post('id')));
            log_message('error', $this->db->last_query());
            $msg = "Proses Update Berhasil";
        }
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => $msg));
        }
    }

}
