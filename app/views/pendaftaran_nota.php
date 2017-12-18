<html>
	<head>
		<style>
			/* Define page size. Requires print-area adjustment! */
			body {
				margin:     0;
				padding:    0;
				width:      17cm;
				height:     21cm;
				font-size:	12px;
			}
			/* Printable area */
			#print-area {
				position:   relative;
				top:        0cm;
				left:       0cm;
				width:      17cm;
				/*height:     27.6cm;*/
				height:     21cm;
				font-size:  12px;
				font-family: Helvetica, serif;
			}
			#versi{
				font-size: 12px;
				text-align: right;
			}
			#header{
				margin-top: 13mm; 
			}
			#header table{
				width: 100%;
				background: white;
				font-size: 15px;
				padding-bottom: 5px;
			}
			#tbl_header td:first-child{
				width: 30mm;
				vertical-align: text-top;
			} 
			#content table{
				border-collapse: collapse;
				width: 100%;
				font-size: 14px;
				margin-bottom: 10px;
			}
			#tbl_content1 thead td{
				border-top: #000 solid thin;
				border-bottom: #000 solid thin;
				border-width: 1px;
			}
			#tbl_content1 tbody tr.strong{
				border-top: #000 solid thin;
				border-bottom: #000 solid thin;
				border-width: 1px;
			}
			#tbl_content1 tbody{
				vertical-align: text-top;
				border-bottom: #000 solid thin;
			}
			#tbl_content1 tbody td:nth-child(1), #tbl_content1 tbody td:nth-child(5){
				width: 0.5cm;				
				text-align: left;
				/*border-bottom: #000 dotted thin;*/
			}
			#tbl_content1 tbody td:nth-child(2), #tbl_content1 tbody td:nth-child(6){
				width: 8cm;
				/*border-bottom: #000 dotted thin;*/
			}
			#tbl_content1 tbody td:nth-child(3), #tbl_content1 tbody td:nth-child(7){
				width: 1.5cm;
				text-align: right;
				/*border-bottom: #000 dotted thin;*/
				/*border-right: #000 solid thin;*/
			}
			#tbl_content1 tbody td:nth-child(4){
				width: 7mm;
			}
			#footer table{
				font-size: 13px;
				bottom:     0;
				width:      100%;				
				background: #ffffff;
			}
			#tbl_footer2 td:nth-child(1),#tbl_footer2 td:nth-child(7){
				width: 3cm;
			}
			#tbl_footer2 td:nth-child(2),#tbl_footer2 td:nth-child(5),#tbl_footer2 td:nth-child(8),#tbl_footer2 td:nth-child(12){
				width: 2mm;
				text-align: left;
			}
			#tbl_footer2 td:nth-child(3),#tbl_footer2 td:nth-child(6),#tbl_footer2 td:nth-child(9),#tbl_footer2 td:nth-child(12){
				width: 2cm;
				text-align: left;
			}
			#tbl_footer2 td:nth-child(4),#tbl_footer2 td:nth-child(10){
				width: 1cm;
			}

			.ligther{font-weight: lighter;}
			.strong{font-weight: bolder;}
			.caps_font{text-transform:uppercase;}
			.font_0{font-size: 10px;}
			.font_1{font-size: 11px;}
			.font_2{font-size: 12px;}
			.centered{text-align: center;}
			.align_right{text-align: right;}
		</style>
		<script type="text/javascript">
			window.onkeydown=function(o){
				o= o||event;
				if(o.keyCode == 27){ //escape char
					window.open('','_parent','');
					window.close();
				}}
		</script>
	</head>
	<body onload="window.print();window.focus();" >
		<div id="print-area">
			<div id="versi" class="align_right font_2">DP-P.03-PLY01/005 Rev.02.</div>
			<div id="header">
				<h1 class="centered	">NOTA PEMBAYARAN</h1>
				<table id="tbl_header">
					<tr>
						<td>No Lab / Reg	</td>
						<td>:</td>
						<td><label id="lab_id"><?php echo $lab_id ?></label> / <label id="pas_id"><?php echo $pas_id; ?></label></td>
						<td></td>
					</tr>
					<tr>	
						<td>Nama / Usia		</td>
						<td>:</td>
						<td><label id="pas_nama" ><?php echo "$pas_status $pas_nama"; ?></label> [<label id="pas_jenkelamin"><?php echo $pas_jenkelamin; ?></label>] / <label id="pas_usia"><?php echo $pas_usia; ?></label> thn.</td>
						<td></td>
					</tr>
					<tr>
						<td>Telp / HP		</td>
						<td>:</td>
						<td><label id="pas_telp"><?php echo $pas_telp; ?></label> / <label id="pas_hp"><?php echo $pas_hp; ?></label></td>
						<td>Rcpt : <?php echo "$fo_nama [$fo_id]"; ?></td>
					</tr>
					<tr>
						<td>Tgl				</td>
						<td>:</td>
						<td><label id="cek_tgl"><?php echo $cek_tgl; ?></label></td>
						<td></td>
					</tr>
					<tr>
						<td>Dokter			</td>
						<td>:</td>
						<td><label id="dok_gelar"><?php echo $dok_gelar; ?></label><label id="dok_nama" ><?php echo $dok_nama; ?></label> [<label id="dok_id"><?php echo $dok_id; ?></label>]</td>
						<td></td>
					</tr>
					<tr>
						<td>Rekanan			</td>
						<td>:</td>
						<td><label id="rek_nama"><?php echo $rek_nama; ?></label> [<label id="rek_id" ><?php echo $rek_id; ?></label>]</td>
						<td></td>
					</tr>
					<tr>
						<td>Alamat			</td>
						<td>:</td>
						<td colspan="2"><label id="pas_alamat"><?php echo $pas_alamat . ',' . $pas_kota; ?></label></td>
					</tr>
				</table>
			</div>

			<div id="content">
				<table id="tbl_content1">
					<thead>
						<tr class="strong">
							<td>NO</td><td>NAMA PEMERIKSAAN</td><td class="align_right">HARGA</td>
							<td>&nbsp;</td>
							<td>NO</td><td>NAMA PEMERIKSAAN</td><td class="align_right">HARGA</td>
						</tr>
					</thead>
					<tbody>
						<?php
						$counter = 0;
						foreach ($content_kiri as $row_ki):
							echo '<tr>';
							echo '<td>' . $row_ki->kiri_no . '.</td><td>' . $row_ki->kiri_namapx . '</td><td>' . number_format($row_ki->kiri_hargapx) . '</td>';
							echo '<td>&nbsp;</td>';
							if ($counter < count($content_kanan)) {
								$arr_row_ka = array_slice($content_kanan, $counter, 1, true); //get single row
								foreach ($arr_row_ka as $row_ka) {
									echo '<td>' . $row_ka->kanan_no . '.</td><td>' . $row_ka->kanan_namapx . '</td><td>' . number_format($row_ka->kanan_hargapx) . '</td>';
								}
							} else {
								echo '<td></td><td></td><td></td>';
							}
							echo '</tr>';
							$counter++;
						endforeach;

						//=== halaman kedua
						if (count($content_kiri2) > 0) {
							for ($i = 0; $i < 17; $i++) {
								echo '<tr>';
								echo '<td>&nbsp;</td><td></td><td></td>';
								echo '<td></td><td></td><td></td>';
								echo '</tr>';
							}
							echo '<tr class="strong">
								<td>NO</td><td>NAMA PEMERIKSAAN</td><td class="align_right">HARGA</td>
								<td>&nbsp;</td>
								<td>NO</td><td>NAMA PEMERIKSAAN</td><td class="align_right">HARGA</td>
								</tr>';
							$counter = 0;
							foreach ($content_kiri2 as $row_ki):
								echo '<tr>';
								echo '<td>' . $row_ki->kiri_no . '.</td><td>' . $row_ki->kiri_namapx . '</td><td>' . number_format($row_ki->kiri_hargapx) . '</td>';
								echo '<td>&nbsp;</td>';
								if ($counter < count($content_kanan2)) {
									$arr_row_ka = array_slice($content_kanan2, $counter, 1, true); //get single row
									foreach ($arr_row_ka as $row_ka) {
										echo '<td>' . $row_ka->kanan_no . '.</td><td>' . $row_ka->kanan_namapx . '</td><td>' . number_format($row_ka->kanan_hargapx) . '</td>';
									}
								} else {
									echo '<td></td><td></td><td></td>';
								}
								echo '</tr>';
								$counter++;
							endforeach;
						}
						?>
					</tbody>
				</table>
				<table id="tbl_content2">
					<tr>
						<td>Harga Pemeriksaan</td><td></td><td class="align_right"><label id="cek_harga"><?php echo number_format(floatval($cek_harga)); ?></label></td>
					</tr>
					<tr>
						<td>Discount</td><td></td><td class="align_right"><label id="cek_discount"><?php echo number_format(floatval($cek_discount)); ?></label></td>
					</tr>
					<tr>
						<td>Harga Akhir</td><td></td><td class="align_right"><label id="cek_harganet"><?php echo number_format(floatval($cek_harganet)); ?></label></td>
					</tr>
					<tr>
						<?php
						if (floatval($cek_kurangbayar) > 0) {
							echo '<td colspan="2" class="caps_font strong align_right">' . $jenis_bayar . '</td><td class="align_right">' . number_format(floatval($cek_kurangbayar)) . '</td>';
						} else {
							echo '<td colspan="3" class="caps_font strong centered">' . $jenis_bayar . '</td>';
						}
						?>

					</tr>
				</table>
			</div>
			<div id="footer" >
				<table id="tbl_footer1">
					<tr>
						<td>NB :</td><td> -</td><td>Nota ini harap dibawa saat pengambilan hasil pemeriksaan</td>
					</tr>
					<tr>
						<td></td><td> -</td><td>Hasil pemeriksaan <label id="diantar_ke" class="caps_font strong"><?php echo $diantar_ke; ?></label></td>
					</tr>
					<tr>
						<td colspan="3"><label id="alamat_antar"  class="caps_font strong"><?php echo $cek_alamatantar; ?></label></td>
					</tr>
				</table>
				<table id="tbl_footer2">
					<tr>
						<td>Selesai tanggal	</td><td>:</td><td>............</td>
						<td>Jam				</td><td>:</td><td>............</td>
						<td>Menyusul tanggal</td><td>:</td><td>............</td>
						<td>Jam				</td><td>:</td><td>......</td>
					</tr>
					<tr>
						<td>Pemeriksaan		</td><td>:</td><td>............</td>
						<td>Jam				</td><td>:</td><td>............</td>
						<td>				</td><td></td><td></td>
						<td>				</td><td></td><td></td>
					</tr>
				</table>
				<table id="tbl_footer3">
					<tr>
						<td>-</td><td>Hasil harap diambil paling lambat 1 (satu) minggu setelah Janji Hasil</td>
					</tr>
					<tr>
						<td>-</td><td>Pemeriksaan yang tidak dilakukan dalam 14 hari dianggap batal dan uang tidak dikembalikan</td>
					</tr>
					<tr class="align_right">
						<td>&nbsp;</td>
						<td><label id="ttd_kota"><?php echo $ttd_kota; ?></label>,
							<label id="ttd_tgl"><?php echo $ttd_tgl; ?></label>&nbsp;&nbsp;[<label id="ttd_jam"><?php echo $ttd_jam; ?></label>]</td>
					</tr>
					<tr>
						<td>&nbsp;</td><td></td>
					</tr>
					<tr class="align_right">
						<td></td><td>printed by : <label id="ttd_user_nama" class="strong caps_font"><?php echo $ttd_user_nama; ?></label> [<label id="ttd_user_id"  class="strong caps_font"><?php echo $ttd_user_id; ?></label>]</td>
					</tr>
					<tr>
						<td colspan="2" class="centered">*** Semoga Sehat Selalu ***</td>
					</tr>
					<tr>
						<td colspan="2" class="centered">Point Anda saat ini <?php echo $hitung_point; ?></td>
					</tr>
				</table>
			</div><!-- end of #footer-->
		</div><!-- end of #print-area-->
	</body>
</html>
