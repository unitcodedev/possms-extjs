<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Laporan_kas extends Auth_Controller {

    function __construct() {
        parent::__construct();
    }

    public function list_kas() {
        $input = strtoupper($this->input->get('nama_input'));
        $tgl_awal = $this->input->get('tgl_awal');
        $tgl_akhir = $this->input->get('tgl_akhir');
        $result = $this->query->get_query_grid("select mk_nama, trx_keuangan.* from trx_keuangan
        left join ms_karyawan on ms_karyawan.id = trx_keuangan.tc_input
        where to_char(tc_tgl, 'YYYYmmdd') >= '$tgl_awal'
        and to_char(tc_tgl, 'YYYYmmdd') <= '$tgl_akhir'
        and upper(mk_nama) like '%$input%';");
        $list = array();
        foreach ($result as $row) {
            $data['tgl_transaksi'] = $this->query->tanggal_indo($row->tc_tgl);
            $data['customer'] = $row->nama_customer;
            if ($row->tk_jenis_bayar == '1') {
                $tunai = $row->tk_bayar;
                $nontunai = '0';
            } else {
                $nontunai = $row->tk_bayar;
                $tunai = '0';
            }
            $data['tunai'] = $tunai;
            $data['non_tunai'] = $nontunai;
            $data['kasir'] = $row->mk_nama;
            $data['group'] = 'Penerimaan Kas';
            $list[] = $data;
        }
        log_message('error', $this->db->last_query());
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $list, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function cetak($arr) {
        $pecah = explode('-', $arr);
        $tgl_awal = $pecah[0];
        $tgl_akhir = $pecah[1];
        $input = $pecah[2];
        $result = $this->query->get_query_grid("select mk_nama, trx_keuangan.* from trx_keuangan
        left join ms_karyawan on ms_karyawan.id = trx_keuangan.tc_input
        where to_char(tc_tgl, 'YYYYmmdd') >= '$tgl_awal'
        and to_char(tc_tgl, 'YYYYmmdd') <= '$tgl_akhir'
        and upper(mk_nama) like '%$input%';");
        $no = 1;
        $tabel = '';
        $total_tunai = 0;
        $total_nontunai = 0;
        foreach ($result as $value) {
            if ($value->tk_jenis_bayar == '1') {
                $tunai = $value->tk_bayar;
                $nontunai = '0';
                $total_tunai += $value->tk_bayar;
            } else {
                $nontunai = $value->tk_bayar;
                $tunai = '0';
                $total_nontunai += $value->tk_bayar;
            }
            $tabel .= "[{text: '" . $no++ . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, {text: '" . $this->query->tanggal_indo($value->tc_tgl) . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, {text: '" . $value->nama_customer . "', fontSize: 8.9, alignment: 'left',lineHeight: 0.9},{text: '" . number_format($tunai, 0, ',', '.') . "', fontSize: 8.9,  alignment: 'right',lineHeight: 0.9},{text: '" . number_format($nontunai, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.9},{text: '$value->mk_nama', fontSize: 8.9, alignment: 'right',lineHeight: 0.9}],";
        }

        $tabel .= "[{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, {text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, {text: 'TOTAL', fontSize: 8.9, alignment: 'center',lineHeight: 0.8},{text: '" . number_format($total_tunai, 0, ',', '.') . "', fontSize: 8.9,  alignment: 'right',lineHeight: 0.8},{text: '" . number_format($total_nontunai, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.8},{text: '', fontSize: 8.9, alignment: 'right',lineHeight: 0.8}],";
        $data['periode'] = $this->format_tgl($tgl_awal) . ' S/D ' . $this->format_tgl($tgl_akhir);
        $data['tabel'] = $tabel;
        $data['logo'] = $this->query->get_table('setting', array('id' => 2))->value_setting;
        $data['perusahaan'] = $this->query->get_table('setting', array('id' => 1))->value_setting;
        $data['print_by'] = $this->user->mk_nama . " [ " . $this->query->tanggal_indo($this->query->get_tanggaljam_server(), 1) . " ]";
        $this->load->view('cetak_penerimaan_kas', $data);
    }

    public function format_tgl($date) { // fungsi atau method untuk mengubah tanggal ke format indonesia
        $tahun = substr($date, 0, 4); // memisahkan format tahun menggunakan substring
        $bulan = substr($date, 4, 2); // memisahkan format bulan menggunakan substring
        $tgl = substr($date, 6, 2); // memisahkan format tanggal menggunakan substring
        $result = $tgl . "/" . $bulan . "/" . $tahun;
        return($result);
    }

}
