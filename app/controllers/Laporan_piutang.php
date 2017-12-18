<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Laporan_piutang extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_piutang() {
        $customer = strtoupper($this->input->get('nama_customer'));
        $tgl_awal = $this->input->get('tgl_awal');
        $tgl_akhir = $this->input->get('tgl_akhir');
        $result = $this->query->get_query_grid("select mc_nama as nama_customer, 
            to_char(tgl_trx,'dd - Month - YYYY') as tgl_trx,
            trx_customer.tgl_jatuh_tempo, 
            tc_no_invoice as no_nota, 
            tc_kode_customer as kode_customer, 
            tc_netto as harga_netto,
            tc_kurang_bayar as kurang_bayar
            from trx_customer 
        left join ms_customer on ms_customer.kode_customer = trx_customer.tc_kode_customer
        where to_char(tgl_trx, 'YYYYmmdd') >= '$tgl_awal'
        and to_char(tgl_trx, 'YYYYmmdd') <= '$tgl_akhir'
        and tc_jenis_customer = 2
        and upper(mc_nama) like '%$customer%'");
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
        $customer = $pecah[2];
        $result = $this->query->get_query_grid("select mc_nama as nama_customer, 
            to_char(tgl_trx,'dd/mm/YYYY') as tgl_trx,
            trx_customer.tgl_jatuh_tempo, 
            tc_no_invoice as no_nota, 
            tc_kode_customer as kode_customer, 
            tc_netto as harga_netto,
            tc_kurang_bayar as kurang_bayar
            from trx_customer 
        left join ms_customer on ms_customer.kode_customer = trx_customer.tc_kode_customer
        where to_char(tgl_trx, 'YYYYmmdd') >= '$tgl_awal'
        and to_char(tgl_trx, 'YYYYmmdd') <= '$tgl_akhir'
        and tc_jenis_customer = 2
        and upper(mc_nama) like '%$customer%'");
        $no = 1;
        $tabel = '';
        $harga = 0;
        $kb = 0;
        foreach ($result as $value) {
            $tabel .= "[{text: '" . $no++ . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, "
                    . "{text: '" . $value->tgl_trx . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, "
                    . "{text: '" . $value->no_nota . "', fontSize: 8.9, alignment: 'left',lineHeight: 0.9},"
                    . "{text: '" . $value->nama_customer . "', fontSize: 8.9, alignment: 'left',lineHeight: 0.9},"
                    . "{text: '" . number_format($value->harga_netto, 0, ',', '.') . "', fontSize: 8.9,  alignment: 'right',lineHeight: 0.9},"
                    . "{text: '" . number_format($value->kurang_bayar, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.9}],";

            $harga +=$value->harga_netto;
            $kb +=$value->kurang_bayar;
        }

        $tabel .= "[{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, "
                . "{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, "
                . "{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8},"
                . "{text: 'TOTAL', fontSize: 8.9, alignment: 'center',lineHeight: 0.8},"
                . "{text: '" . number_format($harga, 0, ',', '.') . "', fontSize: 8.9,  alignment: 'right',lineHeight: 0.8},"
                . "{text: '" . number_format($kb, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.8}]";
        $data['periode'] = $this->format_tgl($tgl_awal) . ' S/D ' . $this->format_tgl($tgl_akhir);
        $data['tabel'] = $tabel;
        $data['logo'] = $this->query->get_table('setting', array('id' => 2))->value_setting;
        $data['perusahaan'] = $this->query->get_table('setting', array('id' => 1))->value_setting;
        $data['print_by'] = $this->user->mk_nama . " [ " . $this->query->tanggal_indo($this->query->get_tanggaljam_server(), 1) . " ]";
        $this->load->view('cetak_piutang_dagang', $data);
    }

    public function format_tgl($date) { // fungsi atau method untuk mengubah tanggal ke format indonesia
        $tahun = substr($date, 0, 4); // memisahkan format tahun menggunakan substring
        $bulan = substr($date, 4, 2); // memisahkan format bulan menggunakan substring
        $tgl = substr($date, 6, 2); // memisahkan format tanggal menggunakan substring
        $result = $tgl . "/" . $bulan . "/" . $tahun;
        return($result);
    }

}
