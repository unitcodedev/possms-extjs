<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Apps extends Auth_Controller {

    public $the_user;

    function __construct() {
        parent::__construct();
        $this->load->model('Apps_model');
        $this->page = 'Dahsboard';
        $this->the_user = $this->user;
//        $this->load->model('query2');
//        $this->query2->db2 = $this->load->database('second', TRUE);
    }

    public function index() {
//        $cabang = $this->the_user->mk_cabang;
//        $this->query2->get_log();
//        $detail_cabang = $cabang == 1 ? "PUSAT" : $this->query->get_detail('ms_cabang', 'id', $cabang);
        $data['title'] = 'POS SMS - ' . $this->page;
        $data['app'] = 'app';
//        $data['ipaddress'] = $this->input->ip_address();
        $data['css_theme'] = "azzurra/azzurra-core";
        $data['varian'] = "azzurra/azzurra-ui-all";
        $data['azr'] = "azzurra";
        $data['page_css'] = "main_css";
        $data['icon_css'] = "main_icon";
        $data['logged_user'] = strtoupper($this->the_user->first_name . ' ' . $this->the_user->last_name);
//        $data['cabang_name'] = $cabang == 1 ? $detail_cabang : $detail_cabang->msc_nama;
        $data['cabang_name'] = '';
        $data['cabang_id'] = '';
        $data['divisi_id'] = $this->the_user->mk_divisi;
        $data['nama_user'] = $this->the_user->mk_nama;
        $data['kar_id'] = $this->the_user->id;
        $data['jasmed_rekanan'] = '';
        $data['jasmed_umum'] = '';
        $data['periode_week'] = '';
        $data['menu'] = '';
        $data['versi_ci'] = CI_VERSION;

//        $data['periodeawal'] = $this->query2->get_query("select to_char(mg_tgl1,'dd/Mon/YYYY') as tgl from ms_mingguan where id = '" . $this->app_periode() . "'", 1)->tgl;
//        $data['periodeakhir'] = $this->query2->get_query("select to_char(mg_tgl2,'dd/Mon/YYYY') as tgl from ms_mingguan where id = '" . $this->app_periode() . "'", 1)->tgl;
        $this->load->view('app_page', $data);
    }

    public function dashboard() {
        $data['logged_user'] = strtoupper($this->the_user->mk_nama);
        $data['nama_cab'] = "Toko";//$this->query->get_detail('ms_cabang', 'id', $this->the_user->mk_cabang)->msc_nama;
        $this->load->view('welcome_page', $data);
    }

    public function app_periode() {
        $sql = "SELECT id
            FROM ms_mingguan 
            WHERE CURRENT_DATE>=mg_tgl1 AND CURRENT_DATE<=mg_tgl2";
        $query = $this->query2->get_query($sql, 1);
        return $query->id;
    }

    public function app_menu($group) {
        $parent = $this->input->post('node');
        $menu_list = $this->__get_menu($parent, $group);
        echo json_encode($menu_list);
    }

    public function user_check() {
        echo json_encode(array('success' => 'true'));
    }

    private function __get_menu($parent, $group) {
        $menu_list = array();

        $params[] = array('field' => 'parent_id', 'param' => 'where', 'operator' => '', 'value' => $parent);
        $params[] = array('field' => 'status', 'param' => 'where', 'operator' => '', 'value' => '1');
        $params[] = array('field' => 'group_id', 'param' => 'where', 'operator' => '', 'value' => $group);

        $options['sortBy'] = 'sorter';
        $options['sortDirection'] = 'ASC';
        $filter['parent_id'] = $parent;
        $filter['status'] = 1;
        $filter['group_id'] = $group;
        $user = $this->user->id;
        $result = $this->query->get_query_grid("select * from app_menu where parent_id = $parent and status = 1 and group_id = $group order by sorter ASC");
//        $result = $this->query2->get_query_grid("select DISTINCT(id),menu_name,parent_id,group_id,menu_icon,type,sorter,status,action from app_menu where id in (select id_menu from akses_sdm_group 
//        left join akses_group_nama on akses_group_id = akses_sdm_group.asg_group_id
//        left join akses_nama on akses_nama_id = akses_nama.id
//        where asg_sdm_id = '$user' and status = 1) and parent_id = $parent and status = 1 and group_id = $group order by sorter ASC");
        foreach ($result as $row) {
            if ($row->type == 0) {
                $menu_list[] = array(
                    'id' => $row->id,
                    'text' => $row->menu_name,
                    'leaf' => FALSE,
                    'iconCls' => $row->menu_icon,
                    'panel' => $row->action,
                    'expanded' => TRUE
                );
            } else {
                $menu_list[] = array(
                    'id' => $row->id,
                    'text' => $row->menu_name,
                    'leaf' => TRUE,
                    'iconCls' => $row->menu_icon,
                    'panel' => $row->action,
                    'expanded' => FALSE
                );
            }
        }

        return $menu_list;
    }

    public function cek_akses_menu() {
//        $user = $this->user->id;
//        $id = $this->input->post('id');
//        $cek_menu = $this->query2->get_query("select count(*) as total from app_menu where id in (select id_menu from akses_sdm_group 
//        left join akses_group_nama on akses_group_id = akses_sdm_group.asg_group_id
//        left join akses_nama on akses_nama_id = akses_nama.id
//        where asg_sdm_id = '$user' and status = 1) and id = $id", 1)->total;
//        if ($cek_menu > 0) {
            echo json_encode(array('success' => 'true', 'data' => null, 'title' => 'Info', 'msg' => 'Berhasil'));
//        } else {
//            echo json_encode(array('success' => 'false', 'data' => null, 'title' => 'Info', 'msg' => 'Tidak Berhak'));
//        }
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */