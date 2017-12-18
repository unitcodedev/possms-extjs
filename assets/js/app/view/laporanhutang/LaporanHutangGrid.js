/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.laporanhutang.LaporanHutangGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.laporanhutang.laporanhutanggrid',
    itemId: 'laporanhutanggrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'laporanhutang.LaporanHutangStore',
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
                                    itemId: 'TglLaporanHutangAwal',
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
                                    itemId: 'TglLaporanHutangAkhir',
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
                                    xtype: 'textfield',
                                    width: 250,
                                    labelWidth: 90,
                                    fieldLabel: '<b>Nama Suplier</b>',
                                    itemId: 'LaporanHutangCariNama',
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
                                        var kode = me.down('#LaporanHutangCariNama').getValue();
                                        var tgl_awal = Ext.Date.format(me.down('#TglLaporanHutangAwal').getValue(), 'Ymd');
                                        var tgl_akhir = Ext.Date.format(me.down('#TglLaporanHutangAkhir').getValue(), 'Ymd');

                                        store.load({
                                            params: {
                                                nama_suplier: kode,
                                                tgl_awal: tgl_awal,
                                                tgl_akhir: tgl_akhir,
                                            },
                                            scope: this
                                        });
//                                        filterCollection = [];
//                                        var kode = me.down('#LaporanHutangCariNama').getValue();
//                                        var tgl_awal = Ext.Date.format(me.down('#TglLaporanHutangAwal').getValue(), 'Ymd');
//                                        var tgl_akhir = Ext.Date.format(me.down('#TglLaporanHutangAkhir').getValue(), 'Ymd');
//                                        var statusFilter = new Ext.util.Filter({
//                                            property: 'filter_barang',
//                                            value: kode + '-' + tgl_awal + '-' + tgl_akhir});
//                                        filterCollection.push(statusFilter);
//                                        store.clearFilter(true);
//                                        store.filter(filterCollection);
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
                                        var kode = me.down('#LaporanHutangCariNama').getValue();
                                        var tgl_awal = Ext.Date.format(me.down('#TglLaporanHutangAwal').getValue(), 'Ymd');
                                        var tgl_akhir = Ext.Date.format(me.down('#TglLaporanHutangAkhir').getValue(), 'Ymd');
                                        window.open(BASE_PATH + 'laporan_hutang/cetak/' + tgl_awal + '-' + tgl_akhir + '-' + kode, "Print Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");

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
                    dataIndex: 'tgl_trx',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'No Trx',
                    align: 'left',
                    dataIndex: 'no_trx',
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'No. Nota',
                    dataIndex: 'no_nota',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Kode Suplier',
                    dataIndex: 'kode_suplier',
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'Nama Suplier',
                    dataIndex: 'nama_suplier',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Harga',
                    dataIndex: 'harga_netto',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kurang Bayar',
                    dataIndex: 'kurang_bayar',
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