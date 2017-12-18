/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.pelunasan.PelunasanForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pelunasan.pelunasanform',
    itemId: 'pelunasanform',
    bodyPadding: '5 5',
    buttonAlign: 'right',
    bodyStyle: {"background-color": "#E0E3E6"},
    fieldDefaults: {
        width: 250,
        labelAlign: 'right',
        labelWidth: 100,
        msgTarget: 'side'
    },
    autoScroll: true,
    border: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    xtype: 'fieldset',
                    margin: '0 0 2 2',
                    width: 450,
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
                            fieldLabel: 'Jenis Pelunasan',
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
                                    ['1', 'Pelunasan Hutang'],
                                    ['2', 'Pelunasan Piutang']
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
                            itemId: 'Customer',
                            displayField: 'mc_nama',
                            queryMode: 'local',
                            minChars: 5,
                            allowBlank: false,
                            forceSelection: true,
                            triggerAction: 'all',
                            mode: 'remote',
                            valueField: 'kode_customer',
                            hideTrigger: true,
                            enableKeyEvents: true,
                            listConfig: {
                                loadingText: 'Searching...',
                                emptyText: 'Data Tidak Ada.',
                                getInnerTpl: function () {
                                    return '<div class="search-item">' +
                                            '<b>{kode_customer} - {mc_nama} </b>' +
                                            '<br/>Plafon : {mc_plafond}' +
                                            '<br/></div>';
                                }
                            },
                            store: {
                                autoLoad: false,
                                remoteFilter: true,
                                fields: ['id', 'kode_customer', 'mc_alamat', 'mc_kecamatan', 'mc_kabupaten', 'mc_provinsi', 'mc_nama', 'mc_telp', 'mc_nohp', 'mc_plafond', 'mc_jatuh_tempo'],
                                proxy: {
                                    success: true,
                                    type: 'ajax',
                                    url: BASE_URL + 'barang_keluar/list_customer',
                                    reader: {root: 'data', type: 'json'}
                                },
                            },
                            listeners: {
                                beforequery: function (record) {
                                    var store = this.store;
                                    var filterCollection = [];
                                    var statusFilter = new Ext.util.Filter({
                                        property: 'filter',
                                        value: this.getValue()
                                    });
                                    filterCollection.push(statusFilter);
                                    store.clearFilter(true);
                                    store.filter(filterCollection);

                                },
                                select: function (cmb, rec, opt) {
                                    var val = cmb.getValue(),
                                            record = cmb.findRecordByValue(val);
//                                                    record.get('harga_barang')
                                    me.down('#KodeCustomer').setValue(record.get('kode_customer'));
                                    me.down('#NamaCustomer').setValue(record.get('mc_nama'));
                                    me.down('#CustomerPlafon').setValue(record.get('mc_plafond'));
                                    me.down('#CustomerJatuhTempo').setValue(record.get('mc_jatuh_tempo'));
                                }
                            },
                        },
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: "<b>Nominal </b>",
                            name: 'nominal',
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
                                    var form = me.getForm();
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
                            xtype: 'textfield',labelWidth: 110,
                            fieldLabel: "<b>Keterangan </b>",
                            hidden: true,
                            fieldStyle: 'background-color: #FFEB3B;',
                            name: 'keterangan_bank',
                        },
                        {
                            xtype: 'numberfield',labelWidth: 110,
                            fieldLabel: "KB",
//                            value : '0',
                            hidden: true,
                            height: 30,
                            name: 'kurang_bayar',
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
                        }),
                    ]
                },
            ],
            bbar: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    margin: '2 0 2 10',
                    text: '  Baru   ',
                    iconCls: 'icon-btn-clear',
                    action: 'NewPdftrn',
                }
            ]
        });
        me.callParent(arguments);
    },
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */