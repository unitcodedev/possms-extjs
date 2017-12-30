Ext.define('SIForLaP.view.mssalesman.MsSalesmanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mssalesman.mssalesmangrid',
    itemId: 'mssalesmangrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_salesman',
    store: 'mssalesman.MsSalesmanStore',
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
                            itemId: 'tx_idSalesman',
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 70,
                            readOnly: true,
                            fieldLabel: '<b>KODE</b>',
                            margin: '0 0 2 10',
                            itemId: 'tx_kodeSalesman',
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Nama</b>',
                            itemId: 'tx_namaSalesman',
                        },
                        {
                            xtype: 'textfield',
                            width: 320,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Alamat</b>',
                            itemId: 'tx_almtSalesman',
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
                        me.down('#tx_idSalesman').setValue('0');
                        me.down('#tx_kodeSalesman').setValue('');
                        me.down('#tx_namaSalesman').setValue('');
                        me.down('#tx_almtSalesman').setValue('');
                        
                        me.down('#tx_kodeSalesman').setReadOnly(false);
                        me.down('#tx_namaSalesman').setReadOnly(false);
                        me.down('#tx_almtSalesman').setReadOnly(false);
                        me.down('#btn_salesmanSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'btn_salesmanUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        me.down('#tx_idSalesman').setValue('1');
                        me.down('#tx_kodeSalesman').setValue(sel[0].get('Kode'));
                        me.down('#tx_namaSalesman').setValue(sel[0].get('Nama'));
                        me.down('#tx_almtSalesman').setValue(sel[0].get('Alamat'));
                        
                        me.down('#tx_kodeSalesman').setReadOnly(true);
                        me.down('#tx_namaSalesman').setReadOnly(false);
                        me.down('#tx_almtSalesman').setReadOnly(false);
                        me.down('#btn_salesmanSimpan').setDisabled(false);
                        me.down('#btn_salesmanUpdate').setDisabled(true);
                        me.down('#btn_salesmanHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus   ',
                    itemId: 'btn_salesmanHapus',
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
                                    url: BASE_PATH + 'Salesman/deleteSalesman',
                                    method: 'POST',
                                    params: {
                                        kode: sel[0].get('Kode'),
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
                    itemId: 'btn_salesmanSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'Salesman/saveSalesman',
                            method: 'POST',
                            params: {
                                id: me.down('#tx_idSalesman').getValue(),
                                kode: me.down('#tx_kodeSalesman').getValue(),
                                nama: me.down('#tx_namaSalesman').getValue(),
                                alamat: me.down('#tx_almtSalesman').getValue(),
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
                    text: 'Nama',
                    dataIndex: 'Nama',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Alamat',
                    dataIndex: 'Alamat',
                },
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    },
    resettombol: function () {
        this.down('#tx_idSalesman').setValue('0');
        this.down('#tx_kodeSalesman').setValue('');
        this.down('#tx_namaSalesman').setValue('');
        this.down('#tx_almtSalesman').setValue('');
        this.down('#tx_kodeSalesman').setReadOnly(true);
        this.down('#tx_namaSalesman').setReadOnly(true);
        this.down('#tx_almtSalesman').setReadOnly(true);
        this.down('#btn_salesmanSimpan').setDisabled(true);
        this.down('#btn_salesmanUpdate').setDisabled(false);
        this.down('#btn_salesmanHapus').setDisabled(false);
    },
}
);
