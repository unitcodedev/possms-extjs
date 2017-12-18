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
                            var win = Ext.widget('fopendaftaran.kasirbayarwin');
                            var form = win.down('#FormKasirBayar').getForm();
                            form.findField('sub_total').setValue(me.getStore().sum('netto'));
//                            form.findField('jumlah_bayar').setValue('');
                            form.findField('jumlah_bayar').focus();
                            form.findField('jumlah_kembali').setValue(0 - form.findField('sub_total').getValue());

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
                                            hidden : true,
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
                                    width: 360,
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
                                                    fieldStyle: 'background-color: #adffb6;font-size: 18px;  height: 30px;width: 100%;',
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
                                                    emptyText: 'Kode Barang / Nama',
                                                    width: 450,
                                                    itemId: 'kode_barang',
                                                    displayField: 'mspem_nama',
                                                    queryMode: 'local',
                                                    minChars: 5,
                                                    fieldStyle: 'background-color: #adffb6;font-size: 18px;  height: 30px;width: 100%;',
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
                                                        fields: ['id', 'kode_barang', 'nama_barang', {name: 'harga_barang', type: 'number'}, 'stok_barang'],
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
                                                                            rec.set('harga', rec.get('harga') * (me.down('#Qty_Barang').getValue() + rec.get('qty')));
                                                                            rec.set('netto', rec.get('netto') * (me.down('#Qty_Barang').getValue() + rec.get('qty')));
                                                                        }
                                                                        record.commit();
                                                                    });
                                                                    return;
                                                                }
                                                                var r = Ext.ModelManager.create({
                                                                    kode_barang: record.get('kode_barang'),
                                                                    nama_barang: record.get('nama_barang'),
                                                                    harga: record.get('harga_barang') * me.down('#Qty_Barang').getValue(),
                                                                    diskon: '0',
                                                                    netto: record.get('harga_barang') * me.down('#Qty_Barang').getValue(),
                                                                    qty: me.down('#Qty_Barang').getValue(),
                                                                }, 'SIForLaP.model.ListPemeriksaanModel');
                                                                me.getStore().add(r);
                                                                me.down('#totalBruto').setText("<b>Bruto : " + Ext.util.Format.number(me.getStore().sum('harga'), '0,000') + "</b>");
                                                                me.down('#totalNetto').setText("<b>Rp.  " + Ext.util.Format.number(me.getStore().sum('netto'), '0,000') + "</b>");

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
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    width: 700,
                    height: 25,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            height: 20,
                            width: '100%',
                            items: [
                                {
                                    xtype: 'tbtext',
                                    text: "<p style='color: black; font-size:12px; width:'10%';><b>Bayar [END] || </b></p>"
                                },
                                {
                                    xtype: 'tbtext',
                                    text: "<p style='color: black; font-size:12px; width:'10%';><b>Bayar [END] || </b></p>"
                                },
                                {
                                    xtype: 'tbtext',
                                    text: "<p style='color: black; font-size:12px; width:'10%';><b>Bayar [END] || </b></p>"
                                },
                            ]
                        }
                    ]
                },
