/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.KasirBayarWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.kasirbayarwin',
//    itemId: 'kasirbayarwin',
    id: 'kasirbayarwincash',
    ui: 'blue-window',
    title: '<b>Pembayaran</b>',
    iconCls: 'icon-btn-dokter',
    width: 430,
    height: 305,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
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
                        labelWidth: 130,
                        msgTarget: 'side'
                    },
                    items: [
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: "<b style = 'font-size: 15px'>Bruto </b>",
                            name: 'bruto',
                            hidden: true,
                            width: 320,
//                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            align: 'right',
                            fieldStyle: 'background-color: #00BCD4;font-size: 15px; height: 30px;',
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
                            fieldLabel: "<b style = 'font-size: 15px'>Sub Total (Rp) </b>",
                            name: 'sub_total',
                            width: 320,
//                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            align: 'right',
                            fieldStyle: 'background-color: #00BCD4;font-size: 15px; height: 30px;',
//                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
//                            allowBlank: false,
                            hideTrigger: true,
                            emptyText: "0,00",
                        }),
                        {
                            xtype: 'combobox',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            fieldLabel: "<b style = 'font-size: 15px'>Pembayaran</b>",
                            name: 'motode_bayar',
                            fieldStyle: 'background-color: #FFEB3B;font-size: 15px; height: 30px;',
                            allowBlank: true,
                            editable: false,
//                            labelWidth: 90,
                            width: 300,
                            value: '1',
                            store: new Ext.data.SimpleStore({
                                id: 0,
                                fields: [
                                    'typeCode', //numeric value is the key
                                    'type' //the text value is the value
                                ],
                                data: [
                                    ['1', '1 - Tunai'],
                                    ['2', '2 - Non Tunai']
                                ]
                            }),
                            listeners: {
                                change: function () {
                                    var form = me.down('#FormKasirBayar').getForm();
                                    if (form.findField('motode_bayar').getValue() === '2') {
                                        form.findField('bank').show();
                                        form.findField('keterangan_bank').show();
                                    } else {
                                        form.findField('bank').hide();
                                        form.findField('keterangan_bank').hide();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            fieldLabel: "<b style = 'font-size: 15px'>Bank</b>",
                            name: 'bank',
                            fieldStyle: 'background-color: #FFEB3B;font-size: 15px; height: 30px;',
                            allowBlank: true,
                            editable: false,
                            hidden: true,
//                            labelWidth: 90,
//                            width: 250,
                            value: '1',
                            store: new Ext.data.SimpleStore({
                                id: 0,
                                fields: [
                                    'typeCode', //numeric value is the key
                                    'type' //the text value is the value
                                ],
                                data: [
                                    ['1', '1 - Mandiri'],
                                    ['2', '2 - BCA'],
                                    ['3', '3 - BRI'],
                                    ['4', '4 - BNI'],
                                ]
                            }),
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: "<b style = 'font-size: 15px'>Keterangan </b>",
                            hidden: true,
                            height: 30,
                            fieldStyle: 'background-color: #FFEB3B;font-size: 15px;',
                            name: 'keterangan_bank',
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: "KB",
//                            value : '0',
                            hidden: true,
                            height: 30,
                            name: 'kurang_bayar',
                        },
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: "<b style = 'font-size: 15px'>Bayar (Rp) </b>",
                            name: 'jumlah_bayar',
//                            decimalPrecision: 2,
                            width: 320,
                            value: '0',
                            decimalSeparator: '.',
//                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            fieldStyle: 'background-color: #FFEB3B;font-size: 15px; height: 30px;',
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
                                    form.findField('kurang_bayar').setValue(form.findField('sub_total').getValue() - form.findField('jumlah_bayar').getValue());

                                },
                                keyup: function (val, e) {
                                    if (e.getKey() === e.ENTER) {
                                        this.simpan('test');
                                    }
                                },
                            }
                        }),
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: "<b style = 'font-size: 15px'> Kembali (Rp) </b>",
                            name: 'jumlah_kembali',
                            width: 320,
//                            decimalPrecision: 2,
                            decimalSeparator: '.',
//                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            fieldStyle: 'background-color: #FF5722;font-size: 15px; height: 30px;',
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
                    listeners: {
                        click: function () {
                            var form = me.down('#FormKasirBayar').getForm();
                            var grid = Ext.ComponentQuery.query('panel > #fopendaftarangrid')[0];
                            if (grid.down('#PelangganKasir').getValue() == '1') {
                                if (form.findField('kurang_bayar').getValue() > 0) {
                                    Ext.MessageBox.show({
                                        title: 'Error',
                                        msg: 'Pembayaran Harus Lunas',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                    return;
                                }
                            }
                            Ext.Ajax.request({
                                url: BASE_PATH + 'barang_keluar/simpan_transaksi',
                                method: 'POST',
                                params: {
                                    pelanggan: grid.down('#PelangganKasir').getValue(),
                                    kode_customer: grid.down('#KodeCustomer').getValue(),
                                    nama_customer: grid.down('#NamaCustomer').getValue(),
                                    plafon: grid.down('#CustomerPlafon').getValue(),
                                    jatuh_tempo: grid.down('#CustomerJatuhTempo').getValue(),
                                    form: JSON.stringify(form.getValues()),
                                    grid: JSON.stringify(Ext.pluck(grid.getStore().data.items, 'data')),
                                },
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

                                        grid.store.loadData([], false);
                                        grid.down('#kode_barang').focus();
                                        grid.down('#totalNetto').setText('<b>Rp. 0.00</b>');
                                        grid.down('#PelangganKasir').setValue('1');
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
                    }
                }
            ]
        });
        me.callParent(arguments);
    },
    simpan: function (dateString) {
        alert(dateString);
        return;
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */