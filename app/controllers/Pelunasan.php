<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Pelunasan extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_data() {
        $jenis_pelunasan = $this->input->get('jenis_pelunasan');
        $tgl_awal = $this->input->get('tgl_awal');
        $tgl_akhir = $this->input->get('tgl_akhir');
        $list = '';
        if ($jenis_pelunasan == '1') {
            $result = $this->query->get_query_grid("select * from trx_keuangan_bm "
                    . "where to_char(tkb_tgl, 'YYYYmmdd') >= '$tgl_awal'"
                    . "and to_char(tkb_tgl, 'YYYYmmdd') <= '$tgl_akhir'"
                    . " and tkb_status_pelunasan = 1");
            foreach ($result as $value) {
                $data['tgl'] = $this->query->tanggal_indo($value->tkb_tgl);
                $data['no_nota'] = $value->tkb_no_nota;
                $data['nama'] = $value->tkb_nama_suplier;
                if ($value->tkb_jenis_bayar == '1') {
                    $data['tunai'] = $value->tkb_bayar;
                    $data['non_tunai'] = 0;
                } else {
                    $data['tunai'] = 0;
                    $data['non_tunai'] = $value->tkb_bayar;
                }
                $list[] = $data;
            }
        } else {
            $result = $this->query->get_query_grid("select * from trx_keuangan "
                    . "where to_char(tc_tgl, 'YYYYmmdd') >= '$tgl_awal'"
                    . "and to_char(tc_tgl, 'YYYYmmdd') <= '$tgl_akhir'"
                    . " and tk_status_pelunasan = 1");
            foreach ($result as $value) {
                $data['tgl'] = $this->query->tanggal_indo($value->tc_tgl);
                $data['no_nota'] = $value->no_nota;
                $data['nama'] = $value->nama_customer;
                if ($value->tk_jenis_bayar == '1') {
                    $data['tunai'] = $value->tk_bayar;
                    $data['non_tunai'] = 0;
                } else {
                    $data['tunai'] = 0;
                    $data['non_tunai'] = $value->tk_bayar;
                }
                $list[] = $data;
            }
        }
        if ($list != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $list, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function cari_data_pelunasan() {
        $jenis_pelunasan = $this->input->get('jenis_pelunasan');
        $list = '';
        if ($jenis_pelunasan == '1') {
            $result = $this->query->get_table_grid('trx_barang_masuk', array('bm_kurang_bayar >' => 0), null, null, array('upper(no_bm)' => strtoupper($this->input->get('val'))));
            foreach ($result as $value) {
                $data['id'] = $value->id;
                $data['nomor_trx'] = $value->no_bm;
                $data['nama'] = $value->bm_nama_suplier;
                $data['harga'] = $value->bm_harga;
                $data['harga_kb'] = $value->bm_kurang_bayar;
                $list[] = $data;
            }
        } else {
            $result = $this->query->get_table_grid('trx_customer', array('tc_kurang_bayar >' => 0), null, null, array('upper(tc_no_invoice)' => strtoupper($this->input->get('val'))));
            foreach ($result as $value) {
                $data['id'] = $value->id;
                $data['nomor_trx'] = $value->tc_no_invoice;
                $data['nama'] = $value->tc_nama_customer;
                $data['harga'] = $value->tc_netto;
                $data['harga_kb'] = $value->tc_kurang_bayar;
                $list[] = $data;
            }
        }
        if ($list != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $list, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function simpan_pelunasan() {
        $this->db->trans_start();
        $seq_nota = $this->query->cari_seq('seq_no_nota');
        if ($seq_nota < 10) {
            $nota = "000$seq_nota";
        } else if ($seq_nota < 100) {
            $nota = "00$seq_nota";
        } else if ($seq_nota < 1000) {
            $nota = "0$seq_nota";
        } else {
            $nota = "$seq_nota";
        }
        if ($this->input->post('jenis_pelunasan') == '1') {
            // PElunasan HUTANG
            $bm = $this->query->get_table('trx_barang_masuk', array('id' => $this->input->post('no_transaksi')));
            $arrkeu['id_trx_barang_masuk'] = $this->input->post('no_transaksi');
            $arrkeu['tkb_tgl'] = $this->query->get_tanggaljam_server();
            $arrkeu['tkb_rp_bruto'] = $bm->bm_harga;
            $arrkeu['tkb_rp_diskon'] = 0;
            $arrkeu['tkb_rp_netto'] = str_replace(',', '', $this->input->post('total'));
            $arrkeu['tkb_kurang_bayar'] = $this->input->post('kb');
            $arrkeu['tkb_bayar'] = str_replace(',', '', $this->input->post('bayar'));
            $arrkeu['tkb_jenis_bayar'] = $this->input->post('motode_bayar');
            $arrkeu['tkb_bank'] = $this->input->post('bank');
            $arrkeu['tkb_input'] = $this->user->id;
            $arrkeu['tkb_keterangan'] = $this->input->post('keterangan_bank');
            $arrkeu['tkb_id_suplier'] = $bm->bm_kode_suplier;
            $arrkeu['tkb_nama_suplier'] = $bm->bm_nama_suplier;
            $arrkeu['tkb_status_pelunasan'] = 1;
            $arrkeu['tkb_no_nota'] = "N-" . $nota;
            $this->db->insert('trx_keuangan_bm', $arrkeu);
            $arrupdate['bm_kurang_bayar'] = $this->input->post('kb');
            $arrupdate['bm_bayar'] = $arrkeu['tkb_bayar'];
            $this->db->update('trx_barang_masuk', $arrupdate, array('id' => $this->input->post('no_transaksi')));
        } else {
            $cs = $this->query->get_table('trx_customer', array('id' => $this->input->post('no_transaksi')));
            $arrkeu['trx_customer_id'] = $this->input->post('no_transaksi');
            $arrkeu['tc_tgl'] = $this->query->get_tanggaljam_server();
            $arrkeu['no_nota'] = "N-" . $nota;
            $arrkeu['tk_rp_bruto'] = $cs->tc_bruto;
            $arrkeu['tk_rp_diskon'] = $cs->tc_diskon;
            $arrkeu['tk_rp_netto'] = $cs->tc_netto;
            $arrkeu['tk_kurang_bayar'] = $this->input->post('kb');
            $arrkeu['tk_bayar'] = str_replace(',', '', $this->input->post('bayar'));
            $arrkeu['tk_jenis_bayar'] = $this->input->post('motode_bayar');
            $arrkeu['tk_bank'] = $this->input->post('bank');
            $arrkeu['tc_input'] = $this->user->id;
            $arrkeu['tk_status_pelunasan'] = 1;
            $arrkeu['tk_keterangan'] = $this->input->post('keterangan_bank');
            if ($cs->tc_jenis_customer == '1') {
                $arrkeu['nama_customer'] = 'Tunai';
            } else {
                $arrkeu['nama_customer'] = $cs->tc_nama_customer;
            }
            $this->db->insert('trx_keuangan', $arrkeu);
            $arrupdate['tc_kurang_bayar'] = $this->input->post('kb');
            $arrupdate['tc_bayar'] = $arrkeu['tk_bayar'];
            $this->db->update('trx_customer', $arrupdate, array('id' => $this->input->post('no_transaksi')));
        }


        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

}
