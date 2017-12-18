<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Query2 extends CI_Model {

    public $db2;

    function __construct() {
        parent::__construct();
    }

    public function get_table_grid1($table, $search = null, $where_in_id = Null, $where_in_data = NULL, $like = NULL, $sort = NULL, $limit = NULL, $offset = NULL, $or = null, $where = null) {
        if (!is_null($search)) {
            $this->db2->where($search);
        }
        if (!is_null($where_in_id)) {
            if (!is_null($where_in_data)) {
                $this->db2->where_in($where_in_id, $where_in_data);
            }
        }
        if (!is_null($or)) {
            $this->db2->or_where($or);
        }
        if (!is_null($where)) {
            $this->db2->where($where);
        }
        if (!is_null($like)) {
            $this->db2->like($like);
        }
        if (!is_null($sort)) {
            $this->db2->order_by($sort);
        }
        if (!is_null($limit)) {
            $this->db2->limit($limit);
        }
        if (!is_null($offset)) {
            $this->db2->offset($offset);
        }
        return $this->db2->get($table)->result();
    }

    Public function bulanindo($bulan) {
        $mon = (int) $bulan;
        switch ($mon) {
            case 1 : $mon = 'Januari';
                Break;
            case 2 : $mon = 'Februari';
                Break;
            case 3 : $mon = 'Maret';
                Break;
            case 4 : $mon = 'April';
                Break;
            case 5 : $mon = 'Mei';
                Break;
            case 6 : $mon = 'Juni';
                Break;
            case 7 : $mon = 'Juli';
                Break;
            case 8 : $mon = 'Agustus';
                Break;
            case 9 : $mon = 'September';
                Break;
            case 10 : $mon = 'Oktober';
                Break;
            case 11 : $mon = 'November';
                Break;
            case 12 : $mon = 'Desember';
                Break;
        }
        return $mon;
    }

    public function tanggal_indo($date, $full = null) { // fungsi atau method untuk mengubah tanggal ke format indonesia
        $tahun = substr($date, 0, 4); // memisahkan format tahun menggunakan substring
        $bulan = substr($date, 5, 2); // memisahkan format bulan menggunakan substring
        $tgl = substr($date, 8, 2); // memisahkan format tanggal menggunakan substring
        if ($full == null) {
            $result = $tgl . " " . $this->bulanindo($bulan) . " " . $tahun;
        } else {
            $jam = substr($date, 10, 9);
            $result = $tgl . " " . $this->bulanindo($bulan) . " " . $tahun . " " . $jam;
        }
        return($result);
    }

    public function get_table_grid($table, $search = null, $where_in_id = Null, $where_in_data = NULL, $like = NULL, $nama_sort = NULL, $sort = NULL, $limit = NULL, $offset = NULL, $or = null, $where = null, $group = null, $select = null) {

        if (!is_null($search)) {
            $this->db2->where($search);
        }
        if (!is_null($select)) {
            $this->db2->select($select);
        } else {
            $this->db2->select('*');
        }
        if (!is_null($where_in_id)) {
            if (!is_null($where_in_data)) {
                $this->db2->where_in($where_in_id, $where_in_data);
            }
        }
        if (!is_null($or)) {
            $this->db2->or_where($or);
        }
        if (!is_null($where)) {
            $this->db2->where($where);
        }
        if (!is_null($like)) {
            $this->db2->like($like);
        }
        if (!is_null($nama_sort)) {
            $this->db2->order_by($nama_sort, $sort);
        }
        if (!is_null($limit)) {
            $this->db2->limit($limit);
        }
        if (!is_null($offset)) {
            $this->db2->offset($offset);
        }
        if (!is_null($group)) {
            $this->db2->group_by($group);
        }
        return $this->db2->get($table)->result();
    }

    public function get_table_grid_wherein($table, $select = null, $search = null, $where_in_id = Null, $where_in_data = NULL, $where_in_id2 = Null, $where_in_data2 = NULL, $like = NULL, $nama_sort = NULL, $sort = NULL) {
        if (!is_null($select)) {
            $this->db2->select($select);
        } else {
            $this->db2->select('*');
        }
        if (!is_null($search)) {
            $this->db2->where($search);
        }

        if (!is_null($where_in_id)) {
            if (!is_null($where_in_data)) {
                $this->db2->where_in($where_in_id, $where_in_data);
            }
        }
        if (!is_null($where_in_id2)) {
            if (!is_null($where_in_data2)) {
                $this->db2->where_in($where_in_id2, $where_in_data2);
            }
        }
        if (!is_null($like)) {
            $this->db2->like($like);
        }
        if (!is_null($nama_sort)) {
            $this->db2->order_by($nama_sort, $sort);
        }
        return $this->db2->get($table)->result();
    }

    public function get_table_join($select, $table, $table_join, $join, $search = Null, $like = NULL, $nama_sort = NULL, $sort = NULL, $limit = NULL, $sort1 = NULL, $group = NULL, $distinct = NULL) {

        if (!is_null($distinct)) {
            $this->db2->distinct($distinct);
        }
        $this->db2->select($select);
        $this->db2->from($table);
        $this->db2->join($table_join, $join);
        if (!is_null($search)) {
            $this->db2->where($search);
        }
        if (!is_null($like)) {
            $this->db2->like($like);
        }
        if (!is_null($nama_sort)) {
            $this->db2->order_by($nama_sort, $sort);
        }
        if (!is_null($sort1)) {
            $this->db2->order_by($sort1);
        }
        if (!is_null($limit)) {
            $this->db2->limit($limit);
        }
        if (!is_null($group)) {
            $this->db2->group_by($group);
        }
        return $this->db2->get()->result();
    }

    public function get_query_grid($query) {
        return $this->db2->query($query)->result();
    }

    public function get_query($query, $status = null) {
        if (!is_null($status)) {
            $qry = $this->db2->query($query);
            $retval = $qry->row();
            return $retval;
        } else {
            $qry = $this->db2->query($query);
            return $qry;
        }
    }

    public function get_select($select, $from, $where) {
        $this->db2->select($select);
        $this->db2->from($from);
        $this->db2->where($where);
        $query = $this->db2->get();
        return $query;
    }

    public function get_table($table, $where = null) {
        if (!is_null($where)) {
            $count = $this->db2->select('*')->from($table)->where($where)->count_all_results();
            if ($count == 0) {
                return '0';
            } else {
                return $this->db2->from($table)->where($where)->get()->row();
            }
        } else {
            $count = $this->db2->select('*')->from($table)->count_all_results();
            if ($count == 0) {
                return '0';
            } else {
                return $this->db2->from($table)->get()->row();
            }
        }
    }

    public function count_table($table, $where = null, $where_in = null, $where_in_data = null) {
        if ($where != null) {
            if (!is_null($where_in)) {
                if (!is_null($where_in_data)) {
                    return $this->db2->select('*')->from($table)->where($where)->where_in($where_in, $where_in_data)->count_all_results();
                }
            } else {
                return $this->db2->select('*')->from($table)->where($where)->count_all_results();
            }
        } else {
            return $this->db2->select('*')->from($table)->count_all_results();
        }
    }

    public function update_lastlog($where) {
        $this->db2->set('user_last_login', "CURRENT_TIMESTAMP", false);
        $this->db2->where($where);
        $this->db2->update('sys_user');
    }

    public function get_detail($table, $kolom, $id) {
        return $this->db2->where(array($kolom => $id))->from($table)->get()->row();
    }

    public function insert($table, $data) {
        return $this->db2->insert($table, $data);
    }

    public function insert_id() {
        return $this->db2->insert_id();
    }

    public function delete($table, $data) {
        return $this->db2->delete($table, $data);
    }

    public function update($table, $data, $where) {
        return $this->db2->update($table, $data, $where);
    }

    public function get_detail2($table, $kolom1, $id1, $kolom2, $id2) {
        return $this->db2->where(array($kolom1 => $id1, $kolom2 => $id2))->from($table)->get()->row();
    }

    public function lookup_table($table, $col, $keyword, $filter = null) {
        if (is_null($filter)) {
            return $this->db2->select('*')->from($table)->where("upper(" . $col . ") LIKE upper('%" . $keyword . "%')", NULL, FALSE)->get();
        } else {
            return $this->db2->select('*')->from($table)->where("upper(" . $col . ") LIKE upper('%" . $keyword . "%')", NULL, FALSE)->where($filter)->get();
            echo $this->db2->last_query();
        }
    }

    public function get_row_table($tabel, $select, $id, $page = 0, $limit = 0, $search = null) {
        if (!is_null($search)) {
            $this->db2->where($search);
        }
        $this->db2->select($id . "," . $select);
        if ($limit != 0)
            $this->db2->limit($limit * $page, ($page - 1) * $limit);
        $data = $this->db2->get($tabel);

        $output = array();
        $output['status'] = 'gak ok';
        $jumlah = $data->num_rows();
        if ($jumlah > 0) {
            $output['status'] = 'ok';
            $items = array();

            foreach ($data->result() as $row) {
                $rows = array();
                $rows['id'] = $row->$id;
                $cells = array();
                $cols = preg_split("/[\s]*[,][\s]*/", $select);
//                $cols = explode($delimiter, $string)
                foreach ($cols as $cell) {
                    $cells[] = $row->$cell;
                }
                $rows['cells'] = $cells;
                $items[] = $rows;
            }

            $output['items'] = $items;
        } else {
            $output['jumlah'] = $jumlah;
        }

        if (!is_null($search)) {
            $this->db2->where($search);
        }
//        $numrow=$this->db2->count_all_results($tabel);
//        
//        $max = $numrow 

        return json_encode($output);
    }

    function get_bulan_server() {
        $sql = "Select date_format(curdate(), '%m') as bulan";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->bulan;
        return $retval;
    }

    function last_id($table) {
        $sql = "SELECT AUTO_INCREMENT as akhir FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'hris_db' AND TABLE_NAME = '$table'";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->akhir;
        return $retval;
    }

    function get_tahun_server() {
        $sql = "Select date_format(curdate(), '%Y') as tahun";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->tahun;
        return $retval;
    }

    function get_tanggal_server() {
        $sql = "SELECT to_char(localtimestamp,'YYYYmmdd') as hasil ";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function get_tanggaljam_server() {
        $sql = "SELECT localtimestamp as hasil ";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function get_tanggaljam_server1() {
        $sql = "select to_char(localtimestamp,'YYYY-MM-DD HH24:MI:ss') as hasil ";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function get_bulantahun() {
        $sql = "SELECT to_char(localtimestamp,'YYmm') as hasil ";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function get_id($id, $tabel) {
        $sql = "SELECT $id as id_akhir from $tabel order by $id DESC LIMIT 1";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->id_akhir;
        return $retval;
    }

    function get_tanggal_server_1() {
        $sql = "SELECT to_char(localtimestamp,'YYYY-Mon-dd') as hasil ";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function get_no_surat($id, $tabel) {
        $sql = "SELECT $id as id_akhir from $tabel order by $id DESC LIMIT 1";
        $qry = $this->db2->query($sql);
        $retval = $qry->row()->id_akhir;
        return $retval;
    }

    function rumus_hasil($rumus, $param) {
        $sql = "SELECT to_char(($rumus),'99.99') as hasil";
        $qry = $this->db2->query($sql, $param);
        $this->get_log();
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function cari_akhir($table, $field, $sort, $where) {
//        $sql = "select $field from $table order by $sort DESC limit 1";
        if (!is_null($where)) {
            return $this->db2->select($field)->from($table)->where($where)->order_by($sort, 'DESC')->limit('1')->get()->row()->$field;
        } else {
            return $this->db2->select($field)->from($table)->order_by($sort, 'ASC')->limit('1')->get()->row()->$field;
        }
    }

    function get_sum($table, $field, $where) {
//        $sql = "select $field from $table order by $sort DESC limit 1";
        if (!is_null($where)) {
            return $this->db2->select_sum($field)->from($table)->where($where)->get()->row()->$field;
        } else {
            return $this->db2->select($field)->from($table)->order_by($sort, 'ASC')->limit('1')->get()->row()->$field;
        }
    }

    function cari_seq($seq, $status = null) {
        if (!is_null($status)) {
            $sql1 = "SELECT last_value FROM $seq";
            $qry = $this->db2->query($sql1);
            $retval = $qry->row()->last_value;
        } else {
            $sql1 = "SELECT last_value FROM $seq";
            $qry = $this->db2->query($sql1);
            $retval = $qry->row()->last_value + 1;
            $sql2 = "SELECT setval('$seq', $retval, true)";
            $this->db2->query($sql2);
        }
        return $retval;
    }

    function cari_idrekanan($grouprekanan) {
        $sql = "select id_rekanan from ms_rekanan where id_grouprekanan = '$grouprekanan' and status = 2 order by id_rekanan DESC limit 1";
        $sql1 = "select count(*) as total from ms_rekanan where id_grouprekanan = '$grouprekanan' and status = 2";
        $qry = $this->db2->query($sql);
        $qry1 = $this->db2->query($sql1);
        if ($qry1->row()->total < 1) {
            $retval = 0;
        } else {
            $retval = $qry->row()->id_rekanan;
        }
        return $retval;
    }

    function cari_grouprekanan($typerekanan) {
        $sql = "select id_grouprekanan from ms_rekanan where type_rekanan = '$typerekanan' and status = 1 order by id_grouprekanan DESC limit 1";
        $sql1 = "select count(*) as total from ms_rekanan where type_rekanan = '$typerekanan' and status = 1";
        $qry = $this->db2->query($sql);
        $qry1 = $this->db2->query($sql1);
        if ($qry1->row()->total == 0) {
            $retval = 0;
        } else {
            $retval = $qry->row()->id_grouprekanan;
        }
        return $retval;
    }

    function last_value($seq) {
        $sql1 = "SELECT last_value FROM $seq";
        $qry = $this->db2->query($sql1);

        $retval = $qry->row()->last_value;
        return $retval;
    }

    function get_acl($kode) {
        return $this->db2->select('*')->from('v_acl')->where(array('access_kode' => $kode, 'id_karyawan' => $this->user->id))->count_all_results();
    }

    function get_log() {
        log_message('error', $this->db2->last_query());
    }

    function get_log_det($log) {
        log_message('error', $log);
    }

    function get_trans_start() {
        $this->db2->trans_start();
    }

    function get_trans_complete() {
        $this->db2->trans_complete();
    }

    function get_trans_status() {
        return $this->db2->trans_status();
    }

    function get_insert_id() {
        return $this->db2->insert_id();
    }

    function hitungumur($tgllhr, $tglperiksa) {
        $hitunghari['awal'] = $tgllhr;
        $hitunghari['akhir'] = $tglperiksa;
        $lahir = $hitunghari['awal'];
        $selisih = strtotime($hitunghari['akhir']) - strtotime($lahir);
        $tahun = $selisih / 31536000;
        $bulan = ($selisih % 31536000) / 2592000;
        foreach ($hitunghari as $key => $val) {
            $hitunghari[$key] = strtotime($val);
        }
        $hitunghari['selisih'] = $hitunghari['akhir'] - $hitunghari['awal'];
        $hari = $hitunghari['selisih'] / 86400;
        return $hari;
    }

    function hitungumur_lengkap($tgl_lahir, $tglperiksa, $status = null) {
        $thn = substr($tgl_lahir, 0, 4);
        $bln = substr($tgl_lahir, 5, 2);
        $tgl = substr($tgl_lahir, 8, 2);

        $utahun = substr($tglperiksa, 0, 4) - $thn;
        $ubulan = substr($tglperiksa, 5, 2) - $bln;
        $uhari = substr($tglperiksa, 8, 2) - $tgl;

        if ($uhari < 0) {
            $uhari = date("t", mktime(0, 0, 0, $bln - 1, $ubulan, $utahun)) - abs($uhari);
            $ubulan = $ubulan - 1;
        }
        if ($ubulan < 0) {
            $ubulan = 12 - abs($ubulan);
            $utahun = $utahun - 1;
        }
        //status
        // Y = Tahun
        // YM = Bulan Tahun
        if ($status == null) {
            $usia = $utahun . ' Tahun ' . $ubulan . ' Bulan ' . $uhari . ' Hari';
        } else if ($status == 'YM') {
            $usia = $utahun . ' Tahun ' . $ubulan . ' Bulan ';
        } else if ($status == 'Y') {
            $usia = $utahun . ' Tahun';
        } else {
            $usia = $utahun . ' Tahun' . $ubulan . ' Bulan ' . $uhari . ' Hari';
        }

        return $usia;
    }

    function cari_nilai_normal($kodepx, $umur, $data) {
        $insert = array();
        $where['no_lab'] = $data['no_lab'];
        $where['kode_hasil'] = $kodepx;
        $update['th_tglsample'] = $data['tgl_sample'];
        $jenis_kelamin = $data['jk'];
//        $data_px = $this->get_table_grid('ms_lab_hasil_detail', array('ms_id_hasil' => $kodepx, 'status' => 1), 'jenis_kelamin', array($data['jk'], ''),null,array('urutan_nilairujukan'), 'ASC');
        $data_px = $this->get_query_grid("select * from ms_lab_hasil_detail 
                    where ms_id_hasil = $kodepx and status = 1 and jenis_kelamin in ('$jenis_kelamin','')
                    order by urutan_nilairujukan ASC");
        $this->get_log();
        foreach ($data_px as $row) {
            // Rubah Jadi Hari Semua
            if (strtolower($row->usia_satuan) == 'hari') {
                $usia = $umur;
                $awal = $row->usia_val_awal;
                $akhir = $row->usia_val_akhir;
            } else if (strtolower($row->usia_satuan) == 'minggu') {
                $usia = $umur / 7;
                $awal = $row->usia_val_awal;
                $akhir = $row->usia_val_akhir;
            } else if (strtolower($row->usia_satuan) == 'bulan') {
                $usia = ($umur / 365) * 12;
                $awal = $row->usia_val_awal;
                $akhir = $row->usia_val_akhir;
            } else if (strtolower($row->usia_satuan) == 'tahun') {
                $usia = $umur / 365;
                $awal = $row->usia_val_awal;
                $akhir = $row->usia_val_akhir;
            } else {
                $usia = 0;
                $awal = $row->usia_val_awal;
                $akhir = $row->usia_val_akhir;
            }
//            $this->get_log_det($usia);
//            $this->get_log_det($awal);
//            $this->get_log_det($akhir);
            // Sama Dengan
            if ($row->usia_opr_awal == '=') {
                if ($row->usia_opr_akhir == '') {
                    if ($usia == $awal) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];

                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah1';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>') {
                    if ($usia == $awal && $usia > $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah2';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>=') {
                    if ($usia == $awal && $usia >= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah3';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<') {
                    if ($usia == $awal && $usia < $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah4';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<=' || $row->usia_opr_akhir == '=<') {
                    if ($usia == $awal && $usia <= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah5';
                        $id = $row->id;
                    }
                }
                // Lebih Besar
            } else if ($row->usia_opr_awal == '>') {
                if ($row->usia_opr_akhir == '') {
                    if ($usia > $awal) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah6';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>') {
                    if ($usia > $awal && $usia > $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah7';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>=' || $row->usia_opr_akhir == '=>') {
                    if ($usia > $awal && $usia >= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah8';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<') {
                    if ($usia > $awal && $usia < $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah9';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<=' || $row->usia_opr_akhir == '=<') {
                    if ($usia > $awal && $usia <= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah10';
                        $id = $row->id;
                    }
                }
                // Lebih Besar Sama Dengan
            } else if ($row->usia_opr_awal == '>=' || $row->usia_opr_akhir == '=>') {
                if ($row->usia_opr_akhir == '') {
                    if ($usia >= $awal) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah11';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>') {
                    if ($usia >= $awal && $usia > $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah12';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>=' || $row->usia_opr_akhir == '=>') {
                    if ($usia >= $awal && $usia >= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah13';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<') {
                    if ($usia >= $awal && $usia < $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah14';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<=' || $row->usia_opr_akhir == '=<') {
                    if ($usia >= $awal && $usia <= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah15';
                        $id = $row->id;
                    }
                }
                // Kurang dari
            } else if ($row->usia_opr_awal == '<') {
                if ($row->usia_opr_akhir == '') {
                    if ($usia < $awal) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah16';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>') {
                    if ($usia < $awal && $usia > $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah17';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>=' || $row->usia_opr_akhir == '=>') {
                    if ($usia < $awal && $usia >= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah18';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<') {
                    if ($usia < $awal && $usia < $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah19';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<=' || $row->usia_opr_akhir == '=<') {
                    if ($usia < $awal && $usia <= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah20';
                        $id = $row->id;
                    }
                }
                // Kurang Dari Sama Dengan
            } else if ($row->usia_opr_awal == '<=' || $row->usia_opr_akhir == '=<') {
                if ($row->usia_opr_akhir == '') {
                    if ($usia <= $awal) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah21';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>') {
                    if ($usia <= $awal && $usia > $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah22';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>=' || $row->usia_opr_akhir == '=>') {
                    if ($usia <= $awal && $usia >= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah23';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<') {
                    if ($usia <= $awal && $usia < $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah24';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<=' || $row->usia_opr_akhir == '=<') {
                    if ($usia <= $awal && $usia <= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah25';
                        $id = $row->id;
                    }
                }
                // Selain..............................
            } else {
                if ($row->usia_opr_akhir == '') {
                    if ($usia <= $awal) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah21';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>') {
                    if ($usia <= $awal && $usia > $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah22';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '>=' || $row->usia_opr_akhir == '=>') {
                    if ($usia <= $awal && $usia >= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah23';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<') {
                    if ($usia <= $awal && $usia < $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah24';
                        $id = $row->id;
                    }
                } else if ($row->usia_opr_akhir == '<=' || $row->usia_opr_akhir == '=<') {
                    if ($usia <= $awal && $usia <= $akhir) {
                        $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        if ($count_rowcek = '') {
                            
                        } else {
                            $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                            $cek_status = $rowcek->status_postingnilairujukan;
                            if ($cek_status == 1) {
                                $insert['no_lab'] = $data['no_lab'];
                                $insert['kode_hasil'] = $kodepx;
                                $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                                $insert['th_jk'] = $data['jk'];
                                $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                                $insert['th_tgllahir'] = $data['pas_tgllahir'];
                                $insert['th_tglsample'] = $data['tgl_sample'];
                                $insert['pas_id'] = $data['pas_id'];
                                $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                                $insert['th_si_opr_awal'] = $row->si_opr_awal;
                                $insert['th_si_val_awal'] = $row->si_val_awal;
                                $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $insert['th_si_opr_awal'] = $row->si_val_akhir;
                                $insert['th_sinilairujukan'] = $row->tampil_si;
                                $insert['th_konversi'] = $row->konversi;
                                $insert['th_nilairujukan_satuan'] = $row->satuan;
                                $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $insert['status_postingnilairujukan'] = 1;
                                $insert['th_urutanhasil'] = $row->id;
                                $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $insert['th_group'] = $data['th_group'];
                                $insert['th_type'] = $data['th_type'];
                                $insert['status_normal'] = $row->status_normal;
                                $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $insert['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->insert('trx_hasil', $insert);
                            } else {
                                $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                                $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                                $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                                $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                                $update['th_nilairujukan'] = $row->tampil_kualitatif;
                                $update['th_si_opr_awal'] = $row->si_opr_awal;
                                $update['th_si_val_awal'] = $row->si_val_awal;
                                $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                                $update['th_si_opr_awal'] = $row->si_val_akhir;
                                $update['th_sinilairujukan'] = $row->tampil_si;
                                $update['th_konversi'] = $row->konversi;
                                $update['th_nilairujukan_satuan'] = $row->satuan;
                                $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                                $update['status_postingnilairujukan'] = 1;
                                $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                                $update['th_group'] = $data['th_group'];
                                $update['th_type'] = $data['th_type'];
                                $update['status_normal'] = $row->status_normal;
                                $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                                $update['urutan_hasil'] = $data['urutan_hasil'];
                                $this->db2->update('trx_hasil', $update, $where);
                            }
                        }
                    } else {
                        $val = 'salah25';
                        $id = $row->id;
                    }
                } else {
                    $count_rowcek = $this->count_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                    if ($count_rowcek = '') {
                        
                    } else {
                        $rowcek = $this->get_table('trx_hasil', array('no_lab' => $data['no_lab'], 'kode_hasil' => $kodepx));
                        $cek_status = $rowcek->status_postingnilairujukan;
                        if ($cek_status == 1) {
                            $insert['no_lab'] = $data['no_lab'];
                            $insert['kode_hasil'] = $kodepx;
                            $insert['th_namapemeriksaan'] = $data['nama_hasil'];
                            $insert['th_jk'] = $data['jk'];
                            $insert['th_tglperiksa'] = $data['pas_tglperiksa'];
                            $insert['th_tgllahir'] = $data['pas_tgllahir'];
                            $insert['th_tglsample'] = $data['tgl_sample'];
                            $insert['pas_id'] = $data['pas_id'];
                            $insert['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                            $insert['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                            $insert['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                            $insert['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                            $insert['th_nilairujukan'] = $row->tampil_kualitatif;
                            $insert['th_si_opr_awal'] = $row->si_opr_awal;
                            $insert['th_si_val_awal'] = $row->si_val_awal;
                            $insert['th_si_opr_akhir'] = $row->si_opr_akhir;
                            $insert['th_si_opr_awal'] = $row->si_val_akhir;
                            $insert['th_sinilairujukan'] = $row->tampil_si;
                            $insert['th_konversi'] = $row->konversi;
                            $insert['th_nilairujukan_satuan'] = $row->satuan;
                            $insert['th_sinilairujukan_satuan'] = $row->satuan_si;
                            $insert['status_postingnilairujukan'] = 1;
                            $insert['th_urutanhasil'] = $row->id;
                            $insert['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                            $insert['th_group'] = $data['th_group'];
                            $insert['th_type'] = $data['th_type'];
                            $insert['status_normal'] = $row->status_normal;
                            $insert['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                            $insert['urutan_hasil'] = $data['urutan_hasil'];
                            $this->db2->insert('trx_hasil', $insert);
                        } else {
                            $update['th_kuantitatif_opr_awal'] = $row->kuantitatif_opr_awal;
                            $update['th_kuantitatif_val_awal'] = $row->kuantitatif_val_awal;
                            $update['th_kuantitatif_opr_akhir'] = $row->kuantitatif_opr_akhir;
                            $update['th_kuantitatif_val_akhir'] = $row->kuantitatif_val_akhir;
                            $update['th_nilairujukan'] = $row->tampil_kualitatif;
                            $update['th_si_opr_awal'] = $row->si_opr_awal;
                            $update['th_si_val_awal'] = $row->si_val_awal;
                            $update['th_si_opr_akhir'] = $row->si_opr_akhir;
                            $update['th_si_opr_awal'] = $row->si_val_akhir;
                            $update['th_sinilairujukan'] = $row->tampil_si;
                            $update['th_konversi'] = $row->konversi;
                            $update['th_nilairujukan_satuan'] = $row->satuan;
                            $update['th_sinilairujukan_satuan'] = $row->satuan_si;
                            $update['status_postingnilairujukan'] = 1;
                            $update['kode_pemeriksaan'] = $data['kode_pemeriksaan'];
                            $update['th_group'] = $data['th_group'];
                            $update['th_type'] = $data['th_type'];
                            $update['status_normal'] = $row->status_normal;
                            $update['urutan_nilairujukan'] = $row->urutan_nilairujukan;
                            $update['urutan_hasil'] = $data['urutan_hasil'];
                            $this->db2->update('trx_hasil', $update, $where);
                        }
                    }
                }
                //
            }
            //---------------------
        }
//        $this->db2->update('trx_hasil', $update, $where);
//        $this->get_log();
        return "Berhasil";
    }

    public function db_close() {
        return $this->db2->close();
    }

    public function db() {
        return $this->db2;
    }

    public function changenull($string) {
        if ($string == '') {
            $value = 0;
        } else if ($string == null) {
            $value = 0;
        } else {
            $value = $string;
        }
        return $value;
    }

    public function get_sample($no_lab = null, $id = null, $result = null) {
        $count_sample = $this->count_table('trx_sample', array('id_tabung' => $id, 'no_lab' => $no_lab));
        if ($count_sample == null) {
            $sample = '0';
        } else {
            $sample = $this->get_table('trx_sample', array('id_tabung' => $id, 'no_lab' => $no_lab))->$result;
        }
        return $sample;
    }

    public function insert_array($arr) {
        if (count($arr) > 1) {
            $value = implode(',', $arr);
        } else {
            $value = $arr . ',';
        }
        return $value;
    }

    public function get_statussample($no_lab = null, $id = null) {
        $count_sample = $this->count_table('trx_sample', array('id_tabung' => $id, 'no_lab' => $no_lab));
        if ($count_sample == null) {
            $sample = '0';
        } else {
            $jmlsample = $count_sample;
            $cek_status0 = $this->count_table('trx_sample', array('id_tabung' => $id, 'no_lab' => $no_lab, 'status' => 0));
            $cek_status1 = $this->count_table('trx_sample', array('id_tabung' => $id, 'no_lab' => $no_lab, 'status' => 1));
            $cek_status2 = $this->count_table('trx_sample', array('id_tabung' => $id, 'no_lab' => $no_lab, 'status' => 2));
            $cek_status3 = $this->count_table('trx_sample', array('id_tabung' => $id, 'no_lab' => $no_lab, 'status' => 3));
            $cek_status4 = $this->count_table('trx_sample', array('id_tabung' => $id, 'no_lab' => $no_lab, 'status' => 4));
            if ($cek_status0 == $jmlsample) {
                $sample = '0';
            } else if ($cek_status1 == $jmlsample) {
                $sample = '1';
            } else if ($cek_status2 == $jmlsample) {
                $sample = '2';
            } else if ($cek_status3 == $jmlsample) {
                $sample = '3';
            } else if ($cek_status4 == $jmlsample) {
                $sample = '4';
            } else {
                $sample = '10';
            }
        }
        return $sample;
    }

    public function error() {
        $message = '<b>Message</b>  : ' . $this->db2->_error_message() . '<br  />';
        $message .= '<b>Error No.</b> : ' . $this->db2->_error_number() . '<br  />';
        $message .= '<b>Query</b> :<br />' . $this->db2->last_query();
        return $message;
    }

    public function cetak_nota($nolab) {
        $trx_pasien = $this->get_table('trx_pasien', array('nolab' => $nolab));
        if ($trx_pasien->umur == 0) {
            $umur = $this->hitungumur_lengkap($trx_pasien->pas_tgllahir, $trx_pasien->tgl_periksa);
        } else {
            $umur = $trx_pasien->umur . " Tahun";
        }
        $data['nonota'] = "No : N-" . $trx_pasien->nolab;
        $data['nolab'] = $trx_pasien->nolab . ' / ' . $trx_pasien->pas_id;
        $data['nama'] = $trx_pasien->pas_status . ' ' . strtoupper($trx_pasien->pas_nama) . ' / ' . $umur;
        $data['tlp'] = $trx_pasien->pas_telp . ' / ' . $trx_pasien->pas_hp;
        $data['tgl'] = $this->tanggal_indo($trx_pasien->tgl_periksa);
        if ($trx_pasien->pengirim == 1) {
            $rekanan = 'PASIEN UMUM';
            $pengirim = 'PERMINTAAN SENDIRI';
        } else if ($trx_pasien->pengirim == 2) {
            $rekanan = '-';
            $dokter = $this->get_table('ms_dokter', array('kode_dokter' => $trx_pasien->kode_pengirim));
            $pengirim = $dokter->gelar_depan . ' ' . strtoupper($dokter->nama_dokter) . ' ' . $dokter->gelar_belakang . '[' . $trx_pasien->kode_pengirim . ']';
        } else if ($trx_pasien->pengirim > 2) {
            $pengirim = strtoupper($this->get_table('ms_rekanan', array('kode_rekanan' => $trx_pasien->kode_pengirim))->nama_rekanan) . '[' . $trx_pasien->kode_pengirim . ']';
            $rekanan = '-';
        }
        $data['pengirim'] = $pengirim;
        $data['dpcetak'] = $this->get_table('setting', array('id' => 15))->value_setting;
//        $data['dpcetak'] = 'P.' . $this->get_table('setting', array('id' => 1))->value_setting . '-' . $this->get_table('setting', array('id' => 15))->value_setting;
        $data['rekanan'] = $rekanan;
        $data['alamat'] = $trx_pasien->pas_alamat . ' ' . $trx_pasien->pas_kota;
        $datapemeriksaan = $this->get_table_grid('trx_pemeriksaan', array('no_lab' => $nolab, 'status_aktif' => 1));
        $pemeriksaan = '<table style="
            font-family: Trebuchet MS;	
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
                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->tp_hargabruto), 0, ',', ',') . " &nbsp;</td>
              </tr>";
            } else {
                $pemeriksaan1 .= "<tr> <td style='text-align: center; border: 1px;border-style: none none solid none;'>" . $nomor . "</td>
                    <td style='border: 1px;border-style: none none solid none;'> &nbsp;" . $row->tp_namapemeriksaan . "</td>
                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->tp_hargabruto), 0, ',', ',') . " &nbsp;</td>
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
            $harga_bruto = "<th style='font-weight: normal;' colspan='3'>Harga Pemeriksaan</th>
                        <th colspan='2' style='text-align: right'>" . number_format(floor($trx_pasien->rp_bruto), 0, ',', ',') . "</th>";

            $discount = "<th colspan='3' style='font-weight: normal;'>Discount</th>
                                            <th colspan='2' style='text-align: right'>" . number_format(floor($trx_pasien->rp_discount), 0, ',', ',') . "</th>";
        }

        $data['harga_bruto'] = $harga_bruto;
        $data['harga_netto'] = number_format(floor($trx_pasien->rp_netto), 0, ',', ',');
        $data['discount'] = $discount;
        $data['tanggal'] = $this->tanggal_indo($this->get_tanggaljam_server(), 1);
        $data['kota'] = $this->query->get_table('ms_cabang', array('id' => intval($this->get_table('setting', array('id' => 1))->value_setting)))->msc_kota;
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
        } else if ($trx_pasien->statushasil_kirimkantor != '0') {
            $data['status_hasil'] = 'DIANTAR KE KANTOR : ' . $trx_pasien->statushasil_kirimkantor;
        } else if ($trx_pasien->statushasil_kirimdokter != '0') {
            $data['status_hasil'] = 'DIANTAR KE DOKTER : ' . $trx_pasien->statushasil_kirimdokter;
        } else if ($trx_pasien->statushasil_kirimrumah != '' || $trx_pasien->statushasil_kirimrumah != '0') {
            $data['status_hasil'] = 'DIANTAR KE RUMAH : ' . $trx_pasien->statushasil_kirimrumah;
        }

        $this->load->view('cetak_nota', $data);
//        $this->load->view('pendaftaran_nota', $data);
    }

    public function cetak_kartu_kontrol($nolab) {
        $trx_pasien = $this->get_table('trx_pasien', array('nolab' => $nolab));
        if ($trx_pasien->umur == 0) {
            $umur = $this->hitungumur_lengkap($trx_pasien->pas_tgllahir, $trx_pasien->tgl_periksa);
        } else {
            $umur = $trx_pasien->umur . "Tahun";
        }
        $data['nolab'] = $trx_pasien->nolab . ' / ' . $trx_pasien->pas_id;
        $data['nama'] = $trx_pasien->pas_status . ' ' . strtoupper($trx_pasien->pas_nama) . ' / ' . $umur;
        $data['tlp'] = $trx_pasien->pas_telp . ' / ' . $trx_pasien->pas_hp;
        $data['tgl'] = $this->tanggal_indo($trx_pasien->tgl_periksa);
        if ($trx_pasien->pengirim == 1) {
            $rekanan = 'PASIEN UMUM';
            $pengirim = 'PERMINTAAN SENDIRI';
        } else if ($trx_pasien->pengirim == 2) {
            $rekanan = '-';
            $dokter = $this->get_table('ms_dokter', array('kode_dokter' => $trx_pasien->kode_pengirim));
            $pengirim = $dokter->gelar_depan . ' ' . strtoupper($dokter->nama_dokter) . ' ' . $dokter->gelar_belakang . '[' . $trx_pasien->kode_pengirim . ']';
        } else if ($trx_pasien->pengirim > 2) {
            $pengirim = strtoupper($this->get_table('ms_rekanan', array('kode_rekanan' => $trx_pasien->kode_pengirim))->nama_rekanan) . '[' . $trx_pasien->kode_pengirim . ']';
            $rekanan = '-';
        }
        $data['pengirim'] = $pengirim;
        $data['dpcetak'] = $this->get_table('setting', array('id' => 16))->value_setting;
//        $data['dpcetak'] = 'P.' . $this->get_table('setting', array('id' => 1))->value_setting . '-' . $this->get_table('setting', array('id' => 16))->value_setting;
        $data['rekanan'] = $rekanan;
        $data['alamat'] = $trx_pasien->pas_alamat . ' ' . $trx_pasien->pas_kota;
        $datapemeriksaan = $this->get_table_grid('trx_pemeriksaan', array('no_lab' => $nolab));
        $pemeriksaan = '<table style="
            font-family: Trebuchet MS;
	font-size:21px;
	color:#333333;
	border-width: 1px;
	border-color: #666666;
        width: 500px;
	border-collapse: collapse;" border="0">
                    <tr style="line-height: 2">
                    <th style="text-align: center; background-color: #DAD8D8; border: 1px; solid; border-style: solid solid solid solid;"; width="10px">NO</th>
                    <th style="background-color: #DAD8D8;border: 1px solid; border-style: solid solid solid solid;"; width="150px"; >&nbsp;<b>SAMPEL / PX</b></th>
                    <th style="background-color: #DAD8D8; border: 1px solid;border-style: solid solid solid solid;"; width="200px; ">&nbsp;TTD & Nama Terang</th>
                    </tr>';
        $no = 1;
        $pemeriksaan1 = '';
        $pemeriksaan2 = '';
//        foreach ($datapemeriksaan as $row) {
//            $nomor = $no++;
//            if ($nomor > 17) {
//                $pemeriksaan2 .= "<tr> <td style='text-align: center; border: 1px;border-style: none none solid none;'>" . $nomor . "</td>
//                    <td style='border: 1px;border-style: none none solid none;'> &nbsp;" . $row->tp_namapemeriksaan . "</td>
//                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->tp_harganett), 0, ',', ',') . " &nbsp;</td>
//              </tr>";
//            } else {
//                
//                $pemeriksaan1 .= "<tr> <td style='text-align: center; border: 1px;border-style: none none solid none;'>" . $nomor . "</td>
//                    <td style='border: 1px;border-style: none none solid none;'> &nbsp;" . $row->tp_namapemeriksaan . "</td>
//                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->tp_harganett), 0, ',', ',') . " &nbsp;</td>
//              </tr>";
//            }
//        }
//        if ($nomor > 17) {
        $urutan = 1;
        // Pemeriksaan Darah
        $cek_darah = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'th_type' => '1', 'status_aktif' => 1), 'th_group', array('01', '02', '03'));
        if ($cek_darah > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
            <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                    <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px '> &nbsp;Darah</td>
                    <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
              </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
            <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                    <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Darah</td>
                    <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
              </tr>";
            }
        }

        // Pemeriksaan Urine
        $cek_urine = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'status_aktif' => 1, 'th_type' => '1', 'th_group' => '07'));
        if ($cek_urine > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                    <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Urine</td>
                    <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                    <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Urine</td>
                    <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                </tr>";
            }
        }
        // Pemeriksaan Xray
        $setxray = $this->get_table('setting', array('id' => 2))->value_setting;
        $cek_xray = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'th_type' => $setxray, 'status_aktif' => 1));
        if ($cek_xray > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;XRAY</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;XRAY</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            }
        }
        // Pemeriksaan Vaksin
        $setvaksin = '14';
        $cek_vaksin = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'th_group' => $setvaksin, 'status_aktif' => 1));
        if ($cek_vaksin > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;VAKSIN</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;VAKSIN</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            }
        }
        // Pemeriksaan USG
        $setusg = $this->get_table('setting', array('id' => 3))->value_setting;
        $cek_usg = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'th_type' => $setusg, 'status_aktif' => 1));
        if ($cek_usg > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;USG</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;USG</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            }
        }
        // Pemeriksaan ECG
        $setecg = $this->get_table('setting', array('id' => 5))->value_setting;
        $cek_ecg = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'kode_hasil' => $setecg, 'status_aktif' => 1));
        if ($cek_ecg > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;ECG</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;ECG</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }

        // Pemeriksaan EEG
        $seteeg = $this->get_table('setting', array('id' => 26))->value_setting;
        $cek_eeg = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'th_type' => $seteeg, 'status_aktif' => 1));
        if ($cek_eeg > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan1 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;EEG</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                      </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;EEG</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                      </tr>";
            }
        }
        // Pemeriksaan Treadmill
        $settreadmill = $this->get_table('setting', array('id' => 4))->value_setting;
        $cek_treadmill = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'kode_hasil' => $settreadmill, 'status_aktif' => 1));
        if ($cek_treadmill > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Treadmill</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Treadmill</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }
        // Pemeriksaan Audiometri
        $setaudiometri = $this->get_table('setting', array('id' => 8))->value_setting;
        $cek_audiometri = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'kode_hasil' => $setaudiometri, 'status_aktif' => 1));
        if ($cek_audiometri > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Audiometri</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Audiometri</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }
        // Pemeriksaan Spirometri
        $setspirometri = $this->get_table('setting', array('id' => 9))->value_setting;
        $cek_spirometri = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'kode_hasil' => $setspirometri, 'status_aktif' => 1));
        if ($cek_spirometri > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Spirometri</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Spirometri</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }
        // Pemeriksaan Feaces
        $kode_feaces = array('104015', '108001', '108007', '108010');
