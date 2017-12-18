/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.masterid.MasterIDDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.masterid.masteriddetailgrid',
    itemId: 'masteriddetailgrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'masterid.MasterIDDetailStore',
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
                    text: '  Tambah Satuan   ',
                    iconCls: 'icon-btn-add',
                    handler: function () {
                        var grid_master = Ext.ComponentQuery.query('panel > #masteridgrid')[0];
                        var sel = grid_master.getSelectionModel().getSelection();
                        var win = Ext.widget('masterid.masteridadddetailwin');
                        var form = win.down('#FormMasterIDAddDetailWin').getForm();
                        form.findField('kode_barang').setValue(sel[0].get('kode_barang'));
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
                    text: 'Satuan',
                    align: 'left',
                    dataIndex: 'satuan',
                },
                {
                    xtype: 'gridcolumn',
                    width: 65,
                    text: 'Qty',
                    dataIndex: 'mbd_konversi',
                },
                {
                    xtype: 'gridcolumn',
                    width: 190,
                    text: 'Harga Jual',
                    dataIndex: 'mbd_harga',
                },
                {
                    xtype: 'actioncolumn',
                    width: 55,
                    align: 'center',
                    text: 'Hapus',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                            iconCls: 'icon-btn-delete',
                            tooltip: 'Delete Data',
                            handler: function (grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                Ext.Ajax.request({
                                    url: BASE_PATH + 'master_barang/delete_detail_barang',
                                    method: 'POST',
                                    params: {id: rec.get('id')},
                                    scope: this,
                                    callback: function (options, success, response) {
                                        var resp = Ext.decode(response.responseText);
                                        if (resp.success === 'true') {
                                            var grid_master = Ext.ComponentQuery.query('panel > #masteridgrid')[0];
                                            var sel = grid_master.getSelectionModel().getSelection();
                                            me.getStore().load({
                                                params: {
                                                    kode_barang: sel[0].get('kode_barang'),
                                                },
                                                scope: this
                                            });
                                            Ext.MessageBox.show({
                                                title: resp.title,
                                                msg: "Proses Hapus Berhasil",
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.INFO
                                            });
////                                            
//                                            var selection = me.getSelectionModel().getSelection()[0];
//                                            me.getStore().remove(selection);
                                        } else {
                                            Ext.MessageBox.show({
                                                title: resp.title,
                                                msg: resp.msg,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                            });
                                        }
                                    }
                                });

                            }
                            //                    }
                        }]
                },
            ],
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