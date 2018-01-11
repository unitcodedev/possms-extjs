<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class M_stock extends CI_Model {
	
    public function select_all() {
		$sql = "SELECT * FROM stock ORDER BY Kode";
		$data = $this->db->query($sql);
		return $data->result();
	}
    
    public function insert($data, $kode) {
		$sql = "INSERT INTO stock(Kode, Nama, Merk, Golongan, Satuan1, Satuan2, JmlSat1, Satuan3, JmlSat2)
		VALUES('" .$kode. "', '" .$data['nama'] ."', '" .$data['brand'] ."', '" .$data['supplier'] ."', '" .$data['satuan1'] ."', '" .$data['satuan2'] ."', '" .$data['jmlSatuan1'] ."', '" .$data['satuan3'] ."', '" .$data['jmlSatuan2'] ."')";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}

    public function update($data) {
		$sql = "UPDATE stock SET Nama='" .$data['nama'] ."', Merk='" .$data['brand'] ."', Golongan= '" .$data['supplier'] ."', Satuan1= '" .$data['satuan1'] ."', Satuan2= '" .$data['satuan2'] ."', JmlSat1= '" .$data['jmlSatuan1'] ."', Satuan3= '" .$data['satuan3'] ."', JmlSat2= '" .$data['jmlSatuan2'] ."'
        WHERE Kode='" .$data['kode'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
	}
    
    public function delete($data) {
        $sql = "DELETE FROM stock WHERE Kode='" .$data['kode'] ."'";
		$this->db->query($sql);
		return $this->db->affected_rows();
        
    }
    
    public function select_merk() {
        $sql = "SELECT Merk FROM stock";
		$data = $this->db->query($sql);
		return $data->result();
    }


}
