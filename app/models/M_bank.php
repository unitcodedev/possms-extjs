<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class M_bank extends CI_Model {

    public function insert($data) {
		$sql = "INSERT INTO bank(Kode, Nama, AN, Rek, Akun)
		VALUES('" .$data['kode'] ."', '" .$data['nama'] ."', '" .$data['an'] ."', '" .$data['rek'] ."', '" .$data['akun'] ."')";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}

    public function update($data) {
		$sql = "UPDATE bank SET Kode= '" .$data['kode'] ."', Nama='" .$data['nama'] ."',
        AN= '" .$data['an'] ."', Rek= '" .$data['rek'] ."', Akun= '" .$data['akun'] ."'
        WHERE ID='" .$data['id'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}
    
    public function delete($data) {
        $sql = "DELETE FROM bank WHERE ID='" .$data['id'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
        
    }
    
    public function select_all() {
		$sql = "SELECT * FROM bank";
		$data = $this->db->query($sql);
		return $data->result();
	}
    
}
