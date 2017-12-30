Ext.define('SIForLaP.view.msbank.MsBankGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.msbank.msbankgrid',
    itemId: 'msbankgrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_bank',
    store: 'msbank.MsBankStore',
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
                            itemId: 'tx_idBank',
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 80,
                            readOnly: true,
                            fieldLabel: '<b>KODE</b>',
                            margin: '0 0 2 10',
                            itemId: 'tx_kodeBank',
                        },
                        {
                            xtype: 'textfield',
                            width:220,
                            labelWidth: 80,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Nama Bank</b>',
                            itemId: 'tx_namaBank',
                        },
                        {
                            xtype: 'textfield',
                            width:300,
                            labelWidth: 80,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Atas Nama</b>',
                            itemId: 'tx_atasNama',
                        },
                        {
                            xtype: 'textfield',
                            width:250,
                            labelWidth: 80,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>No Rekening</b>',
                            itemId: 'tx_noRek',
                        },
                        {
                            xtype: "combobox",
                                    name: "periode",
                                    width: 250,
                                    labelWidth: 80,
                                    fieldLabel: '<b>Rek Akuntansi</b>',
                                    margin: '0 0 2 10',
                                    emptyText: "- Pilih -",
                                    valueField: "Akun",
                                    displayField: "Akun",
                                    queryMode: "local",
                                    matchFieldWidth: false,
                                    itemId: 'cb_rekAkun',
                                    store: {
                                        autoLoad: true, fields: ['Akun'],
                                         proxy: {
                                            type: 'ajax',
                                            url: BASE_URL + 'Bank/listBank',
                                            reader: {root: 'data', type: 'json'}
                                        },
                                    },
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
                        me.down('#tx_idBank').setValue('0');
                        me.down('#tx_kodeBank').setValue('');
                        me.down('#tx_namaBank').setValue('');
                        me.down('#tx_atasNama').setValue('');
                        me.down('#tx_noRek').setValue('');
                        
                        me.down('#tx_kodeBank').setReadOnly(false);
                        me.down('#tx_namaBank').setReadOnly(false);
                        me.down('#tx_atasNama').setReadOnly(false);
                        me.down('#tx_noRek').setReadOnly(false);
                        me.down('#btn_bankSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'btn_bankUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        me.down('#tx_idBank').setValue(sel[0].get('ID'));
                        me.down('#tx_kodeBank').setValue(sel[0].get('Kode'));
                        me.down('#tx_namaBank').setValue(sel[0].get('Nama'));
                        me.down('#tx_atasNama').setValue(sel[0].get('AN'));
                        me.down('#tx_noRek').setValue(sel[0].get('Rek'));
                        me.down('#cb_rekAkun').setValue(sel[0].get('Akun'));
                        
                        me.down('#tx_kodeBank').setReadOnly(false);
                        me.down('#tx_namaBank').setReadOnly(false);
                        me.down('#tx_atasNama').setReadOnly(false);
                        me.down('#tx_noRek').setReadOnly(false);
                        me.down('#btn_bankSimpan').setDisabled(false);
                        me.down('#btn_bankUpdate').setDisabled(true);
                        me.down('#btn_bankHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus   ',
                    itemId: 'btn_bankHapus',
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
                                    url: BASE_PATH + 'Bank/deleteBank',
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
                    itemId: 'btn_bankSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'Bank/saveBank',
                            method: 'POST',
                            params: {
                                id: me.down('#tx_idBank').getValue(),
                                kode: me.down('#tx_kodeBank').getValue(),
                                nama: me.down('#tx_namaBank').getValue(),
                                an: me.down('#tx_atasNama').getValue(),
                                rek: me.down('#tx_noRek').getValue(),
                                akun: me.down('#cb_rekAkun').getValue(),
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
                    width: 50,
                    text: 'Kode',
                    align: 'left',
                    dataIndex: 'Kode',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Nama',
                    align: 'left',
                    dataIndex: 'Nama',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'AN',
                    dataIndex: 'AN',
                },
                {
                    xtype: 'gridcolumn',
                    width: 190,
                    text: 'No Rekening',
                    dataIndex: 'Rek',
                },
                 {
                    xtype: 'gridcolumn',
                    width: 190,
                    text: 'Rek. Akuntansi',
                    dataIndex: 'Akun',
                },
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    },
    resettombol: function () {
        this.down('#tx_idBank').setValue('0');
        this.down('#tx_kodeBank').setValue('');
        this.down('#tx_namaBank').setValue('');
        this.down('#tx_atasNama').setValue('');
        this.down('#tx_noRek').setValue('');
        
        this.down('#tx_kodeBank').setReadOnly(true);
        this.down('#tx_namaBank').setReadOnly(true);
        this.down('#tx_atasNama').setReadOnly(true);
        this.down('#tx_noRek').setReadOnly(true);
        this.down('#btn_bankSimpan').setDisabled(true);
        this.down('#btn_bankUpdate').setDisabled(false);
        this.down('#btn_bankHapus').setDisabled(false);
    },
}
);