//        $setspirometri = $this->get_table('setting', array('id' => 9))->value_setting;
        $cek_feaces = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'status_aktif' => 1), 'kode_hasil', $kode_feaces);
        if ($cek_feaces > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Feaces</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Faeces</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }
        // Pemeriksaan Fisik
        $setfisik1 = $this->get_table('setting', array('id' => 6))->value_setting;
        $setfisik2 = $this->get_table('setting', array('id' => 12))->value_setting;
        $cek_fisik = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'status_aktif' => 1), 'kode_hasil', array("$setfisik1", "$setfisik2"));
        if ($cek_fisik > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;FISIK</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;FISIK</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }

        // 2 Jam PP
        $set2jpp = $this->get_table('setting', array('id' => 27))->value_setting;
//        $cek_2jpp = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'status_aktif' => 1), 'kode_hasil', array("$setfisik1", "$setfisik2"));
        $cek_2jpp = $this->get_query("select count(*) as cek from trx_hasil where no_lab = '$nolab' and status_aktif = 1 and kode_hasil in ($set2jpp)", 1)->cek;
        if ($cek_2jpp > 0) {
            $table_2jpp = "<tr style='line-height: 1'>
                                            <th width='350px' colspan='3'>
                                                <table border='1'>
                                                    <tr>
                                                        <th height='30px' colspan='2'>&nbsp; 2 JAM SESUDAH MAKAN</th>
                                                    </tr>
                                                    <tr>
                                                        <th height='30px'>&nbsp; JAM</th>
                                                        <th>&nbsp; PETUGAS</th>
                                                    </tr>
                                                    <tr height='60px'>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>";
            $ket_2jpp = "<tr style='line-height: 1.1;'>
                                            <th colspan='5' style='font-size:23px;'>Penatalaksanaan Pemeriksaan Gula Darah 2 Jam Sesudah Makan (2 JPP)</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>1. Setelah Pengambilan sampel Glukosa Puasa Pasien diharuskan makan dengan porsi seperti biasa.</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>2. Sesudah makan pasien diaharuskan puasa selama 2 jam.</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>&nbsp;&nbsp;&nbsp;&nbsp;Selama Puasa Tidak Di Perkenankan :</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>&nbsp;&nbsp;&nbsp; - Melakukan Aktifitas fisik berlebihan</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>&nbsp;&nbsp;&nbsp; - Makan dan Minum, Kecuali air putih</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>&nbsp;&nbsp;&nbsp; - Merokok</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>3. Tepat 2 Jam harap menghubungi petugas untuk pengambilan sampel kembali.</th>
                                        </tr>";
        } else {
            $table_2jpp = '';
            $ket_2jpp = '';
        }
        $data['list_2jpp'] = $table_2jpp;
        $data['ket_2jpp'] = $ket_2jpp;
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
                        <th colspan='2' style='text-align: right'>" . number_format(floor($trx_pasien->rp_bruto), 0, ',', ',') . "</th>";

            $discount = "<th colspan='3'>Discount</th>
                                            <th colspan='2' style='text-align: right'>" . number_format(floor($trx_pasien->rp_discount), 0, ',', ',') . "</th>";
        }

        $data['harga_bruto'] = $harga_bruto;
        $data['harga_netto'] = number_format(floor($trx_pasien->rp_netto), 0, ',', ',');
        $data['discount'] = $discount;
        $data['tanggal'] = $this->tanggal_indo($this->get_tanggaljam_server(), 1);
        $data['kota'] = $this->query->get_table('ms_cabang', array('id' => intval($this->get_table('setting', array('id' => 1))->value_setting)))->msc_kota;
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
        } else if ($trx_pasien->statushasil_kirimkantor != '0') {
            $data['status_hasil'] = 'DIANTAR KE KANTOR : ' . $trx_pasien->statushasil_kirimkantor;
        } else if ($trx_pasien->statushasil_kirimdokter != '0') {
            $data['status_hasil'] = 'DIANTAR KE DOKTER : ' . $trx_pasien->statushasil_kirimdokter;
        } else if ($trx_pasien->statushasil_kirimrumah != '' || $trx_pasien->statushasil_kirimrumah != '0') {
            $data['status_hasil'] = 'DIANTAR KE RUMAH : ' . $trx_pasien->statushasil_kirimrumah;
        }

        $this->load->view('cetak_kartu_kontrol', $data);
//        $this->load->view('pendaftaran_nota', $data);
    }

    public function cetak_kartu_kontrol_inden($lab) {
        $pecah = explode('-', $lab);
        $nolab = $pecah[0];
        $kode_paket = $pecah[1];
        $trx_pasien = $this->get_table('trx_pasien_temp', array('nolab' => $nolab));
        if ($trx_pasien->umur == 0) {
            $umur = $this->hitungumur_lengkap($trx_pasien->pas_tgllahir, $trx_pasien->tgl_periksa);
        } else {
            $umur = $trx_pasien->umur . " Tahun";
        }
        $data['nolab'] = $trx_pasien->nolab . ' / ' . $trx_pasien->pas_id;
        $data['nama'] = $trx_pasien->pas_status . ' ' . $trx_pasien->pas_nama . ' / ' . $umur;
        $data['tlp'] = $trx_pasien->pas_telp . ' / ' . $trx_pasien->pas_hp;
        $data['tgl'] = $this->tanggal_indo($trx_pasien->tgl_periksa);
        if ($trx_pasien->pengirim == 1) {
            $rekanan = 'PASIEN UMUM';
            $pengirim = 'PERMINTAAN SENDIRI';
        } else if ($trx_pasien->pengirim == 2) {
            $rekanan = '-';
            $dokter = $this->get_table('ms_dokter', array('kode_dokter' => $trx_pasien->kode_pengirim));
            $pengirim = $dokter->gelar_depan . ' ' . $dokter->nama_dokter . ' ' . $dokter->gelar_belakang;
        } else if ($trx_pasien->pengirim > 2) {
            $pengirim = $this->get_table('ms_rekanan', array('kode_rekanan' => $trx_pasien->kode_pengirim))->nama_rekanan;
            $rekanan = '-';
        }
        $data['pengirim'] = $pengirim;
        $data['dpcetak'] = 'P.' . $this->get_table('setting', array('id' => 1))->value_setting . '-' . $this->get_table('setting', array('id' => 16))->value_setting;
        $data['rekanan'] = $rekanan;
        $data['alamat'] = $trx_pasien->pas_alamat . ' ' . $trx_pasien->pas_kota;
        $datapemeriksaan = $this->get_table_grid('trx_pemeriksaan', array('no_lab' => $nolab));
        $pemeriksaan = '<table style="
            font-family: Trebuchet MS;
	font-size:21px;
	color:#333333;
	border-width: 1px;
	border-color: #666666;
        width: 500px;
	border-collapse: collapse;" border="0">
                    <tr style="line-height: 2">
                    <th style="text-align: center; background-color: #DAD8D8; border: 1px; solid; border-style: solid solid solid solid;"; width="10px">NO</th>
                    <th style="background-color: #DAD8D8;border: 1px solid; border-style: solid solid solid solid;"; width="150px"; >&nbsp;<b>SAMPEL / PX</b></th>
                    <th style="background-color: #DAD8D8; border: 1px solid;border-style: solid solid solid solid;"; width="200px; ">&nbsp;TTD & Nama Terang</th>
                    </tr>';
        $no = 1;
        $pemeriksaan1 = '';
        $pemeriksaan2 = '';
//        foreach ($datapemeriksaan as $row) {
//            $nomor = $no++;
//            if ($nomor > 17) {
//                $pemeriksaan2 .= "<tr> <td style='text-align: center; border: 1px;border-style: none none solid none;'>" . $nomor . "</td>
//                    <td style='border: 1px;border-style: none none solid none;'> &nbsp;" . $row->tp_namapemeriksaan . "</td>
//                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->tp_harganett), 0, ',', ',') . " &nbsp;</td>
//              </tr>";
//            } else {
//                
//                $pemeriksaan1 .= "<tr> <td style='text-align: center; border: 1px;border-style: none none solid none;'>" . $nomor . "</td>
//                    <td style='border: 1px;border-style: none none solid none;'> &nbsp;" . $row->tp_namapemeriksaan . "</td>
//                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->tp_harganett), 0, ',', ',') . " &nbsp;</td>
//              </tr>";
//            }
//        }
//        if ($nomor > 17) {
        $urutan = 1;
        // Pemeriksaan Darah
//        $cek_darah = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'th_type' => '1', 'status_aktif' => 1), 'th_group', array('01', '02', '03'));
        $cek_darah = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                    inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                    where kode_paket = '$kode_paket' and ms_lab_pemeriksaan.id_type = '1' and id_group in ('01', '02', '03')", 1);
        if ($cek_darah->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
            <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                    <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px '> &nbsp;Darah</td>
                    <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
              </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
            <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                    <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Darah</td>
                    <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
              </tr>";
            }
        }

        // Pemeriksaan Urine
//        $cek_urine = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'status_aktif' => 1, 'th_type' => '1', 'th_group' => '07'));
        $cek_urine = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                    inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                    where kode_paket = '$kode_paket' and ms_lab_pemeriksaan.id_type = '1' and id_group in ('07')", 1);
        if ($cek_urine->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                    <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Urine</td>
                    <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                    <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Urine</td>
                    <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                </tr>";
            }
        }
        // Pemeriksaan Xray
        $setxray = $this->get_table('setting', array('id' => 2))->value_setting;
//        $cek_xray = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'th_type' => $setxray, 'status_aktif' => 1));
        $cek_xray = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                    inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                    where kode_paket = '$kode_paket' and ms_lab_pemeriksaan.id_type = '$setxray'", 1);
        if ($cek_xray->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;XRAY</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;XRAY</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            }
        }
        // Pemeriksaan USG
        $setusg = $this->get_table('setting', array('id' => 3))->value_setting;
//        $cek_usg = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'th_type' => $setusg, 'status_aktif' => 1));
        $cek_usg = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                    inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                    where kode_paket = '$kode_paket' and ms_lab_pemeriksaan.id_type = '$setusg'", 1);
        if ($cek_usg->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;USG</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;USG</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                    </tr>";
            }
        }
        // Pemeriksaan ECG
        $setecg = $this->get_table('setting', array('id' => 5))->value_setting;
