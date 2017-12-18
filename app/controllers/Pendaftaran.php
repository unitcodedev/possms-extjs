<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Description of data_model
 *
 * @author IT Parahita
 */
class Pendaftaran extends Auth_Controller {

    function __construct() {
        parent::__construct();
//        $this->load->model('query2');
//        $this->query2->db2 = $this->load->database('second', TRUE);
//        $this->load->model('query2', 'pusat');
//        $this->pusat->db2 = $this->load->database('1', TRUE);
    }

    public function list_cabang() {
        $list_cabang = $this->query->get_table_grid('ms_cabang');
        echo json_encode(array('success' => 'true', 'data' => $list_cabang, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_paket() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        $list = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                $filter = explode('-', $val);
                if ($field == 'fopaket_pemeriksaan') {
                    if (count($filter) == 1) {
                        $where['dokter_rekanan'] = $filter[0];
                        $or = null;
                    } else if (count($filter) == 2) {
                        $where['dokter_rekanan'] = $filter[0];
                        $or['jenis_paket'] = 1;
                    } else {
                        $where['jenis_paket'] = 1;
                        $or = null;
                    }
                } else {
                    $where['jenis_paket'] = 1;
                    $or = null;
                }
            }
        } else {
            $where['jenis_paket'] = 1;
            $or = null;
        }
        $result = $this->query2->get_table_grid('paket', $where, null, null, null, null, null, null, null, $or);
        echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_paket_detail() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        $list = array();
        $raw_record = json_decode($_GET['filter'], true);
        foreach ($raw_record as $key) {
            $field = $this->property_reader($key['property']);
            $val = $this->property_reader($key['value']);
        }

        // Cek Paket Parahita, Dokter
        // Update 06 Februari 2017
        $sql = "select * from paket where kode_paket = '$val'";
        $exe_query = $this->query2->query($sql);
        if ($exe_query->num_rows() > 0) {
            if ($exe_query->row()->jenis_paket <= 2) {
                // Paket DOkter dan Paket PARAHITA
                $result = $this->query2->get_query_grid("SELECT
                            ms_lab_pemeriksaan.*,
                            mspem_nama AS nama_pemeriksaan,
                            mspem_rp AS rp_bruto,
                            paket_pemeriksaan.discount,
                            (cast(mspem_rp as double precision) - ((discount / 100) * cast(mspem_rp as double precision))) as rp_netto
                    FROM
                            paket_pemeriksaan
                    LEFT JOIN ms_lab_pemeriksaan ON ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                    WHERE
                            kode_paket = '$val'");
            } else {
                // PAKET ID KONTRAK
                $result = $this->query2->get_query_grid("select ms_lab_pemeriksaan.*, rp_bruto, rp_netto, discount from paket_pemeriksaan 
            left join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
            where kode_paket = '$val'");
            }
        } else {
            
        }

        echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_pemeriksaan() {
        $records = $this->input->get('filter');
        $query = $this->input->get('query');
        $record = array();
        $params = array();
        $list = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                $filter = explode('-', $val);
                $search = $filter[0];
                if (count($filter) > 1) {
                    $kode_kontrak = $filter[1];
                } else {
                    $kode_kontrak = 0;
                }
                if ($field == 'mspem_nama') {
                    if (is_numeric($search)) {
                        $like['kode_pemeriksaan'] = $search;
                    } else {
                        $like['upper(mspem_nama)'] = strtoupper($search);
                    }
                } else {
                    $like = null;
                }
            }
        } else {
            $like = null;
        }
        $result = $this->query2->get_table_grid('ms_lab_pemeriksaan', array('mspem_status' => 1), null, null, $like, null, null, 40);
//        $this->query2->get_log();
        $show = array();

        foreach ($result as $row) {
            if ($kode_kontrak == 0 || $kode_kontrak == null) {
                $arr['kode_pemeriksaan'] = $row->kode_pemeriksaan;
                $arr['mspem_nama'] = $row->mspem_nama;
                $arr['mspem_rp'] = $row->mspem_rp;
                $arr['jasmed'] = $this->query2->changenull($row->jasmed);
                $arr['obat'] = $this->query2->changenull($row->obat);
                $arr['id'] = $row->id;
                $arr['id_type'] = $row->id_type;
                $arr['discount'] = 0;
            } else {
                $paket = $this->query2->get_table('paket', array('kode_paket' => $kode_kontrak));
                $this->query2->get_log();
                if ($paket->jenis_paket == 4) {
                    $countnonpaket = $this->query2->count_table('paket_nonpaket', array('kode_paket' => $kode_kontrak));
                    if ($countnonpaket == 0) {
                        $countpaketpemeriksaan = $this->query2->count_table('paket_pemeriksaan', array('kode_paket' => $kode_kontrak, 'kode_pemeriksaan' => $row->kode_pemeriksaan));
                        if ($countpaketpemeriksaan == 0) {
                            $discount = $paket->disc_diluarpaket;
                        } else {
                            $paketpemeriksaan = $this->query2->get_table('paket_pemeriksaan', array('kode_paket' => $kode_kontrak, 'kode_pemeriksaan' => $row->kode_pemeriksaan));
                            $discount = $paketpemeriksaan->discount;
                        }
                    } else {
                        $cnonpaket = $this->query2->count_table('paket_nonpaket', array('kode_paket' => $kode_kontrak, 'id_jenis_pemeriksaan' => $row->group_ps));
                        if ($cnonpaket == 0) {
                            $discount = '0';
                        } else {
                            $nonpaket = $this->query2->get_table('paket_nonpaket', array('kode_paket' => $kode_kontrak, 'id_jenis_pemeriksaan' => $row->group_ps));
                            $discount = $nonpaket->discount;
                        }
                    }
                } else {
                    $discount = '0';
                }
                $arr['kode_pemeriksaan'] = $row->kode_pemeriksaan;
                $arr['mspem_nama'] = $row->mspem_nama;
                $arr['mspem_rp'] = $row->mspem_rp;
                $arr['id'] = $row->id;
                $arr['discount'] = $discount;
                $arr['jasmed'] = $this->query2->changenull($row->jasmed);
                $arr['obat'] = $this->query2->changenull($row->obat);
                $arr['id_type'] = $row->id_type;
//                $arr['pemeriksaan1'] = $discount;
//                $arr['pemeriksaan2'] = $discount;
//                $arr['discount1'] = $discount;
            }
            $show[] = $arr;
        }

        echo json_encode(array('success' => 'true', 'data' => $show, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_bank() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        $list = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if ($field == 'pendaftarancari_bank') {
                    $where ['status'] = $val;
                }
            }
        } else {
            $where = null;
        }
        $result = $this->query2->get_table_grid('ms_bank', $where);
        echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_jeniskartubank() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        $list = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
//                if ($field == 'pendaftarancari_bankjeniskartu') {
                $where ['id_bank'] = $val;
//                }
            }
            $result = $this->query2->get_table_grid('ms_bank_jenis', $where);
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        }
    }

    public function list_nomoredc() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        $list = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                $filter = explode('-', $val);
//                $jenis_bank = $filter[0];
                $bank = $filter[0];
                $jenis_kartu = $filter[1];
                $where ['kartu'] = $bank;
                $where ['jenis_kartu'] = $jenis_kartu;
            }
            $result = $this->query2->get_table_grid('ms_bank_edc', $where);
//            $this->query2->get_log();
            echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
        }
    }

    public function list_pasien() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        $list = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if ($field == 'pendaftaran_cari_pasien') {
                    $filter = explode('-', $val);
                    $cab = $filter[0];
                    if (count($filter) == 2) {
                        if (is_numeric($filter[1])) {
                            $like['pas_hp'] = $filter[1];
                            $where = null;
                        } else {
                            $like['pas_nama'] = strtoupper($filter[1]);
                            $where = null;
                        }
                    } else {
                        if ($filter[2] == 'pas_tgllahir') {
                            $where["to_char(pas_tgllahir,'dd/mm/YYYY')"] = $filter[1];
                            $like = null;
                        } else {
                            $like[$filter[2]] = strtoupper($filter[1]);
                            $where = null;
                        }
                    }
                } else {
                    $like = null;
                    $where = null;
                }
            }
        } else {
            $like = null;
            $where = null;
        }
        $limit = 1000;
        if ($cab == 'true') {
            $this->load->model('query2', 'pusat');
            $this->pusat->db2 = $this->load->database('1', TRUE);
            $result = $this->pusat->get_table_grid('ms_pasien', $where, null, null, $like, 'pas_nama', 'ASC', $limit);
            $this->pusat->db_close();
        } else {
            $cab = $this->query2->get_table('setting', array('id' => 13))->value_setting;
            $this->load->model('query2', 'cabang');
            $this->cabang->db2 = $this->load->database($cab, TRUE);
            $result = $this->cabang->get_table_grid('pasien', $where, null, null, $like, 'pas_nama', 'ASC', $limit);
        }

