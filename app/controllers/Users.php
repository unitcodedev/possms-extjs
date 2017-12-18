<?php

/**
 * Description of auth
 *
 * @author Isht.Ae
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Users extends Auth_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('Users_model');
		$this->load->model('ion_auth_model');
    }

    public function index() {
        $data = $this->user;

        unset($data->ip_address);
        unset($data->password);
        unset($data->salt);
        unset($data->activation_code);
        unset($data->forgotten_password_code);
        unset($data->forgotten_password_time);
        unset($data->remember_code);
        unset($data->created_on);
        unset($data->last_login);
        unset($data->active);
        unset($data->cabang_id);
        unset($data->divisi_id);
        unset($data->ttd_status);
        echo json_encode(array('success' => 'true', 'data' => $data));
    }

    function edit_profile() {
	
        //$id = $this->input->post('id');
		//$user = $this->query->get_detail('');
		//$pass = $this->ion_auth_model->hash_password($this->input->post('password'), $user->salt);
		//$update = $this->ion_auth->update($id, array('password' => $this->input->post('password')));
		//$update = $this->db->update('ms_karyawan', array('password' => $pass), array('id' => $id));
        //$this->ion_auth->update($id, array('password' => 'testing'));
		//if ($update) {
		//echo $update;
		//echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => $update));
		//} else {
        //echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => $update));
		//}
		$id = $this->user->id;
		$data = array();
		$data['password'] = $this->input->post('password');
        $this->ion_auth->update($id, $data);
		log_message('error', $this->db->last_query());
        echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Password Berhasil di Update'));
    
    }

    function edit_profiless() {
        $id = $this->input->post('id');
        $user = $this->ion_auth->user($id)->row();

//        //validate form input
        $this->form_validation->set_rules('first_name', 'First Name', 'required|xss_clean');
        $this->form_validation->set_rules('last_name', 'Last Name', 'xss_clean');
        $this->form_validation->set_rules('username', 'Username', 'required|xss_clean');
        $this->form_validation->set_rules('email', 'Email', 'valid_email|xss_clean');
        $this->form_validation->set_rules('phone', 'Phone', 'xss_clean');
//
        if (isset($_POST) && !empty($_POST)) {

            $data = array(
                'username' => $this->input->post('username'),
                'first_name' => $this->input->post('first_name'),
                'last_name' => $this->input->post('last_name'),
                'email' => $this->input->post('email'),
                'phone' => $this->input->post('phone'),
            );

            //update the password if it was posted
            if ($this->input->post('password')) {
                $this->form_validation->set_rules('password', $this->lang->line('edit_user_validation_password_label'), 'required|min_length[' . $this->config->item('min_password_length', 'ion_auth') . ']|max_length[' . $this->config->item('max_password_length', 'ion_auth') . ']|matches[password_confirm]');
                $this->form_validation->set_rules('password_confirm', $this->lang->line('edit_user_validation_password_confirm_label'), 'required');

                $data['password'] = $this->input->post('password');
            }

            if ($this->form_validation->run() === TRUE) {
                $this->ion_auth->update($user->id, $data);
                echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Profile Updated'));
            } else {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Fill the form correctly'));
            }
        }
    }

    public function check_username() {
        $val = $this->input->post('value');
        $id = $this->input->post('id');

        if ($id == 0) {
            if (!$this->ion_auth->username_check($val)) {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Username available'));
            } else {
                echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Username already used'));
            }
        } else {
            $user = $this->ion_auth->user($id)->row();
            if ($user->username == $val) {
                echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Username available'));
            } else {
                if (!$this->ion_auth->username_check($val)) {
                    echo json_encode(array('success' => 'true', 'data' => NULL, 'message' => 'Username available'));
                } else {
                    echo json_encode(array('success' => 'false', 'data' => NULL, 'message' => 'Username already used'));
                }
            }
        }
    }

    public function upload_ttd_user($field) {
        if ($this->user->ttd_status == 1) {
            echo '{success:false, message: "Anda Tidakk bisa mengganti Tanda Tangan. Hubungi Admin."}';
            return FALSE;
        }

        if ($_FILES[$field]['name'] != "signNull.png") {
            echo '{success:false, message: "Tanda Tangan Salah, Ulangi Lagi"}';
            return FALSE;
        }

        $config['upload_path'] = './assets/img_data/user_ttd/';
        $config['allowed_types'] = 'png';
        $config['file_name'] = 'sign' . $this->user->id . '.png';
//        $config['max_size'] = '20';
//        $config['max_width'] = '300';
//        $config['max_height'] = '150';
        $config['overwrite'] = TRUE;
        $config['remove_spaces'] = TRUE;
        $config['allowed_types'] = 'png';

        $this->load->library('upload', $config);

        if ($this->upload->do_upload($field)) {
            $data_apl = $this->upload->data();
            $this->update_ttd_status($this->user->id);
            echo '{success:true, message: "Upload Selesai", url: "assets/img_data/user_ttd/sign' . $this->user->id . $data_apl['file_ext'] . '"}';
        } else {
            $msg = json_encode($this->upload->display_errors('<p>', '</p>'));

            echo '{success:false, message: "' . $msg . '"}';
        }
    }

    function update_ttd_status($param) {
        $status = array(
            'ttd_url' => 'assets/img_data/user_ttd/sign' . $this->user->id . '.png',
            'ttd_status' => 1
        );

        $record[] = array('field' => 'id', 'param' => 'where', 'operator' => '', 'value' => $param);
        $this->Users_model->update($status, $record, NULL, 'app_users');
        return TRUE;
    }

}
