<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Brand extends Auth_Controller {
    
     function __construct() {
        parent::__construct();
         $this->load->model('M_brand');
    }

    public function listBrand() {
        $result = $this->query->get_query_grid("SELECT * FROM merk");
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function deleteBrand() {
        $this->db->trans_start();
        $data = $this->input->post();
        $this->M_brand->delete($data);
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Hapus Berhasil'));
        }
    }

    public function saveBrand() {
        $this->db->trans_start();
        $data = $this->input->post();
        if ($this->input->post('id') == '0') {
            $this->M_brand->insert($data);
            $msg = "Proses Simpan Berhasil";
        } else {
            // Update
            $this->M_brand->update($data);
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