//        $cek_ecg = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'kode_hasil' => $setecg, 'status_aktif' => 1));
        $cek_ecg = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                inner join ms_lab_gb_pemeriksaan_hasil on ms_lab_gb_pemeriksaan_hasil.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                where kode_paket = '$kode_paket' and ms_lab_gb_pemeriksaan_hasil.kode_hasil = '$setecg'", 1);
        if ($cek_ecg->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;ECG</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;ECG</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }

        // Pemeriksaan EEG
        $seteeg = $this->get_table('setting', array('id' => 3))->value_setting;
//        $cek_eeg = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'th_type' => $seteeg, 'status_aktif' => 1));
        $cek_eeg = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                    inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                    where kode_paket = '$kode_paket' and ms_lab_pemeriksaan.id_type = '$seteeg'", 1);
        if ($cek_eeg->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan1 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;EEG</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                      </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                    <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                            <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;EEG</td>
                            <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                      </tr>";
            }
        }
        // Pemeriksaan Treadmill
        $settreadmill = $this->get_table('setting', array('id' => 4))->value_setting;
//        $cek_treadmill = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'kode_hasil' => $settreadmill, 'status_aktif' => 1));
        $cek_treadmill = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                inner join ms_lab_gb_pemeriksaan_hasil on ms_lab_gb_pemeriksaan_hasil.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                where kode_paket = '$kode_paket' and ms_lab_gb_pemeriksaan_hasil.kode_hasil = '$settreadmill'", 1);
        if ($cek_treadmill->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Treadmill</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Treadmill</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }
        // Pemeriksaan Audiometri
        $setaudiometri = $this->get_table('setting', array('id' => 8))->value_setting;
//        $cek_audiometri = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'kode_hasil' => $setaudiometri, 'status_aktif' => 1));
        $cek_audiometri = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                inner join ms_lab_gb_pemeriksaan_hasil on ms_lab_gb_pemeriksaan_hasil.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                where kode_paket = '$kode_paket' and ms_lab_gb_pemeriksaan_hasil.kode_hasil = '$setaudiometri'", 1);
        if ($cek_audiometri->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Audiometri</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Audiometri</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }
        // Pemeriksaan Spirometri
        $setspirometri = $this->get_table('setting', array('id' => 9))->value_setting;
//        $cek_spirometri = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'kode_hasil' => $setspirometri, 'status_aktif' => 1));
        $cek_spirometri = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                inner join ms_lab_gb_pemeriksaan_hasil on ms_lab_gb_pemeriksaan_hasil.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                where kode_paket = '$kode_paket' and ms_lab_gb_pemeriksaan_hasil.kode_hasil = '$setspirometri'", 1);
        if ($cek_spirometri->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Spirometri</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Spirometri</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }
        // Pemeriksaan Pap Smear
        $setpapsmear = $this->get_table('setting', array('id' => 34))->value_setting;
//        $cek_spirometri = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'kode_hasil' => $setspirometri, 'status_aktif' => 1));
        $cek_papsmear = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                inner join ms_lab_gb_pemeriksaan_hasil on ms_lab_gb_pemeriksaan_hasil.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                where kode_paket = '$kode_paket' and ms_lab_gb_pemeriksaan_hasil.kode_hasil in ($setpapsmear)", 1);
        $this->get_log();
        if ($cek_papsmear->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Pap Smear</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;Pap Smear</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }
        // Pemeriksaan Fisik
        $setfisik1 = $this->get_table('setting', array('id' => 6))->value_setting;
        $setfisik2 = $this->get_table('setting', array('id' => 12))->value_setting;
