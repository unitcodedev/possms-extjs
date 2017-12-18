/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetFoPendaftaran', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'fopendaftaran.CabangStore',
        'fopendaftaran.DaftarSdmStore',
        'fopendaftaran.TelisaJenisStore',
        'fopendaftaran.ListPemeriksaanStore',
        'fopendaftaran.ListPasienInputStore',
        'fopendaftaran.MasterPemeriksaanStore',
        'fopendaftaran.MasterPasienStore',
        'fopendaftaran.MasterRekananStore',
        'fopendaftaran.MasterRekananPenagihanStore',
        'fopendaftaran.MasterDokterStore',
        'fopendaftaran.MasterDokterPenagihanStore',
        'fopendaftaran.BankStore',
        'fopendaftaran.JenisKartuBankStore',
        'fopendaftaran.NomorEDCStore',
        'fopendaftaran.FoPaketPemeriksaanStore',
        'fopendaftaran.FoDetailPaketPemeriksaanStore',
        'fopendaftaran.ListDataPasienSementaraStore',
        'fopendaftaran.MasterPersyaratanPaketStore',
        'fopendaftaran.FoCariDataPasienPemeriksaanStore',
    ],
    views: [
        'fopendaftaran.GetFoPendaftaran',
//        'fopendaftaran.FoPendaftaranForm',
//        'fopendaftaran.FoHeaderPendaftaranForm',
        'fopendaftaran.FoPendaftaranGrid',
//        'fopendaftaran.FoPasienInputGrid',
//        'fopendaftaran.ListPasienWin',
//        'fopendaftaran.ListRekananWin',
//        'fopendaftaran.ListRekananGrid',
//        'fopendaftaran.ListRekananPenagihanWin',
        'fopendaftaran.KasirBayarWin',
//        'fopendaftaran.ListRekananPenagihanGrid',
//        'fopendaftaran.ListDokterWin',
//        'fopendaftaran.ListDokterGrid',
//        'fopendaftaran.ListDokterPenagihanWin',
//        'fopendaftaran.ListDokterPenagihanGrid',
//        'fopendaftaran.ListPasienGrid',
//        'fopendaftaran.MsPasienActionWin',
//        'fopendaftaran.FoApproveDiscountByWin',
//        'fopendaftaran.ListPasienSementaraWin',
//        'fopendaftaran.ListDataPasienSementaraGrid',
//        'fopendaftaran.ListPersyaratanPaketGrid',
//        'fopendaftaran.ListPersyaratanPaketWin',
//        'fopendaftaran.InputDokterBaruWin',
//        'fopendaftaran.FoCariDataPasienFormWin',
//        'fopendaftaran.FoCariDataPasienPemeriksaanGrid',
//        'fopendaftaran.PrintWin',
//        'fopendaftaran.FoApproveBelumBayarWin',
//        'fopendaftaran.FoApproveBawaTabungWin',
    ],
    refs: [
        
    ],
    init: function () {
        this.control({
            '#fopendaftaranform button[action=NewPdftrn]': {
                click: function () {
                    this.ResetFormPendaftaran();
                }
            },
            '#fopendaftaranform button[action=SavePdftrn]': {
                click: function () {
                    Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(true);
                    var form = this.getFoPendaftaranForm().getForm(),
                            //Cek Pemabayaran
                            hrg_net = form.findField('jumlah_netto').getValue() / 100 * 75,
                            hrg_netnet = form.findField('jumlah_netto').getValue(),
                            hrg_byr = form.findField('dibayar').getValue(),
                            daftar_pembayaran = form.findField('daftar_pembayaran').getGroupValue();
                    if (Ext.getCmp('daftar_tipekirim1').getValue() === true || Ext.getCmp('daftar_tipekirim2').getValue() === true) {
                        // Tunai
                        if (daftar_pembayaran === 1) {
                            if (form.findField('cek_approve_bayarkurang').getValue() === false) {
                                if (hrg_byr <= hrg_net) {
                                    Ext.MessageBox.show({
                                        title: 'Error',
                                        msg: 'Pembayaran Minimal Harus 75% [<b>' + this.convertToRupiah(hrg_net) + '</b>] <br> Jika Mau Melanjutkan Harus Ada Persetujuan SPV',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                    Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                                    return;
                                }
                            }
                        } else if (daftar_pembayaran === 3) {
                            if (form.findField('cek_approve_bayarkurang').getValue() === false) {
                                if (hrg_byr !== hrg_netnet) {
                                    Ext.MessageBox.show({
                                        title: 'Error',
                                        msg: 'Pembayaran Harus 100% [<b>' + this.convertToRupiah(hrg_netnet) + '</b>] <br> Jika Mau Melanjutkan Harus Ada Persetujuan SPV',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                    Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                                    return;
                                }
                            }
                        } else if (daftar_pembayaran === 4) {
                            if (form.findField('cek_approve_bayarkurang').getValue() === false) {
                                if (hrg_byr !== hrg_netnet) {
                                    Ext.MessageBox.show({
                                        title: 'Error',
                                        msg: 'Pembayaran Harus 100% [<b>' + this.convertToRupiah(hrg_netnet) + '</b>] <br> Jika Mau Melanjutkan Harus Ada Persetujuan SPV',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                    Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                                    return;
                                }
                            }
                        }
                    }
//                    alert('Ucul');
//                    Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
//                    return;
                    var grid = this.getFoPendaftaranGrid(),
                            grid_persyaratan = this.getListPersyaratanPaketGrid();
                    var keluhan = form.findField('formanamnesa_keluhan').getValue();
                    var makan = form.findField('formanamnesa_jammakan').getValue();
                    var konsumsiobat = form.findField('formanamnesa_konsumsiobat').getValue();
                    var riwayatpenyakit = form.findField('formanamnesa_riwayatpenyakit').getValue();
                    var pas_id = form.findField('pas_id').getValue();
                    if (Ext.getCmp('daftar_tipekirim2').getValue() === true && Ext.getCmp('kode_dokter').getValue() === '') {
                        alert('Nama Dokter Belum Dipilih');
                        Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                        return;
                    }
                    if ((Ext.getCmp('daftar_tipekirim3').getValue() === true || Ext.getCmp('daftar_tipekirim4').getValue() === true) && Ext.getCmp('kode_rekanan').getValue() === '') {
                        alert('Nama Rekanan Belum Dipilih');
                        Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                        return;
                    }
                    if (form.findField('jenis_umur').getValue() === '2') {
                        if (form.findField('umur').getValue() == '') {
                            alert('Umur Belum Diisi');
                            Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                            return;
                        }
                    }
                    if (form.findField('jenis_kelamin').getValue() === '') {
                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: 'Jenis Kelamin Belum di Isi',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                        Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                        return;
                    }
                    if (Ext.getCmp('daftar_tipekirim1').getValue() === true) {
                        if (keluhan === '' || makan === '' || konsumsiobat === '' || riwayatpenyakit === '') {
                            Ext.MessageBox.show({
                                title: 'Error',
                                msg: 'Mohon Form Anamnesa Dilengkapi',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                            Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                            return;
                        }
                    }
                    if (pas_id === '') {
                        alert('Mohon Form Dilengkapi Terlebih Dahulu');
                        Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                        return;
                    }
                    if (form.findField('daftar_pembayaran').getGroupValue() === 1 && form.findField('dibayar').getValue() === 0) {
                        Ext.MessageBox.show({
                            title: 'Peringatan',
                            msg: 'Data Pembayaran 0 Apakah Proses Dilanjutkan ??',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function (btn) {
                                if (btn == "no") {
                                    Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                                    return;
                                }
                            }
                        }
                        );
//                        return;
                    }
//                    daftar_pembayaran
//                    Ext.MessageBox.show({
//                        title: 'Peringatan',
//                        msg: 'Data Pembayaran 0 Apakah Proses Dilanjutkan ??',
//                        buttons: Ext.Msg.YESNO,
//                        icon: Ext.Msg.QUESTION,
//                        fn: function (btn) {
//                            if (btn == "no") {
//                                Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
//                                return;
//                            }
//                            if (btn == "yes") {
                    var box = Ext.MessageBox.show({
                        title: 'Tunggu',
                        msg: 'Proses Simpan......!!!!',
                        wait: true,
                        waitConfig: {interval: 200},
                        animateTarget: 'waitButton',
                        buttonText: {
                            cancel: 'Batal'
                        }
                    });
                    var jenis_kartu = '';
                    var nomor_edc = '';
                    if (form.findField('daftar_pembayaran').getGroupValue() === 4) {
                        jenis_kartu = form.findField('jenis_kartu').getValue();
                        nomor_edc = form.findField('nomor_edc').getValue();
                    } else if (form.findField('daftar_pembayaran').getGroupValue() === 3) {
                        jenis_kartu = 0;
                        nomor_edc = form.findField('nomor_edc').getValue();
                    } else {
                        jenis_kartu = 0;
                        nomor_edc = 0;

                    }
                    Ext.Ajax.request({
                        url: BASE_PATH + 'pendaftaran/save_daftar',
                        method: 'POST',
                        waitMsg: 'Wait..',
                        clientValidation: false,
                        params:
                                {
                                    gr: Ext.JSON.encode(Ext.pluck(grid.getStore().data.items, 'data')),
                                    persyaratan: Ext.JSON.encode(Ext.pluck(grid_persyaratan.getStore().data.items, 'data')),
                                    pas_id: form.findField('pas_id').getValue(),
                                    jenis_discount: form.findField('jenis_discount').getValue(),
                                    info_discount: form.findField('info_discount').getValue(),
                                    nama_pasien: form.findField('nama_pasien').getValue(),
                                    jenis_kelamin: form.findField('jenis_kelamin').getValue(),
                                    tgl_lahir: form.findField('tgl_lahir').getValue(),
                                    status: form.findField('status').getValue(),
                                    no_hp: form.findField('no_hp').getValue(),
                                    no_tlfnrumah: form.findField('no_tlfnrumah').getValue(),
                                    alamat: form.findField('alamat').getValue(),
                                    kota: form.findField('kota').getValue(),
                                    discount: form.findField('discount_persen').getValue(),
                                    // Pengirim
                                    daftar_tipekirim1: Ext.getCmp('daftar_tipekirim1').getValue(),
                                    daftar_tipekirim2: Ext.getCmp('daftar_tipekirim2').getValue(),
                                    daftar_tipekirim3: Ext.getCmp('daftar_tipekirim3').getValue(),
                                    daftar_tipekirim4: Ext.getCmp('daftar_tipekirim4').getValue(),
                                    nama_rekanan: Ext.getCmp('nama_rekanan').getValue(),
                                    kode_rekanan: Ext.getCmp('kode_rekanan').getValue(),
                                    id_rekanan: Ext.getCmp('id_rekanan').getValue(),
                                    nama_dokter: Ext.getCmp('nama_dokter').getValue(),
                                    kode_dokter: Ext.getCmp('kode_dokter').getValue(),
                                    id_dokter: Ext.getCmp('id_dokter').getValue(),
                                    // Pembayaran
                                    daftar_pembayaran: form.findField('daftar_pembayaran').getGroupValue(),
                                    // -- Tunai
                                    jumlah_netto: form.findField('jumlah_netto').getValue(),
                                    jumlah_bruto: form.findField('jumlah_bruto').getValue(),
                                    dibayar: form.findField('dibayar').getValue(),
                                    kurang_bayar: form.findField('kurang_bayar').getValue(),
                                    // -- Ditagihkan
                                    daftar_penagihan: form.findField('daftar_penagihan').getGroupValue(),
                                    nama_dokterpenagihan: form.findField('nama_dokterpenagihan').getValue(),
                                    kode_dokterpenagihan: form.findField('kode_dokterpenagihan').getValue(),
                                    id_dokterpenagihan: form.findField('id_dokterpenagihan').getValue(),
                                    nama_rekananpenagihan: form.findField('nama_rekananpenagihan').getValue(),
                                    kode_rekananpenagihan: form.findField('kode_rekananpenagihan').getValue(),
                                    id_rekananpenagihan: form.findField('id_rekananpenagihan').getValue(),
                                    // -- Debet / Kredit / Transfer
                                    no_transaksi: form.findField('no_transaksi').getValue(),
                                    no_kartu: form.findField('no_kartu').getValue(),
                                    bank_parahita: form.findField('mesin_edc').getValue(),
                                    // Pengiriman Hasil
//                                    fohasildikirim: form.findField('fohasildikirim').getGroupValue(),
//                                    type_kirimhasil: form.findField('daftar_statushasil').getGroupValue(),
                                    fostatushasil_diambil: Ext.getCmp('fostatushasil_diambil').getValue(),
                                    fostatushasil_dikirim: Ext.getCmp('fostatushasil_dikirim').getValue(),
                                    fostatushasil_diemail: Ext.getCmp('fostatushasil_diemail').getValue(),
                                    fostatushasil_fax: Ext.getCmp('fostatushasil_fax').getValue(),
                                    fostatushasil_sms: Ext.getCmp('fostatushasil_sms').getValue(),
                                    fostatushasil_dikirim_rumah: Ext.getCmp('fostatushasil_dikirim_rumah').getValue(),
                                    fostatushasil_dikirim_kantor: Ext.getCmp('fostatushasil_dikirim_kantor').getValue(),
                                    fostatushasil_dikirim_dokter: Ext.getCmp('fostatushasil_dikirim_dokter').getValue(),
                                    alamat_rumah: form.findField('alamat_rumah').getValue(),
                                    alamat_kantor: form.findField('alamat_kantor').getValue(),
                                    alamat_dokter: form.findField('alamat_dokter').getValue(),
                                    alamat_email: form.findField('alamat_email').getValue(),
                                    alamat_fax: form.findField('alamat_fax').getValue(),
                                    alamat_sms: form.findField('alamat_sms').getValue(),
                                    // Anamnesa
                                    formanamnesa_keluhan: form.findField('formanamnesa_keluhan').getValue(),
                                    formanamnesa_jammakan: form.findField('formanamnesa_jammakan').getValue(),
                                    formanamnesa_konsumsiobat: form.findField('formanamnesa_konsumsiobat').getValue(),
                                    formanamnesa_riwayatpenyakit: form.findField('formanamnesa_riwayatpenyakit').getValue(),
                                    formanamnesa_riwayatalergi: form.findField('formanamnesa_riwayatalergi').getValue(),
                                    formanamnesa_penyakitkeluarga: form.findField('formanamnesa_penyakitkeluarga').getValue(),
                                    // Status Pendaftaran
//                                    fostatuspasiendaftar: form.findField('fostatuspasiendaftar').getValue(),
                                    idpersetujuandisc: form.findField('idpersetujuandisc').getValue(),
                                    keterangan: form.findField('keterangan').getValue(),
                                    jenis_umur: form.findField('jenis_umur').getValue(),
                                    kode_karyawan: form.findField('kode_karyawan').getValue(),
                                    umur: form.findField('umur').getValue(),
                                    cek_discount: form.findField('cek_discount').getValue(),
                                    idpas_temp: form.findField('idtrx_pas').getValue(),
                                    cito: grid.down('#pendaftarancito').getValue(),
                                    sample: grid.down('#pendaftaransample').getValue(),
                                    // List Pasien Grid
                                    cek_homeservice: form.findField('cek_homeservice').getValue(),
                                    petugas_homeservice: form.findField('petugas_homeservice').getValue(),
                                    no_lab_siprama: form.findField('no_lab_siprama').getValue(),
                                    // BPJS
                                    bpjs: form.findField('bpjs').getValue(),
                                    no_ktp: form.findField('no_ktp').getValue(),
                                    no_kk: form.findField('no_kk').getValue(),
                                    no_bpjs: form.findField('no_bpjs').getValue(),
                                    nomor_edc: nomor_edc,
                                    jenis_kartu: jenis_kartu,
                                    no_lab_baru: form.findField('no_lab').getValue(),
                                    verifikasi_kurangbayar: form.findField('id_approve_bayarkurang').getValue(),
                                    bawa_tabung: grid.down('#pendaftarantabung').getValue(),
                                    sdmbawa_tabung: grid.down('#sdm_pendaftarantabung').getValue(),
                                    paket: Ext.getCmp('fopaket_pemeriksaan').getValue(),
                                },
                        scope: this,
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);
                            if (resp.success === 'true') {
                                box.hide();
                                Ext.MessageBox.show({
                                    title: resp.title,
                                    msg: resp.msg,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                                Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                                var winprint = Ext.widget('fopendaftaran.printwin');
                                winprint.down('#formActionPendaftaranPrint').getForm().findField('no_lab').setValue(resp.no_lab)
                                this.ResetFormPendaftaran();
                            } else {
                                box.hide();
                                Ext.MessageBox.show({
                                    title: resp.title,
                                    msg: resp.msg,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                                Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
                            }
                        }
                    });
                    Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);

                }
            },
            '#fopendaftaranform button[action=mtNew]': {
                click: function () {
                    var form = this.getFoPendaftaranForm().getForm(),
                            grid = this.getFoPendaftaranGrid();

                    form.reset();
                    grid.getSelectionModel().clearSelections();
                    if (CABANG_ID !== '1') {
                        grid.getStore().load();
                    }
                }
            },
            '#foanamnesaformwin_simpan': {
                click: function () {
                    var formutama = this.getFoPendaftaranForm().getForm();
                    var formuanamnesa = this.getFormAnamnesaWin().getForm();
                    formutama.findField('formanamnesa_keluhan').setValue(formuanamnesa.findField('formanamnesa_keluhan').getValue());
                    formutama.findField('formanamnesa_jammakan').setValue(formuanamnesa.findField('formanamnesa_jammakan').getValue());
                    formutama.findField('formanamnesa_konsumsiobat').setValue(formuanamnesa.findField('formanamnesa_konsumsiobat').getValue());
                    formutama.findField('formanamnesa_riwayatpenyakit').setValue(formuanamnesa.findField('formanamnesa_riwayatpenyakit').getValue());
                    formutama.findField('formanamnesa_riwayatalergi').setValue(formuanamnesa.findField('formanamnesa_riwayatalergi').getValue());
                    formutama.findField('formanamnesa_penyakitkeluarga').setValue(formuanamnesa.findField('formanamnesa_penyakitkeluarga').getValue());
                    this.getFoAnamnesaFormWin().close();
                }
            },
            '#fopendaftaranform button[action=ActionWinFormAnamnesa]': {
                click: function () {
                    var win = Ext.widget('fopendaftaran.foanamnesaformwin');
                    var formutama = this.getFoPendaftaranForm().getForm();
                    var formuanamnesa = this.getFormAnamnesaWin().getForm();
                    formuanamnesa.findField('formanamnesa_keluhan').setValue(formutama.findField('formanamnesa_keluhan').getValue());
                    formuanamnesa.findField('formanamnesa_jammakan').setValue(formutama.findField('formanamnesa_jammakan').getValue());
                    formuanamnesa.findField('formanamnesa_konsumsiobat').setValue(formutama.findField('formanamnesa_konsumsiobat').getValue());
                    formuanamnesa.findField('formanamnesa_riwayatpenyakit').setValue(formutama.findField('formanamnesa_riwayatpenyakit').getValue());
                    formuanamnesa.findField('formanamnesa_riwayatalergi').setValue(formutama.findField('formanamnesa_riwayatalergi').getValue());
                    formuanamnesa.findField('formanamnesa_penyakitkeluarga').setValue(formutama.findField('formanamnesa_penyakitkeluarga').getValue());

                }
            },
            '#listpasiengrid button[action=CariPasien]': {
                click: function () {
                    var grid1 = Ext.getCmp('listpasiengrid'),
                            store1 = grid1.getStore(),
                            filterCollection = [];
                    var statusFilter = new Ext.util.Filter({
                        property: 'pendaftaran_cari_pasien',
                        value: Ext.getCmp('pendaftarancari_datapusat').getValue() + '-' + Ext.getCmp('textCariPasien').getValue() + '-' + Ext.getCmp('typeCariPasien').getValue()
                    });
                    filterCollection.push(statusFilter);
                    store1.clearFilter(true);
                    store1.filter(filterCollection);
                }
            },
            '#listrekanangrid button[action=CariRekanan]': {
                click: function () {
                    var grid1 = Ext.getCmp('listrekanangrid'),
                            store1 = grid1.getStore(),
                            filterCollection = [];
                    var statusFilter = new Ext.util.Filter({
                        property: 'pendaftarancari_master_rekanan',
                        value: Ext.getCmp('pendaftarancarirekananpengirim_datapusat').getValue() + '-' + Ext.getCmp('textCariRekanan').getValue() + '-' + Ext.getCmp('typeCariRekanan').getValue()
                    });
                    filterCollection.push(statusFilter);
                    store1.clearFilter(true);
                    store1.filter(filterCollection);
                }
            },
            '#listdoktergrid button[action=CariDokter]': {
                click: function () {
                    var grid1 = Ext.getCmp('listdoktergrid'),
                            store1 = grid1.getStore(),
                            filterCollection = [];
                    var statusFilter = new Ext.util.Filter({
                        property: 'pendaftarancari_master_dokter',
                        value: Ext.getCmp('pendaftarancaridokterpengirim_datapusat').getValue() + '-' + Ext.getCmp('textCariDokter').getValue() + '-' + Ext.getCmp('typeCariDokter').getValue()
                    });
                    filterCollection.push(statusFilter);
                    store1.clearFilter(true);
                    store1.filter(filterCollection);
                }
            },
            '#listdoktergrid button[action=TambahDokterBaru]': {
                click: function () {
                    var win = Ext.widget('fopendaftaran.inputdokterbaruwin');
                }
            },
            '#ButtonSimpanDokterBaru': {
                click: function () {
                    this.SimpanDataDokterBaru();
                }
            },
            '#listrekananpenagihangrid button[action=CariRekananPenagihan]': {
                click: function () {
                    var grid1 = Ext.getCmp('listrekananpenagihangrid'),
                            store1 = grid1.getStore(),
                            filterCollection = [];
                    var pusat = grid1.down('#pendaftarancarirekananpenagihan_datapusat').getValue();
                    var statusFilter = new Ext.util.Filter({
                        property: 'pendaftaranpenagihan_master_rekanan',
                        value: pusat + '-' + Ext.getCmp('textCariRekananPenagihan').getValue() + '-' + Ext.getCmp('typeCariRekananPenagihan').getValue()
                    });
                    filterCollection.push(statusFilter);
                    store1.clearFilter(true);
                    store1.filter(filterCollection);
                }
            },
            '#listdokterpenagihangrid button[action=CariDokterPenagihan]': {
                click: function () {
                    var grid1 = Ext.getCmp('listdokterpenagihangrid'),
                            store1 = grid1.getStore(),
                            filterCollection = [];
                    var pusat = grid1.down('#pendaftarancaridokterpenagihan_datapusat').getValue();
                    var statusFilter = new Ext.util.Filter({
                        property: 'pendaftaranpenagihan_master_dokter',
                        value: pusat + '-' + Ext.getCmp('textCariDokterPenagihan').getValue() + '-' + Ext.getCmp('typeCariDokterPenagihan').getValue()
                    });
                    filterCollection.push(statusFilter);
                    store1.clearFilter(true);
                    store1.filter(filterCollection);
                }
            },
            '#listpasiengrid button[action=TambahPasien]': {
                click: function () {
                    var win = Ext.widget('fopendaftaran.mspasienactionwin');
                }
            },
            '#mspasienactionwin_simpan': {
                click: function () {
                    var form = Ext.getCmp('formmspasienactionwin').getForm(),
                            grid = Ext.getCmp('listpasiengrid');
                    Ext.Ajax.request({
                        url: BASE_PATH + 'pendaftaran/simpan_px',
                        method: 'POST',
                        params: form.getValues(),
                        scope: this,
                        callback: function (options, success, response) {
                            var resp = Ext.decode(response.responseText);
                            if (resp.success === 'true') {
                                Ext.MessageBox.show({
                                    title: resp.title,
                                    msg: "Proses Simpan Berhasil !!",
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                                var form1 = this.getFoPendaftaranForm().getForm();
                                if (resp.data.umur === 0) {
                                    form1.findField('jenis_umur').setValue('1');
                                    form1.findField('tgl_lahir').show();
                                    form1.findField('umur').hide();
                                } else {
                                    form1.findField('jenis_umur').setValue('2');
                                    form1.findField('umur').show();
                                    form1.findField('tgl_lahir').hide();
                                }
                                form1.findField('nama_pasien').setValue(resp.data.pas_nama);
                                form1.findField('jenis_kelamin').setValue(resp.data.pas_jenkelamin);
                                form1.findField('tgl_lahir').setValue(resp.data.pas_tgllahir);
//                                form1.findField('tgl_lahir').show();
                                form1.findField('no_hp').setValue(resp.data.pas_hp);
                                form1.findField('no_tlfnrumah').setValue(resp.data.pas_telp);
                                form1.findField('alamat').setValue(resp.data.pas_alamat);
                                form1.findField('kota').setValue(resp.data.pas_kota);
                                form1.findField('status').setValue(resp.data.pas_status);
                                form1.findField('pas_id').setValue(resp.data.pas_id);
                                form1.findField('nama_pasien').setReadOnly(false);
                                form1.findField('jenis_kelamin').setReadOnly(false);
                                form1.findField('jenis_kelamin').setEditable(false);
                                form1.findField('jenis_umur').setReadOnly(false);
                                form1.findField('jenis_umur').setEditable(false);
//                                form1.findField('tgl_lahir').setReadOnly(false);
                                form1.findField('no_hp').setReadOnly(false);
                                form1.findField('no_tlfnrumah').setReadOnly(false);
                                form1.findField('alamat').setReadOnly(false);
                                form1.findField('kota').setReadOnly(false);
                                form1.findField('status').setReadOnly(false);
                                form1.findField('status').setEditable(false);
                                form1.findField('pas_id').setReadOnly(false);
                                form1.findField('umur').setValue(resp.data.umur);
                                form1.findField('umur').setReadOnly(false);
                                form.reset();
                                Ext.getCmp('mspasienactionwin').close();
                                Ext.getCmp('listpasienwin').close();
                                grid.getSelectionModel().clearSelections();
                                grid.getStore().load();
                            } else {
                                Ext.MessageBox.show({
                                    title: resp.title,
                                    msg: resp.msg,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                                grid.getSelectionModel().clearSelections();
                            }
                        }
                    });
                }
            },
            '#listpasiengrid': {
                itemdblclick: function (dv, record, item, index, e) {
                    var form = this.getFoPendaftaranForm().getForm(),
                            grid = this.getListPasienGrid(),
                            sel = grid.getSelectionModel().getSelection();
                    if (sel[0].get('umur') === '') {
                        form.findField('jenis_umur').setValue('1');
                        form.findField('tgl_lahir').show();
                        form.findField('umur').hide();
                    } else {
                        form.findField('jenis_umur').setValue('2');
                        form.findField('umur').show();
                        form.findField('tgl_lahir').hide();
                    }
                    form.findField('nama_pasien').setValue(sel[0].get('pas_nama'));
                    form.findField('jenis_kelamin').setValue(sel[0].get('pas_jenkelamin'));
                    form.findField('tgl_lahir').setValue(sel[0].get('pas_tgllahir'));
                    form.findField('umur').setValue(sel[0].get('umur'));
                    form.findField('no_hp').setValue(sel[0].get('pas_hp'));
                    form.findField('no_tlfnrumah').setValue(sel[0].get('pas_telp'));
                    form.findField('alamat').setValue(sel[0].get('pas_alamat'));
                    form.findField('kota').setValue(sel[0].get('pas_kota'));
                    form.findField('status').setValue(sel[0].get('pas_status'));
                    form.findField('pas_id').setValue(sel[0].get('pas_id'));
                    form.findField('nama_pasien').setReadOnly(false);
                    form.findField('jenis_kelamin').setReadOnly(false);
                    form.findField('tgl_lahir').setReadOnly(false);
                    form.findField('no_hp').setReadOnly(false);
                    form.findField('no_tlfnrumah').setReadOnly(false);
                    form.findField('alamat').setReadOnly(false);
                    form.findField('kota').setReadOnly(false);
                    form.findField('status').setReadOnly(false);
                    form.findField('pas_id').setReadOnly(false);
                    Ext.getCmp('listpasienwin').close();
                }
            },
            '#listrekanangrid': {
                itemdblclick: function (dv, record, item, index, e) {
                    var form = this.getFoPendaftaranForm().getForm(),
                            grid = this.getListRekananGrid(),
                            sel = grid.getSelectionModel().getSelection();
                    Ext.getCmp('id_rekanan').setValue(sel[0].get('id'));
                    Ext.getCmp('kode_rekanan').setValue(sel[0].get('kode_rekanan'));
                    Ext.getCmp('nama_rekanan').setValue(sel[0].get('nama_rekanan'));
                    form.findField('alamat_kantor').setValue(sel[0].get('alamat_rekanan') + sel[0].get('kota_rekanan')),
                            Ext.getCmp('listrekananwin').close();
                    var filterCollection = [];
                    var statusFilter = new Ext.util.Filter({
                        property: 'fopaket_pemeriksaan',
                        value: sel[0].get('kode_rekanan')
                    });
                    filterCollection.push(statusFilter);
                    Ext.getCmp('fopaket_pemeriksaan').getStore().clearFilter(true)
                    Ext.getCmp('fopaket_pemeriksaan').getStore().filter(filterCollection);

                }
            },
            '#listdoktergrid': {
                itemdblclick: function (dv, record, item, index, e) {
                    var form = this.getFoPendaftaranForm().getForm(),
                            grid = this.getListDokterGrid(),
                            sel = grid.getSelectionModel().getSelection();
                    Ext.getCmp('kode_dokter').setValue(sel[0].get('kode_dokter'));
                    Ext.getCmp('nama_dokter').setValue(sel[0].get('nama_dokter'));
                    Ext.getCmp('id_dokter').setValue(sel[0].get('id_dokter'));
                    form.findField('alamat_dokter').setValue(sel[0].get('md_alamat_praktek1') + sel[0].get('md_kota_1'));
                    if (Ext.getCmp('daftar_tipekirim4').getValue() === true) {

                    } else {
                        var filterCollection = [];
                        var statusFilter = new Ext.util.Filter({
                            property: 'fopaket_pemeriksaan',
                            value: sel[0].get('kode_dokter') + '-' + 1
                        });
                        filterCollection.push(statusFilter);
                        Ext.getCmp('fopaket_pemeriksaan').getStore().clearFilter(true)
                        Ext.getCmp('fopaket_pemeriksaan').getStore().filter(filterCollection);
                    }
                    Ext.getCmp('listdokterwin').close();
                }
            },
            '#listdokterpenagihangrid': {
                itemdblclick: function (dv, record, item, index, e) {
                    var form = this.getFoPendaftaranForm().getForm(),
                            grid = this.getListDokterPenagihanGrid(),
                            sel = grid.getSelectionModel().getSelection();
                    form.findField('nama_dokterpenagihan').setValue(sel[0].get('nama_dokter'));
                    form.findField('kode_dokterpenagihan').setValue(sel[0].get('kode_dokter'));
                    form.findField('id_dokterpenagihan').setValue(sel[0].get('id_dokter'));
                    Ext.getCmp('listdokterpenagihanwin').close();
                }
            },
            '#listrekananpenagihangrid': {
                itemdblclick: function (dv, record, item, index, e) {
                    var form = this.getFoPendaftaranForm().getForm(),
                            grid = this.getListRekananPenagihanGrid(),
                            sel = grid.getSelectionModel().getSelection();
                    form.findField('nama_rekananpenagihan').setValue(sel[0].get('nama_rekanan'));
                    form.findField('kode_rekananpenagihan').setValue(sel[0].get('kode_rekanan'));
                    form.findField('id_rekananpenagihan').setValue(sel[0].get('id_rekanan'));
                    Ext.getCmp('listrekananpenagihanwin').close();
                }
            },
            '#fopendaftaranform button[action=ActionWinCekDiscount]': {
                click: function () {
                    var formutama = this.getFoPendaftaranForm();
                    var win = Ext.widget('fopendaftaran.foapprovediscountbywinby');
                }
            },
            '#foapprovediscountbywinby_simpan': {
                click: function () {
                    this.ApproveDiscount();
                }
            },
            '#Button_PasienSementara': {
                click: function () {
                    var win = Ext.widget('fopendaftaran.listpasiensementarawin');
                    var grid = this.getListDataPasienSementaraGrid();
                    grid.store.loadData([], false);
                }
            },
            '#listdatapasiensementaragrid button[action=CariDataPasienSementara]': {
                click: function () {
                    this.CariDataPasienSementara();
                }
            },
            '#listdatapasiensementaragrid': {
                itemdblclick: function (dv, record, item, index, e) {
                    this.InsertFieldPasienSementara();
                }
            },
            '#fopendaftaranform button[action=ActionWinFormPersyaratan]': {
                click: function () {
//                    this.getListPersyaratanPaketWin().close();
                    var win = Ext.widget('fopendaftaran.listpersyaratanpaketwin');
                    var grid = this.getListPersyaratanPaketGrid();
                    var store = grid.getStore(),
                            filterCollection = [];
                    var statusFilter = new Ext.util.Filter({
                        property: 'pendaftaran_persyaratanpaket',
                        value: Ext.getCmp('fopaket_pemeriksaan').getValue()
                    });
                    filterCollection.push(statusFilter);
                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            },
            '#listpersyaratanpaketgrid button[action=PersyaratanSave]': {
                click: function () {
                    this.getListPersyaratanPaketWin().close();
                }
            },
            '#fopendaftaranform button[action=PrintNotaPdftrn]': {
                click: function () {
                    this.printNota('02150900607');
                }
            },
        });
    },
    getDetail: function () {
        var grid = this.getFoPendaftaranGrid()
        var store = grid.getStore();
        var str = '';
        for (var i = 0; i < store.getCount(); i++) {
            str += (i > 0 ? '\n' : '') +
                    store.getAt(i).data['kode_pemeriksaan'] + '\t' +
                    store.getAt(i).data['nama_pemeriksaan'] + '\t' +
                    store.getAt(i).data['harga_pemeriksaan'] + '\t' +
                    store.getAt(i).data['diskon_pemeriksaan'] + '\t' +
                    store.getAt(i).data['netto_pemeriksaan'];
        }

        return str;
    },
    InsertFieldPasienSementara: function () {
        var form = this.getFoPendaftaranForm().getForm(),
                grid = this.getListDataPasienSementaraGrid(),
                sel = grid.getSelectionModel().getSelection();
        var status = grid.down('#pendaftarancaripassementara_datapusat').getValue();
        var jenis_pasien = grid.down('#ListDataPasienSementara_Jenis').getValue();
        var pusat;
        if (status === true) {
            pusat = '1' + '-' + sel[0].get('idtrx_pas')
        } else {
            pusat = '0' + '-' + sel[0].get('idtrx_pas')
        }
        form.findField('idtrx_pas').setValue(pusat);
        form.findField('no_lab').setValue(sel[0].get('nolab'));
        form.findField('nama_pasien').setValue(sel[0].get('nama_pasien'));
        form.findField('jenis_kelamin').setValue(sel[0].get('jenis_kelamin'));
        form.findField('tgl_lahir').setValue(sel[0].get('tgl_lahir'));
        form.findField('jenis_umur').setValue('1');
        form.findField('no_hp').setValue(sel[0].get('no_hp'));
        form.findField('no_tlfnrumah').setValue(sel[0].get('no_tlfnrumah'));
        form.findField('alamat').setValue(sel[0].get('alamat'));
        form.findField('kota').setValue(sel[0].get('kota'));
        form.findField('status').setValue(sel[0].get('status'));
        form.findField('pas_id').setValue(sel[0].get('pasien_id'));
        // New 
        form.findField('jabatan').setValue(sel[0].get('jabatan'));
        form.findField('divisi').setValue(sel[0].get('divisi'));
        form.findField('sub_divisi').setValue(sel[0].get('subdivisi'));
        form.findField('departemen').setValue(sel[0].get('departemen'));
        form.findField('sub_departemen').setValue(sel[0].get('subdepartemen'));
        form.findField('pas_id').setValue(sel[0].get('pasien_id'));
        // MCU ----------------------
        if (jenis_pasien === '3') {
            form.findField('jabatan').show();
            form.findField('divisi').show();
            form.findField('sub_divisi').show();
            form.findField('departemen').show();
            form.findField('sub_departemen').show();
            // Rekanan
            Ext.getCmp('daftar_tipekirim4').setValue(true);
            Ext.getCmp('nama_rekanan').setValue(sel[0].get('nama_rekanan'));
            Ext.getCmp('kode_rekanan').setValue(sel[0].get('id_rekanan'));
            var filterCollection = [];
            var statusFilter = new Ext.util.Filter({
                property: 'fopaket_pemeriksaan',
                value: sel[0].get('id_rekanan')
            });
            filterCollection.push(statusFilter);
            Ext.getCmp('fopaket_pemeriksaan').getStore().clearFilter(true)
            Ext.getCmp('fopaket_pemeriksaan').getStore().filter(filterCollection);
            Ext.getCmp('fopaket_pemeriksaan').setValue(sel[0].get('kode_kontrak'));

            //===
            // List Pemeriksaan Paket
            var filterCollection1 = [];
            var statusFilter1 = new Ext.util.Filter({
                property: 'list_detailpaketpemeriksaan',
                value: sel[0].get('kode_kontrak')
            });
            filterCollection1.push(statusFilter1);
            Ext.getCmp('fodetailpaketpemeriksaan').getStore().clearFilter(true)
            Ext.getCmp('fodetailpaketpemeriksaan').getStore().filter(filterCollection1);
            //====

            form.findField('nama_pasien').setReadOnly(false);
            form.findField('jenis_kelamin').setReadOnly(false);
            form.findField('tgl_lahir').setReadOnly(false);
            form.findField('no_hp').setReadOnly(false);
            form.findField('no_tlfnrumah').setReadOnly(false);
            form.findField('alamat').setReadOnly(false);
            form.findField('kota').setReadOnly(false);
            form.findField('status').setReadOnly(false);
            form.findField('pas_id').setReadOnly(false);
            // Insert Grid
            Ext.Ajax.request({
                url: BASE_PATH + 'pendaftaran/list_paket_kodekontrak',
                method: 'POST',
                params: {
                    kode_kontrak: sel[0].get('kode_kontrak')
                },
                scope: this,
                callback: function (options, success, response) {
                    var resp = Ext.decode(response.responseText);
                    if (resp.success === 'true') {
                        for (var i = 0; i < resp.data.length; i++) {
                            var item = resp.data[i];
                            var rs = Ext.ModelManager.create({
                                kode_pemeriksaan: item.kode_pemeriksaan,
                                nama_pemeriksaan: item.nama_pemeriksaan,
                                harga_pemeriksaan: item.rp_bruto,
                                netto_pemeriksaan: item.rp_netto,
                                diskon_pemeriksaan: item.discount
                            }, 'SIForLaP.model.ListPemeriksaanModel');
                            Ext.getCmp('fopendaftarangrid').getStore().add(rs);
                        }
                    } else {

                    }
                }
            });
        } else if (jenis_pasien === '2') {
            // Indent
            form.findField('pas_id').setValue(sel[0].get('pasien_id'));
        } else {
            // HS

        }
//        this.InsertPemeriksaanGrid();
        this.getListPasienSementaraWin().close();
    },
    InsertPemeriksaanGrid: function () {
        var stores = Ext.getCmp('fodetailpaketpemeriksaan').getStore();
        var allRecords = stores.snapshot || stores.data;
//        allRecords.each(function (record) {
        console.log(allRecords);
//        });
//        Ext.getCmp('fodetailpaketpemeriksaan').getStore().load();
//        .load().each(function (record) {
//            console.log(record);
//            var rs = Ext.ModelManager.create({
//                kode_pemeriksaan: record.get('kode_pemeriksaan'),
//                id_pemeriksaan: record.get('id'),
//                nama_pemeriksaan: record.get('nama_pemeriksaan'),
//                harga_pemeriksaan: record.get('rp_bruto'),
//                netto_pemeriksaan: record.get('rp_netto'),
//                diskon_pemeriksaan: record.get('discount')
//            }, 'SIForLaP.model.ListPemeriksaanModel');
//            this.getFoPendaftaranGrid().getStore().add(rs);
//        });
    },
    CariDataPasienSementara: function () {
        var grid = this.getListDataPasienSementaraGrid(),
                store = grid.getStore(),
                filterCollection = [],
                filter1 = grid.down('#filterFoCariPasienSementara').getValue(),
                value = grid.down('#valueFoCariPasienSementara').getValue(),
                jenis_pasien = grid.down('#ListDataPasienSementara_Jenis').getValue();
        if (filter1 === null || value === null) {
            Ext.Msg.alert('Perhatian', 'Isi Data yang akan Dicari');
            return;
        }


        var status = grid.down('#pendaftarancaripassementara_datapusat').getValue();
        var pusat = '';
        if (status === true) {
            pusat = '1';
        } else {
            pusat = '0'
        }
        var statusFilter = new Ext.util.Filter({
            property: 'cari_folistdatapasiensementara',
            value: jenis_pasien + '-' + filter1 + '-' + value + '-' + pusat
        });
        filterCollection.push(statusFilter);
        store.clearFilter(true);
        store.filter(filterCollection);
    },
    ApproveDiscount: function () {
        var form = this.getFormFoApproveDiscount().getForm();
        var win = this.getWinFoApproveDiscount();
        var formutama = this.getFoPendaftaranForm();
//        alert(formutama.findField('idpersetujuandisc').getValue());
        Ext.Ajax.request({
            url: BASE_PATH + 'pendaftaran/approve_discount',
            method: 'POST',
            params: form.getValues(),
            scope: this,
            callback: function (options, success, response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success === 'true') {
                    Ext.MessageBox.show({
                        title: resp.title,
                        msg: "Verifkasi Password Berhasil",
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    win.close();
                    formutama.getForm().findField('discount_persen').show();
                    formutama.getForm().findField('discount_rupiah').show();
                    formutama.down("#verifikasipemberidiscount").setText('<b>Persetujuan Dari : ' + resp.data.mk_nama + '</b>');
                    formutama.getForm().findField('idpersetujuandisc').setValue(resp.data.id);
                    formutama.down("#ButtonWinCekDiscount").setDisabled(false);
                } else {
                    Ext.MessageBox.show({
                        title: resp.title,
                        msg: resp.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    },
    ResetFormPendaftaran: function () {
        var form = this.getFoPendaftaranForm().getForm();
        var grid = this.getFoPendaftaranGrid();
        var grid_persyaratan = this.getListPersyaratanPaketGrid();
        form.reset();
        grid.store.loadData([], false);
        grid_persyaratan.store.loadData([], false);
        Ext.getCmp('nama_rekanan').setValue('');
        Ext.getCmp('id_rekanan').setValue('');
        Ext.getCmp('kode_rekanan').setValue('');
        Ext.getCmp('nama_dokter').setValue('');
        Ext.getCmp('id_dokter').setValue('');
        Ext.getCmp('kode_dokter').setValue('');
        form.findField('cek_homeservice').setValue('');
        form.findField('cek_discount').setValue(false);
        form.findField('jabatan').hide();
        form.findField('divisi').hide();
        form.findField('sub_divisi').hide();
        form.findField('departemen').hide();
        form.findField('sub_departemen').hide();
        form.findField('pas_id').setReadOnly(true);
        form.findField('jenis_kelamin').setReadOnly(true);
        form.findField('jenis_umur').setReadOnly(true);
        form.findField('umur').setReadOnly(true);
        form.findField('tgl_lahir').setReadOnly(true);
        form.findField('status').setReadOnly(true);
        form.findField('no_hp').setReadOnly(true);
        form.findField('no_tlfnrumah').setReadOnly(true);
        form.findField('alamat').setReadOnly(true);
        form.findField('kota').setReadOnly(true);
        this.getFoPendaftaranForm().down("#ButtonWinCekDiscount").hide();
        var filterCollection = [];
        var statusFilter = new Ext.util.Filter({
            property: 'fopaket_pemeriksaan',
            value: 'val-val-val'
        });
        filterCollection.push(statusFilter);
        Ext.getCmp('fopaket_pemeriksaan').getStore().clearFilter(true)
        Ext.getCmp('fopaket_pemeriksaan').getStore().filter(filterCollection);
        Ext.getCmp('fopendaftaranform').down('#ButtonFormPersyaratan').hide();
        Ext.getCmp('fopendaftaranform').down('#ButtonFormBeritaAcara').hide();
        Ext.getCmp('daftar_tipekirim1').setValue(true);
        Ext.getCmp('Button-SaveFoPedaftaran').show();
        Ext.getCmp('fopaket_pemeriksaan').setValue('');
        this.getFoPendaftaranForm().down('#approve_bayarkurang').setText('');
        this.getFoPendaftaranForm().down('#approve_bayarkurang').hide();
        form.findField('cek_approve_bayarkurang').setValue(false);
        form.findField('id_approve_bayarkurang').setValue('0');
    },
    SimpanDataDokterBaru: function () {
        var form = this.getFormActionTambahDokterBaru().getForm();
        var grid = this.getFoPendaftaranGrid();
        var win = this.getPendaftaranInputDokterBaruWin();
//        var formutama = this.getFoPendaftaranForm();
        Ext.Ajax.request({
            url: BASE_PATH + 'pendaftaran/tambah_dokter_baru',
            method: 'POST',
            params: form.getValues(),
            scope: this,
            callback: function (options, success, response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success === 'true') {
                    Ext.MessageBox.show({
                        title: resp.title,
                        msg: "Proses Simpan Berhasil",
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    Ext.getCmp('listdokterwin').close();
                    win.close();
                    grid.down("#PengirimKodeDokter").setValue(resp.data.kode_dokter);
                    grid.down("#PengirimNamaDokter").setValue(resp.data.nama_dokter);
                    if (Ext.getCmp('daftar_tipekirim4').getValue() === true) {

                    } else {
                        var filterCollection = [];
                        var statusFilter = new Ext.util.Filter({
                            property: 'fopaket_pemeriksaan',
                            value: sel[0].get('kode_dokter') + '-' + 1
                        });
                        filterCollection.push(statusFilter);
                        Ext.getCmp('fopaket_pemeriksaan').getStore().clearFilter(true)
                        Ext.getCmp('fopaket_pemeriksaan').getStore().filter(filterCollection);
                    }
                } else {
                    Ext.MessageBox.show({
                        title: resp.title,
                        msg: resp.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    },
    printNota: function (nolab) {
        window.open(BASE_PATH + 'pendaftaran/cetak_nota/' + nolab, "Print Preview", "height=" + screen.height + ",width=700,modal=yes,alwaysRaised=yes,scrollbars=yes");
    },
    convertToRupiah: function (angka)
    {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++)
            if (i % 3 == 0)
                rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */