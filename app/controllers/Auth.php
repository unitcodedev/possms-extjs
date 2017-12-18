<?php

/**
 * Description of auth
 *
 * @author Isht.Ae
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Auth extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Shared_model');
    }

    public function index() {
//        $this->load->model('query2');
//        $this->query2->db2 = $this->load->database('second', TRUE);
        $data['title'] = 'POS SMS - Login';
        $data['app'] = 'login';
        $data['css_theme'] = "azzurra/azzurra-core";
        $data['varian'] = "azzurra/azzurra-ui-all";
        $data['azr'] = "azzurra";
        $data['page_css'] = "login_css";
        $data['icon_css'] = "";
        $data['logged_user'] = "";
        $data['cabang_name'] = "";
        $data['cabang_id'] = "0";
        $data['ttd_string'] = '';
        $data['divisi_id'] = '0';
        $data['nama_user'] = '';
        $data['nama_user'] = '';
        $data['jasmed_rekanan'] = 0;
        $data['jasmed_umum'] = 0;
        $data['versi_ci'] = CI_VERSION;
        $data['periode_week'] = '';
        $data['kar_id'] = "0";
        $menu = array('menu1', 'menu3', 'menu3');
        $menu_val = '';
        foreach ($menu as $value) {
            $menu_val .= "$value = 1,";
        }
        $data['menu'] = $menu_val;
        $this->load->view('app_page', $data);
    }

    public function login() {
        $username = $this->input->post('username', TRUE);
        $password = $this->input->post('password', TRUE);
        $remember = (bool) $this->input->post('remember');

        if ($this->ion_auth->login($username, $password, $remember)) {
//            log_message($this->ion_auth->login($username, $password, $remember));
            $user = $this->ion_auth->user()->row();
            $this->Shared_model->generate_user_log($user->id, $user->mk_cabang, 'LOGIN', '');
            echo "{success:true}";
        } else {
            $error = $this->ion_auth->errors();
            echo '{success:false,  msg: "' . $error . '"}';
        }
    }

    public function logout() {
        $user = $this->ion_auth->user()->row();
        $this->Shared_model->generate_user_log($user->id, $user->mk_cabang, 'LOGOUT', '');

        $this->ion_auth->logout();
        //redirect them to the login page
        redirect('auth', 'refresh');
    }

}
