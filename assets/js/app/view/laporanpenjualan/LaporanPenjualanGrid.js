/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.laporanpenjualan.LaporanPenjualanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.laporanpenjualan.laporanpenjualangrid',
    itemId: 'laporanpenjualangrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'laporanpenjualan.LaporanPenjualanStore',
    columnLines: true,
    features: [{
            id: 'group',
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
                    xtype: 'fieldset',
                    title: '<b>Filter</b>',
                    margin: '5 5 5 5',
                    width: '98%',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
//                            margin: '3 3 3 3',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            labelWidth: 70,
                                            editable: false,
                                            margin: '0 0 0 10',
                                            width: 210,
                                            fieldLabel: '<b>Tanggal</b>',
                                            itemId: 'TglLaporanPenjualanAwal',
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
                                            itemId: 'TglLaporanPenjualanAkhir',
                                            format: 'd/M/Y',
                                            emptyText: 'MM-DD-YYYY',
                                            submitFormat: 'Y-m-d',
                                            value: new Date(),
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
                                                var kode = me.down('#LaporanPenjualanCariNama').getValue();
                                                var tgl_awal = Ext.Date.format(me.down('#TglLaporanPenjualanAwal').getValue(), 'Ymd');
                                                var tgl_akhir = Ext.Date.format(me.down('#TglLaporanPenjualanAkhir').getValue(), 'Ymd');

                                                store.load({
                                                    params: {
                                                        nama_input: kode,
                                                        tgl_awal: tgl_awal,
                                                        tgl_akhir: tgl_akhir,
                                                    },
                                                    scope: this
                                                });
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
//                                        var kode = me.down('#LaporanPenjualanCariNama').getValue();
                                                var tgl_awal = Ext.Date.format(me.down('#TglLaporanPenjualanAwal').getValue(), 'Ymd');
                                                var tgl_akhir = Ext.Date.format(me.down('#TglLaporanPenjualanAkhir').getValue(), 'Ymd');
                                                window.open(BASE_PATH + 'laporan_penjualan/cetak/' + tgl_awal + '-' + tgl_akhir, "Print Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");

                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            width: 250,
                                            hidden: true,
                                            labelWidth: 90,
                                            fieldLabel: '<b>Nama Kasir</b>',
                                            itemId: 'LaporanPenjualanCariNama',
                                        },
                                    ]
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
                    dataIndex: 'tgl_transaksi',
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'Kode Barang',
                    dataIndex: 'kode_barang',
                },
                {
                    xtype: 'gridcolumn',
                    width: 360,
                    text: 'Nama Barang',
                    dataIndex: 'nama_barang',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<b>Total</b>';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Qty',
                    dataIndex: 'qty',
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'Harga',
                    dataIndex: 'sub_total',
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