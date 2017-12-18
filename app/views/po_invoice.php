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
                <div class="vcard" id="company-address"> 
                    <div class="fn org" style="font-size: 13pt"><strong><?php echo $type; ?></strong></div> 
                </div> 
                <!-- company-address vcard --> 
            </div> 
            <!-- #invoice-header --> 
            <div id="invoice-title"> 
                <br/>
                <h2>Purchase Order</h2> 
                <br/>
            </div> 
            <div id="invoice-info"> 
                <h2><strong><?php echo $po_no; ?></strong></h2> 
                <h3><?php echo $po_tgl; ?></h3> 
                <p id="payment-due">Expired by <?php echo $po_ed; ?></p> 
                <h3>PDC <?php echo $po_cabang == "PUSAT" ? $po_cabang : "CABANG " . $po_cabang; ?><br/><?php echo $po_add; ?></h3> 

            </div> 
            <!-- #invoice-info --> 
            <div class="vcard" id="client-details"> 
                <div class="locality">Kepada Yth. </div> 
                <div class="fn">REKANAN SUPPLIER</div> 
                <div class="org"><?php echo $po_company; ?></div> 
                <div class="adr"> 
                    <div class="street-address">
                        <?php echo $po_company_add; ?><br/> 
                    </div> 
                    <!-- street-address --> 
                    <div id="your-tax-number"><?php echo $po_company_cp; ?></div>
                </div> 
                <!-- adr --> 
            </div> 
            <!-- #client-details vcard --> 
            <div id="invoice-ket2"> 
                <p style="font-size: 8.5pt;padding-bottom: 10px">
                    Dengan Hormat, <br/>
                    Bersama ini kami ajukan pemesanan barang dengan perincian sebagai berikut :
                </p>
            </div> 
            <table id="invoice-amount"> 
                <thead> 
                    <tr id="header_row"> 
                        <th class="no_th">No</th> 
                        <th class="details_th">Nama Barang</th> 
                        <th class="merk_th">Merk</th> 
                        <th class="katalog_th">Katalog</th> 
                        <th class="merk_th">Kems.</th> 
                        <th class="quantity_th">Qty</th> 
                        <th class="unitprice_th">Harga</th> 
                        <th class="disc_th">Disc.</th> 
                        <th class="ppn_th">PPN</th> 
                        <th class="subtotal_th">Sub Total</th> 
                        <th class="desc_th">Keterangan</th> 
                    </tr> 
                </thead> 
                <tfoot> 
                    
                    <tr id="total_tr"> 
                        <td colspan="7">&nbsp;</td> 
                        <td colspan="2" class="total" id="total_currency">Total</td> 
                        <td class="total"><?php echo number_format($total, 2); ?> 
                        
                        <td>&nbsp;</td> 
                    </tr> 
                </tfoot> 
                <tbody>
                    
                    <?php
                    //print_r($detail_po);
                    $konter = 1;
                    
                    foreach ($detail_po as $value) {
                        ?>
                        
                        <tr class="item"> 
                            <td class="item_l"><?php echo $konter; ?></td> 
                            <td class="item_l"><?php echo $value->detpo_brgnama; ?></td> 
                            <td class="item_l"><?php echo $value->detpo_brgmerk; ?></td> 
                            <td class="item_l"><?php echo $value->detpo_brgkatalog; ?></td> 
                            <td class="item_l"><?php echo $value->nama_satuan; ?></td> 
                            <td class="item_c"><?php echo $value->detpo_jumlah; ?></td> 
                            <td class="item_r"><?php echo number_format($value->detpo_hargasatuan, 2); ?></td> 
                            <td class="item_c"><?php echo $value->detpo_disc + $value->detpo_discplus .' %'; ?></td> 
                            <td class="item_c"><?php echo $value->detpo_ppn .' %'; ?></td> 
                            <td class="item_r"><?php echo number_format($value->detpo_total, 2); ?></td> 
                            <td class="item_l"><?php echo $value->detpo_keterangan; ?></td> 
                        </tr> 
                        
                        <?php
                        $konter ++;
                    }
                    ?>
                </tbody> 
            </table> 
            <!-- invoice-amount --> 
            <div id="invoice-ket2"> 
                
                <p style="font-size: 8.5pt;padding-bottom: 10px">
                    Mohon Pesanan tersebut dapat kami terima paling lambat tanggal <?php echo $po_ed; ?><br/>
                    Pembayaran : <?php echo $pembayaran; ?> 
                </p>
            </div> 
            <table id="invoice-sign" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td align="center" width="25%">
                        <span style="float: left;padding-left: 50px">Hormat kami,</span><br/>
                        <span style="float: left;padding-left: 50px">PARAHITA DIAGNOSTIC CENTER</span> <br/><br/>
                        <div class="sign"><img width="60%" src="<?php echo base_url($create_ttd); ?>"><br /><strong><?php echo $create_name; ?></strong></div>
                        <div class="hr"></div>
                        BAGIAN PEMBELIAN
                    </td>
                    <td align="center" width="25%">
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                        Menyetujui,<br/><br/>
                        <div class="sign"><img width="60%" src="<?php echo base_url($app_ttd); ?>"><br /><strong><?php echo $app_name; ?></strong></div>
                        <div class="hr"></div>
                        MANAGER
                    </td>
                    <td align="center" width="25%">
                        <span style="float: left;padding-left: 30px">&nbsp;</span><br/>
                        Mengetahui,<br/><br/>
                        <div class="sign"><br /><br /><br /><br /><br /><br /></div>
                        <div class="hr"></div>
                        <strong>&nbsp;</strong>
                    </td>
                </tr>
            </table>
            <!-- payment-details --> 
            <div id="comments">Catatan : Mohon nota dilampirkan saat pengiriman barang dan penagihan. </div> 
            <!-- comments --> 
        </div> 
    </body>
</html>