//        $cek_fisik = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'status_aktif' => 1), 'kode_hasil', array("$setfisik1", "$setfisik2"));
        $cek_fisik = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                inner join ms_lab_gb_pemeriksaan_hasil on ms_lab_gb_pemeriksaan_hasil.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                where kode_paket = '$kode_paket' and ms_lab_gb_pemeriksaan_hasil.kode_hasil in  ('$setfisik1','$setfisik2')", 1);
//        $this->get_log();
        if ($cek_fisik->hasil > 0) {
            if ($urutan % 2 == 0) {
                $pemeriksaan2 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;FISIK</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            } else {
                $pemeriksaan1 .= "<tr> 
                <td height ='80px' style='text-align: center; border: 1px;border-style: solid solid solid solid;'>" . $urutan++ . "</td>
                        <td style='border: 1px;border-style: solid solid solid solid;font-size: 32px'> &nbsp;FISIK</td>
                        <td style='text-align: right; border: 1px;border-style: solid solid solid solid;'>&nbsp;</td>
                  </tr>";
            }
        }
        // 2 Jam PP
        $set2jpp = $this->get_table('setting', array('id' => 27))->value_setting;
//        $cek_2jpp = $this->count_table('trx_hasil', array('no_lab' => $nolab, 'status_aktif' => 1), 'kode_hasil', array("$setfisik1", "$setfisik2"));
        $cek_2jpp = $this->get_query("select count(*) as hasil from paket_pemeriksaan 
                inner join ms_lab_pemeriksaan on ms_lab_pemeriksaan.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                inner join ms_lab_gb_pemeriksaan_hasil on ms_lab_gb_pemeriksaan_hasil.kode_pemeriksaan = paket_pemeriksaan.kode_pemeriksaan
                where kode_paket = '$kode_paket' and ms_lab_gb_pemeriksaan_hasil.kode_hasil in ($set2jpp)", 1)->hasil;
        $this->get_log();
        if ($cek_2jpp > 0) {
            $table_2jpp = "<tr style='line-height: 1'>
                                            <th width='350px' colspan='3'>
                                                <table border='1'>
                                                    <tr>
                                                        <th height='30px' colspan='2'>&nbsp; 2 JAM SESUDAH MAKAN</th>
                                                    </tr>
                                                    <tr>
                                                        <th height='30px'>&nbsp; JAM</th>
                                                        <th>&nbsp; PETUGAS</th>
                                                    </tr>
                                                    <tr height='60px'>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>";
            $ket_2jpp = "<tr style='line-height: 1.1;'>
                                            <th colspan='5' style='font-size:23px;'>Penatalaksanaan Pemeriksaan Gula Darah 2 Jam Sesudah Makan (2 JPP)</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>1. Setelah Pengambilan sampel Glukosa Puasa Pasien diharuskan makan dengan porsi seperti biasa.</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>2. Sesudah makan pasien diaharuskan puasa selama 2 jam.</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>&nbsp;&nbsp;&nbsp;&nbsp;Selama Puasa Tidak Di Perkenankan :</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>&nbsp;&nbsp;&nbsp; - Melakukan Aktifitas fisik berlebihan</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>&nbsp;&nbsp;&nbsp; - Makan dan Minum, Kecuali air putih</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>&nbsp;&nbsp;&nbsp; - Merokok</th>
                                        </tr>
                                        <tr style='line-height: 1.1'>
                                            <th colspan='5' style='font-size:23px;'>3. Tepat 2 Jam harap menghubungi petugas untuk pengambilan sampel kembali.</th>
                                        </tr>";
        } else {
            $table_2jpp = '';
            $ket_2jpp = '';
        }
        $data['list_2jpp'] = $table_2jpp;
        $data['ket_2jpp'] = $ket_2jpp;
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
                        <th colspan='2' style='text-align: right'>" . number_format(floor($trx_pasien->rp_bruto), 0, ',', ',') . "</th>";

            $discount = "<th colspan='3'>Discount</th>
                                            <th colspan='2' style='text-align: right'>" . number_format(floor($trx_pasien->rp_discount), 0, ',', ',') . "</th>";
        }

        $data['harga_bruto'] = $harga_bruto;
        $data['harga_netto'] = number_format(floor($trx_pasien->rp_netto), 0, ',', ',');
        $data['discount'] = $discount;
        $data['tanggal'] = $this->tanggal_indo($this->get_tanggaljam_server(), 1);
        $data['kota'] = $this->query->get_table('ms_cabang', array('id' => intval($this->get_table('setting', array('id' => 1))->value_setting)))->msc_kota;
        $data['rcpt'] = $this->query->get_table('ms_karyawan', array('id' => $this->user->id))->mk_nama;
//        $data['rcpt'] = $this->query->get_table('ms_karyawan', array('id' => $trx_pasien->input))->mk_nama;
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
        } else if ($trx_pasien->statushasil_kirimkantor != '0') {
            $data['status_hasil'] = 'DIANTAR KE KANTOR : ' . $trx_pasien->statushasil_kirimkantor;
        } else if ($trx_pasien->statushasil_kirimdokter != '0') {
            $data['status_hasil'] = 'DIANTAR KE DOKTER : ' . $trx_pasien->statushasil_kirimdokter;
        } else if ($trx_pasien->statushasil_kirimrumah != '' || $trx_pasien->statushasil_kirimrumah != '0') {
            $data['status_hasil'] = 'DIANTAR KE RUMAH : ' . $trx_pasien->statushasil_kirimrumah;
        }

        $this->load->view('cetak_kartu_kontrol', $data);