//        $this->query2->get_log();
        echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_dokter() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        $list = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if ($field == 'pendaftarancari_master_dokter') {
                    $filter = explode('-', $val);
                    $cab = $filter[0];
                    if (count($filter) == 2) {
                        if (is_numeric($filter[1])) {
                            $like['kode_dokter'] = $filter[1];
                        } else {
                            $like['upper(nama_dokter)'] = strtoupper($filter[1]);
                        }
                    } else {
                        $like[$filter[2]] = strtoupper($filter[1]);
                    }
                } else {
                    $like = null;
                }
            }
        } else {
            $like = null;
        }
        if ($cab == 'true') {
            $this->load->model('query2', 'pusat');
            $this->pusat->db2 = $this->load->database('1', TRUE);
            $result = $this->pusat->get_table_grid('ms_dokter', null, null, null, $like, null, null, '1000');
            $this->pusat->db_close();
        } else {
            $result = $this->query2->get_table_grid('ms_dokter', null, null, null, $like, null, null, '1000');
        }echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_dokter_penagihan() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        $list = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if ($field == 'pendaftaranpenagihan_master_dokter') {
                    $filter = explode('-', $val);
                    $pusat = $filter[0];
                    if (count($filter) == 1) {
                        if (is_numeric($filter[0])) {
                            $like['kode_dokter'] = $filter[0];
                        } else {
                            $like['upper(nama_dokter)'] = strtoupper($filter[0]);
                        }
                    } else {
                        $like[$filter[2]] = strtoupper($filter[1]);
                    }
                    if ($pusat == 'true') {
                        $this->load->model('query2', 'pusat');
                        $this->pusat->db2 = $this->load->database('1', TRUE);
                        $result = $this->pusat->get_table_grid('ms_dokter', null, null, null, $like, null, null);
                    } else {
                        $result = $this->query2->get_table_grid('ms_dokter', null, null, null, $like, null, null);
                    }

                    $this->query2->get_log();
                    echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
                }
            }
        }
    }

    public function daftar() {
        
    }

    public function save_daftar() {
// Cek Pendaftaran
//        $row = explode("\n", $_POST["gr"]);
        $list_pemeriksaan = json_decode($this->input->post('gr', true), true);
        $list_persyaratan = json_decode($this->input->post('persyaratan', true), true);
        $tahunbulan = $this->query2->get_bulantahun();
        $alfabet = array("", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L");
        $tahun = substr("$tahunbulan", 0, 2);
        $bulan = substr("$tahunbulan", 2, 2);
        $bulanalf = $alfabet[intval($bulan)];
        $cab = $this->query2->get_table('setting', array('id' => 1))->value_setting;
        if ($this->input->post('no_lab_baru') == '') {
            $cek_nolab = $this->query2->count_table('trx_pasien', array("to_char(tgl_periksa,'YYmm')" => $this->query2->get_bulantahun()));
            if ($cek_nolab == 0) {
                $this->query2->get_query("select setval ('no_lab',1, false)");
                $id = $this->query2->cari_seq('no_lab', 1);
            } else {
                $id = $this->query2->cari_seq('no_lab');
            }
            if ($id < 10) {
                $nolab = $cab . $tahun . $bulanalf . '0000' . $id;
            } else if ($id >= 10 && $id < 100) {
                $nolab = $cab . $tahun . $bulanalf . '000' . $id;
            } else if ($id >= 100 && $id < 1000) {
                $nolab = $cab . $tahun . $bulanalf . '00' . $id;
            } else if ($id >= 1000 && $id < 10000) {
                $nolab = $cab . $tahun . $bulanalf . '0' . $id;
            } else {
                $nolab = $cab . $tahun . $bulanalf . $id;
            }
        } else {
            $nolab = $this->input->post('no_lab_baru');
        }

        // Data Pasien
        $pasdata['pas_id'] = $this->input->post('pas_id');
        $pasdata['nolab'] = $nolab;
        $pasdata['pas_nama'] = $this->input->post('nama_pasien');
        if ($this->input->post('jenis_umur') == '1') {
            $pasdata['pas_tgllahir'] = $this->input->post('tgl_lahir');
            $pasdata['umur'] = '0';
        } else {
            $pasdata['umur'] = $this->query2->changenull($this->input->post('umur'));
        }
        $pasdata['pas_jenkelamin'] = $this->input->post('jenis_kelamin');
        $pasdata['pas_alamat'] = $this->input->post('alamat');
        $pasdata['pas_kota'] = $this->input->post('kota');
        $pasdata['pas_telp'] = $this->input->post('no_tlfnrumah');
        $pasdata['pas_hp'] = $this->input->post('no_hp');
        $pasdata['pas_status'] = $this->input->post('status');
        $pasdata['tgl_periksa'] = $this->query2->get_tanggaljam_server();

// Pengirim
        if ($this->input->post('daftar_tipekirim1') == 'true') {
            $pengirim = 1;
            $kode = '';
            $typepengirim = 1;
        } else if ($this->input->post('daftar_tipekirim2') == 'true') {
            $pengirim = 2;
            $kode = $this->input->post('kode_dokter');
            $typepengirim = 2;
            $cek_dokter1 = $this->query2->count_table('ms_dokter', array('kode_dokter' => $kode));
            $this->query2->get_log();

            if ($cek_dokter1 == 0) {
                $this->load->model('query2', 'pusat');
                $this->pusat->db2 = $this->load->database('1', TRUE);
                $dokter1 = $this->pusat->get_table('ms_dokter', array('kode_dokter' => $kode));
                $arrdokter1['kode_dokter'] = $dokter1->kode_dokter;
                $arrdokter1['nama_dokter'] = $dokter1->nama_dokter;
                $arrdokter1['gelar_depan'] = $dokter1->gelar_depan;
                $arrdokter1['gelar_belakang'] = $dokter1->gelar_belakang;
                $arrdokter1['md_jk'] = $dokter1->md_jk;
                $arrdokter1['md_agama'] = $dokter1->md_agama;
                $arrdokter1['md_tgllahir'] = $dokter1->md_tgllahir;
                $arrdokter1['md_nohp'] = $dokter1->md_nohp;
                $arrdokter1['md_alamat_praktek1'] = $dokter1->md_alamat_praktek1;
                $arrdokter1['md_kota_1'] = $dokter1->md_kota_1;
                $arrdokter1['md_tlf_1'] = $dokter1->md_tlf_1;
                $arrdokter1['md_alamat_praktek2'] = $dokter1->md_alamat_praktek2;
                $arrdokter1['md_kota_2'] = $dokter1->md_kota_2;
                $arrdokter1['md_tlf_2'] = $dokter1->md_tlf_2;
                $arrdokter1['id_sdm'] = $dokter1->id_sdm;
                $arrdokter1['marketing'] = $dokter1->marketing;
                $arrdokter1['md_alamat_praktek3'] = $dokter1->md_alamat_praktek3;
                $arrdokter1['md_kota_3'] = $dokter1->md_kota_3;
                $arrdokter1['md_tlf_3'] = $dokter1->md_tlf_3;
                $arrdokter1['md_alamat_rumah'] = $dokter1->md_alamat_rumah;
                $arrdokter1['md_kota_rumah'] = $dokter1->md_kota_rumah;
                $arrdokter1['md_tlf_rumah'] = $dokter1->md_tlf_rumah;
                $arrdokter1['md_perusahaan'] = $dokter1->md_perusahaan;
                $arrdokter1['md_kodepos_1'] = $dokter1->md_kodepos_1;
                $arrdokter1['md_kodepos_2'] = $dokter1->md_kodepos_2;
                $arrdokter1['md_kodepos_3'] = $dokter1->md_kodepos_3;
                $arrdokter1['md_kodepos_rumah'] = $dokter1->md_kodepos_rumah;
                $arrdokter1['md_email'] = $dokter1->md_email;
                $arrdokter1['kode_wilayah'] = $dokter1->kode_wilayah;
                $arrdokter1['status_pengajuan'] = $dokter1->status_pengajuan;
                $arrdokter1['status_aktif'] = $dokter1->status_aktif;
                $arrdokter1['id_input'] = $dokter1->id_input;
                $arrdokter1['tgl_input'] = $dokter1->tgl_input;
                $arrdokter1['id_approve'] = $dokter1->id_approve;
                $arrdokter1['tgl_approve'] = $dokter1->tgl_approve;
                $arrdokter1['keterangan'] = $dokter1->keterangan;
                $this->query2->insert('ms_dokter', $arrdokter1);
                $this->query2->get_log();
                $this->pusat->db_close();
            }
        } else if ($this->input->post('daftar_tipekirim3') == 'true') {
            $pengirim = 3;
            $kode = $this->input->post('kode_rekanan');
            $this->load->model('query2', 'pusat');
            $this->pusat->db2 = $this->load->database('1', TRUE);
            $cek_rekanan1 = $this->query2->count_table('ms_rekanan', array('kode_rekanan' => $kode));
            if ($cek_rekanan1 == 0) {
                $rekanan1 = $this->pusat->get_table('ms_rekanan', array('kode_rekanan' => $kode));
                $arrrekanan1['type_rekanan'] = $rekanan1->type_rekanan;
                $arrrekanan1['id_grouprekanan'] = $rekanan1->id_grouprekanan;
                $arrrekanan1['id_rekanan'] = $rekanan1->id_rekanan;
                $arrrekanan1['nama_rekanan'] = $rekanan1->nama_rekanan;
                $arrrekanan1['alamat_rekanan'] = $rekanan1->alamat_rekanan;
                $arrrekanan1['kota_rekanan'] = $rekanan1->kota_rekanan;
                $arrrekanan1['telf_rekanan'] = $rekanan1->telf_rekanan;
                $arrrekanan1['cp_rekanan'] = $rekanan1->cp_rekanan;
                $arrrekanan1['cp_telf'] = $rekanan1->cp_telf;
                $arrrekanan1['cabang'] = $rekanan1->cabang;
                $arrrekanan1['id_sdm'] = $rekanan1->id_sdm;
                $arrrekanan1['status'] = $rekanan1->status;
                $arrrekanan1['aktif'] = $rekanan1->aktif;
                $arrrekanan1['kode_rekanan'] = $rekanan1->kode_rekanan;
                $arrrekanan1['id_cabang'] = $rekanan1->id_cabang;
                $this->query2->insert('ms_rekanan', $arrrekanan1);
                $this->pusat->db_close();
            }
            $typepengirim = $this->query2->get_table('ms_rekanan', array('kode_rekanan' => $kode))->type_rekanan;
        } else {
            $pengirim = 4;
            $kode = $this->input->post('kode_rekanan');
            $typepengirim = $this->query2->get_table('ms_rekanan', array('kode_rekanan' => $kode))->type_rekanan;
            $pasdata['pengirim2'] = 3;
            $pasdata['kode_pengirim2'] = $this->input->post('kode_dokter');
        }
        $pasdata['pengirim'] = $pengirim;
        if ($this->input->post('bpjs') === 'true') {
            $pasdata['status_bpjs'] = 1;
            $pasdata['no_ktp'] = $this->input->post('no_ktp');
            $pasdata['no_kk'] = $this->input->post('no_kk');
            $pasdata['no_bpjs'] = $this->input->post('no_bpjs');
        }
        $pasdata['kode_pengirim'] = $kode;
        $pasdata['type_pengirim'] = $typepengirim;

// Pembayaran
        if ($this->input->post('daftar_pembayaran') == 1) {
            $pembayaran = 1;
            $typeditagihkan = 1;
            $kode_ditagihkan = $this->input->post('pas_id');
            $id_ditagihkan = 0;
            $no_kartu = '';
            $no_transaksi = '';
            $bank_parahita = 0;
            $rp_bayar = $this->input->post('dibayar');
            $rp_kurangbayar = $this->input->post('kurang_bayar');
        } else if ($this->input->post('daftar_pembayaran') == 2) {
            $pembayaran = 2;
            if ($this->input->post('daftar_penagihan') == 2) {
                $typeditagihkan = 2;
                $kode_ditagihkan = $this->input->post('kode_dokterpenagihan');
                $id_ditagihkan = $this->input->post('id_dokterpenagihan');
            } else if ($this->input->post('daftar_penagihan') == 3) {
                $typeditagihkan = 3;
                $kode_ditagihkan = $this->input->post('kode_rekananpenagihan');
                $id_ditagihkan = $this->input->post('id_rekananpenagihan');
            } else if ($this->input->post('daftar_penagihan') == 4) {
                $typeditagihkan = 4;
                $kode_ditagihkan = $this->input->post('kode_rekananpenagihan');
                $id_ditagihkan = $this->input->post('id_rekananpenagihan');
            } else if ($this->input->post('daftar_penagihan') == 5) {
                $typeditagihkan = 5;
                $kode_ditagihkan = $this->input->post('kode_karyawan');
                $id_ditagihkan = $this->input->post('kode_karyawan');
            } else {
                $typeditagihkan = 0;
                $kode_ditagihkan = '';
                $id_ditagihkan = 0;
            }
            $no_kartu = '';
            $no_transaksi = '';
            $bank_parahita = 0;
            $rp_bayar = '0';
            $rp_kurangbayar = $this->input->post('jumlah_netto');
        } else if ($this->input->post('daftar_pembayaran') == 3) {
            $pembayaran = 3;
            $typeditagihkan = 0;
            $kode_ditagihkan = '';
            $id_ditagihkan = 0;
            $no_kartu = $this->input->post('no_kartu');
            $no_transaksi = $this->input->post('no_transaksi');
            $bank_parahita = $this->input->post('bank_parahita');
            $rp_bayar = $this->input->post('dibayar');
            $rp_kurangbayar = $this->input->post('kurang_bayar');
        } else if ($this->input->post('daftar_pembayaran') == 4) {
            $pembayaran = 4;
            $typeditagihkan = 0;
            $kode_ditagihkan = '';
            $id_ditagihkan = 0;
            $no_kartu = $this->input->post('no_kartu');
            $no_transaksi = '';
            $bank_parahita = $this->input->post('bank_parahita');
            $rp_bayar = $this->input->post('dibayar');
            $rp_kurangbayar = $this->input->post('kurang_bayar');
        } else {
            $pembayaran = 5;
            $typeditagihkan = 0;
            $kode_ditagihkan = '';
            $id_ditagihkan = 0;
            $no_kartu = '';
            $no_transaksi = $this->input->post('no_transaksi');
            $bank_parahita = $this->input->post('bank_parahita');
            $rp_bayar = $this->input->post('dibayar');
            $rp_kurangbayar = $this->input->post('kurang_bayar');
        }
        if ($rp_kurangbayar == '0') {
            $status_lunas = 1;
        } else {
            $status_lunas = 0;
        }
        $pasdata['rp_bayar'] = $rp_bayar;
        $pasdata['rp_kurangbayar'] = $rp_kurangbayar;
        $pasdata['pembayaran'] = $pembayaran;
        $pasdata['pembayaran_typeditagihkan'] = $typeditagihkan;
        $pasdata['pembayaran_kodeditagihkan'] = $kode_ditagihkan;
        $pasdata['pembayaran_nokartu'] = $no_kartu;
        $pasdata['pembayaran_notransaksi'] = $no_transaksi;
        $pasdata['pembayaran_bankparahita'] = $bank_parahita;
        $pasdata['rp_netto'] = $this->input->post('jumlah_netto');
        $pasdata['rp_bruto'] = $this->input->post('jumlah_bruto');
        if ($this->input->post('paket') == '') {
            
        } else {
            $pasdata['kode_paket_pemeriksaan'] = $this->input->post('paket');
        }

// Discount
        if ($this->query2->changenull($this->input->post('cek_discount')) === 'true') {
            $pasdata['jenis_discount'] = $this->query2->changenull($this->input->post('jenis_discount'));
            $pasdata['info_discount'] = $this->query2->changenull($this->input->post('info_discount'));
            $pasdata['total_discount'] = $this->query2->changenull($this->input->post('discount'));
        } else {
            $pasdata['jenis_discount'] = 0;
            $pasdata['info_discount'] = 0;
            $pasdata['total_discount'] = 0;
        }
// === end Discount
        $pasdata['persetujuan_discount'] = $this->query2->changenull($this->input->post('idpersetujuandisc'));
        $pasdata['keterangan'] = $this->input->post('keterangan');
        $pasdata['status_lunas'] = $status_lunas; // 1 - Lunas 0 - Durung Lunas
        $pasdata['rp_discount'] = $this->input->post('jumlah_bruto') - $this->input->post('jumlah_netto');
// Kirim hasil
        if ($this->input->post('fostatushasil_diambil') == 'true') {
            $pasdata['statushasil_diambil'] = '1';
        }
// Email
        if ($this->input->post('fostatushasil_diemail') == 'true') {
            $pasdata['status_kirimemail'] = 1;
            $pasdata['statushasil_kirimemail'] = $this->input->post('alamat_email');
        }
//Fax
        if ($this->input->post('fostatushasil_fax') == 'true') {
            $pasdata['status_kirimfax'] = 1;
            $pasdata['statushasil_kirimfax'] = $this->input->post('alamat_fax');
        }
//SMS
        if ($this->input->post('fostatushasil_sms') == 'true') {
            $pasdata['status_kirimsms'] = 1;
            $pasdata['statushasil_kirimsms'] = $this->input->post('alamat_sms');
        }
// Dikirim Ke
        if ($this->input->post('fostatushasil_dikirim') == 'true') {
            if ($this->input->post('fostatushasil_dikirim_rumah') == 'true') {
// Rumah
                $pasdata['status_kirimrumah'] = 1;
                $pasdata['statushasil_kirimrumah'] = $this->input->post('alamat_rumah');
            }
            if ($this->input->post('fostatushasil_dikirim_kantor') == 'true') {
// Kantor
                $pasdata['status_kirimkantor'] = 1;
                $pasdata['statushasil_kirimkantor'] = $this->input->post('alamat_kantor');
            }
            if ($this->input->post('fostatushasil_dikirim_dokter') == 'true') {
// Dokter
                $pasdata['status_kirimdokter'] = 1;
                $pasdata['statushasil_kirimdokter'] = $this->input->post('alamat_dokter');
            }
        }

        if ($this->input->post('cito') == 'true') {
            $pasdata['cito'] = 1;
        }
        if ($this->input->post('sample') == 'true') {
            $pasdata['sample'] = 1;
        }
        $pasdata['input'] = $this->user->id;
        $pasdata['no_lab_siprama'] = $this->input->post('no_lab_siprama');
        if ($this->input->post('cek_homeservice') == 'true') {
            $pasdata['petugas_homeservice'] = $this->input->post('petugas_homeservice');
        }
// Bawa Tabung
        if ($this->input->post('bawa_tabung') == 'true') {
            $pasdata['status_bawa_tabung'] = 1;
            $pasdata['spv_approval_tabung'] = $this->input->post('sdmbawa_tabung');
        }
        $this->query2->get_trans_start();
        $this->query2->insert('trx_pasien', $pasdata);
        $arrdata['kurang_bayar'] = $this->query2->changenull($this->input->post('jumlah_netto') - $rp_bayar);
        $arrdata['status'] = $pembayaran;
        $arrdata['bayar_rp'] = $rp_bayar;
        $arrdata['rp_bayar_total'] = $rp_bayar;
        $arrdata['no_lab'] = $nolab;
        $arrdata['bank_parahita'] = $bank_parahita;
        $arrdata['no_transaksi'] = $no_transaksi;
        $arrdata['no_kartu'] = $no_kartu;
        $arrdata['tgl_bayar'] = $this->query2->get_tanggaljam_server();
        $arrdata['nama_pas'] = $this->input->post('nama_pasien');
        $arrdata['jenis_kartu'] = $this->input->post('jenis_kartu');
        $arrdata['nomor_edc'] = $this->input->post('nomor_edc');
        $arrdata['sdm_id'] = $this->user->id;
        $arrdata['rp_netto'] = $this->input->post('jumlah_netto');
        $arrdata['rp_bruto'] = $this->input->post('jumlah_bruto');
        $arrdata['rp_diskon'] = $this->input->post('jumlah_bruto') - $this->input->post('jumlah_netto');
        $arrdata['approve_kurangbayar'] = $this->query2->changenull($this->input->post('verifikasi_kurangbayar'));
        $this->query2->insert('trx_keuangan', $arrdata);
        foreach ($list_pemeriksaan as $grid) {
//            $col = explode("\t", $value);
            $kode_perikso = $grid['kode_pemeriksaan'];
            $master_pemeriksaan = $this->query2->get_query("select * from ms_lab_pemeriksaan where kode_pemeriksaan = '$kode_perikso'", 1);
            $dirujuk = $master_pemeriksaan->dirujuk;
// Cek PS Dokter
            if ($pengirim == 2) {
                // Dokter
                if ($master_pemeriksaan->group_ps > 0) {
                    $c_psindividu = $this->query2->count_table('ms_psdokter_individu', array('kode_dokter' => $kode, 'jenispemeriksaan' => $master_pemeriksaan->group_ps, 'jenis_pasien' => 1));
                    if ($c_psindividu > 0) {
                        $psindividu = $this->query2->get_table('ms_psdokter_individu', array('kode_dokter' => $kode, 'jenispemeriksaan' => $master_pemeriksaan->group_ps, 'jenis_pasien' => 1));
                        $persen_ps = $psindividu->persen;
                        $max_diskon = $psindividu->max_diskon;
                    } else {
                        $psglobal = $this->query2->get_table('ms_psdokter_global', array('jenispemeriksaan' => $master_pemeriksaan->group_ps));
                        $persen_ps = $psglobal->persen;
                        $max_diskon = $psglobal->max_diskon;
                    }
                } else {
                    $persen_ps = 0;
                    $max_diskon = 0;
                }
                $persen_rekps = 0;
            } else if ($pengirim > 2) {
                // Rekanan
                if ($this->input->post('kode_dokter') != '') {
                    // Cek Jika Rekanan + Dokter
                    // -- Dokter
                    if ($master_pemeriksaan->group_ps > 0) {
                        $c_psindividu = $this->query2->count_table('ms_psdokter_individu', array('kode_dokter' => $this->input->post('kode_dokter'), 'jenispemeriksaan' => $master_pemeriksaan->group_ps, 'jenis_pasien' => 2, 'kode_rekanan' => $kode));
                        if ($c_psindividu > 0) {
                            $psindividu = $this->query2->get_table('ms_psdokter_individu', array('kode_dokter' => $this->input->post('kode_dokter'), 'jenispemeriksaan' => $master_pemeriksaan->group_ps, 'jenis_pasien' => 2, 'kode_rekanan' => $kode));
                            $persen_ps = $psindividu->persen;
                            $max_diskon = $psindividu->max_diskon;
                        } else {
                            $persen_ps = 0;
                            $max_diskon = 0;
                        }
                    } else {
                        $persen_ps = 0;
                        $max_diskon = 0;
                    }
                    // -- Rekanan
                    if ($master_pemeriksaan->group_ps > 0) {
                        $c_psrekindividu = $this->query2->count_table('ms_psrekanan_individu', array('kode_rekanan' => $kode, 'jenispemeriksaan' => $master_pemeriksaan->group_ps));
                        if ($c_psrekindividu > 0) {
                            $psrekindividu = $this->query2->get_table('ms_psrekanan_individu', array('kode_rekanan' => $kode, 'jenispemeriksaan' => $master_pemeriksaan->group_ps));
                            $persen_rekps = $psrekindividu->persen;
                        } else {
                            $persen_rekps = 0;
                        }
                    } else {
                        $persen_rekps = 0;
                    }
                } else {
                    // Cek Jika Rekanan Saja (Tanpa Dokter)
                    if ($master_pemeriksaan->group_ps > 0) {
                        $c_psrekindividu = $this->query2->count_table('ms_psrekanan_individu', array('kode_rekanan' => $kode, 'jenispemeriksaan' => $master_pemeriksaan->group_ps));
                        if ($c_psrekindividu > 0) {
                            $psrekindividu = $this->query2->get_table('ms_psrekanan_individu', array('kode_rekanan' => $kode, 'jenispemeriksaan' => $master_pemeriksaan->group_ps));
                            $persen_ps = 0;
                            $max_diskon = 0;
                            $persen_rekps = $psrekindividu->persen;
                        } else {
                            $persen_ps = 0;
                            $persen_rekps = 0;
                            $max_diskon = 0;
                        }
                    } else {
                        $persen_ps = 0;
                        $persen_rekps = 0;
                        $max_diskon = 0;
                    }
                }
            } else {
                $persen_ps = 0;
                $max_diskon = 0;
                $persen_rekps = 0;
            }

            $data = array(
                'pas_id' => $this->input->post('pas_id'),
                'tgl_periksa' => $this->query2->get_tanggaljam_server(),
                'kode_pemeriksaan' => $grid['kode_pemeriksaan'],
                'no_lab' => $nolab,
                'dirujuk' => $dirujuk,
                'tp_namapemeriksaan' => $grid['nama_pemeriksaan'],
                'tp_hargabruto' => $grid['harga_pemeriksaan'],
                'tp_harganett' => $grid['netto_pemeriksaan'],
//                'tp_harganett' => $grid['harga_pemeriksaan'] - (($grid['diskon_pemeriksaan'] / 100) * $grid['harga_pemeriksaan']),
                'tp_discount' => $grid['diskon_pemeriksaan'],
                'idtrx_pas' => $this->query2->last_value('trx_pasien_idtrx_pas_seq'),
                'jasmed' => $this->query2->changenull($master_pemeriksaan->jasmed),
                'obat' => $this->query2->changenull($master_pemeriksaan->obat),
                'ps_dokter' => $persen_ps,
                'ps_rekanan' => $persen_rekps,
                'jenispemeriksaan' => $master_pemeriksaan->group_ps,
                'status_aktif' => 1,
                'max_diskon' => $max_diskon,
            );
            $this->query2->insert('trx_pemeriksaan', $data);
// Cek Dirujuk Opo Ora
            $cek_tabung1 = $this->query2->count_table('ms_lab_pemeriksaan_tabung', array('kode_pemeriksaan' => strval($grid['kode_pemeriksaan'])));
            if ($cek_tabung1 > 0) {
                $mastertabung1 = $this->query2->get_table_grid('ms_lab_pemeriksaan_tabung', array('kode_pemeriksaan' => strval($grid['kode_pemeriksaan'])));
                if ($dirujuk == 1) {
                    foreach ($mastertabung1 as $tabung1) {
// Cek Ada Tabung Atau Tidak
                        $cek_tabungdirujuk = $this->query2->get_query("select count(*) as jml from trx_sample_harusnyarujuk where no_lab = '$nolab' and kode_tabung = '$tabung1->id_tabung'", 1)->jml;
                        if ($cek_tabungdirujuk == 0) {
                            $arriyogak['no_lab'] = $nolab;
                            $arriyogak['kode_pemeriksaan'] = $grid['kode_pemeriksaan'];
                            $arriyogak['kode_tabung'] = $tabung1->id_tabung;
                            $arriyogak['tgl'] = $this->query2->get_tanggal_server();
                            $this->query2->insert('trx_sample_harusnyarujuk', $arriyogak);
                        }
                    }
                }
            }
// Input Tabung
            $cek_tabung = $this->query2->count_table('ms_lab_pemeriksaan_tabung', array('kode_pemeriksaan' => strval($grid['kode_pemeriksaan'])));
            if ($cek_tabung > 0) {
                $mastertabung = $this->query2->get_table_grid('ms_lab_pemeriksaan_tabung', array('kode_pemeriksaan' => strval($grid['kode_pemeriksaan'])));
                foreach ($mastertabung as $tabung) {
                    if ($tabung->jumlah_tabung == 1) {
                        $tabung_hasil = $tabung->id_tabung;
                        $cek_jumlah = $this->query2->count_table('trx_sample', array('no_lab' => $nolab, 'jumlah' => 1, 'id_tabung' => $tabung->id_tabung));
                        if ($cek_jumlah == 0) {
                            $arrsample1['no_lab'] = $nolab;
                            $arrsample1['kode_trx_sample'] = $cab . $this->query2->cari_seq('trx_sample_idtrx_seq');
                            $arrsample1['id_tabung'] = $tabung->id_tabung;
                            $arrsample1['jumlah'] = 1;
                            $arrsample1['kode_pemeriksaan'] = strval($grid['kode_pemeriksaan']);
                            $this->query2->insert('trx_sample', $arrsample1);
                        }
                    } else if ($tabung->jumlah_tabung > 1) {
                        $tabung_hasil = $tabung->id_tabung;
                        for ($x = 1; $x <= $tabung->jumlah_tabung; $x++) {
                            $arrsample2['no_lab'] = $nolab;
                            $arrsample2['id_tabung'] = $tabung->id_tabung;
                            $arrsample2['kode_trx_sample'] = $cab . $this->query2->cari_seq('trx_sample_idtrx_seq');
                            $arrsample2['kode_pemeriksaan'] = strval($grid['kode_pemeriksaan']);
                            $this->query2->insert('trx_sample', $arrsample2);
                        }
                    }
                }
            } else {
                $tabung_hasil = '0';
            }
            // Insert Hasil Kultur
            $c_kultur = $this->query2->get_query("select count(*) as total from setting where id = '40' and value_setting LIKE '%$kode_perikso%'", 1)->total;
            if ($c_kultur > 0) {
                $ms_sensitivitas = $this->query2->get_table_grid('ms_mikro_sensitivitas');
                // Hasil
                foreach ($ms_sensitivitas as $sensitivitas) {
                    $arrsensitivitas['no_lab'] = $nolab;
                    $arrsensitivitas['kode_px'] = $kode_perikso;
                    $arrsensitivitas['kode_hasil'] = $sensitivitas->kode_hasil;
                    $arrsensitivitas['nama_hasil'] = $sensitivitas->nama_hasil;
                    $arrsensitivitas['jenis_hasil'] = $sensitivitas->status;
                    $this->query2->insert('trx_hasil_mikro_sensitifitas', $arrsensitivitas);
                }
            }
            $hasil = $this->query2->get_table_grid('ms_lab_gb_pemeriksaan_hasil', array('kode_pemeriksaan' => strval($grid['kode_pemeriksaan']), 'status' => 1), null, null, null, 'urutan_hasil', 'ASC');
            // Hasil
            foreach ($hasil as $trxhasil) {
                $insert = array();
                $masterhasil = $this->query2->get_table('ms_lab_hasil', array('kode_hasil' => $trxhasil->kode_hasil));
                $insert['pas_id'] = $this->input->post('pas_id');
                $insert['th_tglperiksa'] = $this->query2->get_tanggaljam_server();
                if ($this->input->post('jenis_umur') == '1') {
                    $insert['th_tgllahir'] = $this->input->post('tgl_lahir');
                    $insert['umur'] = '0';
                } else {
                    $insert['umur'] = $this->query2->changenull($this->input->post('umur'));
                }
                $insert['kode_hasil'] = $trxhasil->kode_hasil;
                $insert['kode_pemeriksaan'] = $trxhasil->kode_pemeriksaan;
                $insert['th_jk'] = $this->input->post('jenis_kelamin');
                $insert['no_lab'] = $nolab;
                $insert['id_hasil'] = $cab . $this->query2->cari_seq('trx_hasil_id_seq', 1);
                $insert['status_aktif'] = 1;
                $insert['th_header'] = $this->query2->get_table('ms_lab_hasil', array('kode_hasil' => $trxhasil->kode_hasil))->mshasil_header;
                $insert['th_tabung'] = $tabung_hasil;
                $insert['th_group'] = $master_pemeriksaan->id_group; // Group Pemeriksaan  hematology, kimia klinik dll
                $insert['th_type'] = $master_pemeriksaan->id_type; // Type Pemeriksaan Lab, Elektromedis dll
//                $insert['th_group'] = $masterhasil->mshasil_group; // Group Pemeriksaan  hematology, kimia klinik dll
//                $insert['th_type'] = $masterhasil->mshasil_type; // Type Pemeriksaan Lab, Elektromedis dll
                $insert['status_rumus'] = $masterhasil->status_rumus; // Type Pemeriksaan Lab, Elektromedis dll
                $insert['rumus'] = $masterhasil->rumus; // Type Pemeriksaan Lab, Elektromedis dll
                $insert['string_rumus'] = $masterhasil->string_rumus; // Type Pemeriksaan Lab, Elektromedis dll
                $insert['kode_pxsiprama'] = $trxhasil->kode_siprama; // Type Pemeriksaan Lab, Elektromedis dll
                $insert['th_namapemeriksaan'] = $this->query2->get_table('ms_lab_hasil', array('kode_hasil' => $trxhasil->kode_hasil))->mshasil_nama;
                $insert['no_lab_siprama'] = $this->input->post('no_lab_siprama');
                $insert['urutan_hasil'] = $trxhasil->urutan_hasil;
                $insert['status_umur'] = $masterhasil->status_umur;
                $insert['status_iso'] = $masterhasil->status_iso;
                $this->query2->insert('trx_hasil', $insert);
// Insert Data Pengantaran
// Lab Foto USG
                if ($masterhasil->mshasil_type >= 1 && $masterhasil->mshasil_type <= 3) {
                    $typehasil = $masterhasil->mshasil_type;
                } else if ($masterhasil->mshasil_type == 4) {
                    if ($trxhasil->kode_pemeriksaan == '401001') {
                        $typehasil = '5';
                    } else if ($trxhasil->kode_pemeriksaan == '401002') {
                        $typehasil = '26';
                    } else if ($trxhasil->kode_pemeriksaan == '401003') {
                        $typehasil = '4';
                    } else if ($trxhasil->kode_pemeriksaan == '401004') {
                        $typehasil = '9';
                    } else if ($trxhasil->kode_pemeriksaan == '401005') {
                        $typehasil = '8';
                    } else {
                        $typehasil = '0';
                    }
                } else if ($masterhasil->mshasil_type == 5) {
// Pemeriksaan Lain Lain
                    $typehasil = '99';
                } else {
                    $typehasil = '0';
                }
                $arrinsert['no_lab'] = $nolab;
                $arrinsert['kode_setting'] = $typehasil;
                $arrinsert['status_terima'] = 0;
// Cek Data Pengantaran
                $cek_pengantaran = $this->query2->count_table("trx_serahterimahasil_internal", $arrinsert);
                if ($cek_pengantaran == 0) {
                    $this->query2->insert('trx_serahterimahasil_internal', $arrinsert);
                }
            }
        }
// Input Sample
//        $mastertabung = $this->query2->get_table_grid('ms_tabung');
//        foreach ($mastertabung as $tabung) {
//            $count_tabung = $this->query2->count_table('trx_hasil', array('no_lab' => $nolab, 'th_tabung' => $tabung->id));
//            if ($count_tabung >= 1) {
//                $arrsample['no_lab'] = $nolab;
//                $arrsample['id_tabung'] = $tabung->id;
//                $this->query2->insert('trx_sample', $arrsample);
//            }
//        }
//  trx_anamnesa_pendaftaran
        $arranamnesa['no_lab'] = $nolab;
        $arranamnesa['anamnesa_keluhan'] = $this->input->post('formanamnesa_keluhan');
        $arranamnesa['anamnesa_jammakan'] = $this->input->post('formanamnesa_jammakan');
        $arranamnesa['anamnesa_riwayatpenyakit'] = $this->input->post('formanamnesa_riwayatpenyakit');
        $arranamnesa['anamnesa_konsumsiobat'] = $this->input->post('formanamnesa_konsumsiobat');
        $arranamnesa['anamnesa_riwayatalergi'] = $this->input->post('formanamnesa_riwayatalergi');
        $arranamnesa['anamnesa_penyakitkeluarga'] = $this->input->post('formanamnesa_penyakitkeluarga');
        $this->query2->insert('trx_anamnesa_pendaftaran', $arranamnesa);
// Update Pasien Temp
        if ($this->input->post('idpas_temp') <> '') {
            $trx_pastemp = explode('-', $this->input->post('idpas_temp'));
            if ($trx_pastemp[0] == '1') {
                $this->load->model('query2', 'pusat');
                $this->pusat->db2 = $this->load->database('1', TRUE);
                $this->pusat->update('trx_pasien_temp', array('status_ambil' => 2, 'tgl_ambil' => $this->query2->get_tanggaljam_server()), array('idtrx_pas' => $trx_pastemp[1]));
                $this->pusat->db_close();
            } else {
                $this->query2->update('trx_pasien_temp', array('status_ambil' => 2, 'tgl_ambil' => $this->query2->get_tanggaljam_server()), array('idtrx_pas' => $trx_pastemp[1]));
            }
        }
// Persyaratan
        foreach ($list_persyaratan as $persyaratan) {
            if ($persyaratan['status'] == 'true') {
// Ada
                $status_persyaratan = 1;
            } else {
// Tidak Ada
                $status_persyaratan = 0;
            }
            $arrpersyaratan['no_lab'] = $nolab;
            $arrpersyaratan['id_persyaratan'] = $persyaratan['id'];
            $arrpersyaratan['status'] = $status_persyaratan;
            $this->query2->insert('trx_pasien_persyaratan', $arrpersyaratan);
        }
// Jika Tidak Ada Tabung
        $cari_kodehasil = $this->query2->get_table_grid('trx_hasil', array('no_lab' => $nolab), 'th_tabung', array('0'));
        $trx_pas = $this->query2->get_table('trx_pasien', array('nolab' => $nolab));
        foreach ($cari_kodehasil as $hasil) {
            if ($hasil->status_postingnilairujukan == 0) {
                if ($trx_pas->umur == 0) {
                    $umur = $this->query2->hitungumur($trx_pas->pas_tgllahir, $this->query2->get_tanggal_server());
                } else {
                    $umur = $trx_pas->umur * 365;
                }
                $arrdata['jk'] = $trx_pas->pas_jenkelamin;
                $arrdata['pas_id'] = $trx_pas->pas_id;
                $arrdata['pas_tglperiksa'] = $trx_pas->tgl_periksa;
                $arrdata['pas_tgllahir'] = $trx_pas->pas_tgllahir;
                $arrdata['tgl_sample'] = $this->query2->get_tanggaljam_server();
                $arrdata['nama_hasil'] = '-';
                $arrdata['th_tabung'] = '0';
                $arrdata['no_lab'] = $nolab;
                $arrdata['th_group'] = $hasil->th_group;
                $arrdata['th_type'] = $hasil->th_type;
                $arrdata['kode_hasil'] = $hasil->kode_hasil;
                $arrdata['kode_pemeriksaan'] = $hasil->kode_pemeriksaan;
                $arrdata['kode_pemeriksaan'] = $hasil->kode_pemeriksaan;
                $arrdata['urutan_hasil'] = $hasil->urutan_hasil;
                $this->query2->cari_nilai_normal($hasil->kode_hasil, $umur, $arrdata);
            }
        }
        $this->query2->get_trans_complete();
        if ($this->query2->get_trans_status() == 'true') {
            $database_pst = $this->load->database('1', TRUE);
            if ($database_pst->conn_id === FALSE) {
                $updatepasdata['status_trx_pasien_daftar_cabang '] = 0;
                $this->query2->update('trx_pasien', $updatepasdata, array('nolab' => $nolab));
                echo json_encode(array('success' => 'true', 'no_lab' => $pasdata['nolab'], 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil <br> Koneksi Pusat [Bermasalah]'));
                return;
            } else {
                $updatepasdata['status_trx_pasien_daftar_cabang '] = 1;
                $this->load->model('query2', 'pusat_trx');
                $this->pusat_trx->db2 = $database_pst;
                $arrtrxdaftar['pas_id'] = $this->input->post('pas_id');
                $arrtrxdaftar['no_lab'] = $nolab;
                $arrtrxdaftar['pengirim'] = $pengirim;
                $arrtrxdaftar['kode_pengirim'] = $kode;
                if ($kode == '4') {
                    $arrtrxdaftar['pengirim_2'] = 3;
                    $arrtrxdaftar['kode_pengirim_2'] = $this->input->post('kode_dokter');
                }
                $arrtrxdaftar['tgl_daftar'] = $this->query2->get_tanggaljam_server();
                $arrtrxdaftar['cabang'] = intval($this->query2->get_table('setting', array('id' => 1))->value_setting);
                $this->pusat_trx->insert('trx_pasien_daftar_cabang', $arrtrxdaftar);
                $this->pusat_trx->db_close();
                $this->query2->update('trx_pasien', $updatepasdata, array('nolab' => $nolab));
                echo json_encode(array('success' => 'true', 'no_lab' => $pasdata['nolab'], 'title' => 'Info', 'msg' => 'Proses Simpan Berhasil <br> Koneksi Pusat [Normal]'));
                return;
            }
            // 
            // ---- End Input Data Pusat
        } else {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'Error', 'msg' => $this->query2->error()));
        }
    }

    public function simpan_px() {
        $id = $this->query2->cari_seq('id_pasien');
        $cab = $this->query2->get_table('setting', array('id' => 1))->value_setting;
        if ($id < 10) {
            $pas_id = 'A' . $cab . '00' . $id;
        } else if ($id >= 10 && $id < 100) {
            $pas_id = 'A' . $cab . '0' . $id;
        } else {
            $pas_id = 'A' . $cab . $id;
        }
        $data = array(
//Data Cabang
            'pas_id' => $pas_id,
            'pas_nama' => strtoupper($this->input->post('actpx_nama')),
            'pas_jenkelamin' => $this->input->post('actpx_jk'),
            'pas_alamat' => $this->input->post('actpx_alamat'),
            'pas_kota' => $this->input->post('actpx_kota'),
            'pas_telp' => $this->input->post('actpx_telf'),
            'pas_hp' => $this->input->post('actpx_hp'),
            'pas_status' => $this->input->post('actpx_status'),
            'pas_tglreg' => $this->query2->get_tanggal_server(),
            'pas_input' => $this->user->id
        );
        if ($this->input->post('jenis_umur') == 1) {
            $data['pas_tgllahir'] = $this->input->post('actpx_tgllahir');
            $data['umur'] = 0;
        } else {
            $data['umur'] = $this->input->post('actpx_umur');
        }
        if (!$this->query2->insert('ms_pasien', $data)) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
        } else {
            $this->load->model('query2', 'pusat');
            $this->pusat->db2 = $this->load->database('1', TRUE);
            $this->pusat->insert('ms_pasien', $data);
            $this->pusat->db_close();
            echo json_encode(array('success' => 'true', 'data' => $data, 'title' => 'Info', 'msg' => $pas_id));
        }
    }

    public function list_rekanan() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if ($field == 'pendaftarancari_master_rekanan') {
                    $filter = explode('-', $val);
                    if (count($filter) == 2) {
                        if (is_numeric($filter[1])) {
                            $like['kode_rekanan'] = $filter[1];
                        } else {
                            $like['upper(nama_rekanan)'] = strtoupper($filter[1]);
                        }
                    } else {
                        $like[$filter[2]] = strtoupper($filter[1]);
                    }
                } else {
                    $like = null;
                }
            }
        } else {
            $like = null;
        }
        $where['aktif'] = 1;
        $where['status'] = 2;
        if ($filter[0] == 'true') {
            $this->load->model('query2', 'pusat');
            $this->pusat->db2 = $this->load->database('1', TRUE);
            $result = $this->pusat->get_table_grid('ms_rekanan', $where, null, null, $like);
            $this->pusat->db_close();
        } else {
            $result = $this->query2->get_table_grid('ms_rekanan', $where, null, null, $like);
        }
        $list = array();
        foreach ($result as $row) {
            $show['nama_rekanan'] = $row->nama_rekanan;
            $show['id_rekanan'] = $row->id_rekanan;
            $show['type_rekanan'] = $row->type_rekanan;
            $show['alamat_rekanan'] = $row->alamat_rekanan;
            $show['kota_rekanan'] = $row->kota_rekanan;
            $show['telf_rekanan'] = $row->telf_rekanan;
            $show['cp_rekanan'] = $row->cp_rekanan;
            $show['cp_telf'] = $row->cp_telf;
            $show['cabang'] = $row->cabang;
            $show['kode_rekanan'] = $row->kode_rekanan;
            $show['id_sdm'] = $row->id_sdm;
            $show['id'] = $row->id;
            $list[] = $show;
        }
        echo json_encode(array('success' => 'true', 'data' => $list, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_rekanan_penagihan() {
        $records = $this->input->get('filter');
        $query = isset($_GET['query']);
        $record = array();
        $params = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if ($field == 'pendaftaranpenagihan_master_rekanan') {
                    $filter = explode('-', $val);
                    $pusat = $filter[0];
                    if (count($filter) == 1) {
                        if (is_numeric($filter[0])) {
                            $like['kode_rekanan'] = $filter[0];
                        } else {
                            $like['upper(nama_rekanan)'] = strtoupper($filter[0]);
                        }
                    } else {
                        $like[$filter[2]] = strtoupper($filter[1]);
                    }
                    $where['aktif'] = 1;
                    $where['status'] = 2;
                    if ($pusat == 'true') {
                        $this->load->model('query2', 'pusat');
                        $this->pusat->db2 = $this->load->database('1', TRUE);
                        $result = $this->pusat->get_table_grid('ms_rekanan', $where, null, null, $like, null, null);
                    } else {
                        $result = $this->query2->get_table_grid('ms_rekanan', $where, null, null, $like, null, null);
                    }
                    $list = array();
                    foreach ($result as $row) {
                        $show['nama_rekanan'] = $row->nama_rekanan;
                        $show['id_rekanan'] = $row->id_rekanan;
                        $show['type_rekanan'] = $row->type_rekanan;
                        $show['alamat_rekanan'] = $row->alamat_rekanan;
                        $show['kota_rekanan'] = $row->kota_rekanan;
                        $show['telf_rekanan'] = $row->telf_rekanan;
                        $show['cp_rekanan'] = $row->cp_rekanan;
                        $show['cp_telf'] = $row->cp_telf;
                        $show['cabang'] = $row->cabang;
                        $show['kode_rekanan'] = $row->kode_rekanan;
                        $show['id_sdm'] = $row->id_sdm;
                        $show['id'] = $row->id;
                        $list[] = $show;
                    }
                    echo json_encode(array('success' => 'true', 'data' => $list, 'title' => 'Info', 'msg' => 'List All Cabang'));
                }
            }
        }
    }

    public function approve_discount() {
        $user = $this->input->post('disc_username') - 10000;
        $password = $this->input->post('disc_password');
        $cek_spv = $this->query->get_table('ms_karyawan', array('id' => $user));
//        log_message('error', $this->db->last_query());
        if ($this->query2->get_acl($user, 3, 'fo_approve_diskon') > 0) {
            $login = $this->ion_auth->hash_password_db($user, $password);
            if ($login == 'true') {
                echo json_encode(array('success' => 'true', 'data' => $cek_spv, 'title' => 'Info', 'msg' => 'Berhasil'));
            } else {
                echo json_encode(array('success' => 'false', 'data' => null, 'title' => 'Info', 'msg' => 'User / Password Salah'));
            }
        } else {
            echo json_encode(array('success' => 'false', 'data' => null, 'title' => 'Info', 'msg' => 'Anda Tidak Berhak Untuk Memberikan Discount'));
        }
    }

    public function list_pasien_sementara() {
        $records = $this->input->get('filter');
        $list = array();
        $data = array();
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if ($field == 'cari_folistdatapasiensementara') {
                    $pecah = explode('-', $val);
                    $jenis_pasien = $pecah[0];
                    $filter = $pecah[1];
                    $value = $pecah[2];
                    $pusat = $pecah[3];
//                    $where["to_char(tgl_periksa,'YYYYmmdd') >="] = $tglawal;
//                    $where["to_char(tgl_periksa,'YYYYmmdd') <="] = $tglakhir;
                    $like["upper($filter)"] = strtoupper($value);
                    if ($jenis_pasien == '0') {
                        $jenis_pasien1 = '';
                    } else {
                        $jenis_pasien1 = $jenis_pasien;
                    }
                }
            }
        }
        if ($pusat == '0') {
            $result = $this->query2->get_table_grid('trx_pasien_temp', array('status_ambil' => 1), null, null, $like);
            $this->query2->get_log();
        } else {
            $this->load->model('query2', 'pusat');
            $this->pusat->db2 = $this->load->database('1', TRUE);
            $result = $this->pusat->get_table_grid('trx_pasien_temp', array('status_ambil' => 1), null, null, $like);
            $this->pusat->db_close();
        }
        foreach ($result as $row) {
            $data['idtrx_pas'] = $row->idtrx_pas;
            $data['nolab'] = $row->nolab;
            $data['pasien_id'] = $row->pas_id;
            $data['nama_pasien'] = ucwords(strtolower($row->pas_nama));
            $data['jenis_kelamin'] = $row->pas_jenkelamin;
            $data['tgl_lahir'] = $row->pas_tgllahir;
            $data['status'] = $row->pas_status;
            $data['no_hp'] = $row->pas_hp;
            $data['no_tlfnrumah'] = $row->pas_telp;
            $data['alamat'] = $row->pas_alamat;
            $data['kota'] = $row->pas_kota;
//            $data['nama_rekanan'] = $this->query2->get_table('ms_rekanan', array('kode_rekanan' => $row->kode_pengirim))->nama_rekanan;
            $data['id_rekanan'] = $row->kode_pengirim;
            $data['kode_kontrak'] = $row->kode_kontrak;
            $data['jabatan'] = $row->jabatan;
            $data['divisi'] = $row->divisi;
            $data['subdivisi'] = $row->sub_divisi;
            $data['departemen'] = $row->departemen;
            $data['subdepartemen'] = $row->sub_departemen;
            $list[] = $data;
        }
        echo json_encode(array('success' => 'true', 'data' => $list, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function list_persyaratanpaket() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if ($field == 'pendaftaran_persyaratanpaket') {
                    $where['kode_paket'] = $val;
                } else {
                    $where = null;
                }
            }
        } else {
            $where = null;
        }
        $paket = $this->query2->get_table('paket', $where);
        $result = $this->query2->get_table_grid('paket_persyaratan', array('kode_ba' => $paket->kode_ba));
        $show = array();
        foreach ($result as $persyaratan) {
            $data['id'] = $persyaratan->id_persyaratan;
            $data['persyaratan'] = $this->query2->get_table('ms_paket_persyaratan', array('id' => $persyaratan->id_persyaratan))->nama_persyaratan;
            $show[] = $data;
        }
        echo json_encode(array('success' => 'true', 'data' => $show, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function berita_acara($kode_kontrak) {
        $paket = $this->query2->get_table('paket', array('kode_paket' => $kode_kontrak));
        $ba = $this->query2->get_table('paket_beritaacara', array('kode_ba' => $paket->kode_ba));
//        if ($paket->jenis_paket == 2) {
//            $caridokter = $this->query2->get_table('ms_dokter', array('kode_dokter' => $paket->dokter_rekanan));
//            $dokter_rekanan = $caridokter->gelar_depan . $caridokter->nama_dokter . $caridokter->gelar_belakang;
//            $alamat_rekanan = '-';
//            $telf_rekanan = '-';
//        } else if ($paket->jenis_paket == 4) {
        $carirekanan = $this->query2->get_table('ms_rekanan', array('kode_rekanan' => $ba->kode_rekanan));
        $dokter_rekanan = $carirekanan->nama_rekanan;
        $alamat_rekanan = $carirekanan->alamat_rekanan . ' ' . $carirekanan->kota_rekanan;
        $telf_rekanan = $carirekanan->telf_rekanan;
//        } else {
//            $dokter_rekanan = '-';
//            $alamat_rekanan = '-';
//            $telf_rekanan = '-';
//        }
        $data['id'] = $paket->id;

        $data['nama_paket'] = $paket->nama_paket;
        $data['judul_ba'] = "($ba->kode_ba) " . $ba->judul_ba;
        $data['tgl_pelaksanaan'] = $this->query2->tanggal_indo($ba->tgl_pelaksanaan);
        $data['nama_input'] = $this->query->get_table('ms_karyawan', array('id' => $paket->sdm_input))->mk_nama;
        $data['nama_rekanan'] = $dokter_rekanan;
        $data['alamat_rekanan'] = $alamat_rekanan;
        $data['telf_rekanan'] = $telf_rekanan;
        $data['kontak_person'] = $ba->kontak_person;
        $kode_kontrak = $this->query2->get_table_grid('paket', array('kode_ba' => $ba->kode_ba));
        $listkontrak = '';
        foreach ($kode_kontrak as $value) {
            $listkontrak .= $value->nama_paket . " ($value->kode_paket) <br>";
        }
        $data['kode_kontrak'] = $listkontrak;
        $data['kode_rekanan'] = $ba->kode_rekanan;
        $data['tempat_pelaksanaan'] = $ba->tempat_pelaksanaan;
        $data['waktu_pelaksanaan'] = $ba->waktu_pelaksanaan;
        $data['jumlah_peserta'] = $ba->jumlah_peserta;
        $data['fasilitas_tambahan'] = $ba->fasilitas_tambahan;
        $data['catatan'] = $ba->catatan;
        $data['pelaporan_hasil'] = "- Rekap Individu "
                . "<br>   Soft Copy : $ba->jumlah_softcopy_individu"
                . "<br>   Hard Copy : $ba->jumlah_hardcopy_individu"
                . "<br>- Rekap Global "
                . "<br>   Soft Copy : $ba->jumlah_softcopy_global"
                . "<br>   Hard Copy : $ba->jumlah_hardcopy_global";
        $data['sistem_penagihan'] = "Alamat Penagih : $ba->alamat_penagihan "
                . "<br> Cabang Penagih : $ba->cabang_penagihan";
        $data['masaberlaku'] = $this->query2->tanggal_indo($ba->masa_berlaku_awal) . ' - ' . $this->query2->tanggal_indo($ba->masa_berlaku_akhir);
        $data['kode_dokter'] = '-';
        $data['tanggal_pelaporan'] = "Rekap Individu : $ba->janji_hasil_individu Hari Dari Pelaksanaan "
                . "<br> Rekap Global : $ba->janji_hasil_individu Hari Dari Pelaksanaan"
                . "<br> Alamat Pengiriman : $ba->alamat_kirimhasil";
        $data['marketing'] = $this->query->get_table('ms_karyawan', array('id' => $ba->sdm_input))->mk_nama;
        $this->load->view('berita_acara', $data);
    }

    public function tambah_dokter_baru() {
        $kode_wilayah = $this->query2->get_table('setting', array('id' => 14))->value_setting;
        $this->load->model('query2', 'pusat');
        $this->pusat->db2 = $this->load->database('1', TRUE);
//        $find_pusat = $this->pusat->get_query("select max(kode_dokter) as kode_dokter FROM ms_dokter WHERE kode_wilayah = '$kode_wilayah';", 1)->kode_dokter;
        $find_pusat = $this->pusat->get_query("SELECT substring(kode_dokter from 2)::int as kode_dokter FROM ms_dokter WHERE kode_wilayah = '$kode_wilayah' ORDER BY kode_dokter DESC LIMIT 1", 1)->kode_dokter;
//        $this->pusat->get_log();
//        $find_cabang = $this->query2->get_query("select max(kode_dokter) as kode_dokter FROM ms_dokter WHERE kode_wilayah = '$kode_wilayah';", 1)->kode_dokter;
        $find_cabang = $this->query2->get_query("SELECT substring(kode_dokter from 2)::int as kode_dokter FROM ms_dokter WHERE kode_wilayah = '$kode_wilayah' ORDER BY kode_dokter DESC LIMIT 1", 1)->kode_dokter;
//        $this->query2->get_log();
//        $this->query2->get_log_det($find_cabang);
//        
//        $this->pusat->get_log_det($find_pusat);

        $wilayah = intval($kode_wilayah);
        $length = strlen($wilayah);
        $length_pusat = strlen($find_pusat);
        $length_cabang = strlen($find_cabang);
        $urutan1 = substr($find_pusat, $length, $length_pusat);
        $urutan2 = substr($find_cabang, $length, $length_cabang);
        $this->query2->get_log_det($urutan1);
        $this->query2->get_log_det($urutan2);

        if ($urutan1 > $urutan2) {
            $urutan = $urutan1;
        } else {
            $urutan = $urutan2;
        }
        $data = array();
        $data['kode_dokter'] = "D$kode_wilayah" . ($urutan + 1);
        $data['kode_wilayah'] = $kode_wilayah;
        $data['nama_dokter'] = $this->input->post('nama_dokter');
        $data['gelar_depan'] = $this->input->post('gelar_depan');
        $data['gelar_belakang'] = $this->input->post('gelar_belakang');
        $data['md_nohp'] = $this->input->post('no_hp');
        $data['md_alamat_praktek1'] = $this->input->post('alamat');
        $data['md_kota_1'] = $this->input->post('kota');
        $data['status_pengajuan'] = 1;
        if (!$this->pusat->insert('ms_dokter', $data)) {
            echo json_encode(array('success' => 'false', 'data' => NULL, 'title' => 'ERROR', 'msg' => $this->catch_db_err()));
        } else {
            $this->query2->insert('ms_dokter', $data);
            $this->pusat->db_close();
            echo json_encode(array('success' => 'true', 'data' => $data, 'title' => 'Info', 'msg' => 'Proses Penambahan Dokter Berhasil'));
        }
    }

    public function cetak_nota($nolab) {
        $this->query2->cetak_nota($nolab);
    }

    public function cetak_kartu_kontrol($nolab) {
        $this->query2->cetak_kartu_kontrol($nolab);
    }

    public function cetak_kartukontrol($nolab) {
        $trx_pasien = $this->query2->get_table('trx_pasien', array('nolab' => $nolab));
        if ($trx_pasien->umur == 0) {
            $umur = '';
        } else {
            $umur = $trx_pasien->umur;
        }
        $data['nolab'] = $trx_pasien->nolab . ' / ' . $trx_pasien->pas_id;
        $data['nama'] = $trx_pasien->pas_status . ' ' . $trx_pasien->pas_nama . ' / ' . $umur;
        $data['telp'] = $trx_pasien->pas_telp . ' / ' . $trx_pasien->pas_hp;
        $data['tgl'] = $trx_pasien->tgl_periksa;
        if ($trx_pasien->pengirim == 1) {
            $rekanan = 'PASIEN UMUM';
            $pengirim = 'PERMINTAAN SENDIRI';
        } else if ($trx_pasien->pengirim == 2) {
            $rekanan = '-';
            $dokter = $this->query2->get_table('ms_dokter', array('kode_dokter' => $trx_pasien->kode_pengirim));
            $pengirim = $dokter->gelar_depan . ' ' . $dokter->nama_dokter . ' ' . $dokter->gelar_belakang;
        } else if ($trx_pasien->pengirim > 2) {
            $pengirim = $this->query2->get_table('ms_rekanan', array('kode_rekanan' => $trx_pasien->kode_pengirim))->nama_rekanan;
            $rekanan = '-';
        }
        $data['pengirim'] = $pengirim;
        $data['rekanan'] = $rekanan;
        $data['alamat'] = $trx_pasien->pas_alamat . ' ' . $trx_pasien->pas_kota;
        $datapemeriksaan = $this->query2->get_table_grid('trx_pemeriksaan', array('no_lab' => $nolab));
        $pemeriksaan = '<table style="
            font-family: Trebuchet MS;
	font-size:21px;
	color:#333333;
	border-width: 1px;
	border-color: #666666;
        width: 500px;
	border-collapse: collapse;" border="0">
                    <tr style="line-height: 2">
                    <th style="text-align: center; background-color: #DAD8D8; border: 1px; solid; border-style: solid none solid none;"; width="10px">NO</th>
                    <th style="background-color: #DAD8D8;border: 1px solid; border-style: solid solid solid solid;"; width="300px"; >&nbsp;<b>NAMA PEMERIKSAAN</b></th>
                    <th style="background-color: #DAD8D8; border: 1px solid;border-style: solid none solid none;"; width="100px; ">&nbsp;HARGA</th>
                    </tr>';
        $no = 1;
        $pemeriksaan1 = '';
        $pemeriksaan2 = '';
        foreach ($datapemeriksaan as $row) {
            $nomor = $no++;
            if ($nomor > 17) {
                $pemeriksaan2 .= "<tr> <td style='text-align: center; border: 1px;border-style: none none solid none;'>" . $nomor . "</td>
                    <td style='border: 1px;border-style: none none solid none;'> &nbsp;" . $row->tp_namapemeriksaan . "</td>
                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->tp_harganett), 0, ',', ',') . " &nbsp;</td>
              </tr>";
            } else {
                $pemeriksaan1 .= "<tr> <td style='text-align: center; border: 1px;border-style: none none solid none;'>" . $nomor . "</td>
                    <td style='border: 1px;border-style: none none solid none;'> &nbsp;" . $row->tp_namapemeriksaan . "</td>
                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->tp_harganett), 0, ',', ',') . " &nbsp;</td>
              </tr>";
            }
        }
//        if ($nomor > 17) {
        $data['pemeriksaan1'] = $pemeriksaan . $pemeriksaan1 . '</table>';
        $data['pemeriksaan2'] = $pemeriksaan . $pemeriksaan2 . '</table>';
//        } else {
//            $data['pemeriksaan1'] = $pemeriksaan . $pemeriksaan1 . '</table>';
//            $data['pemeriksaan2'] = '';
//        }
        if ($trx_pasien->rp_discount == 0) {
            $harga_bruto = '';
            $discount = '';
        } else {
            $harga_bruto = "<th colspan='3'>Harga Pemeriksaan</th>
                        <th colspan='2' style='text-align: right'>" . number_format(floor($trx_pasien->rp_netto), 0, ',', ',') . "</th>";

            $discount = "<th colspan='3'>Discount</th>
                                            <th colspan='2' style='text-align: right'>" . number_format(floor($trx_pasien->rp_discount), 0, ',', ',') . "</th>";
        }

        $data['harga_bruto'] = $harga_bruto;
        $data['harga_netto'] = number_format(floor($trx_pasien->rp_bruto), 0, ',', ',');
        $data['discount'] = $discount;
        $data['tanggal'] = $this->query2->tanggal_indo($trx_pasien->tgl_periksa, 1);
        $data['kota'] = $this->query->get_table('ms_cabang', array('id' => intval($this->query2->get_table('setting', array('id' => 1))->value_setting)))->msc_kota;
        $data['rcpt'] = $this->query->get_table('ms_karyawan', array('id' => $trx_pasien->input))->mk_nama;
        $data['printby'] = $this->user->mk_nama;

        if ($trx_pasien->rp_kurangbayar > 0) {
            $data['status_lunas'] = "<table border='0'><tr><td></td><td></td><td width='200px' style='line-height: 1; border: 1px solid; border-style: solid solid solid solid;'>KURANG BAYAR</td></tr></table>";
            $data['kurang_bayar'] = number_format(floor($trx_pasien->rp_kurangbayar), 0, ',', ',');
        } else {
            $data['status_lunas'] = "<table border='0'><tr><td></td><td></td><td width='200px' style='line-height: 1; border: 1px solid; border-style: solid solid solid solid;'>LUNAS</td></tr></table>";
            $data['kurang_bayar'] = '';
        }
        if ($trx_pasien->statushasil_diambil == '1') {
            $data['status_hasil'] = 'DIAMBIL';
        } else if ($trx_pasien->statushasil_kirimrumah != '') {
            $data['status_hasil'] = 'DIANTAR KE RUMAH' . $trx_pasien->statushasil_kirimrumah;
        } else if ($trx_pasien->statushasil_kirimkantor != '0') {
            $data['status_hasil'] = 'DIANTAR KE KANTOR : ' . $trx_pasien->statushasil_kirimkantor;
        } else if ($trx_pasien->statushasil_kirimdokter != '0') {
            $data['status_hasil'] = 'DIANTAR KE DOKTER : ' . $trx_pasien->statushasil_kirimdokter;
        }

        $this->load->view('cetak_nota', $data);
