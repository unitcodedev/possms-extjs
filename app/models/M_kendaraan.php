<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class M_kendaraan extends CI_Model {
	
    public function select_all() {
		$sql = "SELECT * FROM kendaraan";
		$data = $this->db->query($sql);
		return $data->result();
	}

    public function insert($data) {
		$sql = "INSERT INTO kendaraan(Kode, Keterangan)
		VALUES('" .$data['kode'] ."', '" .$data['keterangan'] ."')";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}

    public function update($data) {
		$sql = "UPDATE kendaraan SET Kode='" .$data['kode'] ."',
        Keterangan= '" .$data['keterangan'] ."'
        WHERE ID='" .$data['id'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}
    
    public function delete($data) {
        $sql = "DELETE FROM kendaraan WHERE ID='" .$data['id'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
        
    }
    
}
