/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.fopendaftaran.FoPasienInputGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fopendaftaran.fopasieninputgrid',
    itemId: 'fopasieninputgrid',
    id: 'fopasieninputgrid',
    ui: 'black-panel',
    overflow: 'auto',
    autoScroll: true,
//    forceFit: true,
    layout: 'fit',
    store: 'fopendaftaran.ListPasienInputStore',
    columnLines: true,
    renderTo: document.body,
    border: true,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Data Pasien Kosong',
                deferEmptyText: false
            },
            columns: [
//                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    width: 180,
                    text: 'ID Pas',
                    dataIndex: 'pasien_id',
                },
                {
                    xtype: 'gridcolumn',
                    width: 180,
                    text: 'Nama',
                    dataIndex: 'nama_pasien',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Jenis <br> Kelamin',
                    dataIndex: 'jenis_kelamin',
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    text: 'Tgl Lahir',
                    dataIndex: 'tgl_lahir',
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    text: 'Status',
                    dataIndex: 'status',
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    text: 'No HP',
                    dataIndex: 'no_hp',
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    text: 'No Telp',
                    dataIndex: 'no_tlfnrumah',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Alamat',
                    dataIndex: 'alamat',
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    text: 'Kota',
                    dataIndex: 'kota',
                },
            ],
            plugins: [          
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    listeners: {
                        'edit': function (editor, e, opt) {
                            if (e.record.dirty) {

                                e.record.commit();

                            }
                        }
                    }
                },
                Ext.create('Ext.ux.grid.DataDrop'),  
            ],
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */