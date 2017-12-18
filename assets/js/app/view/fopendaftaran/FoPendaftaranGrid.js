/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.fopendaftaran.FoPendaftaranGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fopendaftaran.fopendaftarangrid',
    itemId: 'fopendaftarangrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'fopendaftaran.ListPemeriksaanStore',
    columnLines: true,
    forceFit: true,
    renderTo: document.body,
    border: true,
//    listeners: {
//        render: function (grid) {
//            grid.store.on('load', function (store, records, options) {
//                grid.down('#totalBruto').setText(Ext.util.Format.number(grid.getStore().sum('harga'), '0,000'));
//                grid.down('#totalNetto').setText(Ext.util.Format.number(grid.getStore().sum('netto'), '0,000'));
//            });
//        }
//    },
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Data Pemeriksaan Kosong',
                deferEmptyText: false,
                stripeRows: false,
                getRowClass: function (record, index) {
                    return 'css-penjualan';
                },
                listeners: {
                    itemkeydown: function (view, record, item, index, e) {
                        // Tekan Delete / Backspace
                        if (e.getKey() === 46 || e.getKey() === 8) {
                            var selection = me.getSelectionModel().getSelection()[0];
                            if (selection) {
                                me.getStore().remove(selection);
                                me.getView().focus();
                                me.getSelectionModel().select(0);
                                me.down('#totalBruto').setText("<b>Bruto : " + Ext.util.Format.number(me.getStore().sum('harga'), '0,000') + "</b>");
                                me.down('#totalNetto').setText("<b>Rp. " + Ext.util.Format.number(me.getStore().sum('netto'), '0,000') + "</b>");
                                me.down('#FormKasirBayar').getForm().findField('sub_total').setValue(me.getStore().sum('netto'));
                                me.down('#FormKasirBayar').getForm().findField('bruto').setValue(me.getStore().sum('harga'));
                            }
                            if (me.getStore().getCount() === 0) {
                                me.down('#kode_barang').focus();
                            }
                        }
                        if (e.getKey() === e.ENTER) {
                            me.down('#kode_barang').focus();
                        }
                        // Tombol End Untuk Bayar
                        if (e.getKey() === 35) {
                            me.down('#FormKasirBayar').getForm().findField('motode_bayar').focus();
                        }
                    },
                }
            },
            tbar: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    width: '100%',
                    margin: '0 0 5 5',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            margin: '0 0 5 5',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    margin: '5 5 5 5',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            labelWidth: 90,
                                            width: 190,
                                            fieldLabel: '<b>Tanggal</b>',
                                            itemId: 'TglInputKasir',
                                            format: 'd/M/Y',
                                            emptyText: 'MM-DD-YYYY',
                                            submitFormat: 'Y-m-d',
                                            value: new Date(),
                                            readOnly: true,
                                        },
                                        {
                                            xtype: 'combobox',
                                            displayField: 'type',
                                            valueField: 'typeCode',
                                            queryMode: 'local',
                                            itemId: 'PelangganKasir',
                                            allowBlank: true,
//                                            labelWidth: 70,
                                            editable: false,
                                            fieldLabel: '<b>Pelanggan</b>',
                                            labelWidth: 90,
                                            width: 250,
                                            value: '1',
                                            store: new Ext.data.SimpleStore({
                                                id: 0,
                                                fields: [
                                                    'typeCode', //numeric value is the key
                                                    'type' //the text value is the value
                                                ],
                                                data: [
                                                    ['1', 'Tunai'],
                                                    ['2', 'Customer']
                                                ]
                                            }),
                                            listeners: {
                                                change: function () {
                                                    if (me.down('#PelangganKasir').getValue() === '2') {
                                                        me.down('#Customer').show();
                                                        me.down('#DetailCustomer').show();
                                                    } else {
                                                        me.down('#Customer').hide();
                                                        me.down('#DetailCustomer').hide();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: '<b>Cari Customer </b>',
                                            labelWidth: 90,
                                            width: 250,
                                            fieldStyle: 'background-color: rgb(173, 230, 255);width: 100%;',
                                            emptyText: 'Cari Customer',
                                            itemId: 'Customer',
                                            displayField: 'mc_nama',
                                            queryMode: 'local',
                                            minChars: 5,
                                            allowBlank: false,
                                            forceSelection: true,
                                            triggerAction: 'all',
                                            mode: 'remote',
                                            hidden: true,
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
//                                        {
//                                            xtype: 'textfield',
//                                            fieldLabel: '<b>Cari Customer </b>',
//                                            labelWidth: 90,
//                                            width: 250,
//                                            fieldStyle: 'background-color: rgb(173, 230, 255);width: 100%;',
//                                            itemId: 'Customer',
//                                            hidden: true,
//                                            enableKeyEvents: true,
//                                            listeners: {
//                                                keyup: function (val, e) {
//                                                    if (e.getKey() === e.ENTER) {
//                                                        me.down('#kode_barang').focus();
//                                                    }
//                                                },
//                                            }
//                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin: '5 5 5 5',
                                    itemId: 'DetailCustomer',
                                    hidden: true,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: '<b>Kode Customer </b>',
//                                            labelWidth: 70,
                                            width: 220,
                                            itemId: 'KodeCustomer',
                                            readOnly: true,
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: '<b>Nama Customer </b>',
//                                            labelWidth: 70,
                                            width: 250,
                                            itemId: 'NamaCustomer',
                                            readOnly: true,
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: '<b>Plafon </b>',
//                                            labelWidth: 70,
                                            width: 230,
                                            itemId: 'CustomerPlafon',
                                            readOnly: true,
                                        },
                                        {
                                            xtype: 'textfield',
                                            hidden: true,
                                            fieldLabel: '<b>Jatuh Tempo </b>',
//                                            labelWidth: 70,
                                            width: 160,
                                            itemId: 'CustomerJatuhTempo',
                                            readOnly: true,
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin: '5 5 5 5',
                                    width: 400,
                                    height: 95,
                                    items: [
                                        {
                                            xtype: 'tbtext',
                                            margin: '22 5 5 5',
                                            itemId: 'totalNetto',
                                            cls: 'daftar-total-view',
                                            text: '<b>Rp. 0.00</b>'
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '0 0 5 5',
                            width: 580,
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    margin: '0 0 0 0',
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'tbtext',
                                                    width: 70,
                                                    text: '<b>Qty</b>'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    width: 70,
                                                    itemId: 'Qty_Barang',
                                                    value: 1,
                                                    enableKeyEvents: true,
                                                    fieldStyle: 'background-color: #ffd08a;font-size: 16px;  height: 26px;width: 100%;',
                                                    listeners: {
                                                        keyup: function (val, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                me.down('#kode_barang').focus();
                                                            }
                                                        },
                                                    }
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'tbtext',
                                                    width: 150,
                                                    text: '<b>Kode Barang</b>',
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    emptyText: 'Nama Barang',
                                                    width: 450,
                                                    itemId: 'kode_barang',
                                                    displayField: 'mspem_nama',
                                                    queryMode: 'local',
                                                    minChars: 5,
//                                                    fieldStyle: 'background-color: #ffd08a;font-size: 16px;  height: 26px;width: 100%;',
                                                    fieldStyle: "background-color: #ffd08a;font-size: 16px;height: 26px;width: 100%;background-image: url(https://demo.dealpos.com/Images/Cashier/action-icon.png);background-repeat: no-repeat;background-position: 5px -211px;padding: 4px 5px 4px 35px;",
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
                                                                    '<b>{kode_barang} - {nama_barang} </b>' +
                                                                    '<br/>Harga : {harga_barang}' +
                                                                    '<br/></div>';
                                                        }
                                                    },
                                                    store: {
                                                        autoLoad: false,
                                                        remoteFilter: true,
                                                        fields: ['id', 'kode_barang', 'nama_barang', 'satuan', {name: 'harga_barang', type: 'number'}, 'stok_barang'],
                                                        proxy: {
                                                            success: true,
                                                            type: 'ajax',
                                                            url: BASE_URL + 'barang_keluar/list_barang',
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
                                                            if (record.get('harga_barang') == '' || record.get('harga_barang') == '0') {
                                                                Ext.Msg.alert('Warning', 'Harga Masih Kosong Segera Hubungi Bagian Terkait');
                                                                return;
                                                            }
                                                            if (record) {
                                                                var cek = me.getStore().findRecord('kode_barang', record.get('kode_barang'));
                                                                if (cek !== null) {
                                                                    me.getStore().each(function (rec, idx) {
                                                                        var kode_barang = rec.get('kode_barang');
                                                                        if (kode_barang == record.get('kode_barang')) {
                                                                            rec.set('qty', me.down('#Qty_Barang').getValue() + rec.get('qty'));
//                                                                            rec.set('harga', rec.get('harga') * (me.down('#Qty_Barang').getValue() + rec.get('qty')));
                                                                            rec.set('netto', record.get('harga_barang') * (rec.get('qty')));
                                                                            rec.set('harga', record.get('harga_barang') * (rec.get('qty')));
                                                                        }
                                                                        record.commit();
                                                                    });
                                                                    me.down('#totalBruto').setText("<b>Bruto : " + Ext.util.Format.number(me.getStore().sum('harga'), '0,000') + "</b>");
                                                                    me.down('#totalNetto').setText("<b>Rp.  " + Ext.util.Format.number(me.getStore().sum('netto'), '0,000') + "</b>");
                                                                    me.down('#FormKasirBayar').getForm().findField('sub_total').setValue(me.getStore().sum('netto'));
                                                                    me.down('#FormKasirBayar').getForm().findField('bruto').setValue(me.getStore().sum('harga'));
                                                                    return;
                                                                }
                                                                var r = Ext.ModelManager.create({
//                                                                    id: record.get('id'),
                                                                    kode_barang: record.get('kode_barang'),
                                                                    satuan: record.get('satuan'),
                                                                    nama_barang: record.get('nama_barang'),
                                                                    harga: record.get('harga_barang') * me.down('#Qty_Barang').getValue(),
                                                                    harga_satuan: record.get('harga_barang'),
                                                                    diskon: '0',
                                                                    netto: record.get('harga_barang') * me.down('#Qty_Barang').getValue(),
                                                                    qty: me.down('#Qty_Barang').getValue(),
                                                                }, 'SIForLaP.model.ListPemeriksaanModel');
                                                                me.getStore().add(r);
                                                                me.down('#totalBruto').setText("<b>Bruto : " + Ext.util.Format.number(me.getStore().sum('harga'), '0,000') + "</b>");
                                                                me.down('#totalNetto').setText("<b>Rp.  " + Ext.util.Format.number(me.getStore().sum('netto'), '0,000') + "</b>");
                                                                me.down('#FormKasirBayar').getForm().findField('sub_total').setValue(me.getStore().sum('netto'));
                                                                me.down('#FormKasirBayar').getForm().findField('bruto').setValue(me.getStore().sum('harga'));
                                                            }
                                                        },
                                                        keyup: function (val, e) {
                                                            if (e.getKey() === 113) {
                                                                me.getView().focus();
                                                                me.getSelectionModel().select(0);
                                                            }
                                                            if (e.getKey() === 115) {
                                                                me.down('#Qty_Barang').focus();
                                                            }

                                                        },
                                                    }
                                                },
                                            ]
                                        },
                                    ]},
                            ]
                        }
                    ]
                },
            ],
            bbar: [
                {
                    xtype: 'form',
                    title: 'Pembayaran',
                    width: '100%',
                    itemId: 'FormKasirBayar',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 380,
                        labelAlign: 'right',
                        labelWidth: 130,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    items: [
                                        Ext.create('Ext.ux.form.NumericField', {
                                            fieldLabel: "<b style = 'font-size: 15px'>Bruto </b>",
                                            name: 'bruto',
                                            hidden: true,
                                            readOnly: true,
                                            width: 320,
                                            decimalSeparator: '.',
                                            align: 'right',
                                            fieldStyle: 'background-color: rgb(162, 255, 186);font-size: 15px; height: 30px;',
                                            allowNegative: false,
                                            minValue: 0,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
                                            hideTrigger: true,
                                            emptyText: "0,00",
                                        }),
                                        Ext.create('Ext.ux.form.NumericField', {
                                            fieldLabel: "<b style = 'font-size: 15px'>Sub Total (Rp) </b>",
                                            name: 'sub_total',
                                            readOnly: true,
                                            width: 320,
                                            decimalSeparator: '.',
                                            align: 'right',
                                            fieldStyle: 'background-color: rgb(162, 255, 186);font-size: 15px; height: 30px;',
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
                                            fieldLabel: "<b style = 'font-size: 15px'>Pembayaran</b>",
                                            name: 'motode_bayar',
                                            fieldStyle: 'background-color: rgba(255, 235, 59, 0.47);font-size: 15px; height: 30px;',
                                            allowBlank: true,
                                            editable: false,
                                            enableKeyEvents: true,
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
                                                keyup: function (val, e) {
                                                    var form = me.down('#FormKasirBayar').getForm();
                                                    if (form.findField('motode_bayar').getValue() === '2') {
                                                        if (e.getKey() === e.ENTER) {
                                                            me.down('#FormKasirBayar').getForm().findField('bank').focus();
                                                        }
                                                    } else {
                                                        if (e.getKey() === e.ENTER) {
                                                            me.down('#FormKasirBayar').getForm().findField('jumlah_bayar').focus();
                                                        }
                                                    }
                                                },
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
                                            enableKeyEvents: true,
                                            fieldStyle: 'background-color: rgba(255, 235, 59, 0.47);font-size: 15px; height: 30px;',
                                            allowBlank: true,
                                            editable: false,
                                            hidden: true,
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
                                            listeners: {
                                                keyup: function (val, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        me.down('#FormKasirBayar').getForm().findField('keterangan_bank').focus();
                                                    }
                                                }
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: "<b style = 'font-size: 15px'>Keterangan </b>",
                                            hidden: true,
                                            enableKeyEvents: true,
                                            height: 30,
                                            fieldStyle: 'background-color: rgba(255, 235, 59, 0.47);font-size: 15px;',
                                            name: 'keterangan_bank',
                                            listeners: {
                                                keyup: function (val, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        me.down('#FormKasirBayar').getForm().findField('jumlah_bayar').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: "KB",
                                            hidden: true,
                                            height: 30,
                                            name: 'kurang_bayar',
                                        },
                                        Ext.create('Ext.ux.form.NumericField', {
                                            fieldLabel: "<b style = 'font-size: 15px'>Bayar (Rp) </b>",
                                            name: 'jumlah_bayar',
                                            width: 320,
                                            value: '0',
                                            decimalSeparator: '.',
                                            allowNegative: false,
                                            minValue: 0,
                                            fieldStyle: 'background-color: rgba(255, 235, 59, 0.47);font-size: 15px; height: 30px;',
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
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
                                                        me.down('#FormKasirBayar').down('#SimpanPembayaran').focus();
                                                    }
                                                },
                                            }
                                        }),
                                        Ext.create('Ext.ux.form.NumericField', {
                                            fieldLabel: "<b style = 'font-size: 15px'> Kembali (Rp) </b>",
                                            name: 'jumlah_kembali',
                                            width: 320,
                                            decimalSeparator: '.',
                                            readOnly: true,
                                            allowNegative: false,
                                            minValue: 0,
                                            fieldStyle: 'background-color: rgba(255, 87, 34, 0.63);font-size: 15px; height: 30px;',
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
                                            hideTrigger: true,
                                            emptyText: "0,00",
                                        }),
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'button',
                                            ui: 'blue-button',
                                            align: 'center',
                                            itemId: 'SimpanPembayaran',
                                            margin: '2 0 2 10',
                                            text: '  Bayar [END]  ',
                                            iconCls: 'icon-btn-save',
                                            listeners: {
                                                click: function () {
                                                    var form = me.down('#FormKasirBayar').getForm();
                                                    var grid = me;
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
                                                                grid.store.loadData([], false);
                                                                grid.down('#kode_barang').focus();
                                                                grid.down('#totalNetto').setText('<b>Rp. 0.00</b>');
                                                                grid.down('#PelangganKasir').setValue('1');
                                                                window.open(BASE_PATH + 'barang_keluar/nota/' + resp.data, "Print Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");
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
                                },
                            ]
                        }
                    ]

                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    hidden: true,
                    items: [
                        {
                            xtype: 'tbtext',
                            height: 30,
                            itemId: 'totalBruto',
                            cls: 'daftar-total-view',
                            text: '<b>Bruto : Rp. 0.00</b>'
                        },
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer',
                    text: 'No',
                    width: 40,
                    align: 'center',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Kode Barang',
                    align: 'left',
                    dataIndex: 'kode_barang',
                },
                {
                    xtype: 'gridcolumn',
                    width: 220,
                    text: 'Nama Barang',
                    dataIndex: 'nama_barang',
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    text: 'Qty',
                    dataIndex: 'qty',
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    text: 'Satuan',
                    dataIndex: 'satuan',
                    editor: {
                        xtype: "combobox",
                        width: 290,
                        itemId: 'CboSatuanBarang',
                        valueField: "satuan",
                        displayField: "satuan",
                        editable: false,
                        queryMode: "local",
                        store: {
                            remoteFilter: true,
                            fields: ['konversi', 'harga', 'satuan'],
                            proxy: {
                                type: 'ajax',
                                url: BASE_URL + 'datamaster/list_satuan_perbarang',
                                reader: {root: 'data', type: 'json'}
                            },
                        },
                        listeners: {
                            beforequery: function (record) {
                                var record = me.getSelectionModel().getSelection()[0];
                                var store = this.store;
                                var filterCollection = [];
                                var statusFilter = new Ext.util.Filter({
                                    property: 'filter',
                                    value: record.get('kode_barang')
                                });
                                filterCollection.push(statusFilter);
                                store.clearFilter(true);
                                store.filter(filterCollection);

                            },
                            select: function (cmb, rec, opt) {
                                var val = cmb.getValue(),
                                        record = cmb.findRecordByValue(val);
                                var sel = me.getSelectionModel().getSelection()[0];
                                sel.set('harga', sel.get('qty') * record.get('harga'));
                                sel.set('netto', (sel.get('qty') * record.get('harga')) - ((record.get('harga') / 100) * sel.get('diskon')));
                            }
                        },
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    text: 'Harga',
                    dataIndex: 'harga',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    hidden: true,
                    text: 'Harga Satuan',
                    dataIndex: 'harga_satuan',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Diskon',
                    dataIndex: 'diskon',
                    renderer: 'uppercase',
                    align: 'center',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        maxValue: 100,
                        minValue: 0,
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var record = me.getSelectionModel().getSelection()[0];
                                record.set('diskon', newValue);
                                record.set('netto', (record.get('harga')) - ((record.get('harga') / 100) * record.get('diskon')));

                            }
                        }
                    },
//                    summaryRenderer: function (value, summaryData, dataIndex) {
//                        var sum = 0;
//                        var nett = 0;
//                        var bruto = 0;
//                        me.getStore().each(function (record) {
//                            sum += +record.get('diskon_pemeriksaan');
//                            nett += +record.get('netto_pemeriksaan');
////                            nett += +record.get('harga_pemeriksaan') - (record.get('harga_pemeriksaan') * record.get('diskon_pemeriksaan') / 100);
//                            bruto += +record.get('harga_pemeriksaan');
//                        });
//                        var total = sum / me.getStore().getCount();
//                        Ext.getCmp('kurang_bayar').setValue(nett);
//                        Ext.getCmp('dibayar').setValue(0);
//                        Ext.getCmp('totalbayar').setText('<b>Rp. ' + Ext.util.Format.number(nett, '0,000.00/i') + '</b>');
//                        Ext.getCmp('totalbruto').setText('<b>Bruto : Rp. ' + Ext.util.Format.number(bruto, '0,000.00/i') + '</b>');
//                        Ext.getCmp('jumlah_netto').setValue(Ext.util.Format.number(nett, '0,000.00/i'));
//                        Ext.getCmp('jumlah_bruto').setValue(Ext.util.Format.number(bruto, '0,000.00/i'));
//                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    text: 'Sub Total',
                    align: 'right',
                    dataIndex: 'netto',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var sum = 0;
                        var nett = 0;
                        var bruto = 0;
                        me.getStore().each(function (record) {
                            sum += +record.get('diskon_pemeriksaan');
                            nett += +record.get('netto_pemeriksaan');
//                            nett += +record.get('harga_pemeriksaan') - (record.get('harga_pemeriksaan') * record.get('diskon_pemeriksaan') / 100);
                            bruto += +record.get('harga_pemeriksaan');
                        });
                        var total = sum / me.getStore().getCount();
                        Ext.getCmp('kurang_bayar').setValue(nett);
                        Ext.getCmp('dibayar').setValue(0);
                        Ext.getCmp('totalbayar').setText('<b> Rp. ' + Ext.util.Format.number(nett, '0,000.00/i') + '</b>');
                        Ext.getCmp('totalbruto').setText('<b>Bruto : Rp. ' + Ext.util.Format.number(bruto, '0,000.00/i') + '</b>');
                        Ext.getCmp('jumlah_netto').setValue(Ext.util.Format.number(nett, '0,000.00/i'));
                        Ext.getCmp('jumlah_bruto').setValue(Ext.util.Format.number(bruto, '0,000.00/i'));
                    }