//        $this->load->view('pendaftaran_nota', $data);
    }

    public function cetak_nota_inden($lab) {
        $pecah = explode('-', $lab);
        $nolab = $pecah[0];
        $kode_paket = $pecah[1];
        $trx_pasien = $this->get_table('trx_pasien_temp', array('nolab' => $nolab));
        if ($trx_pasien->umur == 0) {
            $umur = $this->hitungumur_lengkap($trx_pasien->pas_tgllahir, $this->get_tanggal_server());
        } else {
            $umur = $trx_pasien->umur . " Tahun";
        }
        $data['nonota'] = "No : N-" . $trx_pasien->nolab;
        $data['nolab'] = $trx_pasien->nolab . ' / ' . $trx_pasien->pas_id;
        $data['nama'] = $trx_pasien->pas_status . ' ' . $trx_pasien->pas_nama . ' / ' . $umur;
        $data['tlp'] = $trx_pasien->pas_telp . ' / ' . $trx_pasien->pas_hp;
        $data['tgl'] = $this->tanggal_indo($trx_pasien->tgl_periksa);
        if ($trx_pasien->pengirim == 1) {
            $rekanan = 'PASIEN UMUM';
            $pengirim = 'PERMINTAAN SENDIRI';
        } else if ($trx_pasien->pengirim == 2) {
            $rekanan = '-';
            $dokter = $this->get_table('ms_dokter', array('kode_dokter' => $trx_pasien->kode_pengirim));
            $pengirim = $dokter->gelar_depan . ' ' . $dokter->nama_dokter . ' ' . $dokter->gelar_belakang;
        } else if ($trx_pasien->pengirim > 2) {
            $pengirim = $this->get_table('ms_rekanan', array('kode_rekanan' => $trx_pasien->kode_pengirim))->nama_rekanan;
            $rekanan = '-';
        }
        $data['pengirim'] = $pengirim;
        $data['dpcetak'] = 'P.' . $this->get_table('setting', array('id' => 1))->value_setting . '-' . $this->get_table('setting', array('id' => 15))->value_setting;
        $data['rekanan'] = $rekanan;
        $data['alamat'] = $trx_pasien->pas_alamat . ' ' . $trx_pasien->pas_kota;
        $datapemeriksaan = $this->get_table_grid('paket_pemeriksaan', array('kode_paket' => $kode_paket));
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
        $harga_netto = '';
        $harga_brutto = '';
        foreach ($datapemeriksaan as $row) {
            $harga_netto += $row->rp_netto;
            $harga_brutto += $row->rp_bruto;
            $nomor = $no++;
            if ($nomor > 17) {
                $pemeriksaan2 .= "<tr> <td style='text-align: center; border: 1px;border-style: none none solid none;'>" . $nomor . "</td>
                    <td style='border: 1px;border-style: none none solid none;'> &nbsp;" . $row->nama_pemeriksaan . "</td>
                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->rp_bruto), 0, ',', ',') . " &nbsp;</td>
              </tr>";
            } else {
                $pemeriksaan1 .= "<tr> <td style='text-align: center; border: 1px;border-style: none none solid none;'>" . $nomor . "</td>
                    <td style='border: 1px;border-style: none none solid none;'> &nbsp;" . $row->nama_pemeriksaan . "</td>
                    <td style='text-align: right; border: 1px;border-style: none none solid none;'>" . number_format(floor($row->rp_bruto), 0, ',', ',') . " &nbsp;</td>
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

        if ($harga_netto == $harga_brutto) {
            $harga_bruto1 = '';
            $discount = '';
        } else {
            $harga_bruto1 = "<th colspan='3'>Harga Pemeriksaan</th>
                        <th colspan='2' style='text-align: right'>" . number_format(floor($harga_brutto), 0, ',', ',') . "</th>";

            $discount = "<th colspan='3'>Discount</th>
                                            <th colspan='2' style='text-align: right'>" . number_format(floor($harga_brutto - $harga_netto), 0, ',', ',') . "</th>";
        }

        $data['harga_bruto'] = $harga_bruto1;
        $data['harga_netto'] = number_format(floor($harga_netto), 0, ',', ',');
        $data['discount'] = $discount;
        $data['tanggal'] = $this->tanggal_indo($this->get_tanggaljam_server(), 1);
        $data['kota'] = $this->query->get_table('ms_cabang', array('id' => intval($this->get_table('setting', array('id' => 1))->value_setting)))->msc_kota;
        $data['rcpt'] = $this->query->get_table('ms_karyawan', array('id' => $this->user->id))->mk_nama;
        $data['printby'] = $this->user->mk_nama;

//        if ($trx_pasien->rp_kurangbayar > 0) {
        $data['status_lunas'] = "<table border='0'><tr><td></td><td></td><td width='200px' style='line-height: 1; border: 1px solid; border-style: solid solid solid solid;'>BELUM LUNAS</td></tr></table>";
//            $data['kurang_bayar'] = number_format(floor($trx_pasien->rp_kurangbayar), 0, ',', ',');
//        } else {
//            $data['status_lunas'] = "<table border='0'><tr><td></td><td></td><td width='200px' style='line-height: 1; border: 1px solid; border-style: solid solid solid solid;'>LUNAS</td></tr></table>";
//            $data['kurang_bayar'] = '';
//        }
//        if ($trx_pasien->statushasil_diambil == '1') {
//            $data['status_hasil'] = 'DIAMBIL';
//        } else if ($trx_pasien->statushasil_kirimkantor != '0') {
        $alamat_kirim = $this->get_query("SELECT paket_beritaacara.* from paket 
                inner join paket_beritaacara on paket_beritaacara.kode_ba = paket.kode_ba
                where kode_paket = '$kode_paket'", 1);
        $data['status_hasil'] = 'DIANTAR KE KANTOR : ' . $alamat_kirim->alamat_kirimhasil;
//        } else if ($trx_pasien->statushasil_kirimdokter != '0') {
//            $data['status_hasil'] = 'DIANTAR KE DOKTER : ' . $trx_pasien->statushasil_kirimdokter;
//        } else if ($trx_pasien->statushasil_kirimrumah != '' || $trx_pasien->statushasil_kirimrumah != '0') {
//            $data['status_hasil'] = 'DIANTAR KE RUMAH : ' . $trx_pasien->statushasil_kirimrumah;
//        }

        $this->load->view('cetak_nota', $data);
//        $this->load->view('pendaftaran_nota', $data);
    }

    public function cetak_kwitansi($nolab, $terima_dari) {
        $trx_pasien = $this->get_table('trx_pasien', array('nolab' => $nolab));
        if ($trx_pasien->umur == 0) {
            $umur = $this->hitungumur_lengkap($trx_pasien->pas_tgllahir, $trx_pasien->tgl_periksa, 'Y');
        } else {
            $umur = $trx_pasien->umur . " Tahun";
        }
        $data['nonota'] = "K" . $trx_pasien->nolab;
        $data['no_tglperiksa'] = $trx_pasien->pas_id . ' / ' . $this->tanggal_indo($trx_pasien->tgl_periksa);
        $data['umur'] = $umur;
        $data['terbilang'] = strtoupper($this->terbilang($trx_pasien->rp_netto)) . ' RUPIAH';
        $data['tlp'] = $trx_pasien->pas_telp . ' / ' . $trx_pasien->pas_hp;
        $data['tgl'] = $this->tanggal_indo($trx_pasien->tgl_periksa);
        if ($trx_pasien->pengirim == 1) {
            $rekanan = 'PASIEN UMUM';
//            $pengirim = 'PERMINTAAN SENDIRI';
            $pengirim = $trx_pasien->pas_status . ' ' . $trx_pasien->pas_nama;
        } else if ($trx_pasien->pengirim == 2) {
            $rekanan = '-';
            $dokter = $this->get_table('ms_dokter', array('kode_dokter' => $trx_pasien->kode_pengirim));
            $pengirim = $dokter->gelar_depan . ' ' . strtoupper($dokter->nama_dokter) . ' ' . $dokter->gelar_belakang;
        } else if ($trx_pasien->pengirim > 2) {
            $pengirim = strtoupper($this->get_table('ms_rekanan', array('kode_rekanan' => $trx_pasien->kode_pengirim))->nama_rekanan);
            $rekanan = '-';
        }
        $data['nama'] = $trx_pasien->pas_status . ' ' . strtoupper($trx_pasien->pas_nama);
        $data['terima_dari'] = $terima_dari;
        $data['nama_pasien'] = $trx_pasien->pas_status . ' ' . strtoupper($trx_pasien->pas_nama);
        $data['pengirim'] = $pengirim;
        $data['dpcetak'] = $this->get_table('setting', array('id' => 28))->value_setting;
//        $data['dpcetak'] = 'P.' . $this->get_table('setting', array('id' => 1))->value_setting . '-' . $this->get_table('setting', array('id' => 15))->value_setting;
        $data['rekanan'] = $rekanan;
        $data['alamat'] = $trx_pasien->pas_alamat . ' ' . $trx_pasien->pas_kota;
        $datapemeriksaan = $this->get_table_grid('trx_pemeriksaan', array('no_lab' => $nolab, 'status_aktif' => 1));
        $no = 0;
        $pemeriksaan = '';
        foreach ($datapemeriksaan as $row) {
            $no++;
            $pemeriksaan .= $row->tp_namapemeriksaan . ', ';
        }
        $data['pemeriksaan'] = substr($pemeriksaan, 0, -2);
        $data['harga_netto'] = 'Rp. ' . number_format(floor($trx_pasien->rp_netto), 0, ',', ',') . '.-';
        $data['tanggal'] = $this->tanggal_indo($this->get_tanggaljam_server());
        $data['kota'] = $this->query->get_table('ms_cabang', array('id' => intval($this->get_table('setting', array('id' => 1))->value_setting)))->msc_kota;
        $data['rcpt'] = $this->query->get_table('ms_karyawan', array('id' => $trx_pasien->input))->mk_nama;
        $data['printby'] = $this->user->mk_nama;

        $this->load->view('cetak_kwitansi', $data);
    }

    function terbilang($x) {
        $ambil = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh",
            "delapan", "sembilan", "sepuluh", "sebelas");
        if ($x < 12)
            return " " . $ambil[$x];
        elseif ($x < 20)
            return $this->terbilang($x - 10) . "belas";
        elseif ($x < 100)
            return $this->terbilang($x / 10) . " puluh" . $this->terbilang($x % 10);
        elseif ($x < 200)
            return " seratus" . $this->terbilang($x - 100);
        elseif ($x < 1000)
            return $this->terbilang($x / 100) . " ratus" . $this->terbilang($x % 100);
        elseif ($x < 2000)
            return " seribu" . $this->terbilang($x - 1000);
        elseif ($x < 1000000)
            return $this->terbilang($x / 1000) . " ribu" . $this->terbilang($x % 1000);
        elseif ($x < 1000000000)
            return $this->terbilang($x / 1000000) . " juta" . $this->terbilang($x % 1000000);
    }

    function conv_nolab($nolab, $status) {
        $alfabet = array("", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L");
        $angka['A'] = '01';
        $angka['B'] = '02';
        $angka['C'] = '03';
        $angka['D'] = '04';
        $angka['E'] = '05';
        $angka['F'] = '06';
        $angka['G'] = '07';
        $angka['H'] = '08';
        $angka['I'] = '09';
        $angka['J'] = '10';
        $angka['K'] = '11';
        $angka['L'] = '12';
        if ($status == 1) {
            // Ganti Bulan Nang Alfabet
            $pecah1 = substr("$nolab", 0, 4);
            $pecah2 = intval(substr("$nolab", 4, 2));
            $pecah3 = substr("$nolab", 6, 5);
//            $this->get_log_det(substr($nolab, 4, 2));
            $result = $pecah1 . $alfabet[$pecah2] . $pecah3;
        } else {
            // Ganti Alfabet Nang Bulan
            $pecah1 = substr("$nolab", 0, 4);
            $pecah2 = substr("$nolab", 4, 1);
            $pecah3 = substr("$nolab", 5, 5);
//            $this->get_log_det($pecah2);
            $result = $pecah1 . $angka["$pecah2"] . $pecah3;
        }
        return $result;
    }

    public function cek_nilai_normal($nolab, $kode_hasil, $th_hasil) {
//        $this->get_log_det($kode_hasil);
        if (count(explode(',', $th_hasil)) > 0) {
            $conv_hasil = str_replace(',', '.', $th_hasil);
        } else if (count(explode('.', $th_hasil)) > 0) {
            $conv_hasil = str_replace('.', '', $th_hasil);
        } else {
            $conv_hasil = $th_hasil;
        }
        // Cek Critical Value
        $status_updown .= '';
        $count_critical = $this->count_table('ms_lab_criticalvalue', array('kode_hasil' => $kode_hasil));
        if ($count_critical > 0) {
            if ($conv_hasil == '') {
                $cekcek = '-1';
                $data['status_cv'] = '0';
            } else {
                $critical_val = $this->get_table_grid('ms_lab_criticalvalue', array('kode_hasil' => $kode_hasil));
                $cekcek = '0';
                $status_cv = '0';
                foreach ($critical_val as $cv) {
                    //==== Start Umur
                    $trx_pas = $this->get_query("select pas_tgllahir,umur from trx_pasien where nolab = '$nolab'", 1);
                    if ($trx_pas->umur == 0) {
                        $umur = $this->hitungumur($trx_pas->pas_tgllahir, $this->get_tanggal_server());
                    } else {
                        $umur = $trx_pas->umur * 365;
                    }
                    if ($cv->usia_satuan == 'hari') {
                        $usia = $umur;
                    } else if ($cv->usia_satuan == 'minggu') {
                        $usia = $umur / 7;
                    } else if ($cv->usia_satuan == 'bulan') {
                        $usia = ($umur / 365) * 12;
                    } else if ($cv->usia_satuan == 'tahun') {
                        $usia = $umur / 365;
                    } else {
                        $usia = 0;
                    }
                    if ($cv->usia_opr_awal == '=') {
                        if ($cv->usia_opr_akhir == '<') {
                            if ($usia == $cv->usia_val_awal && $usia < $cv->usia_val_akhir) {
                                // Cari Critical Value
                                if ($cv->hasil_opr == '>=') {
                                    if ($conv_hasil >= $cv->hasil_val) {
                                        $status_updown .= 'TINGGI';
                                        $status_cv = '1';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                } else if ($cv->hasil_opr == '>') {
                                    if ($conv_hasil > $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<=') {
                                    if ($conv_hasil <= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<') {
                                    if ($conv_hasil < $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                }
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else if ($cv->usia_opr_akhir == '<=') {
                            if ($usia == $cv->usia_val_awal && $usia <= $cv->usia_val_akhir) {
                                // Cari Critical Value
                                if ($cv->hasil_opr == '>=') {
                                    if ($conv_hasil >= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '>') {
                                    if ($conv_hasil > $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<=') {
                                    if ($conv_hasil <= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                } else if ($cv->hasil_opr == '<') {
                                    if ($conv_hasil < $cv->hasil_val) {
                                        $status_updown .= 'RENDAH';
                                        $status_cv = '1';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                }
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else {
                            if ($usia == $cv->usia_val_awal) {
                                // Cari Critical Value
                                if ($cv->hasil_opr == '>=') {
                                    if ($conv_hasil >= $cv->hasil_val) {
                                        $status_updown .= 'TINGGI';
                                        $status_cv = '1';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '>') {
                                    if ($conv_hasil > $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<=') {
                                    if ($conv_hasil <= $cv->hasil_val) {
                                        $status_updown .= 'RENDAH';
                                        $status_cv = '1';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                } else if ($cv->hasil_opr == '<') {
                                    if ($conv_hasil < $cv->hasil_val) {
                                        $status_updown .= 'RENDAH';
                                        $status_cv = '1';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                }
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        }
                    } else if ($cv->usia_opr_awal == '>') {
                        if ($cv->usia_opr_akhir == '<') {
                            if ($usia > $cv->usia_val_awal && $usia < $cv->usia_val_akhir) {
                                // Cari Critical Value
                                if ($cv->hasil_opr == '>=') {
                                    if ($conv_hasil >= $cv->hasil_val) {
                                        $status_updown .= 'TINGGI';
                                        $status_cv = '1';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                } else if ($cv->hasil_opr == '>') {
                                    if ($conv_hasil > $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                } else if ($cv->hasil_opr == '<=') {
                                    if ($conv_hasil <= $cv->hasil_val) {
                                        $status_updown .= 'RENDAH';
                                        $status_cv = '1';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                } else if ($cv->hasil_opr == '<') {
                                    if ($conv_hasil < $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                }
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else if ($cv->usia_opr_akhir == '<=') {
                            if ($usia > $cv->usia_val_awal && $usia <= $cv->usia_val_akhir) {
                                // Cari Critical Value
                                if ($cv->hasil_opr == '>=') {
                                    if ($conv_hasil >= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                } else if ($cv->hasil_opr == '>') {
                                    if ($conv_hasil > $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                } else if ($cv->hasil_opr == '<=') {
                                    if ($conv_hasil <= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<') {
                                    if ($conv_hasil < $cv->hasil_val) {
                                        $status_updown .= 'RENDAH';
                                        $status_cv = '1';
                                    } else {
                                        $status_updown .= 'NORMAL';
                                        $status_cv = '0';
                                    }
                                }
                            } else {
                                $status_updown .= 'NORMAL';
                                $status_cv = '0';
                            }
                        } else {
                            if ($usia > $cv->usia_val_awal) {
                                // Cari Critical Value
                                if ($cv->hasil_opr == '>=') {
                                    if ($conv_hasil >= $cv->hasil_val) {
                                        $status_updown .= 'TINGGI';
                                        $status_cv = '1';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '>') {
                                    if ($conv_hasil > $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<=') {
                                    if ($conv_hasil <= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<') {
                                    if ($conv_hasil < $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                }
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        }
                    } else if ($cv->usia_opr_awal == '>=') {
                        if ($cv->usia_opr_akhir == '<') {
                            if ($usia >= $cv->usia_val_awal && $usia < $cv->usia_val_akhir) {
                                // Cari Critical Value
                                if ($cv->hasil_opr == '>=') {
                                    if ($conv_hasil >= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '>') {
                                    if ($conv_hasil > $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<=') {
                                    if ($conv_hasil <= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<') {
                                    if ($conv_hasil < $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                }
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else if ($cv->usia_opr_akhir == '<=') {
                            if ($usia >= $cv->usia_val_awal && $usia <= $cv->usia_val_akhir) {
                                // Cari Critical Value
                                if ($cv->hasil_opr == '>=') {
                                    if ($conv_hasil >= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '>') {
                                    if ($conv_hasil > $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<=') {
                                    if ($conv_hasil <= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<') {
                                    if ($conv_hasil < $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                }
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else {
                            if ($usia >= $cv->usia_val_awal) {
                                // Cari Critical Value
                                if ($cv->hasil_opr == '>=') {
                                    if ($conv_hasil >= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '>') {
                                    if ($conv_hasil > $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'TINGGI';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<=') {
                                    if ($conv_hasil <= $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                } else if ($cv->hasil_opr == '<') {
                                    if ($conv_hasil < $cv->hasil_val) {
                                        $status_cv = '1';
                                        $status_updown .= 'RENDAH';
                                    } else {
                                        $status_cv = '0';
                                        $status_updown .= 'NORMAL';
                                    }
                                }
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        }
                    } else if ($cv->usia_opr_awal == '<') {
                        if ($usia < $cv->usia_val_awal) {
                            // Cari Critical Value
                            if ($cv->hasil_opr == '>=') {
                                if ($conv_hasil >= $cv->hasil_val) {
                                    $status_cv = '1';
                                    $status_updown .= 'TINGGI';
                                } else {
                                    $status_cv = '0';
                                    $status_updown .= 'NORMAL';
                                }
                            } else if ($cv->hasil_opr == '>') {
                                if ($conv_hasil > $cv->hasil_val) {
                                    $status_cv = '1';
                                    $status_updown .= 'TINGGI';
                                } else {
                                    $status_cv = '0';
                                    $status_updown .= 'NORMAL';
                                }
                            } else if ($cv->hasil_opr == '<=') {
                                if ($conv_hasil <= $cv->hasil_val) {
                                    $status_cv = '1';
                                    $status_updown .= 'RENDAH';
                                } else {
                                    $status_cv = '0';
                                    $status_updown .= 'NORMAL';
                                }
                            } else if ($cv->hasil_opr == '<') {
                                if ($conv_hasil < $cv->hasil_val) {
                                    $status_cv = '1';
                                    $status_updown .= 'RENDAH';
                                } else {
                                    $status_cv = '0';
                                    $status_updown .= 'NORMAL';
                                }
                            }
                        } else {
                            $status_cv = '0';
                            $status_updown .= 'NORMAL';
                        }
                    } else if ($cv->usia_opr_awal == '<=') {
                        if ($usia < $cv->usia_val_awal) {
                            // Cari Critical Value
                            if ($cv->hasil_opr == '>=') {
                                if ($conv_hasil >= $cv->hasil_val) {
                                    $status_cv = '1';
                                    $status_updown .= 'TINGGI';
                                } else {
                                    $status_cv = '0';
                                    $status_updown .= 'NORMAL';
                                }
                            } else if ($cv->hasil_opr == '>') {
                                if ($conv_hasil > $cv->hasil_val) {
                                    $status_cv = '1';
                                    $status_updown .= 'TINGGI';
                                } else {
                                    $status_cv = '0';
                                    $status_updown .= 'NORMAL';
                                }
                            } else if ($cv->hasil_opr == '<=') {
                                if ($conv_hasil <= $cv->hasil_val) {
                                    $status_cv = '1';
                                    $status_updown .= 'RENDAH';
                                } else {
                                    $status_cv = '0';
                                    $status_updown .= 'NORMAL';
                                }
                            } else if ($cv->hasil_opr == '<') {
                                if ($conv_hasil < $cv->hasil_val) {
                                    $status_cv = '1';
                                    $status_updown .= 'RENDAH';
                                } else {
                                    $status_cv = '0';
                                    $status_updown .= 'NORMAL';
                                }
                            }
                        } else {
                            $status_cv = '0';
                            $status_updown .= 'NORMAL';
                        }
                    } else {
                        if ($cv->hasil_opr == '>=') {
                            if ($conv_hasil >= $cv->hasil_val) {
                                $status_cv = '1';
                                $status_updown .= 'TINGGI';
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else if ($cv->hasil_opr == '>') {
                            if ($conv_hasil > $cv->hasil_val) {
                                $status_cv = '1';
                                $status_updown .= 'TINGGI';
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else if ($cv->hasil_opr == '<=') {
                            if ($conv_hasil <= $cv->hasil_val) {
                                $status_cv = '1';
                                $status_updown .= 'RENDAH';
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else if ($cv->hasil_opr == '<') {
                            if ($conv_hasil < $cv->hasil_val) {
                                $status_cv = '1';
                                $status_updown .= 'RENDAH';
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else if (strtolower($cv->hasil_val) == 'positif') {
                            if (strtolower($conv_hasil) == 'positif') {
                                $status_cv = '1';
                                $status_updown .= 'NORMAL';
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        } else if (strtolower($cv->hasil_val) == 'non reaktif') {
                            if (strtolower($conv_hasil) == 'non reaktif') {
                                $status_cv = '1';
                                $status_updown .= 'NORMAL';
                            } else {
                                $status_cv = '0';
                                $status_updown .= 'NORMAL';
                            }
                        }
                    }
                    //==== End UMUR
                    $cekcek += $status_cv;
                }
                //End Looping
            }
        } else {
            $cekcek = 0;
        }

        // Cek Nilai Abnormal
        $cnilairujukan = $this->count_table('trx_hasil', array('no_lab' => "$nolab", 'kode_hasil' => "$kode_hasil", 'status_aktif' => 1, 'status_normal' => 1));
        if ($cnilairujukan > 0) {
            $nilairujukan = $this->get_table('trx_hasil', array('no_lab' => "$nolab", 'kode_hasil' => "$kode_hasil", 'status_aktif' => 1, 'status_normal' => 1));
            // Opr Awal
            if ($nilairujukan->th_kuantitatif_opr_awal == '=>') {
                $opr_awal = '>=';
            } else if ($nilairujukan->th_kuantitatif_opr_awal == '=<') {
                $opr_awal = '<=';
            } else {
                $opr_awal = $nilairujukan->th_kuantitatif_opr_awal;
            }

            // Opr Akhir
            if ($nilairujukan->th_kuantitatif_opr_akhir == '=>') {
                $opr_akhir = '>=';
            } else if ($nilairujukan->th_kuantitatif_opr_akhir == '=<') {
                $opr_akhir = '<=';
            } else {
                $opr_akhir = $nilairujukan->th_kuantitatif_opr_akhir;
            }
            $hasil_nilairujukan = $conv_hasil;
            $nilairujukan_valawal = $nilairujukan->th_kuantitatif_val_awal;
            $nilairujukan_valakhir = $nilairujukan->th_kuantitatif_val_akhir;
            // OPR AWAL
            if ($opr_awal == '=') {
                if ($hasil_nilairujukan > $nilairujukan_valawal) {
                    $status_updown .= 'TINGGI';
                } else if ($hasil_nilairujukan < $nilairujukan_valawal) {
                    $status_updown .= 'RENDAH';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else if ($opr_awal == '>=') {
                // Jika Lebih Besar Sama Dengan Ganti Dengan Kurang Dari
                if ($hasil_nilairujukan < $nilairujukan_valawal) {
                    $status_updown .= 'RENDAH';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else if ($opr_awal == '>') {
                // Jika Lebih Besar Dengan Ganti Dengan Kurang Dari sama dengan
                if ($hasil_nilairujukan <= $nilairujukan_valawal) {
                    $status_updown .= 'RENDAH';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else if ($opr_awal == '<=') {
                // Jika Kurang  Besar Dengan Ganti Dengan Kurang Dari
                if ($hasil_nilairujukan > $nilairujukan_valawal) {
                    $status_updown .= 'TINGGI';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else if ($opr_awal == '<') {
                if ($hasil_nilairujukan >= $nilairujukan_valawal) {
                    $status_updown .= 'TINGGI';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else {
                $status_updown .= 'NORMAL';
            }
            // OPR AKHIR
            if ($opr_akhir == '=') {
                if ($hasil_nilairujukan > $nilairujukan_valakhir) {
                    $status_updown .= 'TINGGI';
                } else if ($hasil_nilairujukan < $nilairujukan_valakhir) {
                    $status_updown .= 'RENDAH';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else if ($opr_akhir == '>=') {
                // Jika Lebih Besar Sama Dengan Ganti Dengan Kurang Dari
                if ($hasil_nilairujukan < $nilairujukan_valakhir) {
                    $status_updown .= 'RENDAH';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else if ($opr_akhir == '>') {
                // Jika Lebih Besar Dengan Ganti Dengan Kurang Dari sama dengan
                if ($hasil_nilairujukan <= $nilairujukan_valakhir) {
                    $status_updown .= 'RENDAH';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else if ($opr_akhir == '<=') {
                // Jika Kurang  Besar Dengan Ganti Dengan Kurang Dari
                if ($hasil_nilairujukan > $nilairujukan_valakhir) {
                    $status_updown .= 'TINGGI';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else if ($opr_akhir == '<') {
                if ($hasil_nilairujukan >= $nilairujukan_valakhir) {
                    $status_updown .= 'TINGGI';
                } else {
                    $status_updown .= 'NORMAL';
                }
            } else {
                $status_updown .= 'NORMAL';
            }
            $status_nr = $status_nr1 + $status_nr2;
            if ($status_nr >= 2) {
                $abnormal = 2;
            } else {
                $abnormal = 0;
            }
            $data['status_cv'] = $abnormal;
        } else {
            $data['status_cv'] = 0;
        }

        if ($data['status_cv'] > 0) {
            $status_abnormal = $this->get_table('setting', array('id' => 32))->value_setting;
        } else {
            $status_abnormal = '';
        }
        $array['hasil'] = $status_abnormal . $th_hasil;
        $array['status'] = $data['status_cv'];
        $array['status_updown'] = $status_updown;
//        log_message('error', $status_updown);
        return $array;
    }

}
