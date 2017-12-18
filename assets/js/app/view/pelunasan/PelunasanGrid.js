/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.pelunasan.PelunasanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pelunasan.pelunasangrid',
    itemId: 'pelunasangrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'pelunasan.PelunasanStore',
    columnLines: true,
    features: [{
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            collapsible: false,
        }],
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
                                    fieldLabel: '<b>Tanggal</b>',
                                    itemId: 'TglPelunasanAwal',
                                    format: 'd/M/Y',
                                    emptyText: 'MM-DD-YYYY',
                                    submitFormat: 'Y-m-d',
                                    value: new Date(),
                                },
                                {
                                    xtype: 'datefield',
                                    labelWidth: 30,
                                    width: 160,
                                    editable: false,
                                    margin: '0 0 0 10',
                                    fieldLabel: '<b>S/d</b>',
                                    itemId: 'TglPelunasanAkhir',
                                    format: 'd/M/Y',
                                    emptyText: 'MM-DD-YYYY',
                                    submitFormat: 'Y-m-d',
                                    value: new Date(),
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    displayField: 'type',
                                    valueField: 'typeCode',
                                    queryMode: 'local',
                                    itemId: 'JenisPelunasan',
                                    allowBlank: true,
                                    editable: false,
                                    fieldLabel: '<b>Jenis Pelunasan</b>',
                                    labelWidth: 90,
                                    value: '1',
                                    width: 270,
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
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    align: 'center',
                                    margin: '0 0 0 10',
                                    text: '  Cari Data  ',
                                    width: 100,
                                    iconCls: 'icon-btn-search',
                                    handler: function () {
                                        var grid = me,
                                                store = grid.getStore();
                                        var jenis_pelunasan = me.down('#JenisPelunasan').getValue();
                                        var tgl_awal = Ext.Date.format(me.down('#TglPelunasanAwal').getValue(), 'Ymd');
                                        var tgl_akhir = Ext.Date.format(me.down('#TglPelunasanAkhir').getValue(), 'Ymd');
                                        store.load(
                                                {
                                                    params: {
                                                        tgl_awal: tgl_awal,
                                                        tgl_akhir: tgl_akhir,
                                                        jenis_pelunasan: jenis_pelunasan,
                                                    },
                                                    scope: this
                                                }
                                        );
                                    }
                                },
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    align: 'center',
                                    margin: '0 0 0 10',
                                    text: '  Pelunasan  ',
                                    width: 100,
                                    iconCls: 'icon-btn-payment',
                                    handler: function () {
                                        var win = Ext.widget('pelunasan.pelunasanaddwin');
                                    }
                                },
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    align: 'center',
                                    margin: '0 0 0 10',
                                    text: '  Cetak  ',
                                    width: 100,
                                    iconCls: 'icon-btn-print',
                                    handler: function () {
                                        var grid = me,
                                                store = grid.getStore(),
                                                filterCollection = [];
//                                        var kode = me.down('#PelunasanCariNama').getValue();
                                        var tgl_awal = Ext.Date.format(me.down('#TglPelunasanAwal').getValue(), 'Ymd');
                                        var tgl_akhir = Ext.Date.format(me.down('#TglPelunasanAkhir').getValue(), 'Ymd');
                                        window.open(BASE_PATH + 'laporan_penjualan/cetak/' + tgl_awal + '-' + tgl_akhir, "Print Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");

                                    }
                                },
                            ]
                        },
                    ]
                },
            ],
            bbar: [
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer', {resizable: true, align: 'center'}),
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Tgl Transaksi',
                    align: 'left',
                    dataIndex: 'tgl',
                },
                {
                    xtype: 'gridcolumn',
                    width: 140,
                    text: 'No Pelunasan',
                    dataIndex: 'no_nota',
                },
                {
                    xtype: 'gridcolumn',
                    width: 360,
                    text: 'Nama',
                    dataIndex: 'nama',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<b>Total</b>';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'Tunai',
                    dataIndex: 'tunai',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right',
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'Non Tunai',
                    dataIndex: 'non_tunai',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right',
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                    }
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