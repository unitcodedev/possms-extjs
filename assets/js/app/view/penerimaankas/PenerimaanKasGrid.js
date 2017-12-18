/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.penerimaankas.PenerimaanKasGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.penerimaankas.penerimaankasgrid',
    itemId: 'penerimaankasgrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'penerimaankas.PenerimaanKasStore',
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
                                    fieldLabel: '<b>Tanggal</b>',
                                    itemId: 'TglPenerimaanKasAwal',
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
                                    itemId: 'TglPenerimaanKasAkhir',
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
                                    fieldLabel: '<b>Nama Kasir</b>',
                                    itemId: 'PenerimaanKasCariNama',
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
                                        var kode = me.down('#PenerimaanKasCariNama').getValue();
                                        var tgl_awal = Ext.Date.format(me.down('#TglPenerimaanKasAwal').getValue(), 'Ymd');
                                        var tgl_akhir = Ext.Date.format(me.down('#TglPenerimaanKasAkhir').getValue(), 'Ymd');

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
                                        var kode = me.down('#PenerimaanKasCariNama').getValue();
                                        var tgl_awal = Ext.Date.format(me.down('#TglPenerimaanKasAwal').getValue(), 'Ymd');
                                        var tgl_akhir = Ext.Date.format(me.down('#TglPenerimaanKasAkhir').getValue(), 'Ymd');
                                        window.open(BASE_PATH + 'laporan_kas/cetak/' + tgl_awal + '-' + tgl_akhir + '-' + kode, "Print Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");

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
                    dataIndex: 'tgl_transaksi',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Customer',
                    dataIndex: 'customer',
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    text: 'Tunai',
                    dataIndex: 'tunai',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    text: 'Non Tunai',
                    dataIndex: 'non_tunai',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kasir',
                    dataIndex: 'kasir',
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