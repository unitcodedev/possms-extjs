/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.mssatuan.MsSatuanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mssatuan.mssatuangrid',
    itemId: 'mssatuangrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'mssatuan.MsSatuanStore',
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
                            itemId: 'MsSatuanIDSeq',
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 70,
                            readOnly: true,
                            fieldLabel: '<b>KODE</b>',
                            margin: '0 0 2 10',
                            itemId: 'MsSatuanID',
                        },
                        {
                            xtype: 'textfield',
                            width: 320,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Keterangan</b>',
                            itemId: 'MsSatuanKeterangan',
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
                        me.down('#MsSatuanIDSeq').setValue('0');
                        me.down('#MsSatuanID').setValue('');
                        me.down('#MsSatuanKeterangan').setValue('');
                        me.down('#MsSatuanID').setReadOnly(false);
                        me.down('#MsSatuanKeterangan').setReadOnly(false);
                        me.down('#MsSatuanSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'MsSatuanUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        me.down('#MsSatuanIDSeq').setValue(sel[0].get('ID'));
                        me.down('#MsSatuanID').setValue(sel[0].get('Kode'));
                        me.down('#MsSatuanKeterangan').setValue(sel[0].get('Keterangan'));
                        me.down('#MsSatuanID').setReadOnly(false);
                        me.down('#MsSatuanKeterangan').setReadOnly(false);
                        me.down('#MsSatuanSimpan').setDisabled(false);
                        me.down('#MsSatuanUpdate').setDisabled(true);
                        me.down('#MsSatuanHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus   ',
                    itemId: 'MsSatuanHapus',
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
                                    url: BASE_PATH + 'satuan/deleteSatuan',
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
                    itemId: 'MsSatuanSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'satuan/saveSatuan',
                            method: 'POST',
                            params: {
                                id: me.down('#MsSatuanIDSeq').getValue(),
                                kode: me.down('#MsSatuanID').getValue(),
                                keterangan: me.down('#MsSatuanKeterangan').getValue(),
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
        this.down('#MsSatuanIDSeq').setValue('0');
        this.down('#MsSatuanID').setValue('');
        this.down('#MsSatuanKeterangan').setValue('');
        this.down('#MsSatuanID').setReadOnly(true);
        this.down('#MsSatuanKeterangan').setReadOnly(true);
        this.down('#MsSatuanSimpan').setDisabled(true);
        this.down('#MsSatuanUpdate').setDisabled(false);
        this.down('#MsSatuanHapus').setDisabled(false);
    },
}
);

/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */