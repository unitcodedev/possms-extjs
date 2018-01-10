/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.mskota.MsKotaGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mskota.mskotagrid',
    itemId: 'mskotagrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'mskota.MsKotaStore',
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
                    xtype: 'fieldset',
                    margin: '5 7 5 5',
                    width: '100%',
                    items: [
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
                            itemId: 'MsKotaIDSeq',
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 70,
                            readOnly: true,
                            fieldLabel: '<b>KODE</b>',
                            margin: '0 0 2 10',
                            itemId: 'MsKotaID',
                        },
                        {
                            xtype: 'textfield',
                            width: 320,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Keterangan</b>',
                            itemId: 'MsKotaKeterangan',
                        },
                    ]
                        },
                        ],
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
                        me.down('#MsKotaIDSeq').setValue('0');
                        me.down('#MsKotaID').setValue('');
                        me.down('#MsKotaKeterangan').setValue('');
                        me.down('#MsKotaID').setReadOnly(false);
                        me.down('#MsKotaKeterangan').setReadOnly(false);
                        me.down('#MsKotaSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'MsKotaUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        me.down('#MsKotaIDSeq').setValue(sel[0].get('ID'));
                        me.down('#MsKotaID').setValue(sel[0].get('Kode'));
                        me.down('#MsKotaKeterangan').setValue(sel[0].get('Keterangan'));
                        me.down('#MsKotaID').setReadOnly(false);
                        me.down('#MsKotaKeterangan').setReadOnly(false);
                        me.down('#MsKotaSimpan').setDisabled(false);
                        me.down('#MsKotaUpdate').setDisabled(true);
                        me.down('#MsKotaHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus ',
                    itemId: 'MsKotaHapus',
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
                                    url: BASE_PATH + 'datamaster/hapus_kota',
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
                    itemId: 'MsKotaSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'datamaster/simpan_kota',
                            method: 'POST',
                            params: {
                                id: me.down('#MsKotaIDSeq').getValue(),
                                kode: me.down('#MsKotaID').getValue(),
                                keterangan: me.down('#MsKotaKeterangan').getValue(),
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
        this.down('#MsKotaIDSeq').setValue('0');
        this.down('#MsKotaID').setValue('');
        this.down('#MsKotaKeterangan').setValue('');
        this.down('#MsKotaID').setReadOnly(true);
        this.down('#MsKotaKeterangan').setReadOnly(true);
        this.down('#MsKotaSimpan').setDisabled(true);
        this.down('#MsKotaUpdate').setDisabled(false);
        this.down('#MsKotaHapus').setDisabled(false);
    },
}
);

/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */
