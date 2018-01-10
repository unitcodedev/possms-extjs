<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class M_customer extends CI_Model {
    
    public function insert($data) {
		$sql = "INSERT INTO customer(Kode, Nama, Alamat, JenisUsaha, Telepon)
		VALUES('" .$data['kode'] ."', '" .$data['nama'] ."', '" .$data['alamat'] ."',
        '" .$data['jenis_usaha'] ."', '" .$data['telepon'] ."')";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}

    public function update($data) {
		$sql = "UPDATE customer SET Kode='" .$data['kode'] ."',
        Nama= '" .$data['nama'] ."', Alamat= '" .$data['alamat'] ."', 
        JenisUsaha= '" .$data['jenis_usaha'] ."', Telepon= '" .$data['telepon'] ."'
        WHERE Kode='" .$data['kode'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}
    
    public function delete($data) {
        $sql = "DELETE FROM customer WHERE Kode='" .$data['kode'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
        
    }
    
    public function select_all() {
		$sql = "SELECT * FROM customer";
		$data = $this->db->query($sql);
		return $data->result();
	}


}
