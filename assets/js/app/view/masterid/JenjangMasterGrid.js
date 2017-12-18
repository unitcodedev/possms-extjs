/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.masterid.JenjangMasterGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.masterid.jenjangmastergrid',
//    itemId: 'jenjangmastergrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
//    store: 'masterid.MasterIDJenjangStore',
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
                    text: 'mj_id',
                    align: 'left',
                    dataIndex: 'mj_id',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Jenjang',
                    dataIndex: 'nama_jenjang',
                },
//                {
//                    xtype: 'actioncolumn',
//                    width: 55,
//                    align: 'center',
//                    text: 'Edit',
//                    sortable: false,
//                    menuDisabled: true,
//                    items: [{
//                            iconCls: 'icon-btn-update',
//                            tooltip: 'Edit Data',
//                            handler: function (grid, rowIndex, colIndex) {
//                                var rec = grid.getStore().getAt(rowIndex);
//                                var win = Ext.widget('masterid.masteridaddwin');
//                                var form = win.down('#FormMasterIDAddWin').getForm();
//                                form.findField('id').setValue(rec.get('id'));
//                                form.findField('nama_barang').setValue(rec.get('nama_barang'));
//                                form.findField('kode_barang').setValue(rec.get('kode_barang'));
//                                form.findField('harga_beli').setValue(rec.get('harga_beli'));
//                                form.findField('kategori').setValue(rec.get('id_kategori_barang'));
//                                form.findField('lokasi').setValue(rec.get('id_lokasi_barang'));
//                                form.findField('satuan').setValue(rec.get('id_satuan_beli'));
//                                form.findField('status').setValue(rec.get('status'));
//                                form.findField('harga_barang').setValue(rec.get('harga_barang'));
//                                form.findField('satuan_harga').setValue(rec.get('id_satuan_harga'));
//                            }
//                            //                    }
//                        }]
//                },
            ],
            plugins: [
//                {
//                    ptype: 'cellediting',
//                    clicksToEdit: 2,
//                    listeners: {
//                        beforeedit: function (editor, e, eOpts) {
//                            var form = Ext.getCmp('masteridform').getForm();
//                            var jenis_discount = form.findField('jenis_discount').getValue();
//                            var persetujuan = form.findField('idpersetujuandisc').getValue();
//                            var record = e.record;
//                            if (record.get('id_type') === 6) {
//                                return false;
//                            }
//                            if (jenis_discount === 'hut' || jenis_discount === 'hkn') {
//                                return true;
//                            } else {
//                                if (persetujuan > 0) {
//                                    return true;
//                                } else {
//                                    return false;
//                                }
//                            }
//                        },
//                        'edit': function (editor, e, opt) {
//                            if (e.record.dirty) {
//
//                                e.record.commit();
//
//                            }
//                        }
//                    }
//                }
            ],
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */