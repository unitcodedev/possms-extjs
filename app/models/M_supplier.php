<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class M_supplier extends CI_Model {
    
    public function select_all() {
		$sql = "SELECT * FROM supplier";
		$data = $this->db->query($sql);
		return $data->result();
	}
    
    public function insert($data) {
		$sql = "INSERT INTO supplier(Kode, Nama, Alamat, Telepon, Fax, Kota)
		VALUES('" .$data['kode'] ."', '" .$data['nama'] ."', '" .$data['almt'] ."', '" .$data['telp'] ."', '" .$data['fax'] ."', '" .$data['kota'] ."')";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}

    public function update($data) {
		$sql = "UPDATE supplier SET Kode='" .$data['kode'] ."',
        Nama= '" .$data['nama'] ."', Alamat= '" .$data['almt'] ."',
        Telepon= '" .$data['telp'] ."', Fax= '" .$data['fax'] ."',
        Kota= '" .$data['kota'] ."'
        WHERE Kode='" .$data['kode'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}
    
    public function delete($data) {
        $sql = "DELETE FROM supplier WHERE Kode='" .$data['kode'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
        
    }
    
}
