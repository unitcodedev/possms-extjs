Ext.define('SIForLaP.view.msstock.MsStockGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.msstock.msstockgrid',
    itemId: 'msstockgrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_stock',
    store: 'msstock.MsStockStore',
    columnLines: true,
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
                },
            },
            tbar: [
                {
                    xtype: 'fieldset',
                    margin: '5 7 5 5',
                    width: '100%',
                    items: [
                        {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 85,
                            readOnly: true,
                            hidden: true,
                            value: '0',
                            fieldLabel: '<b>ID</b>',
                            margin: '0 0 2 10',
                            itemId: 'tx_idStock',
                        },
                        {
                            xtype: "combobox",
                                    name: "supplier",
                                    width: 310,
                                    labelWidth: 85,
                                    fieldLabel: '<b>Supplier</b>',
                                    margin: '0 0 2 10',
                                    emptyText: "- Pilih Supplier -",
                                    valueField: "Kode",
                                    displayField: "Nama",
                                    queryMode: "remote",
                                    triggerAction: 'all',
                                    matchFieldWidth: false,
                                    enableKeyEvents: true,
                                    itemId: 'cb_supplier',
                                    listConfig: {
                                                loadingText: 'Searching...',
                                                emptyText: 'Data Tidak Ada.',
                                                getInnerTpl: function () {
                                                    return '<div class="search-item">' +
                                                            '<b>{Kode} - {Nama} </b>' +
                                                            '<br/></div>';
                                                }
                                            },
                                    store: {
                                        autoLoad: true, 
                                        remoteFilter: true,
                                        fields: ['Kode', 'Nama'],
                                         proxy: {
                                            success: true,
                                            type: 'ajax',
                                            url: BASE_URL + 'Stock/getNameSupplier',
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
                                            me.down('#cb_supplier').setValue(rec[0].data.Nama);
                                         me.down('#tx_kodeSupplier').setValue(rec[0].data.Kode);

                                                },
                                            
                                            },
                        },
                        
                        {
                            xtype: 'textfield',
                            width: 50,
                            readOnly: true,
                            margin: '-23 0 0 322',
                            itemId: 'tx_kodeSupplier',
                        },

                        
                        {
                            xtype: "combobox",
                                    name: "brand",
                                    width: 280,
                                    labelWidth: 85,
                                    fieldLabel: '<b>Brand</b>',
                                    margin: '0 0 2 10',
                                    emptyText: "- Pilih Brand -",
                                    valueField: "Kode",
                                    displayField: "Keterangan",
                                    queryMode: "remote",
                                    triggerAction: 'all',
                                    matchFieldWidth: false,
                                    enableKeyEvents: true,
                                    itemId: 'cb_brand',
                                    listConfig: {
                                                loadingText: 'Searching...',
                                                emptyText: 'Data Tidak Ada.',
                                                getInnerTpl: function () {
                                                    return '<div class="search-item">' +
                                                            '<b>{Kode} - {Keterangan} </b>' +
                                                            '<br/></div>';
                                                }
                                            },
                                    store: {
                                        autoLoad: true, 
                                        remoteFilter: true,
                                        fields: ['Kode', 'Keterangan'],
                                         proxy: {
                                            success: true,
                                            type: 'ajax',
                                            url: BASE_URL + 'Stock/getNameBrand',
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
                                    me.down('#cb_brand').setValue(rec[0].data.Keterangan);
                                    me.down('#tx_kodeBrand').setValue(rec[0].data.Kode);   
                                                    var i=1;
                                                    if(rec[0].data.Kode == 11721) {
//                                                        i++;
                          me.down('#tx_kodeBarang').setValue(rec[0].data.Kode+"00"+i);
                                                    }

                                                },
                                            
                                            },
                        },
                        
                        {
                            xtype: 'textfield',
                            width: 60,
                            readOnly: true,
                            margin: '-23 0 0 292',
                            itemId: 'tx_kodeBrand',
                        },

                        
                        {
                            xtype: 'textfield',
                            width: 250,
                            labelWidth: 85,
                            readOnly: true,
                            fieldLabel: '<b>KODE</b>',
                            margin: '0 0 2 10',
                            itemId: 'tx_kodeBarang',
                        },
                        
                        {
                            xtype: 'textfield',
                            width:300,
                            labelWidth: 85,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Nama</b>',
                            itemId: 'tx_nama',
                        },
                        
                        {
                            xtype: "combobox",
                                    name: "satuan1",
                                    width: 250,
                                    labelWidth: 85,
                                    fieldLabel: '<b>Satuan 1</b>',
                                    margin: '0 0 2 10',
                                    emptyText: "- Pilih Satuan -",
                                    valueField: "Kode",
                                    displayField: "Kode",
                                    queryMode: "remote",
                                    triggerAction: 'all',
                                    matchFieldWidth: false,
                                    enableKeyEvents: true,
                                    itemId: 'cb_satuan1',
                                    listConfig: {
                                                loadingText: 'Searching...',
                                                emptyText: 'Data Tidak Ada.',
                                                getInnerTpl: function () {
                                                    return '<div class="search-item">' +
                                                            '<b>{Kode} </b>' +
                                                            '<br/></div>';
                                                }
                                            },
                                    store: {
                                        autoLoad: true, 
                                        remoteFilter: true,
                                        fields: ['Kode'],
                                         proxy: {
                                            success: true,
                                            type: 'ajax',
                                            url: BASE_URL + 'Stock/getSatuan',
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
                                        me.down('#cb_satuan1').setValue(rec[0].data.Kode);
                                    me.down('#l_satuan1').setText(rec[0].data.Kode);

                                                },
                                            
                                            },
                        },
                        
                        {
                            xtype: "combobox",
                                    name: "satuan2",
                                    width: 250,
                                    labelWidth: 85,
                                    fieldLabel: '<b>Satuan 2</b>',
                                    margin: '0 0 2 10',
                                    emptyText: "- Pilih Satuan -",
                                    valueField: "Kode",
                                    displayField: "Kode",
                                    queryMode: "remote",
                                    triggerAction: 'all',
                                    matchFieldWidth: false,
                                    enableKeyEvents: true,
                                    itemId: 'cb_satuan2',
                                    listConfig: {
                                                loadingText: 'Searching...',
                                                emptyText: 'Data Tidak Ada.',
                                                getInnerTpl: function () {
                                                    return '<div class="search-item">' +
                                                            '<b>{Kode} </b>' +
                                                            '<br/></div>';
                                                }
                                            },
                                    store: {
                                        autoLoad: true, 
                                        remoteFilter: true,
                                        fields: ['Kode'],
                                         proxy: {
                                            success: true,
                                            type: 'ajax',
                                            url: BASE_URL + 'Stock/getSatuan',
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
                                        me.down('#cb_satuan2').setValue(rec[0].data.Kode);
                                    me.down('#l_satuan2').setText(rec[0].data.Kode);

                                                },
                                            
                                            },
                        },

                        
                        {
                            xtype: 'textfield',
                            width: 70,
                            labelWidth: 5,
                            readOnly: true,
                            fieldLabel: '<b>=</b>',
                            margin: '-23 0 0 265',
                            itemId: 'tx_satuan2',
                        },
                        
                        {
                            xtype: "combobox",
                                    name: "satuan3",
                                    width: 250,
                                    labelWidth: 85,
                                    fieldLabel: '<b>Satuan 3</b>',
                                    margin: '0 0 2 10',
                                    emptyText: "- Pilih Satuan -",
                                    valueField: "Kode",
                                    displayField: "Kode",
                                    queryMode: "local",
                                    matchFieldWidth: false,
                                    itemId: 'cb_satuan3',
                                    store: {
                                        autoLoad: true, fields: ['Kode'],
                                         proxy: {
                                            type: 'ajax',
                                            url: BASE_URL + 'Stock/getSatuan',
                                            reader: {root: 'data', type: 'json'}
                                        },
                                    },
                        },
                        
                        {
                            xtype: 'textfield',
                            width: 70,
                            labelWidth: 5,
                            readOnly: true,
                            fieldLabel: '<b>=</b>',
                            margin: '-23 0 0 265',
                            itemId: 'tx_satuan3',
                            flex: 1
                        },
                        
                        {
                            xtype: 'label',
                            itemId: 'l_satuan1',
                            text: '[satuan1]',
                            margins: '-40 0 0 339'
                        },
                        
                        {
                            xtype: 'label',
                            itemId: 'l_satuan2',
                            text: '[satuan2]',
                            margins: '10 0 0 339'
                        },
                        
//                        {
//                            xtype: 'textfield',
//                            width: 150,
//                            labelWidth: 85,
//                            readOnly: true,
//                            fieldLabel: '<b>Min Stock</b>',
//                            margin: '5 0 2 10',
//                            itemId: 'tx_min1 Stock',
//                        },
//                        
//                        {
//                            xtype: 'textfield',
//                            width: 150,
//                            labelWidth: 85,
//                            readOnly: true,
//                            fieldLabel: '<b>Max Stock</b>',
//                            margin: '0 0 2 10',
//                            itemId: 'tx_maxStock',
//                        },
                        
                    ]
                        },
                        ],
                },
            ],
            bbar: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    margin: '0 0 2 10',
                    text: '',
                    iconCls: 'icon-btn-refresh',
                    handler: function () {
                        var grid = me,
                                store = grid.getStore();
                        store.load();
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Tambah   ',
                    iconCls: 'icon-btn-add',
                    handler: function () {
//                        me.down('#tx_idStock').setValue('0');
                        me.down('#tx_kodeSupplier').setValue('');
                        me.down('#tx_kodeBrand').setValue('');
                        me.down('#tx_kodeBarang').setValue('');
                        me.down('#tx_nama').setValue('');
                        me.down('#tx_satuan2').setValue('');
                        me.down('#tx_satuan3').setValue('');
                        
                        me.down('#tx_kodeBarang').setReadOnly(false);
                        me.down('#tx_nama').setReadOnly(false);
                        me.down('#tx_satuan2').setReadOnly(false);
                        me.down('#tx_satuan3').setReadOnly(false);
                        me.down('#btn_stockSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'btn_stockUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
//                        me.down('#tx_idStock').setValue(sel[0].get('ID'));
                        me.down('#cb_supplier').setValue(sel[0].get('Golongan'));
                        me.down('#tx_kodeSupplier').setValue(sel[0].get('Golongan'));
                        me.down('#cb_brand').setValue(sel[0].get('Merk'));
                        me.down('#tx_kodeBrand').setValue(sel[0].get('Merk'));
                        me.down('#tx_kodeBarang').setValue(sel[0].get('Kode'));
                        me.down('#tx_nama').setValue(sel[0].get('Nama'));
                        me.down('#cb_satuan1').setValue(sel[0].get('Satuan1'));
                        me.down('#cb_satuan2').setValue(sel[0].get('Satuan2'));
                        me.down('#tx_satuan2').setValue(sel[0].get('JmlSat1'));
                        me.down('#cb_satuan3').setValue(sel[0].get('Satuan3'));
                        me.down('#tx_satuan3').setValue(sel[0].get('JmlSat2'));
                        me.down('#l_satuan1').setText(sel[0].get('Satuan1'));
                        me.down('#l_satuan2').setText(sel[0].get('Satuan2'));
                        
                        me.down('#tx_kodeBarang').setReadOnly(false);
                        me.down('#tx_nama').setReadOnly(false);
                        me.down('#tx_satuan2').setReadOnly(false);
                        me.down('#tx_satuan3').setReadOnly(false);
                        
                        me.down('#btn_stockSimpan').setDisabled(false);
                        me.down('#btn_stockUpdate').setDisabled(true);
                        me.down('#btn_stockHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus   ',
                    itemId: 'btn_stockHapus',
                    iconCls: 'icon-btn-delete',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        Ext.MessageBox.confirm('Confirm', 'Apakah Yakin data akan di hapus', function (btn, text) {
                            if (btn === 'yes') {
                                Ext.Ajax.request({
                                    url: BASE_PATH + 'stock/deleteStock',
                                    method: 'POST',
                                    params: {
                                        kode: sel[0].get('Kode'),
                                    },
                                    scope: this,
                                    callback: function (options, success, response) {
                                        var resp = Ext.decode(response.responseText);
                                        if (resp.success === 'true') {
                                            Ext.MessageBox.show({
                                                title: resp.title,
                                                msg: resp.msg,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.INFO
                                            });
                                            me.getSelectionModel().clearSelections();
                                            me.getStore().load();
                                            me.resettombol();
                                        } else {
                                            Ext.MessageBox.show({
                                                title: resp.title,
                                                msg: resp.msg,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                            });
                                            me.getSelectionModel().clearSelections();
                                            me.resettombol();
                                        }
                                    }
                                });
                            } else {
                                me.resettombol();
                            }
                        }
                        )

                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    disabled: true,
                    margin: '0 0 2 5',
                    text: '  Simpan   ',
                    itemId: 'btn_stockSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'stock/saveStock',
                            method: 'POST',
                            params: {
//                                id: me.down('#tx_idStock').getValue(),
                                supplier: me.down('#tx_kodeSupplier').getValue(),
                                brand: me.down('#tx_kodeBrand').getValue(),
                                kode: me.down('#tx_kodeBarang').getValue(),
                                nama: me.down('#tx_nama').getValue(),
                                satuan1: me.down('#cb_satuan1').getValue(),
                                satuan2: me.down('#cb_satuan2').getValue(),
                                jmlSatuan1: me.down('#tx_satuan2').getValue(),
                                satuan3: me.down('#cb_satuan3').getValue(),
                                jmlSatuan2: me.down('#tx_satuan3').getValue(),
                            },
                            scope: this,
                            callback: function (options, success, response) {
                                var resp = Ext.decode(response.responseText);
                                if (resp.success === 'true') {
                                    Ext.MessageBox.show({
                                        title: resp.title,
                                        msg: resp.msg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
                                    me.getSelectionModel().clearSelections();
                                    me.getStore().load();
                                    me.resettombol();
                                } else {
                                    Ext.MessageBox.show({
                                        title: resp.title,
                                        msg: resp.msg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                    me.getSelectionModel().clearSelections();
                                    me.resettombol();
                                }
                            }
                        });
                    }
                },
            ],
                    
            columns: [
                Ext.create('Ext.grid.RowNumberer', {width: 40, resizable: true, align: 'center'}),
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    text: 'Kode',
                    align: 'left',
                    dataIndex: 'Kode',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Nama Barang',
                    dataIndex: 'Nama',
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    text: 'Brand',
                    dataIndex: 'Merk',
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    text: 'Supplier',
                    dataIndex: 'Golongan',
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    text: 'Konversi Antar Satuan',
                                columns: [
            {
                text: "Satuan Terkecil (S)",
                width: 120,
                dataIndex: 'Satuan1',
            },
                                    
            {
                text: "Satuan Kedua (M)",
                width: 150,
                dataIndex: 'Satuan2',
                renderer: function(value, p, r) {
       return '1 '+ r.data['Satuan2'] + ' = ' + r.data['JmlSat1'] + ' ' + r.data['Satuan1'];
        }            
            },                        
                                    
            {
                text: "Satuan Terbesar (L)",
                width: 150,
                dataIndex: 'Satuan3',
                renderer: function(value, p, r) {
       return '1 '+ r.data['Satuan3'] + ' = ' + r.data['JmlSat2'] + ' ' + r.data['Satuan2'];
        }            
            },
                                    
            {   
                text: "Total",
                width: 100,
                dataIndex: 'Satuan3',
                renderer: function(value, p, r) {
                    if(r.data['JmlSat2']==0) {
                        var total = r.data['JmlSat1'];
                    }
                    else {
                    var total = r.data['JmlSat2']*r.data['JmlSat1'];
                        }
       return total + ' ' + r.data['Satuan1'];
        }            
            },
                                    
        ]
                },
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    },
    resettombol: function () {
        this.down('#tx_idStock').setValue('0');
        this.down('#tx_kodeBarang').setValue('');
        this.down('#tx_ketStock').setValue('');
        this.down('#tx_kodeBarang').setReadOnly(true);
        this.down('#tx_ketStock').setReadOnly(true);
        this.down('#btn_stockSimpan').setDisabled(true);
        this.down('#btn_stockUpdate').setDisabled(false);
        this.down('#btn_stockHapus').setDisabled(false);
    },
}
);

