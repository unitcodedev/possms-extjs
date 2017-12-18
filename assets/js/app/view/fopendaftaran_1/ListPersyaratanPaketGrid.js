/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListPersyaratanPaketGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fopendaftaran.listpersyaratanpaketgrid',
    itemId: 'listpersyaratanpaketgrid',
    ui: 'black-panel',
    autoScroll: true,
//    title: 'CARI PersyaratanPaket',
    forceFit: true,
    store: 'fopendaftaran.MasterPersyaratanPaketStore',
    columnLines: true,
    flex: 1,
    border: true,
//    selType: 'checkboxmodel',
//    selModel: {
//        checkOnly: true,
//        injectCheckbox: 1
//    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data',
                deferEmptyText: false
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 140,
                    text: 'ID',
                    dataIndex: 'id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Persyaratan',
                    dataIndex: 'persyaratan',
                },
                {
                    xtype: 'checkcolumn',
                    header: 'Check',
                    dataIndex: 'status',
                    width: 55
                },
            ],
            bbar: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                    action: 'PersyaratanSave',
//                    hidden: true
                },
            ]
        });

        me.callParent(arguments);
        //        me.loadPage(1);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */