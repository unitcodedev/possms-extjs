<?php

class Surat extends CI_Model {

    public function get_template($kode) {
        $template_surat = $this->query->get_detail('template_surat', 'template_surat_kode', $kode);

        return $template_surat->template_surat_text;
    }

    public function get_surat($id) {
        $row = $this->query->get_detail('v_surat', 'surat_id', $id);
        $surat = $row->ms_template;
        if ($row) {
            setlocale(LC_TIME, 'indonesian');
            $awal = array(
                '[[no surat]]',
                '[[nama 1]]',
                '[[nik 1]]',
                '[[divisi 1]]',
                '[[posisi 1]]',
                '[[jabatan 1]]',
                '[[alamat 1]]',
                '[[perusahaan 1]]',
                '[[cabang 1]]',
                '[[telp 1]]',
                '[[kota 1]]',
                '[[ms kode]]',
                '[[ms ket]]',
                '[[ms template]]',
                '[[tgl awal]]',
                '[[tgl akhir]]',
                '[[nama 2]]',
                '[[kelamin 2]]',
                '[[ktp 2]]',
                '[[usia 2]]',
                '[[nik 2]]',
                '[[divisi 2]]',
                '[[posisi 2]]',
                '[[jabatan 2]]',
                '[[pekerjaan 2]]',
                '[[cabang 2]]',
                '[[alamat ktp 2]]',
                '[[alamat ktp kota 2]]',
                '[[alamat dom 2]]',
                '[[alamat dom kota 2]]',
                '[[tmpt lahir 2]]',
                '[[tgl lahir 2]]',
                '[[hp 2]]',
                '[[tlp 2]]',
                '[[email 2]]',
                '[[cabang baru 2]]',
                '[[divisi baru 2]]',
                '[[jabatan baru 2]]',
                '[[posisi baru 2]]',
                '[[pekerjaan baru 2]]',
                '[[status 2]]',
                '[[agama 2]]',
                '[[gaji 2]]',
                '[[tgl cetak]]',
                '[[tgl keputusan]]',
                '[[tgl pengajuan]]',
                '[[tgl approve cabang]]',
                '[[tgl approve pusat]]'
            );



            if (!$row->surat_pjs_1) {
                $jabatan_1 = $this->query->get_detail('ms_jabatan', 'id', $row->surat_jabatan_1)->msj_nama;
            } else {
                $jab = $this->query->get_detail('ms_jabatan', 'id', $row->surat_jabatan_1)->msj_nama;
                $jabatan_1 = "PJS. $jab";
            }
            if ($row->surat_divisi_2 != null) {
                $divisi_2 = $this->query->get_detail('ms_divisi', 'id', $row->surat_divisi_2)->msd_nama;
            } else {
                $divisi_2 = "";
            }
            if ($row->surat_posisi_2) {
                $posisi_2 = $this->query->get_detail('ms_posisi', 'id', $row->surat_posisi_2)->msp_nama;
            } else {
                $posisi_2 = "";
            }
            if ($row->surat_jabatan_2 != null) {
                $jabatan_2 = $this->query->get_detail('ms_jabatan', 'id', $row->surat_jabatan_2)->msj_nama;
            } else {
                $jabatan_2 = "";
            }
            if ($row->surat_cabang_2 != null) {
                $cabang_2 = $this->query->get_detail('ms_cabang', 'id', $row->surat_cabang_2)->msc_nama;
            } else {
                $cabang_2 = "";
            }
            //Baru
            if ($row->surat_divisi_baru_2) {
                $divisi_baru_2 = $this->query->get_detail('ms_divisi', 'id', $row->surat_divisi_baru_2)->msd_nama;
            } else {
                $divisi_baru_2 = "";
            }
            if ($row->surat_posisi_baru_2) {
                $posisi_baru_2 = $this->query->get_detail('ms_posisi', 'id', $row->surat_posisi_baru_2)->msp_nama;
            } else {
                $posisi_baru_2 = "";
            }
            if ($row->surat_jabatan_baru_2 == 0) {
                $jabatan_baru_2 = "Staf";
            } else {
                $jabatan_baru_2 = $this->query->get_detail('ms_jabatan', 'id', $row->surat_jabatan_baru_2)->msj_nama;
            }
            if ($row->surat_pekerjaan_2 != null) {
                $pekerjaan_2 = $this->query->get_detail('ms_pekerjaan', 'id', $row->surat_pekerjaan_2)->mspk_nama;
            } else {
                $pekerjaan_2 = "";
            }
            if ($row->surat_cabang_baru_2) {
                $cabang_baru_2 = $this->query->get_detail('ms_cabang', 'id', $row->surat_cabang_baru_2)->msc_nama;
            } else {
                $cabang_baru_2 = "";
            }
            if ($row->surat_jk_2 == 'L') {
                $jk = 'Laki - Laki';
            } else {
                $jk = 'Perempuan';
            };
            if ($row->surat_pekerjaan_baru_2 != 0) {
                $pekerjaan_baru_2 = $this->query->get_detail('ms_pekerjaan', 'id', $row->surat_pekerjaan_baru_2)->mspk_nama;
            } else {
                $pekerjaan_baru_2 = "";
            }
            $akhir = array(
                $row->surat_no_surat,
                $row->surat_nama_1,
                $row->surat_nik_1,
                $row->surat_divisi_1,
                $row->surat_posisi_1,
                $jabatan_1,
                $row->surat_alamat_1,
                $row->surat_perusahaan_1,
                $row->surat_cabang_1,
                $row->surat_telp_1,
                $row->surat_kota_1,
                $row->ms_kode,
                $row->ms_ket,
                $row->ms_template,
                $this->query->tanggal_indo($row->surat_tgl_awal),
                $this->query->tanggal_indo($row->surat_tgl_akhir),
                $row->surat_nama_2,
                $jk,
                $row->surat_noktp_2,
                $row->usia,
                $row->surat_nik_2,
                $divisi_2,
                $posisi_2,
                $jabatan_2,
                $pekerjaan_2,
                $cabang_2,
                $row->surat_alamat_ktp_2,
                $row->surat_alamat_ktp_kota_2,
                $row->surat_alamat_dom_2,
                $row->surat_alamat_dom_kota_2,
                $row->surat_tmpt_lahir_2,
                $row->surat_tgl_lahir_2,
                $row->surat_hp_2,
                $row->surat_tlp_2,
                $row->surat_email_2,
                $cabang_baru_2,
                $divisi_baru_2,
                $jabatan_baru_2,
                $posisi_baru_2,
                $pekerjaan_baru_2,
                $row->surat_status_2,
                $row->surat_agama_2,
                $row->mk_gaji,
                $this->query->tanggal_indo($row->surat_tgl_cetak),
                $this->query->tanggal_indo($row->surat_tgl_keputusan),
                $this->query->tanggal_indo($row->surat_tgl_pengajuan),
                $row->tgl_publish_cabang,
                $row->tgl_publish_pusat,
            );
            $surat = str_replace($awal, $akhir, $surat);
//            $surat = str_replace('sudara', 'saudari', $surat);
            $surat = html_entity_decode($surat);
            $surat = str_replace('nbsp;', 'BB', $surat);
            return $surat;
        } else {
            return 0;
        }
    }

    public function publish($id, $urutan = NULL) {
        /*
         *  Urutan adalah Variabel Status
         *      null untuk penomeran Cabang
         *      1 untuk penomeran Nota Dinas
         *      2 untuk penomeran SK
         * 
         */


        $romawi = array('', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII');
        $tgl = $this->query->get_tanggal_server();
        $bln = date('n');
        $thn = $this->query->get_tahun_server();
        $surat = $this->query->get_detail('t_surat', 'surat_id', $id);
        $pdc = 'PDC';

        if ($surat->surat_cabang_1 != '1') {
            $pdc .= '-' . $surat->surat_cabang_1;
        }
        if ($urutan == NULL) {
            $this->db->where("date_format(tgl_publish_cabang, '%Y') =", $thn);
            $this->db->where("surat_cabang_1", $surat->surat_cabang_1);
            $this->db->order_by("surat_id", "desc");
            $query = $this->db->get('t_surat');
            $baris = $query->num_rows();
        } else if ($urutan == 1) {
            $this->db->where('EXTRACT(YEAR FROM surat_tgl_cetak)=', date('Y'));
            $this->db->where('tmst_jenis_surat_id', 11);
            $this->db->order_by('surat_id', 'desc');
            $query = $this->db->get('surat');
            $baris = $query->num_rows();
        } else if ($urutan == 2) {
            $this->db->where('EXTRACT(YEAR FROM surat_tgl_cetak)=', date('Y'));
            $this->db->where('surat_status_publish', 1);
            $this->db->where('tmst_jenis_surat_id', 15);
            $this->db->or_where('tmst_jenis_surat_id', 16);
            $this->db->or_where('tmst_jenis_surat_id', 17);
            $this->db->order_by('surat_id', 'desc');
            $query = $this->db->get('surat');
            $baris = $query->num_rows();
            log_message('error', $this->db->last_query());
        }
//        echo '/ baris ='.$baris;
//        if ($query->num_rows() > 0){
//           $row = $query->row(); 
//           $nomor = $row->surat_urutan + 1;
//        }else{
//            $nomor = 1;
//        }

        if ($baris > 99) {
            $baris = $baris + 1;
        } else if ($baris > 9 && $baris < 100) {
            $baris = $baris + 1;
            $nomor = "0$baris";
        } else if ($baris > 0 && $baris < 10) {
            $baris = $baris + 1;
            $nomor = "00$baris";
        } else {
            $nomor = '001';
        }

        $jabatan = $this->query->get_detail('t_surat_kode_jabatan', 'id_jabatan', $surat->surat_jabatan_1);
        $kode_surat = $this->query->get_detail('t_surat_kode', 'id_surat_kode', $surat->surat_kode_header);
        if ($surat->surat_cabang_1 == 1) {
            $pdc = "PDC";
        } else {
            $pdc = "PDC-$surat->surat_cabang_1";
        }
//        echo '/ nomor='.$nomor;
//        if ($surat->template_surat_kode == 'SK PEG') {
//            $nomor_surat = $nomor . "/" . $surat->jenis_surat_kode . "/" . $surat->jabatan_surat_kode . "/PDC/" . $romawi[$bln] . "/" . date('Y');
//        } else {
        $nomor_surat = $nomor . "/" . $kode_surat->sk_kode . "/" . $jabatan->js_kode . "-" . $surat->surat_cabang_1 . "/" . $pdc . "/" . $romawi[$bln] . "/" . $thn;
//        }$nomor_surat = $nomor."/".$surat->jenis_surat_kode."/".$surat->jabatan_surat_kode."-".$surat->tujuan_surat_kode."/".$pdc."/".$romawi[$bln]."/".date('Y');
//        $this->db->set('surat_status_publish', 1);
//        $this->db->set('surat_id_sdm_publish', $this->session->userdata('sdm_id'));
//
//        //ini untuk yang tidak berlaku surut
//        if (!$surat->surat_no_surat) {
//            $this->db->set('surat_tgl_cetak', $tgl);
//            $this->db->set('surat_tgl_keputusan', $tgl);
//            $this->db->set('surat_no_surat', $nomor_surat);
//        }
//
//        $this->db->set('template_surat_text', $this->get_template($surat->template_surat_kode));
//        $this->db->where('surat_id', $this->input->post('id'));
//        $this->db->update('surat');

        return $nomor_surat;
    }

}

?>
