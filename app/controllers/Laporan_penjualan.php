<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Laporan_penjualan extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_penjualan() {
//        $customer = strtoupper($this->input->get('nama_customer'));
        $tgl_awal = $this->input->get('tgl_awal');
        $tgl_akhir = $this->input->get('tgl_akhir');
        $result = $this->query->get_query_grid("select to_char(tgl_transaksi,'dd/mm/YYYY') as tgl_transaksi,
            kode_barang,
            nama_barang,
            qty,
            sub_total
            from trx_barang 
        where to_char(tgl_transaksi, 'YYYYmmdd') >= '$tgl_awal'
        and to_char(tgl_transaksi, 'YYYYmmdd') <= '$tgl_akhir'");

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
        $result = $this->query->get_query_grid("select to_char(tgl_transaksi,'dd/mm/YYYY') as tgl_transaksi,
            kode_barang,
            nama_barang,
            qty,
            sub_total
            from trx_barang 
        where to_char(tgl_transaksi, 'YYYYmmdd') >= '$tgl_awal'
        and to_char(tgl_transaksi, 'YYYYmmdd') <= '$tgl_akhir'");
        $no = 1;
        $tabel = '';
        $total = '';
        foreach ($result as $value) {
            $total += $value->sub_total;
            $tabel .= "[{text: '" . $no++ . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, {text: '$value->tgl_transaksi', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, {text: '" . $value->kode_barang . "', fontSize: 8.9, alignment: 'left',lineHeight: 0.9},{text: '" . $value->nama_barang . "', fontSize: 8.9,  alignment: 'left',lineHeight: 0.9},{text: '" . $value->qty . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9},{text: '" . number_format($value->sub_total, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.9}],";
        }

        $tabel .= "[{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, {text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, {text: 'TOTAL', fontSize: 8.9, alignment: 'center',lineHeight: 0.8},{text: '', fontSize: 8.9,  alignment: 'center',lineHeight: 0.8},{text: '', fontSize: 8.9, alignment: 'right',lineHeight: 0.8},{text: '" . number_format($total, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.8}],";

        $data['periode'] = $this->format_tgl($tgl_awal) . ' S/D ' . $this->format_tgl($tgl_akhir);
        $data['tabel'] = $tabel;
        $data['logo'] = $this->query->get_table('setting', array('id' => 2))->value_setting;
        $data['perusahaan'] = $this->query->get_table('setting', array('id' => 1))->value_setting;
        $data['print_by'] = $this->user->mk_nama . " [ " . $this->query->tanggal_indo($this->query->get_tanggaljam_server(), 1) . " ]";
        $this->load->view('cetak_laporan_penjualan', $data);
    }

    public function format_tgl($date) { // fungsi atau method untuk mengubah tanggal ke format indonesia
        $tahun = substr($date, 0, 4); // memisahkan format tahun menggunakan substring
        $bulan = substr($date, 4, 2); // memisahkan format bulan menggunakan substring
        $tgl = substr($date, 6, 2); // memisahkan format tanggal menggunakan substring
        $result = $tgl . "/" . $bulan . "/" . $tahun;
        return($result);
    }

}
