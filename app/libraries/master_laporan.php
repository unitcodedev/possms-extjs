<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Master_laporan extends CI_Controller 
{
	var $user_id 		= null;
	var $modul 			= null;
	var $class_name		= 'master_laporan';
	var $current_page	= null;
	/*	@type Array Multidimensi
		@applied : var $column, var $row_group
		Format : ['Select' => [ 'Alias', Width]]
		Select : (String) Select statement used for query in database.
		Alias  : (String) Text displayed to user as table column.
		Width  : (Integer) Size of column width in %
	*/
	var $column 		= [];
	var $top_group		= [];
	var $row_group		= [];
	var $model 			= [];
	var $title 			= ''; // title pendek
	var $user_active	= ''; // user yang sedang aktif
	// content laporan
	var $title_laporan	= ''; // title pada laporan html
	var $is_periode_used	= true; // true jika menggunakan periode, false jika tidak menggunakan
	var $periode 		= ''; // isi periode pada header laporan
	var $max_col 		= 5; // jumlah kolom yang ditampilkan pada laporan
	var $is_spesific_header	= false; // false jika ingin format header tambahan standard, true jika ingin membuat format header tambahan sendiri
	var $header_tambahan= ''; // header tambahan
	var $table_header	= ''; // data html untuk tabel header
	var $table_body		= ''; // data html untuk isi laporan
	var $autowidth 		= false; // false = lebar kolom diset manual lewat data $column, true = lebar kolom auto
	var $orientation 	= 'portrait';
	var $ttd 			= ''; // format tanda tangan
	var $ttd_data 		= []; // array format tanda tangan

	// exceling
	var $excel_header	= null; // tidak digunakan
	var $data_laporan 	= null; // data hasil query
	var $start_row 		= 2; // baris dimulainya data
	var $i_header_pos	= 'A5'; // untuk mengatur letak style miring pada header excel
	var $t_header_row	= [9,9]; // Untuk mengatur kolom header di excel, array ke-0 => untuk row awal, ke-1 = untuk row akhir
	var $str_max_col	= '';
	var $sum_column	 	= []; // mengatur kolom di laporan yang akan dijumlah
	var $merge_col		= 0; // jumlah kolom yang digabung untuk subtotal dan grandtotal
	var $grouped_by 	= ''; // nama file tambahan untuk ekspor excel

	function master_laporan()
	{
		parent::__construct();
		$this->user_active 	= $this->session->userdata('name');
		// Load necessary lib
		foreach($this->model as $mod){
			$this->load->model($mod);
		}
	}

	function _excelize()
	{
		$this->_exe_limit();
		// load our new PHPExcel library
			$this->excel->getDefaultStyle()->getFont()->setName('Arial')->setSize(10);
			$this->excel->getProperties()->setCreator("Maestro Manajemen Nusantara");
		// Sheet 0
			$this->excel->setActiveSheetIndex(0);
			if($this->orientation == 'portrait'){ $this->excel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT); }
			else { $this->excel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE); }
			$this->excel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_FOLIO);
			$this->excel->getActiveSheet()->getPageSetup()->setHorizontalCentered(true);
			$this->excel->getActiveSheet()->getPageMargins()->setTop(0.5);
			$this->excel->getActiveSheet()->getPageMargins()->setRight(0.5);
			$this->excel->getActiveSheet()->getPageMargins()->setLeft(0.5);
			$this->excel->getActiveSheet()->getPageMargins()->setBottom(0.5);
			$this->excel->getActiveSheet()->setTitle(substr($this->title,0,25));
			
			$arr_row_group_style 	= [
				'font' => ['bold' => true],
				'fill' => ['type' => PHPExcel_Style_Fill::FILL_SOLID,'startcolor' => ['argb' => 'FFCCCCCC']]
			];

			$i = $this->start_row;
			if($this->data_laporan->num_rows() > 0)
			{
				$arr_data 		= [];
				$top_row 		= false;
				$parent_row 	= false;
				$gi 			= 0;
				$arr_subtotal	= [];
				$arr_total 		= [];
				// inisialisasi penjumlahan kolom
				if(count($this->sum_column) > 0){
					foreach($this->sum_column as $sc){
						$arr_total[$sc] 	= 0;
						$arr_subtotal[$sc] 	= [];
					}
				}
				$ii 	= 1;
				foreach($this->data_laporan->result_array() as $row)
				{
					$row['row_group'] 	= ($row['row_group'] == '') ? 'Tidak Terkelompok' : $row['row_group'];
					if(count($this->sum_column) > 0){
						foreach($this->sum_column as $sc){
							$arr_total[$sc]	+= clear_money_format($row[$sc]);
						}
					}
					
					if($parent_row != $row['row_group'] && count($this->row_group) > 0)
					{
						if($gi > 0){
							if(count($this->sum_column) > 0){
								$this->excel->getActiveSheet()->setCellValue('A'.$i,html_entity_decode('Subtotal &raquo;',ENT_QUOTES,'UTF-8'))->mergeCells('A'.$i.':'.PHPExcel_Cell::stringFromColumnIndex($this->merge_col-1).$i);
								$sub_row[$gi]	= [];
								foreach($this->sum_column as $sc){
									$sub_row[$gi][]		= $arr_subtotal[$sc][$gi];
								}
								$this->excel->getActiveSheet()->fromArray($sub_row[$gi],null,PHPExcel_Cell::stringFromColumnIndex($this->merge_col).$i,true);
								$this->excel->getActiveSheet()->getStyle('A'.$i.':'.$this->str_max_col.$i)->applyFromArray($arr_row_group_style);
								$i++;
							}
						}
						// cek if top_row is exist in $row
						if(array_key_exists('top_group', $row)){
							if($top_row != $row['top_group'] && count($this->top_group) > 0){
								$top_row = $row['top_group'];
								$this->excel->getActiveSheet()->setCellValue('A'.$i,$row['top_group'])->mergeCells('A'.$i.':'.$this->str_max_col.$i);
								$this->excel->getActiveSheet()->getStyle('A'.$i)->applyFromArray($arr_row_group_style);
								$i++;
							}
						}
						$parent_row = $row['row_group'];
						$this->excel->getActiveSheet()->setCellValue('A'.$i,$row['row_group'])->mergeCells('A'.$i.':'.$this->str_max_col.$i);
						$this->excel->getActiveSheet()->getStyle('A'.$i)->applyFromArray($arr_row_group_style);
						$gi++;
						$i++;
					}
					$rowdata[$i] = [];
					$j = 0;
					foreach($this->column as $k => $v)
					{
						if(preg_match("/ as /", $k)){
							$k	= end(explode(" as ", $k));
						}
						if(preg_match("/\./", $k)){
							$k	= end(explode(".", $k));
						}
						if($k == 'rownum') {
							$rowdata[$i][$j] = $ii;
							$j++; 
							continue;
						}
						$rowdata[$i][$j] 	= (preg_match("/tgl/", $k) && trim($row[$k]) != '') ? date_to_id($row[$k]) : ((preg_match("/\\$/",$row[$k])) ? clear_money_format($row[$k]) : (($row[$k] == 't') ? html_entity_decode('&#x2713;',ENT_QUOTES,'UTF-8') : $row[$k]));
						$j++;
					}
					$arr_data[] = $rowdata[$i];
					$this->excel->getActiveSheet()->fromArray($rowdata[$i],null,'A'.$i,true);

					if(count($this->sum_column) > 0){
						foreach($this->sum_column as $sc){
							if(array_key_exists($gi, $arr_subtotal[$sc]) == false) $arr_subtotal[$sc][$gi] = 0;
							$arr_subtotal[$sc][$gi]	+= clear_money_format($row[$sc]);
						}
					}
					$i++;
					$ii++;
				}
				if(count($this->sum_column) > 0){
					$this->excel->getActiveSheet()->setCellValue('A'.$i,html_entity_decode('Subtotal &raquo;',ENT_QUOTES,'UTF-8'))->mergeCells('A'.$i.':'.PHPExcel_Cell::stringFromColumnIndex($this->merge_col-1).$i);
					$sub_row[$i]	= [];
					foreach($this->sum_column as $sc){
						$sub_row[$i][]		= $arr_subtotal[$sc][$gi];
					}
					$this->excel->getActiveSheet()->fromArray($sub_row[$i],null,PHPExcel_Cell::stringFromColumnIndex($this->merge_col).$i,true);
					$this->excel->getActiveSheet()->getStyle('A'.$i.':'.$this->str_max_col.$i)->applyFromArray($arr_row_group_style);
					$i++;
					$this->excel->getActiveSheet()->setCellValue('A'.$i,html_entity_decode('Grand Total &raquo;',ENT_QUOTES,'UTF-8'))->mergeCells('A'.$i.':'.PHPExcel_Cell::stringFromColumnIndex($this->merge_col-1).$i);
					$sub_row[$i]	= [];
					foreach($this->sum_column as $sc){
						$sub_row[$i][]		= $arr_total[$sc];
					}
					$this->excel->getActiveSheet()->fromArray($sub_row[$i],null,PHPExcel_Cell::stringFromColumnIndex($this->merge_col).$i,true);
					$this->excel->getActiveSheet()->getStyle('A'.$i.':'.$this->str_max_col.$i)->applyFromArray($arr_row_group_style);
				}
			}
			$max_row_ttd 	= 9;
			if($this->ttd){
				$row_ttd	= [1=>[2,3,7,8,9],2=>[11,12,16,17,18]];
				foreach($this->ttd_data as $key => $val){
					$row 	= $row_ttd[$val['row']];
					$max_row_ttd 	= end($row);
					
					$this->excel->getActiveSheet()->setCellValue($val['start_cell'].($i+$row[0]),$val[0])->mergeCells($val['start_cell'].($i+$row[0]).':'.$val['end_cell'].($i+$row[0]));
					$this->excel->getActiveSheet()->setCellValue($val['start_cell'].($i+$row[1]),$val[1])->mergeCells($val['start_cell'].($i+$row[1]).':'.$val['end_cell'].($i+$row[1]));
					$this->excel->getActiveSheet()->setCellValue($val['start_cell'].($i+$row[2]),$val[2])->mergeCells($val['start_cell'].($i+$row[2]).':'.$val['end_cell'].($i+$row[2]));
					$this->excel->getActiveSheet()->setCellValue($val['start_cell'].($i+$row[3]),$val[3])->mergeCells($val['start_cell'].($i+$row[3]).':'.$val['end_cell'].($i+$row[3]));
					$this->excel->getActiveSheet()->setCellValue($val['start_cell'].($i+$row[4]),$val[4])->mergeCells($val['start_cell'].($i+$row[4]).':'.$val['end_cell'].($i+$row[4]));
					$this->excel->getActiveSheet()->getStyle($val['start_cell'].($i+$row[0]).':'.$val['end_cell'].($i+$row[4]))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				}
			}
		// Style
			$last_col 	= $this->excel->getActiveSheet()->getHighestColumn();
			$last_row 	= $this->excel->getActiveSheet()->getHighestRow();
			$this->excel->getActiveSheet()->getStyle('A2')->getFont()->setBold(true)
														  ->setName('Calibri')
														  ->setSize('12');
			$this->excel->getActiveSheet()->getStyle('A2:'.$this->str_max_col.'5')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			if($this->is_periode_used) {
				$this->excel->getActiveSheet()->getStyle('A2:A4')->getFont()->setBold(true); 
			} else { 
				$this->excel->getActiveSheet()->getStyle('A2:A3')->getFont()->setBold(true);
			}
			$this->excel->getActiveSheet()->getStyle($this->i_header_pos)->getFont()->setItalic(true);
			$this->excel->getActiveSheet()->getStyle('A'.$this->t_header_row[0].':'.$this->str_max_col.$this->t_header_row[1])->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$this->excel->getActiveSheet()->getStyle('A'.$this->t_header_row[0].':'.$this->str_max_col.$this->t_header_row[1])->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
			$this->excel->getActiveSheet()->getStyle('A'.$this->t_header_row[0].':'.$this->str_max_col.$this->t_header_row[1])->getFont()->setBold(true);
			$last_border_row 	= ($this->ttd) ? ($last_row - $max_row_ttd) : $last_row;
			$this->excel->getActiveSheet()->getStyle('A'.$this->t_header_row[0].':'.$this->str_max_col.$last_border_row)->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
			
			$ic = 0; // iterasi column
			foreach($this->column as $c)
			{
				$col_name = column_num($ic);
				$this->excel->getActiveSheet()->getColumnDimension($col_name)->setAutoSize(true);
				$ic++;
			}
		// Output
			$this->excel->output($this->excel,$this->title.' '.preg_replace("/\/|\.|,/"," ",trim($this->grouped_by)).'.xls'); 
			unset($this->excel);
			unset($data_aset);
			$this->pg_model->unjoin();
	}

	private function _exe_limit()
	{
		$this->db->query("set statement_timeout = 0");
		ini_set('memory_limit','1024M');
		ini_set('max_execution_time', 0);

		return;
	}
}
?>