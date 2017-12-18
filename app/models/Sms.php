<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Sms extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    public function kirim($nohp, $text, $creator) {
        $database = $this->load->database('sms', TRUE);
        if ($database->conn_id === FALSE) {
            echo 'Koneksi Cabang ' . '' . ' Bermasalah';
            return;
        }
        $this->load->model('query2', 'cabang');
        $this->cabang->db2 = $database;
        $this->cabang->get_trans_start();
        $no_lab = $creator;
        $panjang_sms = strlen($text);
        $pecah = str_split($text, 153);
        if ($panjang_sms > 160) {
            $jumlah_sms = floor(($panjang_sms / 153) + 1);
            if ($jumlah_sms < 10) {
                $total_sms = "0$jumlah_sms";
            } else {
                $total_sms = $jumlah_sms;
            }
            for ($x = 1; $x <= $jumlah_sms; $x++) {
                if ($x < 10) {
                    $urutan = "0$x";
                } else {
                    $urutan = $x;
                }
                $udh = "050003D3$total_sms$urutan";
                $isi_sms = $pecah[$x - 1];
                if ($x == 1) {
                    $data = array(
                        'DestinationNumber' => $nohp,
                        'TextDecoded' => $isi_sms,
                        'UDH' => $udh,
                        'Coding' => 'Default_No_Compression',
                        'CreatorID' => $no_lab,
                        'MultiPart' => 'true'
                    );
                    $this->cabang->insert('outbox', $data);
                } else {
                    $id_seq = $this->cabang->get_table("outbox_ID_seq")->last_value;
                    $this->cabang->get_log();
                    $data1 = array(
                        'ID' => $id_seq,
                        'TextDecoded' => $isi_sms,
                        'UDH' => $udh,
                        'Coding' => 'Default_No_Compression',
                        'SequencePosition' => $x,
                    );
                    $this->cabang->insert('outbox_multipart', $data1);
                }
            }
        } else {
            $data2 = array(
                'DestinationNumber' => $nohp,
                'TextDecoded' => $text,
                'Coding' => 'Default_No_Compression',
                'CreatorID' => $no_lab,
            );
            $this->cabang->insert('outbox', $data2);
        };
        $this->cabang->get_trans_complete();
        if ($this->cabang->get_trans_status() == 'true') {
            return "BERHASIL";
        } else {
            return "GAGAL";
        }
    }

}
