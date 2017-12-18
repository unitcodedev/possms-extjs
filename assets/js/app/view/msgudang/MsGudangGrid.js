/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.msgudang.MsGudangGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.msgudang.msgudanggrid',
    itemId: 'msgudanggrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'msgudang.MsGudangStore',
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
                            itemId: 'MsGudangIDSeq',
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 70,
                            readOnly: true,
                            fieldLabel: '<b>KODE</b>',
                            margin: '0 0 2 10',
                            itemId: 'MsGudangID',
                        },
                        {
                            xtype: 'textfield',
                            width: 310,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Keterangan</b>',
                            itemId: 'MsGudangKeterangan',
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            itemId: 'MsGudangJenis',
                            allowBlank: true,
                            margin: '0 0 2 10',
                            editable: false,
                            value: 'UT',
                            fieldLabel: '<b>Jenis </b>',
                            labelWidth: 70,
                            width: 215,
                            store: new Ext.data.SimpleStore({
                                id: 0,
                                fields: [
                                    'typeCode', //numeric value is the key
                                    'type' //the text value is the value
                                ],
                                data: [
                                    ['UT', 'Gudang Utama'],
                                    ['BS', 'Gudang BS'],
                                    ['LN', 'Gudang Lain'],
                                ]
                            })
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
                        me.down('#MsGudangIDSeq').setValue('0');
                        me.down('#MsGudangID').setValue('');
                        me.down('#MsGudangKeterangan').setValue('');
                        me.down('#MsGudangID').setReadOnly(false);
                        me.down('#MsGudangKeterangan').setReadOnly(false);
                        me.down('#MsGudangSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'MsGudangUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        me.down('#MsGudangIDSeq').setValue(sel[0].get('ID'));
                        me.down('#MsGudangID').setValue(sel[0].get('Kode'));
                        me.down('#MsGudangKeterangan').setValue(sel[0].get('Keterangan'));
                        me.down('#MsGudangJenis').setValue(sel[0].get('Jenis'));
                        me.down('#MsGudangID').setReadOnly(false);
                        me.down('#MsGudangKeterangan').setReadOnly(false);
                        me.down('#MsGudangSimpan').setDisabled(false);
                        me.down('#MsGudangUpdate').setDisabled(true);
                        me.down('#MsGudangHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus   ',
                    itemId: 'MsGudangHapus',
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
                                    url: BASE_PATH + 'datamaster/hapus_gudang',
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
                    itemId: 'MsGudangSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'datamaster/simpan_gudang',
                            method: 'POST',
                            params: {
                                id: me.down('#MsGudangIDSeq').getValue(),
                                kode: me.down('#MsGudangID').getValue(),
                                keterangan: me.down('#MsGudangKeterangan').getValue(),
                                jenis: me.down('#MsGudangJenis').getValue(),
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
                    width: 90,
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
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    text: 'Jenis',
                    dataIndex: 'Jenis',
                },
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    },
    resettombol: function () {
        this.down('#MsGudangIDSeq').setValue('0');
        this.down('#MsGudangID').setValue('');
        this.down('#MsGudangKeterangan').setValue('');
        this.down('#MsGudangID').setReadOnly(true);
        this.down('#MsGudangKeterangan').setReadOnly(true);
        this.down('#MsGudangSimpan').setDisabled(true);
        this.down('#MsGudangUpdate').setDisabled(false);
        this.down('#MsGudangHapus').setDisabled(false);
    },
}
);

/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */