<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
use PEAR2\Net\RouterOS;

class Master_Barang extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->address = '7aec07bd6f31.sn.mynetname.net';
        $this->user = 'daffa';
        $this->password = 'd4ff42016';
        $this->port = '130';
    }

    public function list_barang() {
        // API
        require_once(APPPATH . 'libraries/PEAR2/Autoload.php');
        $util = new RouterOS\Util(
                $client = new RouterOS\Client("$this->address", "$this->user", "$this->password"," $this->port")
        );
        ini_set("memory_limit","512M");
        $util->setMenu('/ip hotspot active');
        $list = '';
        foreach ($util->getAll() as $item) {
            $data['user'] = $item->getProperty('user');
            $data['address'] = $item->getProperty('address');
            $data['uptime'] = $item->getProperty('uptime');
            $list[] = $data;
        }
        log_message('error', print_r($list, true));
        return;
        //
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                $filter = explode('#-#', $val);
                $kolom = $filter[0];
                $nama = $filter[1];
                if ($kolom == 'nama_barang') {
                    $where = "where upper($kolom) like '%" . strtoupper($nama) . "%'";
                } else {
                    $where = "where upper($kolom) = '" . strtoupper($nama) . "'";
                }
//                $result = $this->query->get_table_grid('ms_barang', $where, null, null, $like);
                $result = $this->query->get_query_grid("select ms_barang.*, kategori,lokasi,satuan from ms_barang "
                        . " left join ms_kategori_barang on ms_kategori_barang.id = ms_barang.id_kategori_barang"
                        . " left join ms_lokasi_barang on ms_lokasi_barang.id = ms_barang.id_lokasi_barang"
                        . " left join ms_satuan on ms_satuan.id = ms_barang.id_satuan_harga $where");
                if ($result != NULL) {
                    echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
                } else {
                    echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Tidak ada data'));
                }
            }
        }
    }

    public function list_barang_detail() {
        $kode_barang = $this->input->get('kode_barang');
        $result = $this->query->get_query_grid("select ms_barang_detail.*,mbd_satuan || '- ' ||satuan as satuan from ms_barang_detail
        inner join ms_satuan on ms_satuan.id = ms_barang_detail.mbd_satuan where id_ms_barang = '$kode_barang'");
        $this->query->get_log();
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
        foreach ($grid as $value) {
            $data = array(
                'tgl_transaksi' => $this->query->get_tanggaljam_server(),
                'user_input' => $this->user->id,
                'kode_barang' => $value['kode_barang'],
                'nama_barang' => $value['nama_barang'],
                'qty' => $value['qty'],
                'satuan' => 1,
                'harga_barang' => $value['harga'],
                'diskon_barang' => $value['diskon'],
                'sub_total' => $value['netto'],
//                'jenis_pelanggan' => $this->input->post('pelanggan')
            );
            $this->db->insert('trx_barang', $data);
        }
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {

            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
//            $tanggal = date("d-m-Y");
//            $jam = date("H:i:s");
//            $var_magin_left = 10;
//            $printer = printer_open('Microsoft Print to PDF');
//            printer_set_option($printer, PRINTER_MODE, "RAW"); // mode disobek ( kertas tidak menggulung )
//            printer_start_doc($printer);
//            printer_start_page($printer);
//            $font = printer_create_font("Arial", 18, 17, PRINTER_FW_NORMAL, false, false, false, 0);
//            printer_select_font($printer, $font);
//            printer_draw_text($printer, ".: TOKO XYZ :.", 130, 0);
//            printer_draw_text($printer, date("Y/m/d H:i:s"), 255, 40);
//
//            printer_draw_text($printer, "Kasir", $var_magin_left, 40);
//            printer_draw_text($printer, ":", 70, 40);
//            printer_draw_text($printer, 'abc', 80, 40);
//
//            // Header Bon
//            $pen = printer_create_pen(PRINTER_PEN_SOLID, 1, "000000");
//            printer_select_pen($printer, $pen);
//            printer_draw_line($printer, $var_magin_left, 65, 400, 65);
//            printer_draw_text($printer, "TRANSAKSI", $var_magin_left, 70);
//            printer_draw_text($printer, "QTY", 290, 70);
//            printer_draw_text($printer, "PRICE", 350, 70);
//            printer_draw_line($printer, $var_magin_left, 85, 400, 85);
//
//            $row +=150;
//            printer_draw_text($printer, "Terima Kasih Atas Kunjungan Anda", 80, $row);
//
//            printer_delete_font($font);
//            printer_end_page($printer);
//            printer_end_doc($printer);
//            printer_close($printer);
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

    public function simpan_barang_baru() {
        $this->db->trans_start();
        if ($this->query->get_query("SELECT last_value FROM ms_barang_id_seq", '1')->last_value == 0) {
            $seq = 1;
        } else {
            $seq = $this->query->get_query("SELECT last_value FROM ms_barang_id_seq", '1')->last_value + 1;
        }
        if ($seq < 10) {
            $urutan = "000" . $seq;
        } else if ($seq < 100) {
            $urutan = "00" . $seq;
        } else if ($seq < 1000) {
            $urutan = "0" . $seq;
        } else {
            $urutan = $seq;
        }
        $data = array(
            'nama_barang' => $this->input->post('nama_barang'),
            'harga_beli' => $this->input->post('harga_beli'),
            'id_kategori_barang' => $this->input->post('kategori'),
            'id_lokasi_barang' => $this->input->post('lokasi'),
            'id_satuan_beli' => $this->input->post('satuan'),
            'status' => $this->input->post('status'),
            'id_satuan_harga' => $this->input->post('satuan_harga'),
            'harga_barang' => $this->input->post('harga_barang'),
        );
        if ($this->input->post('id') > 0) {
            $this->db->update('ms_barang', $data, array('id' => $this->input->post('id')));
        } else {
            $data['kode_barang'] = $urutan;
            $this->db->insert('ms_barang', $data);
        }
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

    public function simpan_barang_detail() {
        if ($this->query->get_query("select count(*) as total from ms_barang_detail where id_ms_barang = '" . $this->input->post('kode_barang') . "' and mbd_satuan = " . $this->input->post('satuan') . "", '1')->total > 0) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => "Satuan tersebut sudah ada...!!!"));
            return;
        };
        $this->db->trans_start();
        $data = array(
            'id_ms_barang' => $this->input->post('kode_barang'),
            'mbd_satuan' => $this->input->post('satuan'),
            'mbd_harga' => $this->input->post('harga_barang'),
            'mbd_konversi' => $this->input->post('konversi')
        );
        $this->db->insert('ms_barang_detail', $data);
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

    public function update_aktif() {
        $this->db->trans_start();
        if ($this->input->post('aktif') == 'true') {
            $data['status'] = 1;
        } else {
            $data['status'] = 0;
        }
        $this->db->update('ms_barang', $data, array('id' => $this->input->post('id')));
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil'));
        }
    }

    public function delete_detail_barang() {
        $this->db->trans_start();
        $this->db->delete('ms_barang_detail', array('id' => $this->input->post('id')));
        $this->db->trans_complete();
        if (!$this->db->trans_status()) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Info', 'msg' => $this->db->error()));
        } else {
            echo json_encode(array('success' => 'true', 'data' => NULL, 'title' => 'Info', 'msg' => 'Proses Hapus Berhasil'));
        }
    }

}
