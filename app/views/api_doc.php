<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <!--<title>PDC :: API Overview</title>-->

        <style type="text/css">

            ::selection{ background-color: #E13300; color: white; }
            ::moz-selection{ background-color: #E13300; color: white; }
            ::webkit-selection{ background-color: #E13300; color: white; }

            body {
                background-color: #fff;
                margin: 40px;
                font: 13px/20px normal Helvetica, Arial, sans-serif;
                color: #4F5155;
            }

            a {
                color: #003399;
                background-color: transparent;
                font-weight: normal;
            }

            h1 {
                color: #444;
                background-color: transparent;
                border-bottom: 1px solid #D0D0D0;
                font-size: 19px;
                font-weight: normal;
                margin: 0 0 14px 0;
                padding: 14px 15px 10px 15px;
            }

            code {
                font-family: Consolas, Monaco, Courier New, Courier, monospace;
                font-size: 12px;
                background-color: #f9f9f9;
                border: 1px solid #D0D0D0;
                color: #002166;
                display: block;
                margin: 5px 0 5px 0;
                padding: 2px 10px;
            }

            #body{
                margin: 0 15px 0 15px;
            }

            p.footer{
                text-align: right;
                font-size: 11px;
                border-top: 1px solid #D0D0D0;
                line-height: 32px;
                padding: 0 10px 0 10px;
                margin: 20px 0 0 0;
            }

            #container{
                margin: 10px;
                padding: 0px 0px 20px 0px;
                border: 1px solid #D0D0D0;
                -webkit-box-shadow: 0 0 8px #D0D0D0;
                -moz-box-shadow: 0 0 8px #D0D0D0;
            }

            ul.function-list li {
                margin: 0px 0px 15px 0px;
                padding: 0px 0px 0px 5px;
            }
        </style>
    </head>
    <body>

        <div id="container">

            <div id="body">
                <h2 style="margin:35px 0px 0px 0px">Data List</h2>
                <div style="padding: 0px 0px 0px 25px">
                    <h3>1. Login [Post]</h3>
                    <ul class="function-list">
                        <code><?php echo base_url(); ?>api/data/login</code>
                        <code># user : 10005</code>
                        <code># pass : password</code>
                    </ul>
                    <h3>2. Data Dokter[Post]</h3>
                    <ul class="function-list">
                        <code><?php echo base_url(); ?>api/data/mkt_dokter</code>
                        <code># user : 10005</code>
                        <code># cab : 1</code>
                        <code># bulan : 1 - 12</code>
                        <code># tahun : 2016</code>
                        <code># nama_dokter : [Jika Kosong Semua Dokter Keluar]</code>
                        <code># status : 1 / 2 [1 = Sekarang | 2 = Kemarin]</code>
                    </ul>
                    <h3>3. Data Dokter Single (Ps Sekarang per Kode Dokter) [Post]</h3>
                    <ul class="function-list">
                        <code><?php echo base_url(); ?>api/data/dokter</code>
                        <code># kode_dokter : D021458</code>
                        <code># cab : 2</code>
                        <code># bulan : 12</code>
                        <code># tahun : 2016</code>
                        <code># status : 1 / 2 [1 = Percabang | 2 = Semua Cabang]</code>
                    </ul>
                    <h3>4. Update Kunjungan [Post]</h3>
                    <ul class="function-list">
                        <code><?php echo base_url(); ?>api/data/update_kunjungan</code>
                        <code># kode_dokter : Kode Dokter [D021422]</code>
                        <code># bulan : Bulan [1 - 12]</code>
                        <code># tahun : Tahun [2016]</code>
                        <code># user : Username [10005]</code>
                        <code># masukkan : Masukkan dari Dokter</code>
                        <code># latitude : x</code>
                        <code># longitude : x</code>
                        <code># ket_det : Keterangan sembarang</code>
                    </ul>
                    <h3>5. Upload Data [Post]</h3>
                    <ul class="function-list">
                        <code><?php echo base_url(); ?>api/data/upload_ttd_post</code>
                        <code># kode_dokter : Kode Dokter [D021422]</code>
                        <code># bulan : Bulan [1 - 12]</code>
                        <code># tahun : Tahun [2016]</code>
                    </ul>
                </div>    
            </div>
        </div>

    </body>
</html>