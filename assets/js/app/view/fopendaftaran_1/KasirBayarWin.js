/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.KasirBayarWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.kasirbayarwin',
//    itemId: 'kasirbayarwin',
    id : 'kasirbayarwincash',
    ui: 'blue-window',
    title: '<b>Pembayaran Cash</b>',
    iconCls: 'icon-btn-dokter',
    width: 430,
    height: 250,
    resizable: false,
    autoShow: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'FormKasirBayar',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 380,
                        labelAlign: 'right',
                        labelWidth: 160,
                        msgTarget: 'side'
                    },
                    items: [
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: "<b style = 'font-size: 20px'>Sub Total (Rp) </b>",
                            name: 'sub_total',
//                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            align: 'right',
                            fieldStyle: 'background-color: #00BCD4;font-size: 25px; height: 45px;',
//                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
//                            allowBlank: false,
                            hideTrigger: true,
                            emptyText: "0,00",
                        }),
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: "<b style = 'font-size: 20px'>Bayar (Rp) </b>",
                            name: 'jumlah_bayar',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            fieldStyle: 'background-color: #FFEB3B;font-size: 25px; height: 45px;',
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
//                            allowBlank: false,
                            hideTrigger: true,
                            enableKeyEvents: true,
                            emptyText: "0,00",
                            listeners: {
                                change: function () {
                                    var form = me.down('#FormKasirBayar').getForm();
                                    form.findField('jumlah_kembali').setValue(form.findField('jumlah_bayar').getValue() - form.findField('sub_total').getValue());

                                },
                                keyup: function (val, e) {
                                    if (e.getKey() === e.ENTER) {
                                        var form = me.down('#FormKasirBayar').getForm();
                                        var grid = Ext.ComponentQuery.query('panel > #fopendaftarangrid')[0];
                                        Ext.Ajax.request({
                                            url: BASE_PATH + 'barang_keluar/simpan_transaksi',
                                            method: 'POST',
                                            params: {
                                                pelanggan: grid.down('#PelangganKasir').getValue(),
                                                form: JSON.stringify(form.getValues()),
                                                grid: JSON.stringify(Ext.pluck(grid.getStore().data.items, 'data')),
                                            },
                                            scope: this,
                                            callback: function (options, success, response) {
                                                var resp = Ext.decode(response.responseText);
                                                if (resp.success === 'true') {
//                                                    Ext.MessageBox.show({
//                                                        title: resp.title,
//                                                        msg: "Proses Simpan Berhasil",
//                                                        buttons: Ext.MessageBox.OK,
//                                                        icon: Ext.MessageBox.INFO
//                                                    });
                                                    
                                                    grid.store.loadData([], false);
                                                    grid.down('#kode_barang').focus();
                                                    Ext.getCmp('kasirbayarwincash').close();
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
                                    }
                                },
                            }
                        }),
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: "<b style = 'font-size: 20px'> Kembali (Rp) </b>",
                            name: 'jumlah_kembali',
//                            decimalPrecision: 2,
                            decimalSeparator: '.',
//                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            fieldStyle: 'background-color: #FF5722;font-size: 25px; height: 45px;',
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
//                            allowBlank: false,
                            hideTrigger: true,
                            emptyText: "0,00",
                        }),
                    ]
                }

            ],
            buttons: [
                {
                    text: 'Simpan',
                    scope: this,
                    iconCls: 'icon-btn-save',
                    itemId: 'kasirbayarwin_simpan'
                }
            ]
        });
        me.callParent(arguments);
    },
    SimpanPembayaranKasir: function () {
        alert('test');
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */