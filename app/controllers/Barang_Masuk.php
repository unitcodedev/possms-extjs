<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Barang_Masuk extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_barang() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if (is_numeric($val)) {
                    $like['kode_barang'] = $val;
                } else {
                    $like['upper(nama_barang)'] = strtoupper($val);
                }
            }
        } else {
            $like = null;
        }
        $result = $this->query->get_table_grid('ms_barang', array('status' => 1), null, null, $like);
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function list_barang_keluar() {
//        $records = $this->input->get('filter');
        $val = $this->input->get('query');
//        if ($records) {
//            $raw_record = json_decode($_GET['filter'], true);
//            foreach ($raw_record as $key) {
//                $field = $this->property_reader($key['property']);
//                $val = $this->property_reader($key['value']);
        if (is_numeric($val)) {
            $like = "kode_barang = '$val'";
        } else {
            $like = "upper(nama_barang) like '%" . strtoupper($val) . "%'";
        }
//            }
//        } else {
//            $like = null;
//        }
        $result = $this->query->get_query_grid("select kode_barang || ' - ' || nama_barang as nama_barang, kode_barang, harga_beli, nama_barang as nama_barang_asli from ms_barang where status = 1 and $like");
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }
    

    public function list_suplier() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if (is_numeric($val)) {
                    $like['kode_suplier'] = $val;
                } else {
                    $like['upper(ms_nama)'] = strtoupper($val);
                }
            }
        }
        $result = $this->query->get_table_grid('ms_suplier', array('ms_aktif' => 1), null, null, $like);
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function simpan_transaksi() {
        $grid = json_decode($this->input->post('grid'), true);
        $this->db->trans_start();
        $cek = $this->query->count_table('trx_barang_masuk', array("to_char(bm_tgl_trx,'YYmm')" => $this->query->get_bulantahun()));
        if ($cek == 0) {
            $this->query->get_query("select setval ('seq_no_bm',1, false)");
            $no_urut = $this->query->cari_seq('seq_no_bm', 1);
        } else {
            $no_urut = $this->query->cari_seq('seq_no_bm');
        }
        if ($no_urut < 10) {
            $urutan = "000$no_urut";
        } else if ($no_urut < 100) {
            $urutan = "00$no_urut";
        } else if ($no_urut < 1000) {
            $urutan = "0$no_urut";
        } else {
            $urutan = "$no_urut";
        }
        $no_invoice = "BM-" . $this->query->get_bulantahun() . $urutan;
        $arrcust['bm_tgl_trx'] = $this->input->post('tgl');
        $arrcust['no_bm'] = $no_invoice;
        $arrcust['bm_nonota'] = $this->input->post('no_nota');
        $arrcust['bm_kode_suplier'] = $this->input->post('kode_suplier');
        $arrcust['bm_nama_suplier'] = $this->input->post('nama_suplier');
        $arrcust['bm_user_input'] = $this->user->id;
        $arrcust['bm_tgl_input'] = $this->query->get_tanggaljam_server();
        $this->db->insert('trx_barang_masuk', $arrcust);
        $id_master = $this->db->insert_id();
        $netto = 0;
        foreach ($grid as $value) {
            $netto += $value['harga_total'];
            $satuan = explode(' - ', $value['satuan']);
            $qty = $value['qty'];
            $data = array(
                'bmd_tgl' => $this->query->get_tanggaljam_server(),
                'bmd_input' => $this->user->id,
                'bmd_kode_barang' => $value['kode_barang'],
                'bmd_nama_barang' => $value['nama_barang'],
                'bmd_qty' => $value['qty'],
                'bmd_satuan' => $satuan[0],
                'bmd_harga' => $value['harga_satuan'],
                'bmd_harga_total' => $value['harga_total'],
                'id_trx_barang_masuk' => $id_master,
            );
            $this->db->insert('trx_barang_masuk_det', $data);
            // Update Stok Barang
            $this->query->get_query("update ms_barang set stok = stok + $qty where kode_barang = '" . $value['kode_barang'] . "'");
        }
        $arrupdate['bm_harga'] = $netto;
        $arrupdate['bm_kurang_bayar'] = $netto;
        $arrupdate['bm_bayar'] = 0;
        $this->db->update('trx_barang_masuk', $arrupdate, array('id' => $id_master));
        // Keuangan TKB
        $arrkeu['id_trx_barang_masuk'] = $id_master;
        $arrkeu['tkb_tgl'] = $this->query->get_tanggaljam_server();
        $arrkeu['tkb_rp_bruto'] = $netto;
        $arrkeu['tkb_rp_diskon'] = 0;
        $arrkeu['tkb_rp_netto'] = $netto;
        $arrkeu['tkb_kurang_bayar'] = $netto;
        $arrkeu['tkb_bayar'] = 0;
        $arrkeu['tkb_jenis_bayar'] = 0;
        $arrkeu['tkb_bank'] = 0;
        $arrkeu['tkb_input'] = $this->user->id;
        $arrkeu['tkb_keterangan'] = '';
        $arrkeu['tkb_id_suplier'] = $this->input->post('kode_suplier');
        $arrkeu['tkb_nama_suplier'] = $this->input->post('nama_suplier');
        $this->db->insert('trx_keuangan_bm', $arrkeu);
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

}
