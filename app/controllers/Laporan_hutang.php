<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Laporan_hutang extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_hutang() {
        $suplier = strtoupper($this->input->get('nama_suplier'));
        $tgl_awal = $this->input->get('tgl_awal');
        $tgl_akhir = $this->input->get('tgl_akhir');
        $result = $this->query->get_query_grid("select 
             to_char(bm_tgl_trx,'dd/mm/YYYY') as tgl_trx,
            bm_kode_suplier as kode_suplier,
            bm_nama_suplier as nama_suplier,
            bm_harga as harga_netto,
            bm_kurang_bayar as kurang_bayar,
            no_bm as no_trx,
            bm_nonota as no_nota
            from trx_barang_masuk
        where to_char(bm_tgl_trx, 'YYYYmmdd') >= '$tgl_awal'
        and to_char(bm_tgl_trx, 'YYYYmmdd') <= '$tgl_akhir'
        and upper(bm_nama_suplier) like '%$suplier%'");
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function cetak($arr) {
        $pecah = explode('-', $arr);
        $tgl_awal = $pecah[0];
        $tgl_akhir = $pecah[1];
        $suplier = $pecah[2];
        $result = $this->query->get_query_grid("select 
             to_char(bm_tgl_trx,'dd/mm/YYYY') as tgl_trx,
            bm_kode_suplier as kode_suplier,
            bm_nama_suplier as nama_suplier,
            bm_harga as harga_netto,
            bm_kurang_bayar as kurang_bayar,
            no_bm as no_trx,
            bm_nonota as no_nota
            from trx_barang_masuk
        where to_char(bm_tgl_trx, 'YYYYmmdd') >= '$tgl_awal'
        and to_char(bm_tgl_trx, 'YYYYmmdd') <= '$tgl_akhir'
        and upper(bm_nama_suplier) like '%$suplier%'");
        $no = 1;
        $tabel = '';
        $harga = 0;
        $kb = 0;
        foreach ($result as $value) {
            $tabel .= "[{text: '" . $no++ . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, "
                    . "{text: '" . $value->tgl_trx . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, "
                    . "{text: '" . $value->no_trx . "', fontSize: 8.9, alignment: 'left',lineHeight: 0.9},"
                    . "{text: '" . $value->no_nota . "', fontSize: 8.9, alignment: 'left',lineHeight: 0.9},"
                    . "{text: '" . $value->nama_suplier . "', fontSize: 8.9, alignment: 'left',lineHeight: 0.9},"
                    . "{text: '" . number_format($value->harga_netto, 0, ',', '.') . "', fontSize: 8.9,  alignment: 'right',lineHeight: 0.9},"
                    . "{text: '" . number_format($value->kurang_bayar, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.9}],";

            $harga +=$value->harga_netto;
            $kb +=$value->kurang_bayar;
        }

        $tabel .= "[{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, "
                . "{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, "
                . "{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8},"
                . "{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8},"
                . "{text: 'TOTAL', fontSize: 8.9, alignment: 'center',lineHeight: 0.8},"
                . "{text: '" . number_format($harga, 0, ',', '.') . "', fontSize: 8.9,  alignment: 'right',lineHeight: 0.8},"
                . "{text: '" . number_format($kb, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.8}]";
        $data['periode'] = $this->format_tgl($tgl_awal) . ' S/D ' . $this->format_tgl($tgl_akhir);
        $data['tabel'] = $tabel;
        $data['logo'] = $this->query->get_table('setting', array('id' => 2))->value_setting;
        $data['perusahaan'] = $this->query->get_table('setting', array('id' => 1))->value_setting;
        $data['print_by'] = $this->user->mk_nama . " [ " . $this->query->tanggal_indo($this->query->get_tanggaljam_server(), 1) . " ]";
        $this->load->view('cetak_hutang_dagang', $data);
    }
     public function format_tgl($date) { // fungsi atau method untuk mengubah tanggal ke format indonesia
        $tahun = substr($date, 0, 4); // memisahkan format tahun menggunakan substring
        $bulan = substr($date, 4, 2); // memisahkan format bulan menggunakan substring
        $tgl = substr($date, 6, 2); // memisahkan format tanggal menggunakan substring
        $result = $tgl . "/" . $bulan . "/" . $tahun;
        return($result);
    }

}
