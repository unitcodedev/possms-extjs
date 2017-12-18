/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.barangmasuk.BarangMasukGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.barangmasuk.barangmasukgrid',
    itemId: 'barangmasukgrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'barangmasuk.BarangMasukStore',
    columnLines: true,
//    forceFit: true,
    renderTo: document.body,
    border: true,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Data Kosong',
                deferEmptyText: false,
                enableTextSelection: true,
                stripeRows: false,
                getRowClass: function (record, index) {
//                    return 'css-penjualan';
                },
            },
            tbar: [
                {
                    xtype: 'fieldset',
                    margin: '0 0 5 5',
                    width: '100%',
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
                                            width: 400,
                                            text: '<b>Kode Barang / Nama Barang</b>',
                                        },
                                        {
                                            xtype: 'combobox',
                                            emptyText: 'Kode Barang / Nama Barang',
                                            itemId: 'kode_barang',
                                            fieldStyle: 'background-color: #adffb6 ;width: 100%;',
                                            width: 400,
                                            displayField: 'nama_barang',
                                            valueField: 'kode_barang',
                                            queryMode: 'remote',
                                            allowBlank: true,
                                            triggerAction: 'all',
                                            valueNotFoundText: 'Tidak ada Data',
                                            enableKeyEvents: true,
                                            listConfig: {
                                                getInnerTpl: function () {
                                                    return '<div class="search-item">' +
                                                            '<b>{kode_barang} - {nama_barang} </b>' +
                                                            '<br/>Harga : {harga_beli}' +
                                                            '<br/></div>';
                                                }
                                            },
                                            store: {
                                                autoLoad: true,
                                                fields: ['id', 'kode_barang', 'nama_barang', {name: 'harga_beli', type: 'number'}, 'nama_barang_asli'],
                                                proxy: {
                                                    success: true,
                                                    type: 'ajax',
                                                    url: BASE_URL + 'barang_keluar/list_barang_keluar',
                                                    reader: {root: 'data', type: 'json'}
                                                },
                                            },
                                            listeners: {
//                                                beforequery: function (record) {
//                                                    var store = this.store;
//                                                    var filterCollection = [];
//                                                    var statusFilter = new Ext.util.Filter({
//                                                        property: 'filter',
//                                                        value: this.getValue()
//                                                    });
//                                                    filterCollection.push(statusFilter);
//                                                    store.clearFilter(true);
//                                                    store.filter(filterCollection);
//
//                                                },
                                                select: function (cmb, rec, opt) {
                                                    var val = cmb.getValue(),
                                                            record = cmb.findRecordByValue(val);
                                                    me.down('#NamaBarangMasuk').setValue(record.get('nama_barang_asli'));
                                                    me.down('#Qty_Barang').setValue(1);
                                                    me.down('#HargaSatuan').setValue(record.get('harga_beli'));

//                                                    if (record) {
//                                                        var cek = me.getStore().findRecord('kode_barang', record.get('kode_barang'));
//                                                        if (cek !== null) {
//                                                            me.getStore().each(function (rec, idx) {
//                                                                var kode_barang = rec.get('kode_barang');
//                                                                if (kode_barang == record.get('kode_barang')) {
//                                                                    rec.set('qty', me.down('#Qty_Barang').getValue() + rec.get('qty'));
////                                                                            rec.set('harga', rec.get('harga') * (me.down('#Qty_Barang').getValue() + rec.get('qty')));
//                                                                    rec.set('netto', record.get('harga_barang') * (rec.get('qty')));
//                                                                    rec.set('harga', record.get('harga_barang') * (rec.get('qty')));
//                                                                }
//                                                                record.commit();
//                                                            });
//                                                            me.down('#totalBruto').setText("<b>Bruto : " + Ext.util.Format.number(me.getStore().sum('harga'), '0,000') + "</b>");
//                                                            me.down('#totalNetto').setText("<b>Rp.  " + Ext.util.Format.number(me.getStore().sum('netto'), '0,000') + "</b>");
//                                                            return;
//                                                        }
//                                                        var r = Ext.ModelManager.create({
////                                                                    id: record.get('id'),
//                                                            kode_barang: record.get('kode_barang'),
//                                                            nama_barang: record.get('nama_barang'),
//                                                            harga: record.get('harga_barang') * me.down('#Qty_Barang').getValue(),
//                                                            harga_satuan: record.get('harga_barang'),
//                                                            diskon: '0',
//                                                            netto: record.get('harga_barang') * me.down('#Qty_Barang').getValue(),
//                                                            qty: me.down('#Qty_Barang').getValue(),
//                                                        }, 'SIForLaP.model.ListPemeriksaanModel');
//                                                        me.getStore().add(r);
//                                                        me.down('#totalBruto').setText("<b>Bruto : " + Ext.util.Format.number(me.getStore().sum('harga'), '0,000') + "</b>");
//                                                        me.down('#totalNetto').setText("<b>Rp.  " + Ext.util.Format.number(me.getStore().sum('netto'), '0,000') + "</b>");
//
//                                                    }
                                                },
                                                keyup: function (val, e) {
                                                    if (e.getKey() === 13) {
                                                        me.down('#Qty_Barang').focus();
                                                    }
                                                },
                                            }
                                        },
//                                        {
//                                            xtype: 'combobox',
//                                            emptyText: 'Kode Barang / Nama Barang',
//                                            width: 400,
//                                            itemId: 'kode_barang',
//                                            displayField: 'mspem_nama',
//                                            queryMode: 'remote',
//                                            triggerAction: 'all',
//                                            allowBlank: true,
////                                            minChars: 5,
//                                            fieldStyle: 'background-color: #adffb6 ;width: 100%;',
////                                            allowBlank: false,
////                                            forceSelection: true,
////                                            triggerAction: 'all',
////                                            mode: 'remote',
//                                            valueField: 'id',
////                                            hideTrigger: true,
////                                            enableKeyEvents: true,
//                                            listConfig: {
////                                                loadingText: 'Searching...',
////                                                emptyText: 'Data Tidak Ada.',
//                                                getInnerTpl: function () {
//                                                    return '<div class="search-item">' +
//                                                            '<b>{kode_barang} - {nama_barang} </b>' +
//                                                            '<br/>Harga : {harga_beli}' +
//                                                            '<br/></div>';
//                                                }
//                                            },
//                                            store: {
//                                                autoLoad: true,
////                                                remoteFilter: true,
//                                                fields: ['id', 'kode_barang', 'nama_barang', {name: 'harga_beli', type: 'number'}, 'stok_barang'],
//                                                proxy: {
//                                                    success: true,
//                                                    type: 'ajax',
//                                                    url: BASE_URL + 'barang_keluar/list_barang_keluar',
//                                                    reader: {root: 'data', type: 'json'}
//                                                },
//                                            },
//                                            listeners: {
////                                                beforequery: function (record) {
////                                                    var store = this.store;
////                                                    var filterCollection = [];
////                                                    var statusFilter = new Ext.util.Filter({
////                                                        property: 'filter',
////                                                        value: this.getValue()
////                                                    });
////                                                    filterCollection.push(statusFilter);
////                                                    store.clearFilter(true);
////                                                    store.filter(filterCollection);
////
////                                                },
//                                                select: function (cmb, rec, opt) {
//                                                    var val = cmb.getValue(),
//                                                            record = cmb.findRecordByValue(val);
//                                                    me.down('#NamaBarangMasuk').setValue(record.get('nama_barang'));
//                                                    me.down('#Qty_Barang').setValue(1);
//                                                    me.down('#HargaSatuan').setValue(record.get('harga_beli'));
//
////                                                    if (record) {
////                                                        var cek = me.getStore().findRecord('kode_barang', record.get('kode_barang'));
////                                                        if (cek !== null) {
////                                                            me.getStore().each(function (rec, idx) {
////                                                                var kode_barang = rec.get('kode_barang');
////                                                                if (kode_barang == record.get('kode_barang')) {
////                                                                    rec.set('qty', me.down('#Qty_Barang').getValue() + rec.get('qty'));
//////                                                                            rec.set('harga', rec.get('harga') * (me.down('#Qty_Barang').getValue() + rec.get('qty')));
////                                                                    rec.set('netto', record.get('harga_barang') * (rec.get('qty')));
////                                                                    rec.set('harga', record.get('harga_barang') * (rec.get('qty')));
////                                                                }
////                                                                record.commit();
////                                                            });
////                                                            me.down('#totalBruto').setText("<b>Bruto : " + Ext.util.Format.number(me.getStore().sum('harga'), '0,000') + "</b>");
////                                                            me.down('#totalNetto').setText("<b>Rp.  " + Ext.util.Format.number(me.getStore().sum('netto'), '0,000') + "</b>");
////                                                            return;
////                                                        }
////                                                        var r = Ext.ModelManager.create({
//////                                                                    id: record.get('id'),
////                                                            kode_barang: record.get('kode_barang'),
////                                                            nama_barang: record.get('nama_barang'),
////                                                            harga: record.get('harga_barang') * me.down('#Qty_Barang').getValue(),
////                                                            harga_satuan: record.get('harga_barang'),
////                                                            diskon: '0',
////                                                            netto: record.get('harga_barang') * me.down('#Qty_Barang').getValue(),
////                                                            qty: me.down('#Qty_Barang').getValue(),
////                                                        }, 'SIForLaP.model.ListPemeriksaanModel');
////                                                        me.getStore().add(r);
////                                                        me.down('#totalBruto').setText("<b>Bruto : " + Ext.util.Format.number(me.getStore().sum('harga'), '0,000') + "</b>");
////                                                        me.down('#totalNetto').setText("<b>Rp.  " + Ext.util.Format.number(me.getStore().sum('netto'), '0,000') + "</b>");
////
////                                                    }
//                                                },
//                                                keyup: function (val, e) {
//                                                    if (e.getKey() === 13) {
//                                                        me.down('#Qty_Barang').focus();
//                                                    }
//                                                },
//                                            }
//                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    hidden: true,
                                    items: [
                                        {
                                            xtype: 'tbtext',
                                            width: 270,
                                            text: '<b>Nama Barang</b>'
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: 270,
                                            readOnly: true,
                                            itemId: 'NamaBarangMasuk',
                                            enableKeyEvents: true,
                                            fieldStyle: 'background-color: #adffb6; width: 100%;',
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
                                            width: 70,
                                            text: '<b>Qty</b>'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            width: 70,
                                            itemId: 'Qty_Barang',
                                            value: 1,
                                            enableKeyEvents: true,
                                            fieldStyle: 'background-color: #adffb6; width: 100%;',
                                            listeners: {
                                                keyup: function (val, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        me.down('#Satuan').focus();
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
                                            width: 90,
                                            text: '<b>Satuan</b>'
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'Satuan',
                                            fieldStyle: 'background-color: #adffb6 ;width: 100%;',
                                            width: 90,
                                            displayField: 'satuan',
                                            valueField: 'satuan',
                                            queryMode: 'remote',
                                            allowBlank: true,
                                            triggerAction: 'all',
                                            valueNotFoundText: 'Tidak ada Data',
                                            enableKeyEvents: true,
                                            store: {
                                                autoLoad: true,
                                                fields: ['id', 'satuan'],
                                                proxy: {
                                                    success: true,
                                                    type: 'ajax',
                                                    url: BASE_URL + 'datamaster/list_satuan_barang',
                                                    reader: {root: 'data', type: 'json'}
                                                },
                                            },
                                            listeners: {
                                                keyup: function (val, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        me.down('#HargaSatuan').focus();
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
                                            width: 100,
                                            text: '<b>@ Harga</b>'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            width: 100,
                                            itemId: 'HargaSatuan',
                                            enableKeyEvents: true,
                                            fieldStyle: 'background-color: #adffb6; width: 100%;',
                                            listeners: {
                                                keyup: function (val, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        var r = Ext.ModelManager.create({
                                                            kode_barang: me.down('#kode_barang').getValue(),
                                                            nama_barang: me.down('#NamaBarangMasuk').getValue(),
                                                            qty: me.down('#Qty_Barang').getValue(),
                                                            satuan: me.down('#Satuan').getValue(),
//                                                            id_satuan: me.down('#Satuan').getValue(),
                                                            harga_satuan: me.down('#HargaSatuan').getValue(),
                                                            harga_total: me.down('#Qty_Barang').getValue() * me.down('#HargaSatuan').getValue(),
                                                        }, 'SIForLaP.model.BarangMasukModel');
                                                        me.getStore().add(r);
                                                        me.down('#kode_barang').setValue('');
                                                        me.down('#NamaBarangMasuk').setValue('');
                                                        me.down('#Qty_Barang').setValue('1');
                                                        me.down('#Satuan').setValue('');
                                                        me.down('#HargaSatuan').setValue('');
                                                        me.down('#kode_barang').focus();
                                                    }
                                                },
                                            }
                                        },
                                    ]
                                },
                            ]},
                    ]
                }
            ],
            bbar: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    margin: '5 5 5 5',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    labelWidth: 90,
                                    editable: false,
                                    width: 220,
                                    fieldLabel: '<b>Tanggal Trx</b>',
                                    itemId: 'TglBarangMasuk',
                                    format: 'd/M/Y',
                                    emptyText: 'MM-DD-YYYY',
                                    submitFormat: 'Y-m-d',
                                    value: new Date(),
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
//                            readOnly: true,
                            labelWidth: 90,
                            width: 300,
                            fieldLabel: '<b>No. Nota</b>',
                            itemId: 'No_Nota'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '<b>Cari Suplier </b>',
                                    labelWidth: 90,
                                    width: 300,
                                    fieldStyle: 'background-color: rgb(173, 230, 255);width: 100%;',
                                    emptyText: 'Cari Suplier',
                                    displayField: 'ms_nama',
                                    queryMode: 'local',
                                    minChars: 5,
                                    allowBlank: false,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    mode: 'remote',
                                    valueField: 'kode_suplier',
                                    hideTrigger: true,
                                    enableKeyEvents: true,
                                    listConfig: {
                                        loadingText: 'Searching...',
                                        emptyText: 'Data Tidak Ada.',
                                        getInnerTpl: function () {
                                            return '<div class="search-item">' +
                                                    '<b>{kode_splier} - {ms_nama} </b>' +
                                                    '<br/>Plafon : {mc_plafond}' +
                                                    '<br/></div>';
                                        }
                                    },
                                    store: {
                                        autoLoad: false,
                                        remoteFilter: true,
                                        fields: ['id', 'kode_suplier', 'ms_nama'],
                                        proxy: {
                                            success: true,
                                            type: 'ajax',
                                            url: BASE_URL + 'barang_masuk/list_suplier',
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
                                            me.down('#KodeSuplier').setValue(record.get('kode_suplier'));
                                            me.down('#NamaSuplier').setValue(record.get('ms_nama'));

                                        }
                                    },
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    readOnly: true,
                                    labelWidth: 90,
                                    margin: '0 0 0 0',
                                    width: 200,
                                    fieldLabel: '<b>Kode</b>',
                                    itemId: 'KodeSuplier'
                                },
                                {
                                    xtype: 'textfield',
                                    readOnly: true,
                                    labelWidth: 60,
                                    margin: '0 0 0 5',
                                    width: 350,
                                    fieldLabel: '<b>Nama</b>',
                                    itemId: 'NamaSuplier'
                                },
                            ]
                        },
                        {
                            xtype: 'button',
                            ui: 'blue-button',
                            text: 'Simpan Data',
                            margin: '0 0 0 0',
                            iconCls: 'icon-btn-save',
                            width: 100,
                            listeners: {
                                click: function () {
                                    var grid = me;
                                    if (grid.down('#No_Nota').getValue() === '' || grid.down('#KodeSuplier').getValue() === '') {
                                        Ext.MessageBox.show({
                                            title: 'Error',
                                            msg: 'Data Masih ada yang kosong',
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                        return;
                                    }
                                    Ext.Ajax.request({
                                        url: BASE_PATH + 'barang_masuk/simpan_transaksi',
                                        method: 'POST',
                                        params: {
                                            no_nota: grid.down('#No_Nota').getValue(),
                                            kode_suplier: grid.down('#KodeSuplier').getValue(),
                                            nama_suplier: grid.down('#NamaSuplier').getValue(),
                                            tgl: Ext.Date.format(grid.down('#TglBarangMasuk').getValue(), 'Ymd'),
                                            grid: JSON.stringify(Ext.pluck(me.getStore().data.items, 'data')),
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
                                                grid.down('#NamaSuplier').setValue('');
                                                grid.down('#No_Nota').setValue('');
                                                grid.down('#KodeSuplier').setValue('');
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
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer', {resizable: true, align: 'center'}),
                {
                    xtype: 'gridcolumn',
                    width: 110,
                    text: 'Kode Barang',
                    dataIndex: 'kode_barang',
                },
                {
                    xtype: 'gridcolumn',
                    width: 280,
                    text: 'Nama Barang',
                    dataIndex: 'nama_barang',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Qty',
                    dataIndex: 'qty',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Satuan',
                    dataIndex: 'satuan',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: '@ Harga',
                    dataIndex: 'harga_satuan',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Total',
                    dataIndex: 'harga_total',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right'
                },
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */