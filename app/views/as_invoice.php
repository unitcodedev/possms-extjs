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
        <title>Arus Stock Barang</title>
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
            <div id="invoice-title" class="as"> 
                <br/>
                <h2>ARUS STOCK <?php echo $barang_name; ?></h2> 
                <br/>
            </div> 
            <table id="invoice-amount"> 
                <thead> 
                    <tr id="header_row"> 
                        <th class="no_th">No</th> 
                        <th class="details_th">Nama Barang</th> 
                        <th class="quantity_th">Qty</th> 
                    </tr> 
                </thead> 
                <tbody>
                    <?php
                    foreach ($detail_tt as $value) {
                        ?>
                        <tr class="item"> 
                            <td class="item_l"><?php echo $value['no']; ?></td> 
                            <td class="item_l">
                                <strong><?php echo $value['barang_name']; ?></strong></br>
                                No. LOT : </br>
                                <?php echo $value['no_lot']; ?>
                            </td> 
                            <td class="item_c"><?php echo $value['barang_qty']; ?></td> 
                        </tr> 
                        <?php
                    }
                    ?>
                </tbody> 
            </table> 
            <!-- invoice-amount --> 
        </div> 
    </body>
</html>