//                    renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
////                        return record.get('harga_pemeriksaan') - (record.get('harga_pemeriksaan') * (record.get('diskon_pemeriksaan') / 100));
////                        return Ext.util.Format.numberRenderer(record.get('harga_pemeriksaan') - (record.get('harga_pemeriksaan') * (record.get('diskon_pemeriksaan') / 100)), '0,000.00');
//                        return Ext.util.Format.number(record.get('harga_pemeriksaan') - (record.get('harga_pemeriksaan') * (record.get('diskon_pemeriksaan') / 100)), '0,000.00');
//                    },
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    text: 'ID',
                    align: 'center',
                    dataIndex: 'id_pemeriksaan',
                    hidden: true
                },
            ],
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
//                    pluginId: 'divBkEditor',
                    listeners: {
                        beforeedit: function (editor, e, eOpts) {
//                            var record = e.record;
//                            var cbo = me.down('#CboSatuanBarang');
//                            var store = cbo.getStore();
//                            var filterCollection = [];
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'filter',
//                                value: record.get('kode_barang')
//                            });
//                            filterCollection.push(statusFilter);
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                            cbo.getStore().load({
//                                params: {
//                                    kode_barang: record.get('kode_barang'),
//                                },
//                                scope: this
//                            });
//                            alert('test');
//                            var form = Ext.getCmp('fopendaftaranform').getForm();
//                            var jenis_discount = form.findField('jenis_discount').getValue();
//                            var persetujuan = form.findField('idpersetujuandisc').getValue();
//                            var record = e.record;
//                            if (record.get('id_type') === 6) {
//                                return false;
//                            }
//                            if (jenis_discount === 'hut' || jenis_discount === 'hkn') {
//                                return true;
//                            } else {
//                                if (persetujuan > 0) {
//                                    return true;
//                                } else {
//                                    return false;
//                                }
//                            }
                        },
                        'edit': function (editor, e, opt) {
                            if (e.record.dirty) {

                                e.record.commit();

                            }
                        }
                    }
                }
            ],
        });

        me.callParent(arguments);
    },
    simpan: function (dateString) {
        return dateString;
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */