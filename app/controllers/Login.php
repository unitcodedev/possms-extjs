<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
    class Login extends MX_Controller {
        
        function __construct() {
            //
            parent::__construct();
            if($this->acl->is_login()) redirect ('main');
        }
        //
        function index() {
            $this->html_headers->title = "Login";
            $this->html_headers->styles = array(
//                base_url() ."css/reset.css",
//                base_url() ."css/structure.css",
                base_url() ."css/login-box.css",
                base_url() ."css/style.css",
                base_url() ."css/niceforms-default.css"
                );
            $this->html_headers->scripts = array(
                base_url() . "js/jquery.min.js",
                base_url() . "js/ddaccordion.js",
                base_url() . "js/jconfirmaction.jquery.js",
                base_url() . "js/niceforms.js"
                
            );
            $output = array();
            if ($this->input->post('username')) {
                $search = array('sdm_id' => strtolower($this->input->post('username')), 'sdm_pass' => md5($this->input->post('pass')),
                                'sdm_status <>' => '4');
                $row = $this->query->get_table('sdm', $search);
                $count = $this->query->count_table('sdm', $search);
                $output['error'] = 'User tidak ada atau password salah';
                $output['last_query'] = $this->db->last_query();
                
                if ($count == 0) {
                    $this->load->view('view_login',$output);
                } 
                else 
                {

                    $session = array(
//                        'username' => $row->users_login,
                        'sdm_id' => $row->sdm_id,
                        'nama' => $row->sdm_nama,
                        'cabang' => $row->cab_id,
                        'is_logged_in' => true,
                        'cabang_kepentingan' => unserialize($row->sdm_cab_kepentingan));

                    $this->session->set_userdata($session);
                    redirect(site_url("main"));
                }
            } 
            else {
                $this->load->view('view_login',$output);
//                echo 'halo';
            }
          
            
        }
    }
?>
