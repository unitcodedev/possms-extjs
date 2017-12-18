<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past 
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate'); // HTTP/1.1 
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
    <head>
        <title>Purchase Order Parahita</title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/invoice/base.css'); ?>" media="screen" />
        <!-- Base Stylesheet do not change or remove -->
        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/invoice/tranquility_print.css'); ?>" media="print" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/invoice/tranquility.css'); ?>" />
        <!-- Remove this and add your own invoice styles -->
        <script type="text/javascript">
            function printIt() {
                window.print();
                window.onfocus = function() {
                    window.close();
                };
            }
        </script>
    </head>
    <body> 
        <div class="section_footer">
            <button class="button invoice_btn" onClick="printIt();">Print</button>
        </div>
        <div id="invoice"> 
            <div id="invoice-header">
                <img alt="Mainlogo_large" class="logo screen" src="<?php echo base_url('assets/img/app/logo_invoice.jpg'); ?>" /> 
                <!-- hCard microformat --> 
                
                <!-- company-address vcard --> 
            </div> 
            <!-- #invoice-header --> 
            <div id="invoice-title" style='width:500px;'> 
                <br/>
                <h2><center>LAPORAN PENGELUARAN BARANG DIVISI</center></h2> 
                <br/>
            </div> 
            <div id="invoice-info"> 
                <strong>DIVISI <?php echo $divisi; ?>, RUANG <?php echo $ruang; ?></strong><br />
                        <strong>CABANG <?php echo $cabang; ?>, <?php echo mdate('%d/%F/%Y', strtotime($tgl_awal)); ?> s.d <?php echo mdate('%d/%F/%Y', strtotime($tgl_akhir)); ?></strong>

            </div> 
            
            <table id="invoice-amount"> 
                <thead> 
                    <tr id="header_row"> 
                        <th class="no_th">NO</th> 
                        <th class="merk_th">TGL.KELUAR</th> 
                        <th class="merk_th">NO. KELUAR</th> 
                        <th class="details_th">NAMA BARANG</th> 
                        <th class="katalog_th">JUMLAH</th> 
                        <th class="merk_th">DIVISI TUJUAN</th> 
                        <th class="quantity_th">DIVISI RUANGAN</th> 
                     
                    </tr> 
                </thead> 
                
                <tbody>
                    <?php
                    $no = "1";
                    foreach ($d as $v) {
                        ?>
                        <tr class="item"> 
                            <td class="item_l"><?php echo $no; ?></td> 
                            <td class="item_l"><?php echo mdate('%d/%M/%Y', strtotime($v['tgl_trx'])); ?></td> 
                            <td class="item_l"><?php echo strtoupper($v['no_keluar']); ?></td> 
                            <td class="item_l"><?php echo strtoupper($v['item_name']); ?></td> 
                            <td class="item_l"><?php echo $v['qty']; ?></td> 
                            <td class="item_l"><?php echo strtoupper($v['divisi_tjname']); ?></td> 
                            <td class="item_c"><?php echo strtoupper($v['ruang_tjname']); ?></td> 
                            
                        </tr> 
                        <?php
                        $no++;
                    }
                    ?>
                </tbody> 
            </table> 
            <!-- invoice-amount --> 
           
        </div> 
    </body>
</html>
