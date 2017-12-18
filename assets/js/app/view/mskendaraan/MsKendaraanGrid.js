/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.mskendaraan.MsKendaraanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mskendaraan.mskendaraangrid',
    itemId: 'mskendaraangrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'mskendaraan.MsKendaraanStore',
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
                            itemId: 'MsKendaraanIDSeq',
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 70,
                            readOnly: true,
                            fieldLabel: '<b>No. Polisi</b>',
                            margin: '0 0 2 10',
                            itemId: 'MsKendaraanID',
                        },
                        {
                            xtype: 'textfield',
                            width: 310,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Merk / Tipe</b>',
                            itemId: 'MsKendaraanKeterangan',
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
                        me.down('#MsKendaraanIDSeq').setValue('0');
                        me.down('#MsKendaraanID').setValue('');
                        me.down('#MsKendaraanKeterangan').setValue('');
                        me.down('#MsKendaraanID').setReadOnly(false);
                        me.down('#MsKendaraanKeterangan').setReadOnly(false);
                        me.down('#MsKendaraanSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'MsKendaraanUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        me.down('#MsKendaraanIDSeq').setValue(sel[0].get('ID'));
                        me.down('#MsKendaraanID').setValue(sel[0].get('Kode'));
                        me.down('#MsKendaraanKeterangan').setValue(sel[0].get('Keterangan'));
                        me.down('#MsKendaraanID').setReadOnly(false);
                        me.down('#MsKendaraanKeterangan').setReadOnly(false);
                        me.down('#MsKendaraanSimpan').setDisabled(false);
                        me.down('#MsKendaraanUpdate').setDisabled(true);
                        me.down('#MsKendaraanHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus   ',
                    itemId: 'MsKendaraanHapus',
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
                                    url: BASE_PATH + 'datamaster/hapus_kendaraan',
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
                    itemId: 'MsKendaraanSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'datamaster/simpan_kendaraan',
                            method: 'POST',
                            params: {
                                id: me.down('#MsKendaraanIDSeq').getValue(),
                                kode: me.down('#MsKendaraanID').getValue(),
                                keterangan: me.down('#MsKendaraanKeterangan').getValue(),
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
                    text: 'No. Polisi',
                    align: 'left',
                    dataIndex: 'Kode',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Merk / Tipe',
                    dataIndex: 'Keterangan',
                },
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    },
    resettombol: function () {
        this.down('#MsKendaraanIDSeq').setValue('0');
        this.down('#MsKendaraanID').setValue('');
        this.down('#MsKendaraanKeterangan').setValue('');
        this.down('#MsKendaraanID').setReadOnly(true);
        this.down('#MsKendaraanKeterangan').setReadOnly(true);
        this.down('#MsKendaraanSimpan').setDisabled(true);
        this.down('#MsKendaraanUpdate').setDisabled(false);
        this.down('#MsKendaraanHapus').setDisabled(false);
    },
}
);

/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */