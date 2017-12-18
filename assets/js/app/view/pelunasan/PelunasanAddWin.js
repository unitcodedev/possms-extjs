/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.pelunasan.PelunasanAddWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.pelunasan.pelunasanaddwin',
    itemId: 'pendaftaranpelunasanaddwin',
    ui: 'blue-window',
    title: 'FORM PELUNASAN',
    width: 400,
    height: 390,
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
                    itemId: 'FormPelunasanAddWin',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 300,
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            margin: '0 0 2 2',
                            width: 360,
                            title: '<b>Pelunasan </b>',
                            items: [
                                {
                                    xtype: 'combobox',
                                    displayField: 'type',
                                    valueField: 'typeCode',
                                    queryMode: 'local',
                                    name: 'jenis_pelunasan',
                                    allowBlank: true,
                                    editable: false,
                                    fieldLabel: '<b>Jenis Pelunasan</b>',
                                    labelWidth: 110,
                                    value: '1',
                                    width: 290,
                                    store: new Ext.data.SimpleStore({
                                        id: 0,
                                        fields: [
                                            'typeCode', //numeric value is the key
                                            'type' //the text value is the value
                                        ],
                                        data: [
                                            ['1', '1 - Pelunasan Hutang'],
                                            ['2', '2 - Pelunasan Piutang']
                                        ]
                                    })
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '<b>Nomor Transaksi</b>',
                                    labelWidth: 110,
                                    width: 310,
                                    fieldStyle: 'background-color: rgb(173, 230, 255);width: 100%;',
                                    emptyText: 'Cari No Transaksi',
                                    name: 'no_transaksi',
                                    displayField: 'nomor_trx',
                                    queryMode: 'local',
                                    minChars: 3,
                                    allowBlank: false,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    mode: 'remote',
                                    valueField: 'id',
                                    hideTrigger: true,
                                    enableKeyEvents: true,
                                    listConfig: {
                                        loadingText: 'Searching...',
                                        emptyText: 'Data Tidak Ada.',
                                        getInnerTpl: function () {
                                            return '<div class="search-item">' +
                                                    '<b>No.</b> {nomor_trx}<br> <b>Nama</b> {nama}' +
                                                    '<br><b>Harga : {harga}</b>' +
                                                    '<br><b>KB : {harga_kb}</b>' +
                                                    '<br/></div>';
                                        }
                                    },
                                    store: {
                                        autoLoad: false,
                                        remoteFilter: true,
                                        fields: ['id', 'nama', 'nomor_trx', 'harga', 'harga_kb'],
                                        proxy: {
                                            success: true,
                                            type: 'ajax',
                                            url: BASE_URL + 'pelunasan/cari_data_pelunasan',
                                            reader: {root: 'data', type: 'json'}
                                        },
                                    },
                                    listeners: {
                                        beforequery: function (record) {
                                            var form = me.down('#FormPelunasanAddWin').getForm();
                                            var store = this.store;
                                            store.load({
                                                params: {
                                                    val: this.getValue(),
                                                    jenis_pelunasan: form.findField('jenis_pelunasan').getValue(),
                                                },
                                                scope: this
                                            });
                                        },
                                        select: function (cmb, rec, opt) {
                                            var form = me.down('#FormPelunasanAddWin').getForm();
                                            form.findField('nama').setValue(rec[0].data.nama);
                                            form.findField('total').setValue(rec[0].data.harga);
                                            form.findField('kurang_bayar').setValue(rec[0].data.harga_kb);
                                        }
                                    },
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama',
                                    readOnly: true,
                                    name: 'nama',
                                    width: 340,
                                },
                                Ext.create('Ext.ux.form.NumericField', {
                                    fieldLabel: "<b>Total </b>",
                                    name: 'total',
                                    readOnly: true,
                                    width: 240,
                                    labelWidth: 110,
                                    decimalSeparator: '.',
                                    align: 'right',
                                    fieldStyle: 'background-color: #FFEB3B;',
                                    allowNegative: false,
                                    minValue: 0,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    hideTrigger: true,
                                    emptyText: "0,00",
                                }),
                                Ext.create('Ext.ux.form.NumericField', {
                                    fieldLabel: "<b>Kurang Bayar </b>",
                                    name: 'kurang_bayar',
                                    readOnly: true,
                                    width: 240,
                                    labelWidth: 110,
                                    decimalSeparator: '.',
                                    align: 'right',
                                    fieldStyle: 'background-color: #FFEB3B;',
                                    allowNegative: false,
                                    minValue: 0,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    hideTrigger: true,
                                    emptyText: "0,00",
                                }),
                                {
                                    xtype: 'combobox',
                                    displayField: 'type',
                                    valueField: 'typeCode',
                                    queryMode: 'local',
                                    labelWidth: 110,
                                    fieldLabel: "<b>Pembayaran</b>",
                                    name: 'motode_bayar',
                                    fieldStyle: 'background-color: #FFEB3B;',
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
                                            var form = me.down('#FormPelunasanAddWin').getForm();
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
                                    fieldLabel: "<b>Bank</b>",
                                    name: 'bank',
                                    labelWidth: 110,
                                    fieldStyle: 'background-color: #FFEB3B',
                                    allowBlank: true,
                                    editable: false,
                                    hidden: true,
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
                                    xtype: 'textfield', labelWidth: 110,
                                    fieldLabel: "<b>Keterangan </b>",
                                    hidden: true,
                                    fieldStyle: 'background-color: #FFEB3B;',
                                    name: 'keterangan_bank',
                                },
                                {
                                    xtype: 'numberfield', labelWidth: 110,
                                    fieldLabel: "KB",
//                            value : '0',
                                    hidden: true,
                                    height: 30,
                                    name: 'kb',
                                },
                                Ext.create('Ext.ux.form.NumericField', {
                                    fieldLabel: "<b>Bayar </b>",
                                    name: 'bayar',
//                            readOnly: true,
                                    width: 240,
                                    decimalSeparator: '.',
                                    align: 'right',
                                    labelWidth: 110,
                                    fieldStyle: 'background-color: #FFEB3B;',
                                    allowNegative: false,
                                    minValue: 0,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    hideTrigger: true,
                                    emptyText: "0,00",
                                    listeners: {
                                        change: function () {
                                            var form = me.down('#FormPelunasanAddWin').getForm();
                                            form.findField('kb').setValue(form.findField('kurang_bayar').getValue() - form.findField('bayar').getValue())
                                        }
                                    }
                                }),
                            ]
                        },
                    ],
                }
            ],
            buttons: [
                {
                    text: 'Simpan',
                    scope: this,
                    iconCls: 'icon-btn-save',
                    listeners: {
                        click: function () {
                            var form = me.down('#FormPelunasanAddWin').getForm();
                            Ext.Ajax.request({
                                url: BASE_PATH + 'pelunasan/simpan_pelunasan',
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
                                        me.close();
                                        var grid = Ext.ComponentQuery.query('panel > #pelunasangrid')[0];
                                        grid.getStore().load();
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
    ngitungUmur: function (dateString) {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
    }

});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */