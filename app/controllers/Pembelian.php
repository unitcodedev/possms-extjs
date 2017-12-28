<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author MrMarz
 */
class Pembelian extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_supplier() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if (is_numeric($val)) {
                    $like['Kode'] = $val;
                } else {
                    $like['upper(Nama)'] = strtoupper($val);
                }
                $result = $this->query->get_table_grid('supplier', null, null, null, $like);
                if ($result != NULL) {
                    echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
                } else {
                    echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
                }
            }
        }
    }

    public function list_barang() {
        $val = $this->input->get('query');
        if (is_numeric($val)) {
            $like['Kode'] = $val;
        } else {
            $like['upper(Nama)'] = strtoupper($val);
        }
        $result = $this->query->get_table_grid('stock', null, null, null, $like);
//        $this->query->get_log();

        echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_satuan_barang() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $val = $this->property_reader($key['value']);
                $result = $this->get_harga_beli($val);
//                $this->query->get_log();
                echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
            }
        }
    }

    public function simpan_transaksi() {
        $this->db->trans_start();
//        $thunbulan = substr($this->input->post('tgl'), -6);
        $arrinst['Faktur'] = $this->get_no_faktur($this->input->post('tgl'));
        $arrinst['FakturAsli'] = $this->input->post('no_faktur');
        $arrinst['status'] = 'Belum Lunas';
        $arrinst['Tgl'] = $this->input->post('tgl');
        $arrinst['Jthtmp'] = $this->input->post('tgl_jatuh_tempo');
        $arrinst['Supplier'] = $this->input->post('kode_suplier');
        $arrinst['Total'] = $this->input->post('total');
        $arrinst['Hutang'] = $this->input->post('hutang');
        $arrinst['DateTime'] = $this->query->get_now_mysql();
        $arrinst['UserName'] = $this->user->mk_nama;
        $this->db->insert('totpembelian', $arrinst);
        $grid = json_decode($this->input->post('grid'), true);
        foreach ($grid as $grid_loop) {
            $arrpem['Tgl'] = $arrinst['Tgl'];
            $arrpem['Faktur'] = $arrinst['Faktur'];
            $arrpem['Keterangan'] = $this->input->post('keterangan');
            $arrpem['Kode'] = $grid_loop['kode_barang'];
            $arrpem['Qty'] = $grid_loop['qty'];
            $arrpem['Satuan'] = $grid_loop['satuan'];
            $arrpem['Harga'] = $grid_loop['harga_satuan'];
            $arrpem['Discount1'] = $grid_loop['disc1'];
            $arrpem['Discount2'] = $grid_loop['disc2'];
            $arrpem['Discount3'] = $grid_loop['disc3'];
            $arrpem['DiscRp'] = $grid_loop['discrp'];
            $arrpem['Jumlah'] = $grid_loop['harga_total'];
            $arrpem['ExpDate'] = $this->conv_tgl($grid_loop['exp']);
            $arrpem['gudang'] = $grid_loop['gdg'];
            $this->db->insert('pembelian', $arrpem);
        }
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'faktur' => $arrinst['Faktur'], 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'faktur' => $arrinst['Faktur'], 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

    public function get_harga_beli($kode_barang) {
        $sql = "select hargabeli.Kode,stock.Nama,'Satuan1' as sat, stock.Satuan1 as satuan,
                hargabeli.HJS as harga
                from hargabeli 
                inner join stock on stock.Kode = hargabeli.Kode
                where hargabeli.Kode = '$kode_barang'
                union
                select hargabeli.Kode,stock.Nama,'Satuan2' as sat, stock.Satuan2 as satuan,
                hargabeli.HJM as harga
                from hargabeli 
                inner join stock on stock.Kode = hargabeli.Kode
                where hargabeli.Kode = '$kode_barang'
                union
                select hargabeli.Kode,stock.Nama,'Satuan3' as sat,stock.Satuan3 as satuan,
                hargabeli.HJL as harga
                from hargabeli 
                inner join stock on stock.Kode = hargabeli.Kode
                where hargabeli.Kode = '$kode_barang'";
        $result = $this->query->get_query_grid($sql);
        return $result;
    }

    public function conv_tgl($tgl) {
//        log_message('error', $tgl);
        $pecah = explode('/', $tgl);
//        log_message('error', print_r($pecah, true));
        $tgl_baru = $pecah[2] . $pecah[1] . $pecah[0];
        return $tgl_baru;
    }

    public function get_no_faktur($tanggal) {
        $sql = "select MAX(Faktur) as faktur from pembelian where DATE_FORMAT(tgl,'%Y%m%d') = '$tanggal' ";
        $cek_faktur = $this->query->get_query($sql);
        $bt = substr($tanggal, 2, -2);
        log_message('error', $bt);
        if ($cek_faktur->num_rows() > 0) {
            $urutan = substr($cek_faktur->row()->faktur, -4) + 1;
            if ($urutan < 10) {
                $no = '000' . $urutan;
            } else if ($urutan >= 10 && $urutan < 100) {
                $no = '00' . $urutan;
            } else if ($urutan >= 100 && $urutan < 1000) {
                $no = '0' . $urutan;
            } else {
                $no = $urutan;
            }
            $result = "FB" . $bt . $no;
        } else {

            $result = "FB" . $bt . "0001";
        }
        return $result;
    }

}