//        $this->load->view('pendaftaran_nota', $data);
    }

    public function list_caripasien_detailpemeriksaan() {
        $records = $this->input->get('filter');
        if ($records) {
            $raw_record = json_decode($_GET['filter'], true);
            foreach ($raw_record as $key) {
                $field = $this->property_reader($key['property']);
                $val = $this->property_reader($key['value']);
                if ($field == 'cari_datapasien_pemeriksaan') {
                    $where['no_lab'] = $val;
                    $where['status_aktif'] = 1;
                    $result = $this->query2->get_table_join('trx_pemeriksaan.*, trx_pasien.pas_nama', 'trx_pemeriksaan', 'trx_pasien', 'trx_pemeriksaan.no_lab = trx_pasien.nolab ', $where);
//                    $result = $this->query2->get_table_grid('trx_pemeriksaan', $where);
                    echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
                }
            }
        }
    }

    public function list_paket_kodekontrak() {
        $result = $this->query2->get_table_grid('paket_pemeriksaan', array('kode_paket' => $this->input->post('kode_kontrak')));
        echo json_encode(array('success' => 'true', 'data' => $result, 'title' => 'Info', 'msg' => 'List All Cabang'));
    }

    public function cetak_barcode() {
        $no_lab = $this->input->post('no_lab');
//        $this->load->model('query2', 'cabang');
//        $this->cabang->db2 = $this->load->database(strval($this->input->post('cabang')), TRUE);
        $pasien = $this->query2->get_query("select * from trx_pasien where nolab = '$no_lab'", 1);
//        $data = $this->cabang->get_query_grid($query);
        $list = '';
        $jml_tabung = $this->query2->get_query("select sum(jumlah) as total from trx_sample left join trx_pasien on trx_pasien.nolab = trx_sample.no_lab where trx_sample.no_lab = '$no_lab'", 1)->total;
        $tabung = $this->query2->get_query_grid("select * from trx_sample join ms_tabung on ms_tabung.id = trx_sample.id_tabung  where trx_sample.no_lab = '$no_lab'");
        $jml_pxbcd = $this->query2->get_query("SELECT count(*) as total from ms_barcode where kode_hasil in (select DISTINCT(kode_hasil) from trx_hasil where no_lab = '$no_lab' and status_aktif = 1);", 1)->total;
//        $pxbcd = $this->cabang->get_query_grid("SELECT * from ms_barcode where kode_hasil in (select DISTINCT(kode_hasil) from trx_hasil where no_lab = '$no_lab' and status_aktif = 1);");
        $pxbcd = $this->query2->get_query_grid("SELECT trx_hasil.kode_hasil, nama_tabung, ms_barcode.kode_barcode, ms_barcode.kode_label as kode_label, trx_hasil.kode_pemeriksaan from trx_hasil
            left join ms_barcode on ms_barcode.kode_hasil = trx_hasil.kode_hasil 
            join ms_lab_pemeriksaan_tabung on ms_lab_pemeriksaan_tabung.kode_pemeriksaan = trx_hasil.kode_pemeriksaan 
            join ms_tabung on ms_tabung.id = ms_lab_pemeriksaan_tabung.id_tabung 
            where
            trx_hasil.kode_hasil in (select kode_hasil from ms_barcode) and no_lab = '$no_lab' and status_aktif = 1 
            group by trx_hasil.kode_hasil, ms_barcode.kode_barcode, ms_barcode.kode_label, trx_hasil.kode_pemeriksaan, nama_tabung;
            ");
//        $this->cabang->get_log();
//        if ($jml_tabung > $jml_pxbcd) {
        $total = $jml_tabung + $jml_pxbcd;
        $y = 1;
        foreach ($tabung as $row) {
            $data['no_lab'] = $pasien->nolab;
            $data['kode_label'] = '-';
            $data['no_labbcd'] = $pasien->nolab;
            $data['pas_nama'] = substr("$pasien->pas_status $pasien->pas_nama", 0, 14) . '(' . $pasien->pas_jenkelamin . ')-' . substr($row->nama_tabung, 0, 8);
            $list[] = $data;
        }
        foreach ($pxbcd as $bcd) {
            $data['no_lab'] = $pasien->nolab;
            $data['no_labbcd'] = $pasien->nolab . $bcd->kode_barcode;
            $data['kode_label'] = $bcd->kode_label;
            $data['pas_nama'] = substr("$pasien->pas_status $pasien->pas_nama", 0, 14) . '(' . $pasien->pas_jenkelamin . ')-' . substr($bcd->nama_tabung, 0, 8) . ' [' . $bcd->kode_barcode . ']';
            $list[] = $data;
        }
        echo json_encode(array('success' => 'true', 'data' => $list, 'total' => $total, 'title' => 'Info', 'msg' => 'Print Barcode'));
    }

}