//                {
//                    xtype: 'button',
//                    ui: 'blue-button',
//                    align: 'center',
//                    margin: '2 0 2 10',
//                    text: '  Bayar [END]  ',
//                    iconCls: 'icon-btn-uang',
//                },
//                '->',
//                {
//                    xtype: 'fieldcontainer',
//                    layout: 'vbox',
//                    items: [
//                        {
//                            xtype: 'fieldcontainer',
//                            layout: 'hbox',
//                            items: [
//                                {
//                                    xtype: 'tbtext',
//                                    margin: '3 0 0 0',
//                                    width: 100,
//                                    text: '<b>Sub Total</b>'
//                                },
//                                {
//                                    xtype: 'numberfield',
//                                    width: 40,
//                                    readOnly: true,
//                                    value: 0
//
//                                },
//                                Ext.create('Ext.ux.form.NumericField', {
//                                    decimalPrecision: 2,
//                                    decimalSeparator: '.',
//                                    alwaysDisplayDecimals: true,
//                                    allowNegative: false,
//                                    minValue: 0,
//                                    keyNavEnabled: false,
//                                    mouseWheelEnabled: false,
//                                    allowBlank: false,
//                                    hideTrigger: true,
//                                    emptyText: "0,00",
//                                    readOnly: true,
//                                }),
//                            ]
//                        },
//                        {
//                            xtype: 'fieldcontainer',
//                            layout: 'hbox',
//                            items: [
//                                {
//                                    xtype: 'tbtext',
//                                    margin: '3 0 0 0',
//                                    width: 100,
//                                    text: '<b>Diskon</b>'
//                                },
//                                {
//                                    xtype: 'numberfield',
//                                    width: 40,
//                                    readOnly: true,
//                                    value: 0
//
//                                },
//                                Ext.create('Ext.ux.form.NumericField', {
//                                    decimalPrecision: 2,
//                                    decimalSeparator: '.',
//                                    alwaysDisplayDecimals: true,
//                                    allowNegative: false,
//                                    minValue: 0,
//                                    keyNavEnabled: false,
//                                    mouseWheelEnabled: false,
//                                    allowBlank: false,
//                                    hideTrigger: true,
//                                    emptyText: "0,00",
//                                    readOnly: true,
//                                }),
//                            ]
//                        },
//                        {
//                            xtype: 'fieldcontainer',
//                            layout: 'hbox',
//                            items: [
//                                {
//                                    xtype: 'tbtext',
//                                    margin: '3 0 0 0',
//                                    width: 100,
//                                    text: '<b>Pajak</b>'
//                                },
//                                {
//                                    xtype: 'numberfield',
//                                    width: 40,
//                                    readOnly: true,
//                                    value: 0
//
//                                },
//                                Ext.create('Ext.ux.form.NumericField', {
//                                    decimalPrecision: 2,
//                                    decimalSeparator: '.',
//                                    alwaysDisplayDecimals: true,
//                                    allowNegative: false,
//                                    minValue: 0,
//                                    keyNavEnabled: false,
//                                    mouseWheelEnabled: false,
//                                    allowBlank: false,
//                                    hideTrigger: true,
//                                    emptyText: "0,00",
//                                    readOnly: true,
//                                }),
//                            ]
//                        },
//                    ]
//                },
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
                    width: 60,
                    text: 'Diskon',
                    dataIndex: 'diskon',
                    renderer: 'uppercase',
                    align: 'center',
                    editor: {
                        allowBlank: false,
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var record = me.getSelectionModel().getSelection()[0];
                                record.set('diskon_pemeriksaan', newValue);
                                // Potong Jasmed
                                var harga = record.get('harga_pemeriksaan');
                                var potong = harga - (harga * record.get('diskon_pemeriksaan') / 100);
                                // Tidak Potong
                                var harga_bersih = record.get('harga_pemeriksaan') - Number(record.get('jasmed')) - Number(record.get('obat'));
                                var tidak_potong = (harga_bersih - (harga_bersih * record.get('diskon_pemeriksaan') / 100)) + Number(record.get('jasmed')) + Number(record.get('obat'));
//                                debugger;
                                // Umum
                                if (Ext.getCmp('daftar_tipekirim1').getValue() === true || Ext.getCmp('daftar_tipekirim2').getValue() === true) {
                                    if (JASMED_UMUM === '1') {
                                        record.set('netto_pemeriksaan', potong);
                                    } else {
                                        record.set('netto_pemeriksaan', tidak_potong);
                                    }
                                } else if (Ext.getCmp('daftar_tipekirim3').getValue() === true || Ext.getCmp('daftar_tipekirim4').getValue() === true) {
                                    // Rekanan
                                    if (JASMED_REKANAN === '1') {
                                        record.set('netto_pemeriksaan', potong);
                                    } else {
                                        record.set('netto_pemeriksaan', tidak_potong);
                                    }
                                }



                            }
                        }
                    },
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
                        Ext.getCmp('totalbayar').setText('<b>Rp. ' + Ext.util.Format.number(nett, '0,000.00/i') + '</b>');
                        Ext.getCmp('totalbruto').setText('<b>Bruto : Rp. ' + Ext.util.Format.number(bruto, '0,000.00/i') + '</b>');
                        Ext.getCmp('jumlah_netto').setValue(Ext.util.Format.number(nett, '0,000.00/i'));
                        Ext.getCmp('jumlah_bruto').setValue(Ext.util.Format.number(bruto, '0,000.00/i'));
                    }
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
                            var form = Ext.getCmp('fopendaftaranform').getForm();
                            var jenis_discount = form.findField('jenis_discount').getValue();
                            var persetujuan = form.findField('idpersetujuandisc').getValue();
                            var record = e.record;
                            if (record.get('id_type') === 6) {
                                return false;
                            }
                            if (jenis_discount === 'hut' || jenis_discount === 'hkn') {
                                return true;
                            } else {
                                if (persetujuan > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
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
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */