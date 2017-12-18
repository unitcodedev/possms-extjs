<?php // ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
    <head>
        <title>Surat</title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /><!--
-->        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/invoice/base.css'); ?>" media="screen" /><!--
-->        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/invoice/tranquility_print.css'); ?>" media="print" /><!--
-->        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/invoice/tranquility.css'); ?>" />
<!--        <script type="text/javascript">
            function printIt() {
                window.print();
                window.onfocus = function() {
                    window.close();
                };
            }
        </script>-->
    </head>
    <body >
<!--        background-image: url("paper.gif");-->
        <!--        <div class="section_footer">
                    <button class="button invoice_btn" onClick="printIt();">Print</button>
                </div>-->
        <div id="invoice"> 
            <div id="invoice-header">
                <img alt="Mainlogo_large" width="239" height="98" class="logo screen" src="<?php echo base_url('assets/img/app/citamulia.jpg'); ?>" />
                <img alt="Mainlogo_large" width="239" height="98" class="logo screen" src="<?php echo base_url('assets/img/app/background.png'); ?>" />
            </div>
            <div id="jarak" style="height: 120px;"></div>

            <div> 
                <?php echo $surat; ?>
            </div> 
        </div> 
    </body>
</html>
