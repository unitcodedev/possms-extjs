/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.msbrand.MsBrandGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.msbrand.msbrandgrid',
    itemId: 'msbrandgrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_brand',
    store: 'msbrand.MsBrandStore',
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
                    items: [
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 70,
                            readOnly: true,
                            hidden: true,
                            value: '0',
                            fieldLabel: '<b>ID</b>',
                            margin: '0 0 2 10',
                            itemId: 'tx_idBrand',
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 70,
                            readOnly: true,
                            fieldLabel: '<b>KODE</b>',
                            margin: '0 0 2 10',
                            itemId: 'tx_kodeBrand',
                        },
                        {
                            xtype: 'textfield',
                            width:320,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Keterangan</b>',
                            itemId: 'tx_ketBrand',
                        },
                    ]
                },
            ],
            bbar: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    margin: '0 0 2 10',
                    text: '',
//                    width: 120,
                    iconCls: 'icon-btn-refresh',
                    handler: function () {
                        var grid = me,
                                store = grid.getStore();
                        store.load();
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Tambah   ',
                    iconCls: 'icon-btn-add',
                    handler: function () {
                        me.down('#tx_idBrand').setValue('0');
                        me.down('#tx_kodeBrand').setValue('');
                        me.down('#tx_ketBrand').setValue('');
                        
                        me.down('#tx_kodeBrand').setReadOnly(false);
                        me.down('#tx_ketBrand').setReadOnly(false);
                        me.down('#btn_brandSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'btn_brandUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        me.down('#tx_idBrand').setValue(sel[0].get('ID'));
                        me.down('#tx_kodeBrand').setValue(sel[0].get('Kode'));
                        me.down('#tx_ketBrand').setValue(sel[0].get('Keterangan'));
                        
                        me.down('#tx_kodeBrand').setReadOnly(false);
                        me.down('#tx_ketBrand').setReadOnly(false);
                        me.down('#btn_brandSimpan').setDisabled(false);
                        me.down('#btn_brandUpdate').setDisabled(true);
                        me.down('#btn_brandHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus   ',
                    itemId: 'btn_brandHapus',
                    iconCls: 'icon-btn-delete',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        Ext.MessageBox.confirm('Confirm', 'Apakah Yakin data akan di hapus', function (btn, text) {
                            if (btn === 'yes') {
                                Ext.Ajax.request({
                                    url: BASE_PATH + 'Brand/deleteBrand',
                                    method: 'POST',
                                    params: {
                                        id: sel[0].get('ID'),
                                    },
                                    scope: this,
                                    callback: function (options, success, response) {
                                        var resp = Ext.decode(response.responseText);
                                        if (resp.success === 'true') {
                                            Ext.MessageBox.show({
                                                title: resp.title,
                                                msg: resp.msg,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.INFO
                                            });
                                            me.getSelectionModel().clearSelections();
                                            me.getStore().load();
                                            me.resettombol();
                                        } else {
                                            Ext.MessageBox.show({
                                                title: resp.title,
                                                msg: resp.msg,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                            });
                                            me.getSelectionModel().clearSelections();
                                            me.resettombol();
                                        }
                                    }
                                });
                            } else {
                                me.resettombol();
                            }
                        }
                        )

                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    disabled: true,
                    margin: '0 0 2 5',
                    text: '  Simpan   ',
                    itemId: 'btn_brandSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'Brand/saveBrand',
                            method: 'POST',
                            params: {
                                id: me.down('#tx_idBrand').getValue(),
                                kode: me.down('#tx_kodeBrand').getValue(),
                                keterangan: me.down('#tx_ketBrand').getValue(),
                            },
                            scope: this,
                            callback: function (options, success, response) {
                                var resp = Ext.decode(response.responseText);
                                if (resp.success === 'true') {
                                    Ext.MessageBox.show({
                                        title: resp.title,
                                        msg: resp.msg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
                                    me.getSelectionModel().clearSelections();
                                    me.getStore().load();
                                    me.resettombol();
                                } else {
                                    Ext.MessageBox.show({
                                        title: resp.title,
                                        msg: resp.msg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                    me.getSelectionModel().clearSelections();
                                    me.resettombol();
                                }
                            }
                        });
                    }
                },
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer', {resizable: true, align: 'center'}),
                
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Supplier',
                    align: 'left',
                    dataIndex: 'Supplier',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Kode',
                    align: 'left',
                    dataIndex: 'Kode',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Keterangan',
                    dataIndex: 'Keterangan',
                },
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    },
    resettombol: function () {
        this.down('#tx_idBrand').setValue('0');
        this.down('#tx_kodeBrand').setValue('');
        this.down('#tx_ketBrand').setValue('');
        
        this.down('#tx_kodeBrand').setReadOnly(true);
        this.down('#tx_ketBrand').setReadOnly(true);
        this.down('#btn_brandSimpan').setDisabled(true);
        this.down('#btn_brandUpdate').setDisabled(false);
        this.down('#btn_brandHapus').setDisabled(false);
    },
}
);

/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */
