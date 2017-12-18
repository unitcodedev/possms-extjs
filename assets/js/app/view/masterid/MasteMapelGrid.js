/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.masterid.MasteMapelGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.masterid.mastemapelgrid',
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
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    margin: '0 0 2 10',
                    text: '  Refresh',
                    width: 120,
                    iconCls: 'icon-btn-search',
                    handler: function () {

                        var grid = me,
                                store = grid.getStore();
                        grid.getSelectionModel().clearSelections();
                        grid.store.loadData([], false);
                        store.load();
                    }
                },
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
                    dataIndex: 'mj_id',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Nama',
                    dataIndex: 'mj_nama',
                }, ],
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    listeners: {
                        beforeedit: function (editor, e, eOpts) {
                            var form = Ext.getCmp('masteridform').getForm();
                            var jenis_discount = form.findField('jenis_discount').getValue();
                            var persetujuan = form.findField('idpersetujuandisc').getValue();
                            var record = e.record;
                            if (record.get('id_type') === 6) {
                                return false;
                            }
                            if (jenis_discount === 'hut' || jenis_discount === 'hkn') {
                                return true;
                            } else {
                                if (persetujuan > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        },
                        'edit': function (editor, e, opt) {
                            if (e.record.dirty) {

                                e.record.commit();

                            }
                        }
                    }
                }
            ],
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */