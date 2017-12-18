<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class M_satuan extends CI_Model {
    
    public function insert($data) {
		$sql = "INSERT INTO satuan(Kode, Keterangan)
		VALUES('" .$data['kode'] ."', '" .$data['keterangan'] ."')";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}

    public function update($data) {
		$sql = "UPDATE satuan SET Kode='" .$data['kode'] ."',
        Keterangan= '" .$data['keterangan'] ."'
        WHERE ID='" .$data['id'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}
    
    public function delete($data) {
        $sql = "DELETE FROM satuan WHERE ID='" .$data['id'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
        
    }


}