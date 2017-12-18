/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.FoCariDataPasienPemeriksaanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fopendaftaran.focaridatapasienpemeriksaangrid',
    itemId: 'focaridatapasienpemeriksaangrid',
    ui: 'black-panel',
    autoScroll: true,
    forceFit: true,
    store: 'fopendaftaran.FoCariDataPasienPemeriksaanStore',
    columnLines: true,
    features: [{
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            collapsible: false,
        }],
    flex: 1,
    border: false,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data',
                deferEmptyText: false
            },
            tbar: [
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    text: 'Kode Px',
                    dataIndex: 'kode_pemeriksaan',
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'Nama Pemeriksaan',
                    dataIndex: 'tp_namapemeriksaan',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Harga',
                    dataIndex: 'tp_hargabruto',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Diskon',
                    dataIndex: 'tp_discount',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Netto',
                    dataIndex: 'tp_harganett',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                },
            ],
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */