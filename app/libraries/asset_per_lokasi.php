<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once 'master_laporan.php';
class Asset_per_lokasi extends Master_laporan 
{
	var $class_name		= 'asset_per_lokasi';
	var $model 			= ['setup/asset_item_lokasi','setup/asset_item'];

	function asset_per_lokasi()
	{
		parent::Master_laporan();
		
		// Inisialisasi
		$this->title 			= 'Asset Per Lokasi';
		$this->title_laporan 	= 'DAFTAR ASSET TETAP BERDASARKAN LOKASI';
		$this->user_id 			= $this->session->userdata('user_id');
		$this->modul 			= $this->uri->segment(1);
		$this->current_page 	= $this->modul.'/'.$this->class_name;
		// kolom
		$this->row_group		= ["kode_kelompok || ' - ' || nama_kelompok as row_group"=>['Row Group',1]];
		$this->column 			= [
									'row_number() over() as rownum'=>['NO',5],
									'kode_lokasi || \'.\' || kode_barang || \'.\' || no_reg as kode_aset'=>['Kode Aset',15],
									'nama_jenis_barang as nama_aset'=>['Nama Aset',25],
									'date_part(\'year\',tgl_perolehan ) as tahun_perolehan'=>['Tahun<br/>Perolehan',5],
									'asset_sumber_dana.sumber_dana as sumberdana'=>['Sumber Dana',10],
									'harga_perolehan'=>['Nilai<br/>Perolehan',15],
									'0::money as akumulasi_penyusutan'=>['Akumulasi<br/>Penyusutan',15],
									'harga_perolehan-0::money as nilai_buku'=>['Nilai<br/>Buku',15],
								];
		$this->sum_column		= ['harga_perolehan','akumulasi_penyusutan','nilai_buku'];
		$this->max_col 			= count($this->column);
		$this->merge_col		= ($this->max_col - count($this->sum_column));
	}	

	function excelize()
	{
		if($this->input->post('report')){
			$this->orientation	= $this->input->post('orientasi');
			$lokasi 			= $this->input->post('lokasi');

			if($lokasi == ''){
				echo '<h3>Anda belum memilih lokasi dengan benar.</h3>';
				exit;
			}
			else {
				$this->load->library('excel');
				$this->start_row = 10;
				$this->str_max_col 	= PHPExcel_Cell::stringFromColumnIndex($this->max_col-1);
				
				$get_group 			= $this->asset_item_lokasi->get_data(array('id_item_lokasi'=>$lokasi));
				$this->grouped_by	= ($get_group->num_rows() > 0) ? $get_group->row(0)->deskripsi_lokasi : '';

				// get data
				$this->asset_item->join();
				$arr_orderby 		= ["kode_kelompok"=>"asc","nama_kelompok"=>"asc"];
				$arr_select			= array_keys(array_merge($this->row_group,$this->column));
				$this->data_laporan = $this->asset_item->get_data(array('item_lokasi'=>$lokasi),$arr_orderby,$arr_select,false);
				$this->pg_model->unjoin();

				// set header 
				$this->excel->getActiveSheet()->setCellValue('A2','PEMERINTAH PROPINSI JAWA TIMUR')->mergeCells('A2:'.$this->str_max_col.'2')
											->setCellValue('A3',$this->title_laporan)->mergeCells('A3:'.$this->str_max_col.'3')
											->setCellValue('A4','Periode : '.$this->periode)->mergeCells('A4:'.$this->str_max_col.'4')
											->setCellValue('A5','Dicetak oleh : '.$this->user_active.' Tanggal : '.date('d-m-Y').' Jam : '.date('H:i'))->mergeCells('A5:'.$this->str_max_col.'5')
											->setCellValue('A6','Organisasi')->mergeCells('A6:B6')
											->setCellValue('C6',': RSUD. Dr. SAIFUL ANWAR MALANG')->mergeCells('C6:'.$this->str_max_col.'6')
											->setCellValue('A7','Lokasi Aset')->mergeCells('A7:B7')
											->setCellValue('C7',': '.$this->grouped_by)->mergeCells('C7:'.$this->str_max_col.'7')
											->setCellValue('A8','Lokasi')->mergeCells('A8:B8')
											->setCellValue('C8',': Jl. Jaksa Agung Suprapto No. 2 Malang')->mergeCells('C8:'.$this->str_max_col.'8');
				$header_table = [];
				foreach($this->column as $k => $v){
					$header_table[]	= preg_replace("/<br\/>/", "\r\n", $v[0]);
				}
				$this->excel->getActiveSheet()->fromArray($header_table,null,'A9',true);

				$this->excel->getActiveSheet()->getStyle('A9:'.$this->str_max_col.'9')->getAlignment()->setWrapText(true);
				$this->excel->getActiveSheet()->getStyle('A9:'.$this->str_max_col.'9')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('FFAECDF0');
				$this->_excelize();
			}
		}
	}
}