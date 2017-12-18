<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Barang_keluar extends Auth_Controller {

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
                    $where = "and kode_barang = '$val'";
                } else {
                    $where = "and upper(nama_barang) like '%" . strtoupper($val) . "%'";
                }
            }
        } else {
            $where = '';
        }
//        $result = $this->query->get_table_grid('ms_barang', array('status' => 1), null, null, $like);
        $result = $this->query->get_query_grid("select ms_barang.*, kategori,lokasi,ms_barang.id_satuan_harga || '-' || satuan as satuan from ms_barang "
                . " left join ms_kategori_barang on ms_kategori_barang.id = ms_barang.id_kategori_barang"
                . " left join ms_lokasi_barang on ms_lokasi_barang.id = ms_barang.id_lokasi_barang"
                . " left join ms_satuan on ms_satuan.id = ms_barang.id_satuan_harga where ms_barang.status = 1 $where ");
        $this->query->get_log();
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

    public function list_customer() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if (is_numeric($val)) {
                    $like['kode_customer'] = $val;
                } else {
                    $like['upper(mc_nama)'] = strtoupper($val);
                }
            }
        }
        $result = $this->query->get_table_grid('ms_customer', array('mc_aktif' => 1), null, null, $like);
        if ($result != NULL) {
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
        }
    }

    public function simpan_transaksi() {
        $form = json_decode($this->input->post('form'), true);
        $grid = json_decode($this->input->post('grid'), true);
        $this->db->trans_start();
        // Trx Customer
        $cek = $this->query->count_table('trx_customer', array("to_char(tgl_trx,'YYmm')" => $this->query->get_bulantahun()));
//        $this->cabang->get_log();
        if ($cek == 0) {
            $this->query->get_query("select setval ('seq_no_invoice',1, false)");
            $no_urut = $this->query->cari_seq('seq_no_invoice', 1);
        } else {
            $no_urut = $this->query->cari_seq('seq_no_invoice');
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
        $no_invoice = "INV-" . $this->query->get_bulantahun() . $urutan;
        $arrcust['tgl_trx'] = $this->query->get_tanggaljam_server();
        $arrcust['tc_no_invoice'] = $no_invoice;
        $arrcust['tc_jenis_customer'] = $this->input->post('pelanggan');
        if ($this->input->post('pelanggan') == '2') {
            $arrcust['tc_kode_customer'] = $this->input->post('kode_customer');
            $arrcust['tc_nama_customer'] = $this->input->post('nama_customer');
        }
        $arrcust['tc_user_input'] = $this->user->id;
        $arrcust['tc_bruto'] = str_replace(',', '', $form['bruto']);
        $arrcust['tc_diskon'] = str_replace(',', '', $form['bruto']) - str_replace(',', '', $form['sub_total']);
        $arrcust['tc_netto'] = str_replace(',', '', $form['sub_total']);
        if (str_replace(',', '', $form['jumlah_bayar']) >= $arrcust['tc_netto']) {
            $arrcust['tc_bayar'] = $arrcust['tc_netto'];
        } else {
            $arrcust['tc_bayar'] = str_replace(',', '', $form['jumlah_bayar']);
        }
//        $arrcust['tc_bayar'] = str_replace(',', '', $form['jumlah_bayar']);
        $cek_kb = $form['kurang_bayar'];
        if ($cek_kb > 0) {
            $kurang_bayar = $cek_kb;
            $status_lunas = 0;
        } else {
            $kurang_bayar = 0;
            $status_lunas = 1;
        }
        $arrcust['tc_kurang_bayar'] = $kurang_bayar;
        $arrcust['tc_status_lunas'] = $status_lunas;
        // Cek PPN
//        $cek_ppn = $this->query->get_table('setting', array('id' => 5))->value_setting;
//        if ($cek_ppn == 1) {
//            $arrcust['tc_ppn'] = '10';
//            $arrcust['tc_rp_ppn'] = $arrcust['tc_netto'] * 0.10;
//        }
        $this->db->insert('trx_customer', $arrcust);
        $trx_customer_id = $this->db->insert_id();
        // Keuangan
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
        $arrkeu['trx_customer_id'] = $trx_customer_id;
        $arrkeu['tc_tgl'] = $this->query->get_tanggaljam_server();
        $arrkeu['no_nota'] = "N-" . $nota;
        $arrkeu['tk_rp_bruto'] = str_replace(',', '', $form['bruto']);
        $arrkeu['tk_rp_diskon'] = str_replace(',', '', $form['bruto']) - str_replace(',', '', $form['sub_total']);
        $arrkeu['tk_rp_netto'] = str_replace(',', '', $form['sub_total']);
        $arrkeu['tk_kurang_bayar'] = $kurang_bayar;
        if (str_replace(',', '', $form['jumlah_bayar']) >= $arrkeu['tk_rp_netto']) {
            $arrkeu['tk_bayar'] = $arrkeu['tk_rp_netto'];
        } else {
            $arrkeu['tk_bayar'] = str_replace(',', '', $form['jumlah_bayar']);
        }
        $arrkeu['tk_jenis_bayar'] = $form['motode_bayar'];
        $arrkeu['tk_bank'] = $form['bank'];
        $arrkeu['tc_input'] = $this->user->id;
        $arrkeu['tk_keterangan'] = $form['keterangan_bank'];
        if ($this->input->post('pelanggan') == '1') {
            $arrkeu['nama_customer'] = 'Tunai';
        } else {
            $arrkeu['nama_customer'] = $this->input->post('nama_customer');
        }
        $this->db->insert('trx_keuangan', $arrkeu);
        foreach ($grid as $value) {
            $qty = $value['qty'];
            $satuan = explode('-', $value['satuan']);
            $data = array(
                'tgl_transaksi' => $this->query->get_tanggaljam_server(),
                'user_input' => $this->user->id,
                'kode_barang' => $value['kode_barang'],
                'nama_barang' => $value['nama_barang'],
                'qty' => $value['qty'],
                'satuan' => $satuan[0],
                'harga_barang' => $value['harga'],
                'harga_satuan' => $value['harga_satuan'],
                'diskon_barang' => $value['diskon'],
                'sub_total' => $value['netto'],
                'trx_customer_id' => $trx_customer_id,
//                'jenis_pelanggan' => $this->input->post('pelanggan')
            );
            $this->db->insert('trx_barang', $data);
            // Update Stok Barang
            $this->query->get_query("update ms_barang set stok = stok - $qty where kode_barang = '" . $value['kode_barang'] . "'");
        }
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => $trx_customer_id, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

    public function nota($trx_customer_id) {
        $result = $this->query->get_query_grid("select trx_barang.*, ms_satuan.satuan as satuan_barang
            from trx_barang 
            left join ms_satuan on trx_barang.satuan = ms_satuan.id
            where trx_customer_id = '$trx_customer_id'");
        $this->query->get_log();
        $no = 1;
        $tabel = '';
        $total = '';
        foreach ($result as $value) {
//            $total += $value->sub_total;
            $tabel .= "[{text: '" . $no++ . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, "
                    . "{text: '$value->nama_barang', fontSize: 8.9, alignment: 'center',lineHeight: 0.9}, "
                    . "{text: '" . $value->qty . "', fontSize: 8.9, alignment: 'center',lineHeight: 0.9},"
                    . "{text: '" . $value->satuan_barang . "', fontSize: 8.9,  alignment: 'left',lineHeight: 0.9},"
                    . "{text: '" . number_format($value->harga_satuan, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.9},"
                    . "{text: '" . $value->diskon_barang . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.9},"
                    . "{text: '" . number_format($value->sub_total, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.9}],";
        }

//            $tabel .= "[{text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, {text: '', fontSize: 8.9, alignment: 'center',lineHeight: 0.8}, {text: 'TOTAL', fontSize: 8.9, alignment: 'center',lineHeight: 0.8},{text: '', fontSize: 8.9,  alignment: 'center',lineHeight: 0.8},{text: '', fontSize: 8.9, alignment: 'right',lineHeight: 0.8},{text: '" . number_format($total, 0, ',', '.') . "', fontSize: 8.9, alignment: 'right',lineHeight: 0.8}],";
        $cs_trx = $this->query->get_table('trx_customer', array('id' => $trx_customer_id));
        $dataprint['periode'] = '';
        $dataprint['tabel'] = $tabel;
        $dataprint['no_trx'] = $cs_trx->tc_no_invoice;
        if ($cs_trx->tc_jenis_customer == '1') {
            $dataprint['kode'] = '001';
            $dataprint['nama'] = 'TUNAI / CASH';
            $penerima = '(                                            )';
        } else {
            $dataprint['kode'] = $cs_trx->tc_kode_customer;
            $dataprint['nama'] = $cs_trx->tc_nama_customer;
            $penerima = "( $cs_trx->tc_nama_customer )";
        }
        $dataprint['tgl'] = $this->query->tanggal_indo($cs_trx->tgl_trx);
        $dataprint['penerima'] = $penerima;
        $dataprint['kasir'] = $this->query->get_table('ms_karyawan', array('id' => $cs_trx->tc_user_input))->mk_nama;
        $dataprint['total_harga'] = number_format($cs_trx->tc_netto, 0, ',', '.');
        $dataprint['disc'] = number_format($cs_trx->tc_bruto - $cs_trx->tc_netto, 0, ',', '.');
        $dataprint['ppn'] = number_format($cs_trx->tc_rp_ppn, 0, ',', '.');
        $dataprint['total_bayar'] = number_format($cs_trx->tc_bayar, 0, ',', '.');
        $dataprint['logo'] = $this->query->get_table('setting', array('id' => 2))->value_setting;
        $dataprint['perusahaan'] = $this->query->get_table('setting', array('id' => 1))->value_setting;
        $dataprint['alamat'] = $this->query->get_table('setting', array('id' => 3))->value_setting;
        $dataprint['kota'] = $this->query->get_table('setting', array('id' => 4))->value_setting;
        $dataprint['print_by'] = $this->user->mk_nama . " [ " . $this->query->tanggal_indo($this->query->get_tanggaljam_server(), 1) . " ]";
        $this->load->view('cetak_nota', $dataprint);
    }

}
