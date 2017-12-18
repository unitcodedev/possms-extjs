<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title><?php echo $title; ?></title>
        <link rel="stylesheet" href="<?php echo base_url('assets/js/ext/resources/css/' . $css_theme); ?>.css" type="text/css" media="screen, projection">
        <link rel="stylesheet" href="<?php echo base_url('assets/js/ext/resources/css/' . $varian); ?>.css" type="text/css" media="screen, projection">
        <link rel="stylesheet" href="<?php echo base_url('assets/css/' . $page_css); ?>.css" type="text/css" media="screen, projection">
        <?php if ($icon_css != "") { ?>
            <link rel="stylesheet" href="<?php echo base_url('assets/css/' . $icon_css); ?>.css" type="text/css" media="screen, projection">
        <?php } ?>
        <script type="text/javascript" src="<?php echo base_url('assets/js/ext/ext-all.js'); ?>"></script>
        <?php if ($azr != "") { ?>
            <script type="text/javascript" src="<?php echo base_url('assets/js/ext/resources/js/' . $azr); ?>.js"></script>
        <?php } ?>

        <script type="text/javascript">
            var BASE_PATH = "<?php echo base_url(); ?>",
                    BASE_URL = "<?php echo base_url(); ?>",
                    USER_NAME = "<?php echo $logged_user; ?>",
                    VERSI_CI = "<?php echo $versi_ci; ?>",
                    CABANG_NAME = "<?php echo $cabang_name; ?>",
                    CABANG_ID = "<?php echo $cabang_id; ?>",
                    ID_KARY = "<?php echo $kar_id; ?>",
                    DATE_TODAY = "<?php echo date("l, d F Y"); ?>",
                    IP_ADDRESS = "<?php echo "IP ADDRESS : <b>" . $this->input->ip_address() . "</b>" ?>",
                    TTD_STRING = "<?php // echo $ttd_string;                 ?>",
                    NAMA_USER = "<?php echo $nama_user; ?>",
                    PERIODE_APP = "<?php echo $periode_week; ?>",
                    JASMED_REKANAN = "<?php echo $jasmed_rekanan; ?>",
                    JASMED_UMUM = "<?php echo $jasmed_umum; ?>",
                    TAB_BG = 'background:#3892D3;',
                    FORM_BG = "background:#F8F9F9;",
                    tinggi = 27,
<?php echo $menu; ?>
            USER_DIVISI = "<?php echo $divisi_id; ?>";

        </script>
        <script type="text/javascript" src="<?php echo base_url("assets/js/$app"); ?>.js"></script>

<!--        <link rel="icon" href="<?php // echo base_url("favicon.ico");                 ?>" type="image/gif">-->
        <script type="text/javascript">
            window.onbeforeunload = function () {
                return;
            }
        </script>


        <link rel="icon" href="<?php echo base_url("assets/img/favicon.png"); ?>" type="image/gif">

    </head>
    <body>
        <!--    <div id="fappletx" >
                <applet name="app1" code="portsapp.parwriter.class" archive="<?php echo base_url('assets/applet/portsapp.jar'); ?>">
                    <param name="portname" value="LPT1"/>
                </applet>
            </div> -->
    </body>
</html>