/**
 * Marz@2017
 **/

Ext.define('SIForLaP.view.trxpembelian.TrxPembelianGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.trxpembelian.trxpembeliangrid',
    itemId: 'trxpembeliangrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'trxpembelian.TrxPembelianStore',
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
                            items: [
                                {
                                    xtype: 'datefield',
                                    labelWidth: 90,
                                    editable: false,
                                    width: 220,
                                    fieldLabel: '<b>Tanggal Trx</b>',
                                    itemId: 'TglTrxPembelian',
                                    format: 'd/m/Y',
                                    emptyText: 'MM-DD-YYYY',
                                    submitFormat: 'Y-m-d',
                                    value: new Date(),
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Nama_Supplier').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    items: [
//                                        {
//                                            xtype: 'combobox',
//                                            emptyText: 'Pilih Cabang',
//                                            fieldLabel: '<b> Cabang </b>',
//                                            labelWidth: 80,
//                                            margin: '0 0 5 5',
//                                            editable: false,
//                                            itemId: 'BoHutang_Cabang',
//                                            width: 260,
//                                            displayField: 'msc_nama',
//                                            valueField: 'id',
//                                            queryMode: 'remote',
//                                            allowBlank: true,
//                                            triggerAction: 'all',
//                                            value: CABANG_ID,
//                                            valueNotFoundText: 'Tidak ada Data',
//                                            store: 'bohutang.CabangStore'
//                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: '<b>Suplier </b>',
                                            labelWidth: 90,
                                            width: 300,
                                            margin: '0 0 0 20',
                                            fieldStyle: 'background-color: rgb(173, 230, 255);width: 100%;',
//                                            emptyText: 'Nama_Supplier',
                                            displayField: 'Nama',
                                            valueField: 'Kode',
                                            minChars: 5,
                                            allowBlank: false,
                                            queryMode: 'remote',
                                            triggerAction: 'all',
                                            itemId: 'Nama_Supplier',
//                                            hideTrigger: true,
                                            enableKeyEvents: true,
                                            listConfig: {
                                                loadingText: 'Searching...',
                                                emptyText: 'Data Tidak Ada.',
                                                getInnerTpl: function () {
                                                    return '<div class="search-item">' +
                                                            '<b>{Kode} - {Nama} </b>' +
                                                            '<br/>Alamat : {Alamat}' +
                                                            '<br/></div>';
                                                }
                                            },
                                            store: {
                                                autoLoad: true,
                                                remoteFilter: true,
                                                fields: ['Kode', 'Nama', 'Alamat'],
                                                proxy: {
                                                    success: true,
                                                    type: 'ajax',
                                                    url: BASE_URL + 'pembelian/list_supplier',
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
//                                                    console.log(rec[0].data.Nama);
                                                    me.down('#Kode_Supplier').setValue(rec[0].data.Kode);
                                                    me.down('#Nama_Supplier').setValue(rec[0].data.Nama);

                                                },
                                                keyup: function (val, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        me.down('#NoFakturSuplier').focus();
                                                    }
                                                },
                                            },
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '5 0 0 20',
                                            labelWidth: 90,
                                            width: 260,
                                            fieldLabel: '<b>Faktur Supplier</b>',
                                            itemId: 'NoFakturSuplier',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keyup: function (val, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        me.down('#TglTrxJatuhTempo').focus();
                                                    }
                                                },
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            labelWidth: 90,
                                            editable: false,
                                            width: 220,
                                            margin: '5 0 20 20',
                                            fieldLabel: '<b>Jatuh Tempo</b>',
                                            itemId: 'TglTrxJatuhTempo',
                                            format: 'd/m/Y',
                                            emptyText: 'MM-DD-YYYY',
                                            submitFormat: 'Y-m-d',
                                            value: new Date(),
                                            enableKeyEvents: true,
                                            listeners: {
                                                keyup: function (val, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        me.down('#Keterangan').focus();
                                                    }
                                                },
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '0 0 0 0',
                                    width: 60,
                                    readOnly: true,
                                    itemId: 'Kode_Supplier',
                                    fieldStyle: 'background-color: rgb(242, 245, 96);width: 100%;',
                                },
                                {
                                    xtype: 'textareafield',
                                    margin: '0 0 0 20',
                                    labelWidth: 90,
                                    width: 300,
                                    fieldLabel: '<b>Keterangan</b>',
                                    itemId: 'Keterangan',
                                    enableKeyEvents: true,
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
                            layout: 'hbox',
                            margin: '0 0 0 0',
                            items: [
                                {
                                    xtype: 'combobox',
                                    emptyText: 'Kode Barang / Nama Barang',
                                    itemId: 'kode_barang',
                                    fieldStyle: 'background-color: #adffb6 ;width: 100%;',
                                    width: 400,
                                    displayField: 'Nama',
                                    valueField: 'Kode',
                                    queryMode: 'remote',
                                    allowBlank: true,
                                    triggerAction: 'all',
                                    valueNotFoundText: 'Tidak ada Data',
                                    enableKeyEvents: true,
                                    listConfig: {
                                        getInnerTpl: function () {
                                            return '<div class="search-item">' +
                                                    '<b>{Kode} - {Nama} </b>' +
                                                    '<br/></div>';
                                        }
                                    },
                                    store: {
//                                        autoLoad: true,
                                        fields: ['Kode', 'Nama'],
                                        proxy: {
                                            success: true,
                                            type: 'ajax',
                                            url: BASE_URL + 'pembelian/list_barang',
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
                                            me.down('#nama_barang').setValue(rec[0].data.Nama);
                                            me.down('#Qty_Barang').setValue(1);
                                            var store = me.down('#Satuan').getStore();
                                            var filterCollection = [];
                                            var statusFilter = new Ext.util.Filter({
                                                property: 'filter',
                                                value: this.getValue()
                                            });
                                            filterCollection.push(statusFilter);
                                            store.clearFilter(true);
                                            store.filter(filterCollection);
                                        },
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Satuan').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    width: 270,
                                    hidden: true,
                                    readOnly: true,
                                    margin: '0 0 0 0',
                                    itemId: 'nama_barang',
                                    enableKeyEvents: true,
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'Satuan',
                                    editable: false,
                                    fieldStyle: 'background-color: #adffb6 ;width: 100%;',
                                    width: 70,
                                    displayField: 'satuan',
                                    valueField: 'satuan',
                                    queryMode: 'remote',
                                    allowBlank: true,
                                    triggerAction: 'all',
                                    valueNotFoundText: 'Tidak ada Data',
                                    enableKeyEvents: true,
                                    store: {
//                                        autoLoad: true,
                                        remoteFilter: true,
                                        fields: ['sat', 'satuan', 'harga'],
                                        proxy: {
                                            success: true,
                                            type: 'ajax',
                                            url: BASE_URL + 'pembelian/list_satuan_barang',
                                            reader: {root: 'data', type: 'json'}
                                        },
                                    },
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Qty_Barang').focus();
                                            }
                                        },
                                        select: function (cmb, rec, opt) {
//                                            me.down('#HargaAt').setValue(rec[0].data.harga);
                                            me.down('#HargaSatuan').setValue(rec[0].data.harga);
                                            me.down('#Harga_Total_Barang').setValue(me.down('#Qty_Barang').getValue() * rec[0].data.harga);
                                        },
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    width: 60,
                                    margin: '0 0 0 0',
                                    itemId: 'Qty_Barang',
                                    value: 1,
                                    enableKeyEvents: true,
                                    fieldStyle: 'background-color: #adffb6; width: 100%;',
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                if (me.down('#HargaSatuan').getValue() == '') {
                                                    alert('Pilih Data Satuan Terlebih Dahulu');
                                                    return;
                                                }
                                                me.down('#Harga_Total_Barang').setValue(me.down('#Qty_Barang').getValue() * me.down('#HargaSatuan').getValue());
                                                me.down('#Disc1_Barang').focus();
                                            }
                                        },
                                    }
                                },
//                                {
//                                    xtype: 'numberfield',
//                                    width: 110,
//                                    hidden: true,
//                                    itemId: 'HargaAt',
//                                },
                                {
                                    xtype: 'numberfield',
                                    width: 110,
                                    itemId: 'HargaSatuan',
                                    readOnly: true,
                                    enableKeyEvents: true,
                                    fieldStyle: 'background-color: #adffb6; width: 100%;',
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                var r = Ext.ModelManager.create({
                                                    kode_barang: me.down('#kode_barang').getValue(),
                                                    nama_barang: me.down('#NamaTrxPembelian').getValue(),
                                                    qty: me.down('#Qty_Barang').getValue(),
                                                    satuan: me.down('#Satuan').getValue(),
//                                                            id_satuan: me.down('#Satuan').getValue(),
                                                    harga_satuan: me.down('#HargaSatuan').getValue(),
                                                    harga_total: me.down('#Qty_Barang').getValue() * me.down('#HargaSatuan').getValue(),
                                                }, 'SIForLaP.model.TrxPembelianModel');
                                                me.getStore().add(r);
                                                me.down('#kode_barang').setValue('');
                                                me.down('#NamaTrxPembelian').setValue('');
                                                me.down('#Qty_Barang').setValue('1');
                                                me.down('#Satuan').setValue('');
                                                me.down('#HargaSatuan').setValue('');
                                                me.down('#kode_barang').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    width: 60,
                                    margin: '0 0 0 0',
                                    itemId: 'Disc1_Barang',
                                    value: 0,
                                    enableKeyEvents: true,
                                    fieldStyle: 'background-color: #adffb6; width: 100%;',
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Disc2_Barang').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    width: 60,
                                    margin: '0 0 0 0',
                                    itemId: 'Disc2_Barang',
                                    value: 0,
                                    enableKeyEvents: true,
                                    fieldStyle: 'background-color: #adffb6; width: 100%;',
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Disc3_Barang').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    width: 60,
                                    margin: '0 0 0 0',
                                    itemId: 'Disc3_Barang',
                                    value: 0,
                                    enableKeyEvents: true,
                                    fieldStyle: 'background-color: #adffb6; width: 100%;',
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Disc_Rp_Barang').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    width: 60,
                                    margin: '0 0 0 0',
                                    itemId: 'Disc_Rp_Barang',
                                    value: 0,
                                    enableKeyEvents: true,
                                    fieldStyle: 'background-color: #adffb6; width: 100%;',
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Harga_Total_Barang').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    width: 110,
                                    margin: '0 0 0 0',
                                    itemId: 'Harga_Total_Barang',
                                    value: 1,
                                    enableKeyEvents: true,
                                    fieldStyle: 'background-color: #adffb6; width: 100%;',
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Exp_Barang').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    width: 60,
                                    editable: false,
                                    fieldStyle: 'background-color: #adffb6; width: 100%;',
                                    margin: '0 0 0 0',
                                    itemId: 'Exp_Barang',
                                    format: 'd/m/Y',
//                                    emptyText: 'MM-DD-YYYY',
                                    submitFormat: 'Y-m-d',
                                    value: new Date(),
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Gdg_Barang').focus();

                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'Gdg_Barang',
                                    editable: false,
                                    fieldStyle: 'background-color: #adffb6 ;width: 100%;',
                                    width: 60,
                                    displayField: 'Jenis',
                                    valueField: 'Jenis',
                                    value: '00',
                                    queryMode: 'remote',
                                    allowBlank: true,
                                    triggerAction: 'all',
                                    valueNotFoundText: 'Tidak ada Data',
                                    enableKeyEvents: true,
                                    store: {
                                        autoLoad: true,
                                        remoteFilter: true,
                                        fields: ['Kode', 'Jenis', 'Keterangan'],
                                        proxy: {
                                            success: true,
                                            type: 'ajax',
                                            url: BASE_URL + 'datamaster/list_gudang',
                                            reader: {root: 'data', type: 'json'}
                                        },
                                    },
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {

                                                var r = Ext.ModelManager.create({
                                                    kode_barang: me.down('#kode_barang').getValue(),
                                                    nama_barang: me.down('#nama_barang').getValue(),
                                                    qty: me.down('#Qty_Barang').getValue(),
                                                    satuan: me.down('#Satuan').getValue(),
                                                    harga_satuan: me.down('#HargaSatuan').getValue(),
                                                    disc1: me.down('#Disc1_Barang').getValue(),
                                                    disc2: me.down('#Disc2_Barang').getValue(),
                                                    disc3: me.down('#Disc3_Barang').getValue(),
                                                    discrp: me.down('#Disc_Rp_Barang').getValue(),
                                                    harga_total: me.down('#Harga_Total_Barang').getValue(),
                                                    exp: Ext.Date.format(me.down('#Exp_Barang').getValue(), 'd/m/Y'),
                                                    gdg: me.down('#Gdg_Barang').getValue(),
                                                }, 'SIForLaP.model.TrxPembelianModel');
                                                me.getStore().add(r);
                                                me.resetinput();
                                                me.down('#kode_barang').focus();
                                                me.down('#GrandTotal').setValue(me.getStore().sum('harga_total'));
                                            }
                                        },
                                        select: function (cmb, rec, opt) {
//                                            me.down('#HargaAt').setValue(rec[0].data.harga);
//                                            me.down('#HargaSatuan').setValue(me.down('#Qty_Barang').getValue() * rec[0].data.harga);
                                        },
                                    }
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
                                    xtype: 'numberfield',
                                    margin: '5 0 0 0',
                                    labelWidth: 90,
                                    width: 160,
                                    value: 0,
                                    fieldLabel: '<b>Kuota Retur</b>',
                                    itemId: 'KuotaRetur',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Rp').setValue(me.down('#KuotaRetur').getValue() * me.down('#GrandTotal').getValue());
                                                me.down('#Rp').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'tbtext',
                                    margin: '8 0 0 3',
                                    text: '<b> %</b>'
                                },
                                {
                                    xtype: 'numberfield',
                                    margin: '5 0 0 10',
                                    labelWidth: 30,
                                    width: 160,
                                    value: 0,
                                    fieldLabel: '<b>Rp</b>',
                                    itemId: 'Rp',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (val, e) {
                                            if (e.getKey() === e.ENTER) {
                                                me.down('#Bayar').focus();
                                            }
                                        },
                                    }
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            margin: '5 0 0 50',
                                            labelWidth: 90,
                                            width: 200,
                                            readOnly: true,
                                            fieldLabel: '<b>Grand Total</b>',
                                            itemId: 'GrandTotal'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            margin: '5 0 0 50',
                                            labelWidth: 90,
                                            width: 200,
                                            value: 0,
                                            fieldLabel: '<b>Bayar</b>',
                                            itemId: 'Bayar',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keyup: function (val, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        me.down('#Hutang').focus();
                                                        me.down('#Hutang').setValue(me.down('#GrandTotal').getValue() - me.down('#Bayar').getValue());
                                                    }
                                                },
                                            }
                                        },
                                        {
                                            xtype: 'numberfield',
                                            margin: '5 0 0 50',
                                            labelWidth: 90,
                                            width: 200,
                                            value: 0,
                                            fieldLabel: '<b>Hutang</b>',
                                            itemId: 'Hutang'
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    text: 'Tambah',
                                    margin: '0 0 0 10',
                                    iconCls: 'icon-btn-add',
                                    width: 100,
                                    handler: function () {
                                        me.resetinput();
                                        me.resetAll();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    text: 'Cari',
                                    margin: '0 0 0 10',
                                    iconCls: 'icon-btn-search',
                                    width: 100
                                },
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    text: 'Simpan',
                                    margin: '0 0 0 10',
                                    iconCls: 'icon-btn-save',
                                    width: 100,
                                    listeners: {
                                        click: function () {
                                            var grid = me;
                                            if (grid.down('#Nama_Supplier').getValue() === '' || grid.down('#NoFakturSuplier').getValue() === '') {
                                                Ext.MessageBox.show({
                                                    title: 'Error',
                                                    msg: 'Data Suplier / No Faktur Masih ada yang kosong',
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.ERROR
                                                });
                                                return;
                                            }
                                            Ext.Ajax.request({
                                                url: BASE_PATH + 'pembelian/simpan_transaksi',
                                                method: 'POST',
                                                params: {
                                                    nama_suplier: grid.down('#Nama_Supplier').getValue(),
                                                    kode_suplier: grid.down('#Kode_Supplier').getValue(),
                                                    no_faktur: grid.down('#NoFakturSuplier').getValue(),
                                                    total: grid.down('#GrandTotal').getValue(),
                                                    kuota_retur: grid.down('#KuotaRetur').getValue(),
                                                    rp_retur: grid.down('#Rp').getValue(),
                                                    bayar: grid.down('#Bayar').getValue(),
                                                    hutang: grid.down('#Hutang').getValue(),
                                                    keterangan: grid.down('#Keterangan').getValue(),
                                                    tgl: Ext.Date.format(grid.down('#TglTrxPembelian').getValue(), 'Ymd'),
                                                    tgl_jatuh_tempo: Ext.Date.format(grid.down('#TglTrxJatuhTempo').getValue(), 'Ymd'),
                                                    grid: JSON.stringify(Ext.pluck(me.getStore().data.items, 'data')),
                                                },
                                                scope: this,
                                                callback: function (options, success, response) {
                                                    var resp = Ext.decode(response.responseText);
                                                    if (resp.success === 'true') {
                                                        Ext.MessageBox.show({
                                                            title: resp.title,
                                                            msg: "Proses Simpan Data Berhasil<br> Dengan No Faktur : <b>" + resp.faktur + "</b>",
                                                            buttons: Ext.MessageBox.OK,
                                                            icon: Ext.MessageBox.INFO
                                                        });
                                                        me.resetinput();
                                                        me.resetAll();
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
                        {
                            xtype: 'button',
                            ui: 'blue-button',
                            text: 'Simpan Data',
                            margin: '0 0 0 0',
                            hidden: true,
                            iconCls: 'icon-btn-save',
                            width: 100,
                        },
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
                    width: 70,
                    text: 'Satuan',
                    dataIndex: 'satuan',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Qty',
                    dataIndex: 'qty',
                },
                {
                    xtype: 'gridcolumn',
                    width: 110,
                    text: '@ Harga',
                    dataIndex: 'harga_satuan',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Disc1',
                    dataIndex: 'disc1',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Disc2',
                    dataIndex: 'disc2',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Disc3',
                    dataIndex: 'disc3',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Disc Rp',
                    dataIndex: 'disc_rp',
                },
                {
                    xtype: 'gridcolumn',
                    width: 110,
                    text: 'Total',
                    dataIndex: 'harga_total',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    text: 'Exp.Date',
                    dataIndex: 'exp',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Gdg',
                    dataIndex: 'gdg',
                },
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    },
    resetinput: function () {
        this.down('#kode_barang').setValue('');
        this.down('#nama_barang').setValue('');
        this.down('#Satuan').setValue('');
        this.down('#Qty_Barang').setValue('');
        this.down('#HargaSatuan').setValue('');
        this.down('#Disc1_Barang').setValue('');
        this.down('#Disc2_Barang').setValue('');
        this.down('#Disc3_Barang').setValue('');
        this.down('#Harga_Total_Barang').setValue('');
        this.down('#Exp_Barang').setValue('');
        this.down('#Gdg_Barang').setValue('');
        this.down('#Disc_Rp_Barang').setValue('');
    },
    resetAll: function () {
        this.down('#Nama_Supplier').setValue('');
        this.down('#NoFakturSuplier').setValue('');
        this.down('#Kode_Supplier').setValue('');
        this.down('#Keterangan').setValue('');
        this.down('#KuotaRetur').setValue(0);
        this.down('#Rp').setValue(0);
        this.down('#GrandTotal').setValue(0);
        this.down('#Bayar').setValue(0);
        this.down('#Hutang').setValue(0);
        this.store.loadData([], false);

    },
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */