<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Stock extends Auth_Controller {
    
     function __construct() {
        parent::__construct();
         $this->load->model('M_stock');
         $this->load->model('M_supplier');
         $this->load->model('M_brand');
         $this->load->model('M_satuan');
    }

    public function listStock() {
        $result = $this->M_stock->select_all();
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function deleteStock() {
        $this->db->trans_start();
        $data = $this->input->post();
        $this->M_stock->delete($data);
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Hapus Berhasil'));
        }
    }

    public function saveStock() {
        $this->db->trans_start();
        $data = $this->input->post();
        $kdBrand = $this->input->post('brand');
        
        $kode = $this->getKode($kdBrand);
        
        if ($this->input->post('ins') == '0') {
            $this->M_stock->insert($data, $kode);
            $msg = "Proses Simpan Berhasil";
        } else {
            $this->M_stock->update($data);
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
    
    public function getKode($kdBrand) {
        $sql = "SELECT MAX(Kode) as kode FROM stock WHERE Merk = '$kdBrand'";
        $cekKode = $this->query->get_query($sql);
        $i = 1;
        if ($cekKode->num_rows() != NULL) {
            $urutan = substr($cekKode->row()->kode, -3);
            $result = $kdBrand . "00" . ($urutan+$i);
        } else {

            $result = $kdBrand . "001";
        }
        return $result;
        
    }
    
    public function getNameSupplier() {
        $result = $this->M_supplier->select_all();
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function getNameBrand() {
        $result = $this->M_brand->select_all();
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }
    
    public function getSatuan() {
        $result = $this->M_satuan->select_all();
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }
    
}
