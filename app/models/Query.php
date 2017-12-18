<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Query extends CI_Model {

    public function get_list_table($table_name, $id, $search = NULL, $wanted = NULL, $where_in_id = Null, $where_in_data = NULL, $or = NULL) {

        if (!is_null($search)) {
            $this->db->where($search);
        }
        if (!is_null($or)) {
            $this->db->or_where($or);
        }

        if (!is_null($wanted)) {
            $this->db->where($wanted);
        }

        if (!is_null($where_in_id)) {
            if (!is_null($where_in_data)) {
                $this->db->where_in($where_in_id, $where_in_data);
            }
        }

        $query = $this->db->select('*')->from($table_name);

        return $query->result();
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

    public function get_query($query, $status = null) {
        if (!is_null($status)) {
            $qry = $this->db->query($query);
            $retval = $qry->row();
            return $retval;
        } else {
            $qry = $this->db->query($query);
            return $qry;
        }
    }

    public function get_table_grid($table, $search = null, $where_in_id = Null, $where_in_data = NULL, $like = NULL, $nama_sort = NULL, $sort = NULL) {
        if (!is_null($search)) {
            $this->db->where($search);
        }
        if (!is_null($where_in_id)) {
            if (!is_null($where_in_data)) {
                $this->db->where_in($where_in_id, $where_in_data);
            }
        }
        if (!is_null($like)) {
            $this->db->like($like);
        }
        if (!is_null($nama_sort)) {
            $this->db->order_by($nama_sort, $sort);
        }
        return $this->db->get($table)->result();
    }

    public function get_table($table, $where = null) {
        if (!is_null($where)) {
            return $this->db->from($table)->where($where)->get()->row();
        } else {
            return $this->db->from($table)->get()->row();
        }
    }

    public function count_table($table, $where) {
        return $this->db->select('*')->from($table)->where($where)->count_all_results();
    }

    public function update_lastlog($where) {
        $this->db->set('user_last_login', "CURRENT_TIMESTAMP", false);
        $this->db->where($where);
        $this->db->update('sys_user');
    }

    public function get_detail($table, $kolom, $id) {
        return $this->db->where(array($kolom => $id))->from($table)->get()->row();
    }

    public function get_detail2($table, $kolom1, $id1, $kolom2, $id2) {
        return $this->db->where(array($kolom1 => $id1, $kolom2 => $id2))->from($table)->get()->row();
    }

    public function lookup_table($table, $col, $keyword, $filter = null) {
        if (is_null($filter)) {
            return $this->db->select('*')->from($table)->where("upper(" . $col . ") LIKE upper('%" . $keyword . "%')", NULL, FALSE)->get();
        } else {
            return $this->db->select('*')->from($table)->where("upper(" . $col . ") LIKE upper('%" . $keyword . "%')", NULL, FALSE)->where($filter)->get();
            echo $this->db->last_query();
        }
    }

    public function get_row_table($tabel, $select, $id, $page = 0, $limit = 0, $search = null) {
        if (!is_null($search)) {
            $this->db->where($search);
        }
        $this->db->select($id . "," . $select);
        if ($limit != 0)
            $this->db->limit($limit * $page, ($page - 1) * $limit);
        $data = $this->db->get($tabel);

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
            $this->db->where($search);
        }
//        $numrow=$this->db->count_all_results($tabel);
//        
//        $max = $numrow 

        return json_encode($output);
    }

    function get_bulan_server() {
        $sql = "Select date_format(curdate(), '%m') as bulan";
        $qry = $this->db->query($sql);
        $retval = $qry->row()->bulan;
        return $retval;
    }

    function last_id($table) {
        $sql = "SELECT AUTO_INCREMENT as akhir FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'hris_db' AND TABLE_NAME = '$table'";
        $qry = $this->db->query($sql);
        $retval = $qry->row()->akhir;
        return $retval;
    }

    function get_tahun_server() {
        $sql = "SELECT to_char(localtimestamp,'YYYY') as tahun";
        $qry = $this->db->query($sql);
        $retval = $qry->row()->tahun;
        return $retval;
    }

    function get_tanggal_server() {
        $sql = "SELECT to_char(localtimestamp,'YYYYmmdd') as hasil ";
        $qry = $this->db->query($sql);
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function get_tanggaljam_server() {
        $sql = "SELECT localtimestamp as hasil ";
        $qry = $this->db->query($sql);
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function cari_seq($seq, $status = null) {
        if (!is_null($status)) {
            $sql1 = "SELECT last_value FROM $seq";
            $qry = $this->db->query($sql1);
            $retval = $qry->row()->last_value;
        } else {
            $sql1 = "SELECT last_value FROM $seq";
            $qry = $this->db->query($sql1);
            $retval = $qry->row()->last_value + 1;
            $sql2 = "SELECT setval('$seq', $retval, true)";
            $this->db->query($sql2);
        }
        return $retval;
    }

    function get_bulantahun() {
        $sql = "SELECT to_char(localtimestamp,'YYmm') as hasil ";
        $qry = $this->db->query($sql);
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function get_id($id, $tabel) {
        $sql = "SELECT $id as id_akhir from $tabel order by $id DESC LIMIT 1";
        $qry = $this->db->query($sql);
        $retval = $qry->row()->id_akhir;
        return $retval;
    }

    function get_tanggal_server_1() {
        $sql = "SELECT to_char(localtimestamp,'YYYY-Mon-dd') as hasil ";
        $qry = $this->db->query($sql);
        $retval = $qry->row()->hasil;
        return $retval;
    }

    function get_no_surat($id, $tabel) {
        $sql = "SELECT $id as id_akhir from $tabel order by $id DESC LIMIT 1";
        $qry = $this->db->query($sql);
        $retval = $qry->row()->id_akhir;
        return $retval;
    }

    function export_exel($table, $where) {
        $this->load->library(array('PHPExcel', 'PHPExcel/IOFactory'));
        $query = $this->db->from($table)->where($where)->get();
        if (!$query) {
            return false;
        } else {

            $objPHPExcel = new PHPExcel();

            // Set properties
            $objPHPExcel->getProperties()
                    ->setCreator("Parahita") //creator
                    ->setTitle("Parahita");  //file title

            $objset = $objPHPExcel->setActiveSheetIndex(0); //inisiasi set object
            $objget = $objPHPExcel->getActiveSheet();  //inisiasi get object

            $objget->setTitle('Export Exel'); //sheet title
            $objset->setCellValue('A1', "TEsting"); //insert cell value
            $objget->getStyle('A1')->getFont()->setBold(true)  // set font weight
                    ->setSize(15);    //set font size
            $fields = $query->list_fields();
            $col = 0;
            foreach ($fields as $field) {
                $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($col, 1, $field);
                $col++;
            }
            $row = 2;
            foreach ($query->result() as $data) {
                $col = 0;
                foreach ($fields as $field) {
                    $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($col, $row, $data->$field);
                    $col++;
                }

                $row++;
            }

            // Error Terus
            $objWriter = IOFactory::createWriter($objPHPExcel, 'Excel5');
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="testing.xls"');
            header('Cache-Control: max-age=0');
            $objWriter->save('php://output');
            exit;

            // Jalan Tapi File e Nak Server
//            $objWriter = IOFactory::createWriter($objPHPExcel, 'Excel5');
//            $objWriter->save($nama . date('dmYHis') . ".xls");
        }
    }

    function get_acl($kode) {
        return $this->db->select('*')->from('v_akses_hris')->where(array('access_kode' => $kode, 'id' => $this->user->id))->count_all_results();
    }

    public function get_query_grid($query) {
        return $this->db->query($query)->result();
    }

    function hitungumur($tgllhr, $tglperiksa) {
        $hitunghari['awal'] = $tgllhr;
        $hitunghari['akhir'] = $tglperiksa;
        $lahir = $hitunghari['awal'];
        $selisih = strtotime($hitunghari['akhir']) - strtotime($lahir);
        $tahun = floor($selisih / 31536000);
        $bulan = floor(($selisih % 31536000) / 2592000);
        foreach ($hitunghari as $key => $val) {
            $hitunghari[$key] = strtotime($val);
        }
        $hitunghari['selisih'] = $hitunghari['akhir'] - $hitunghari['awal'];
        $hari = $hitunghari['selisih'] / 86400;
        return $hari;
    }

    function get_log() {
        log_message('error', $this->db->last_query());
    }

}
