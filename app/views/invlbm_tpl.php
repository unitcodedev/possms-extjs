<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate'); // HTTP/1.1
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
?>
<!doctype html>
<html>
    <head>
        <meta charset=utf-8>
        <title>Safety Stock</title>
        <link rel="stylesheet" href="<?php echo base_url('assets/css/invoice_print.css'); ?>" type="text/css" media="print">
        <link rel="stylesheet" href="<?php echo base_url('assets/css/invoice_screen.css'); ?>" type="text/css"
              media="screen, projection">
        <script type="text/javascript">
            function printIt() {
                window.print();
                window.onfocus = function() {
                    window.close();
                };
            }
        </script>
        <style>
            body {
                margin-top: -10px;
            }

            html {
                overflow: -moz-scrollbars-vertical;
            }
        </style>
    </head>
    <body>
        <div class="section_footer">
            <button class="button invoice_btn" onClick="printIt();">Print</button>
        </div>
        <div class="container-l">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td width="50%" style="padding:10px"><img width="200" src="<?php echo base_url('assets/img/logo.png'); ?>"></td>
                    <td valign="top"  style="padding:10px;text-align: right">
                        <h2 style="margin-bottom:0px">LAPORAN PENERIMAAN BARANG INVENTARIS</h2><br />
                        <strong>DIVISI <?php echo $divisi; ?>, RUANG <?php echo $ruang; ?></strong><br />
                        <strong>CABANG <?php echo $cabang; ?>, <?php echo mdate('%d/%F/%Y', strtotime($tgl_awal)); ?> s.d <?php echo mdate('%d/%F/%Y', strtotime($tgl_akhir)); ?></strong>
                    </td>
                </tr>
            </table>
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td align="center" style="padding:0px 0px 10px 0px"><?php echo $data; ?></td>
                </tr>
                </tr>
            </table>

            <table class="item_cont" cellpadding="0" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th width='20'>NO</th>
                        <th width='50'>TGL.KELUAR</th>
                        <th width='200'>NAMA BARANG</th>
                        <th width='50'>JUMLAH</th>
                        <th width='75'>CABANG ASAL</th>
                        <th width='75'>DIVISI ASAL</th>
                        <th width='75'>DIVISI RUANGAN</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $no = "1";
                    foreach ($d as $v) {
                        ?>
                        <tr>
                            <td class="itemno" style="border-bottom: 1px solid #333;padding: 3px 7px">
                                <?php
                                echo $no;
                                ?>
                            </td>
                            <td class="item" style="border-bottom: 1px solid #333;padding: 3px 7px">
                                <?php
                                echo mdate('%d/%M/%Y', strtotime($v['tgl_trx']));
                                ?>
                            </td>
                            <td class="item" style="border-bottom: 1px solid #333;padding: 3px 7px">
                                <?php
                                echo strtoupper($v['item_name']);
                                ?>
                            </td>
                            <td align="center" class="item" style="border-bottom: 1px solid #333;padding: 3px 7px">
                                <?php
                                echo $v['qty'];
                                ?>
                            </td>
                            <td align="center" class="item" style="border-bottom: 1px solid #333;padding: 3px 7px">
                                <?php
                                echo strtoupper($v['divisi_cbname']);
                                ?>
                            </td>
                            <td align="center" class="item" style="border-bottom: 1px solid #333;padding: 3px 7px">
                                <?php
                                echo strtoupper($v['divisi_asalname']);
                                ?>
                            </td>
                            <td align="center" class="item" style="border-bottom: 1px solid #333;padding: 3px 7px">
                                <?php
                                echo strtoupper($v['ruang_asalname']);
                                ?>
                            </td>
                        </tr>
                        <?php
                        $no++;
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </body>
</html>
