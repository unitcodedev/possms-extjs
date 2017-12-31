<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Satuan extends Auth_Controller {
    
     function __construct() {
        parent::__construct();
         $this->load->model('M_satuan');
    }

    public function listSatuan() {
        $result = $this->M_satuan->select_all();
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function deleteSatuan() {
        $this->db->trans_start();
        $data = $this->input->post();
        $this->M_satuan->delete($data);
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Hapus Berhasil'));
        }
    }

    public function saveSatuan() {
        $this->db->trans_start();
        $data = $this->input->post();
        if ($this->input->post('id') == '0') {
            $this->M_satuan->insert($data);
            $msg = "Proses Simpan Berhasil";
        } else {
            // Update
            $this->M_satuan->update($data);
//            log_message('error', $this->db->last_query());
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
