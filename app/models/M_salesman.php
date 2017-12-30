<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class M_salesman extends CI_Model {
    
    public function insert($data) {
		$sql = "INSERT INTO salesman(Kode, Nama, Alamat)
		VALUES('" .$data['kode'] ."', '" .$data['nama'] ."', '" .$data['alamat'] ."')";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}

    public function update($data) {
		$sql = "UPDATE salesman SET Kode='" .$data['kode'] ."',
        Nama= '" .$data['nama'] ."', Alamat= '" .$data['alamat'] ."'
        WHERE Kode='" .$data['kode'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}
    
    public function delete($data) {
        $sql = "DELETE FROM salesman WHERE Kode='" .$data['kode'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
        
    }
    
    public function select_all() {
		$sql = "SELECT Kode, Nama, Alamat FROM salesman";
		$data = $this->db->query($sql);
		return $data->result();
	}


}
