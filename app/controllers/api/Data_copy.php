
<?php

class Data extends REST_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('query2');
        $this->query2->db2 = $this->load->database('1', TRUE);
    }

    function login_post() {
        if (!$this->post('user')) {
            $this->response(NULL, 400);
            return;
        }
        $username = intval($this->post('user')) - 10000;
        $password = $this->post('pass');
        $this->load->model('ion_auth_model');
        $login = $this->ion_auth->hash_password_db($username, $password);
        if ($login == 'true') {
            $sql = "select id, mk_nama, username from ms_karyawan where id = '$username'";
            $user = $this->db->query($sql);
            $resp = array('succes' => true, 'count' => $user->num_rows(), 'data' => $user->result());
            $this->response($resp, 200);
        } else {
            $this->response(array("succes" => "false", 'data' => 'User Dan Password Tidak Sesuai'), 404);
        }
    }

    function mkt_dokter_post() {
        if (!$this->post('user')) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Data User Tidak Ada'), 404);
            return;
        }
        if (!$this->post('cab')) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Cabang Kosong'), 404);
            return;
        }
        if (!$this->post('bulan')) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Bulan Kosong'), 404);
            return;
        }
        if (!$this->post('tahun')) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Tahun Kosong'), 404);
            return;
        }
        // Cek Jika Kosong
        if ($this->post('nama_dokter') == '') {
            $like = '';
        } else {
            $like = " and upper(nama_dokter) like '%" . strtoupper($this->post('nama_dokter')) . "%'";
        }
        $username = intval($this->post('user')) - 10000;
        $cab = $this->post('cab');
        $bulan = $this->post('bulan');
        $tahun = $this->post('tahun');
        $cabang = '1';
        $sdm = $username;
        $this->load->model('query2', 'pusat');
        $this->pusat->db2 = $this->load->database(strval($cabang), TRUE);
        $result = $this->pusat->query("select md_alamat_praktek1,md_alamat_praktek2,md_alamat_praktek3,md_kota_1,md_kota_2,md_kota_3,kode_dokter, gelar_depan, nama_dokter,gelar_belakang from ms_dokter where id_sdm = '$sdm' $like");
        $list = array();
        $this->load->model('query2', 'keliling');
        $database = $this->load->database(strval($cab), TRUE);
        if ($database->conn_id === FALSE) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Koneksi Cabang Tersebut Bermasalah'), 404);
            return;
        }
        foreach ($result->result() as $row) {
            $omzt_cab = '';
            $total_omzt_1 = 0;
            $total_omzt_2 = 0;
            $cari_ps = 0;
            $this->keliling->db2 = $database;
            // Cek Setting Tanggal Tarik Data Omzet
            $tahunsend = $tahun;
            $bulansend = $bulan;
            $cek_setting = $this->pusat->get_table('setting', array('id' => 38))->value_setting;
            if ($cek_setting == '1') {
                $where_tgl = "to_char(trx_pasien.tgl_periksa,'YYYY-mm') = '$tahunsend-$bulansend'";
            } else {
                $pecahtgl = explode('-', $cek_setting);
                $tgl_awal = $pecahtgl[0];
                $tgl_akhir = $pecahtgl[1];
                if ($bulan == 1) {
                    $bln_awal = '12';
                    $bln_akhir = '01';
                    $thn_ki = $tahunsend - 1;
                    $tahun_akhir = $tahunsend;
                } else if ($bulansend > 1 && $bulansend <= 12) {
                    $golek_awal = $bulansend - 1;
                    $golek_akhir = $bulansend;
                    $thn_ki = $tahunsend;
                    $tahun_akhir = $tahunsend;
                    if ($golek_awal < 10) {
                        $bln_awal = '0' . $golek_awal;
                    } else {
                        $bln_awal = $golek_awal;
                    }

                    if ($golek_akhir < 10) {
                        $bln_akhir = '0' . $golek_akhir;
                    } else {
                        $bln_akhir = $golek_akhir;
                    }
                }
                $filter_tglawal = "$thn_ki$bln_awal$tgl_awal";
                $filter_tglakhir = "$tahun_akhir$bln_akhir$tgl_akhir";
                $where_tgl = "to_char(trx_pasien.tgl_periksa,'YYYYmmdd') >= '" . $filter_tglawal . "' and to_char(trx_pasien.tgl_periksa,'YYYYmmdd') <= '" . $filter_tglakhir . "'";
            }
            $show['kode_dokter'] = $row->kode_dokter;
            $show['nama_dokter'] = $row->gelar_depan . $row->nama_dokter;
            $show['alamat_1'] = $row->md_alamat_praktek1 . ' ' . $row->md_kota_1;
            $show['alamat_2'] = $row->md_alamat_praktek2 . ' ' . $row->md_kota_2;
            $show['alamat_3'] = $row->md_alamat_praktek3 . ' ' . $row->md_kota_3;
            $total_omzt_1 += $this->keliling->get_query("select sum(trx_pasien.rp_netto) as reward "
                            . "from trx_pasien "
                            . "where kode_pengirim = '$row->kode_dokter' "
                            . "and $where_tgl AND rp_kurangbayar <= 0", 1)->reward;
            $total_omzt_2 += $this->keliling->get_query("select sum(trx_pasien.rp_netto) as reward "
                            . "from trx_pasien "
                            . "where kode_pengirim2 = '$row->kode_dokter' "
                            . "and $where_tgl AND rp_kurangbayar <= 0 ", 1)->reward;
            // PS
            $cari_ps += $this->keliling->get_query("SELECT SUM (tp_harganett * (ps_dokter / 100)) AS reward
                                    FROM trx_pemeriksaan
                                    WHERE no_lab IN (
                                            SELECT nolab FROM trx_pasien
                                            WHERE 
                                                kode_pengirim = '$row->kode_dokter'
                                                AND $where_tgl
                                                AND rp_kurangbayar <= 0
                                                
                                            )
                                          AND status_aktif = 1", 1)->reward;

            $total_omzt = $total_omzt_1 + $total_omzt_2;
            $show['total_ps'] = $cari_ps;
            $show['total_omzet'] = $total_omzt;
            $list[] = $show;
        }
        if ($result->num_rows() > 0) {
            $resp = array('succes' => true, 'count' => $result->num_rows(), 'data' => $list);
            $this->response($resp, 200);
        } else {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Data Tidak Ada'), 404);
        }
    }

    function dokter_post() {
        if (!$this->post('kode_dokter')) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Data Dokter Kosong'), 404);
            return;
        }
        if (!$this->post('cab')) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Cabang Kosong'), 404);
            return;
        }
        if (!$this->post('bulan')) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Bulan Kosong'), 404);
            return;
        }
        if (!$this->post('tahun')) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Tahun Kosong'), 404);
            return;
        }
        $kode_dokter = $this->post('kode_dokter');
        $cab = $this->post('cab');
        $bulan = $this->post('bulan');
        $tahun = $this->post('tahun');
        $cabang = '1';
        $this->load->model('query2', 'pusat');
        $this->pusat->db2 = $this->load->database(strval($cabang), TRUE);
        $result = $this->pusat->query("select md_alamat_praktek1,md_alamat_praktek2,md_alamat_praktek3,md_kota_1,md_kota_2,md_kota_3,kode_dokter, gelar_depan, nama_dokter,gelar_belakang from ms_dokter where kode_dokter = '$kode_dokter'");
        $list = array();
        $this->load->model('query2', 'keliling');
        $database = $this->load->database(strval($cab), TRUE);
        if ($database->conn_id === FALSE) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Koneksi Cabang Tersebut Bermasalah'), 404);
            return;
        }
        if ($result->num_rows() == 0) {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Data Dokter Kosong'), 404);
            return;
        }
        foreach ($result->result() as $row) {
            $omzt_cab = '';
            $total_omzt_1 = 0;
            $total_omzt_2 = 0;
            $cari_ps = 0;
            $this->keliling->db2 = $database;
            // Cek Setting Tanggal Tarik Data Omzet
            $tahunsend = $tahun;
            $bulansend = $bulan;
            $cek_setting = $this->pusat->get_table('setting', array('id' => 38))->value_setting;
            if ($cek_setting == '1') {
                $where_tgl = "to_char(trx_pasien.tgl_periksa,'YYYY-mm') = '$tahunsend-$bulansend'";
            } else {
                $pecahtgl = explode('-', $cek_setting);
                $tgl_awal = $pecahtgl[0];
                $tgl_akhir = $pecahtgl[1];
                if ($bulan == 1) {
                    $bln_awal = '12';
                    $bln_akhir = '01';
                    $thn_ki = $tahunsend - 1;
                    $tahun_akhir = $tahunsend;
                } else if ($bulansend > 1 && $bulansend <= 12) {
                    $golek_awal = $bulansend - 1;
                    $golek_akhir = $bulansend;
                    $thn_ki = $tahunsend;
                    $tahun_akhir = $tahunsend;
                    if ($golek_awal < 10) {
                        $bln_awal = '0' . $golek_awal;
                    } else {
                        $bln_awal = $golek_awal;
                    }

                    if ($golek_akhir < 10) {
                        $bln_akhir = '0' . $golek_akhir;
                    } else {
                        $bln_akhir = $golek_akhir;
                    }
                }
                $filter_tglawal = "$thn_ki$bln_awal$tgl_awal";
                $filter_tglakhir = "$tahun_akhir$bln_akhir$tgl_akhir";
                $where_tgl = "to_char(trx_pasien.tgl_periksa,'YYYYmmdd') >= '" . $filter_tglawal . "' and to_char(trx_pasien.tgl_periksa,'YYYYmmdd') <= '" . $filter_tglakhir . "'";
            }
            $show['kode_dokter'] = $row->kode_dokter;
            $show['nama_dokter'] = $row->gelar_depan . $row->nama_dokter;
            $show['alamat_1'] = $row->md_alamat_praktek1 . ' ' . $row->md_kota_1;
            $show['alamat_2'] = $row->md_alamat_praktek2 . ' ' . $row->md_kota_2;
            $show['alamat_3'] = $row->md_alamat_praktek3 . ' ' . $row->md_kota_3;
            $total_omzt_1 += $this->keliling->get_query("select sum(trx_pasien.rp_netto) as reward "
                            . "from trx_pasien "
                            . "where kode_pengirim = '$row->kode_dokter' "
                            . "and $where_tgl AND rp_kurangbayar <= 0", 1)->reward;
            $total_omzt_2 += $this->keliling->get_query("select sum(trx_pasien.rp_netto) as reward "
                            . "from trx_pasien "
                            . "where kode_pengirim2 = '$row->kode_dokter' "
                            . "and $where_tgl AND rp_kurangbayar <= 0 ", 1)->reward;
            // PS
            $cari_ps += $this->keliling->get_query("SELECT SUM (tp_harganett * (ps_dokter / 100)) AS reward
                                    FROM trx_pemeriksaan
                                    WHERE no_lab IN (
                                            SELECT nolab FROM trx_pasien
                                            WHERE 
                                                kode_pengirim = '$row->kode_dokter'
                                                AND $where_tgl
                                                AND rp_kurangbayar <= 0
                                                
                                            )
                                          AND status_aktif = 1", 1)->reward;

            $total_omzt = $total_omzt_1 + $total_omzt_2;
            $show['total_ps'] = $cari_ps;
            $show['total_omzet'] = $total_omzt;
            $list[] = $show;
        }
        if ($result->num_rows() > 0) {
            $resp = array('succes' => true, 'count' => $result->num_rows(), 'data' => $list);
            $this->response($resp, 200);
        } else {
            $this->response(array("succes" => "false", 'count' => 0, 'data' => 'Data Tidak Ada'), 404);
        }
    }

    function update_kunjungan_post() {
        // Kode Dokter, Bulan, Tahun, User, Latitude, Longitde, Keterangan Detail
        $where['trk_kode'] = $this->post('kode_dokter');
        $where['trk_bulan'] = $this->post('bulan');
        $where['trk_tahun'] = $this->post('tahun');
        if (!$this->post('kode_dokter') || !$this->post('bulan') || !$this->post('tahun')) {
            $this->response(NULL, 400);
            return;
        }
        $arrupdate['trk_sdm_tgl_realisasi'] = $this->query2->get_tanggaljam_server();
        $arrupdate['trk_sdm_realisasi'] = intval($this->post('user')) - 10000;
        $arrupdate['trk_masukkan'] = $this->post('masukkan');
        $arrupdate['trk_latitude'] = $this->post('latitude');
        $arrupdate['trk_longitude'] = $this->post('longitude');
        $arrupdate['trk_keterangan_detail'] = $this->post('ket_det');
        $cek_rencana = $this->query2->count_table('trx_rencanan_kunjungan', $where);
        if ($cek_rencana == 0) {
            $this->response(array("succes" => "false", 'count' => $cek_rencana, 'data' => 'Data Rencana Kunjungan Belum Ada'), 404);
            return;
        }
        $update = $this->query2->update('trx_rencanan_kunjungan', $arrupdate, $where);
        if (!$update) {
            $this->response(array("succes" => "false", 'count' => $cek_rencana, 'data' => $this->query2->error()), 404);
        } else {
            $resp = array('succes' => true, 'count' => $cek_rencana, 'data' => $arrupdate);
            $this->response($resp, 200);
        }
    }

    function upload_ttd_post() {
        $file_path = "/var/www/html/lab/assets/img_data/ttd_kunjungan/";
        $file = $_FILES;
        foreach ($file as $row) {
            $file_path = $file_path . basename($row['name']);
            if (move_uploaded_file($row['tmp_name'], $file_path)) {
                $resp = array('succes' => true);
                $this->response($resp, 200);
            } else {
                $this->response(array("succes" => "false", 'count' => 0, 'data' => 'File tidak ada'), 404);
            }
        }
    }

}
