/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.masterid.MasterUangSekolahDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.masterid.masteruangsekolahdetailgrid',
    ui: 'blue-panel',
    autoScroll: true,
    forceFit: true,
    flex: 1,
    columnLines: true,
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
//                {
//                    xtype: 'button',
//                    ui: 'blue-button',
//                    align: 'center',
//                    margin: '0 0 2 10',
//                    text: '  Refresh',
//                    width: 120,
//                    iconCls: 'icon-btn-search',
//                    handler: function () {
//                        var grid = me,
//                                store = grid.getStore();
//                        store.load();
//                    }
//                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 120,
                    margin: '0 0 2 10',
                    text: '  Tambah Baru   ',
                    iconCls: 'icon-btn-add',
                    handler: function () {
                        var win = Ext.widget('masterid.masteridaddwin');
                    }
                },
            ],
            bbar: [
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer', {resizable: true, align: 'center'}),
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    hidden: true,
                    text: 'id',
                    align: 'left',
                    dataIndex: 'mjd_id',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Kode',
                    align: 'left',
                    dataIndex: 'mjd_kode',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Jenjang',
                    dataIndex: 'mjd_nama',
                }, ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */