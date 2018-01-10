Ext.define('SIForLaP.view.mscustomer.MsCustomerGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mscustomer.mscustomergrid',
    itemId: 'mscustomergrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_customer',
    store: 'mscustomer.MsCustomerStore',
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
                            fieldLabel: '<b>Ins</b>',
                            margin: '0 0 2 10',
                            itemId: 'tx_ins',
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 70,
                            readOnly: true,
                            fieldLabel: '<b>KODE</b>',
                            margin: '0 0 2 10',
                            itemId: 'tx_kodeCustomer',
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Nama</b>',
                            itemId: 'tx_namaCustomer',
                        },
                         {
                            xtype: 'textareafield',
                            width: 320,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Alamat</b>',
                            itemId: 'txa_alamatCustomer',
                        },  
                        {
                            xtype: 'textfield',
                            width: 230,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Jenis Usaha</b>',
                            itemId: 'tx_jenisUsahaCustomer',
                        },
                        {
                            xtype: 'textfield',
                            width: 230,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Telepon</b>',
                            itemId: 'tx_teleponCustomer',
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

                        me.down('#tx_ins').setValue('0');
                        me.down('#tx_kodeCustomer').setValue('');
                        me.down('#tx_namaCustomer').setValue('');
                        me.down('#txa_alamatCustomer').setValue('');
                        me.down('#tx_jenisUsahaCustomer').setValue('');
                        me.down('#tx_teleponCustomer').setValue('');
                        
                        me.down('#tx_kodeCustomer').setReadOnly(false);
                        me.down('#tx_namaCustomer').setReadOnly(false);
                        me.down('#txa_alamatCustomer').setReadOnly(false);
                        me.down('#tx_jenisUsahaCustomer').setReadOnly(false);
                        me.down('#tx_teleponCustomer').setReadOnly(false);
                        
                        me.down('#btn_customerSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'btn_customerUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }

                        me.down('#tx_ins').setValue('1');
                        me.down('#tx_kodeCustomer').setValue(sel[0].get('Kode'));
                        me.down('#tx_namaCustomer').setValue(sel[0].get('Nama'));
                        me.down('#txa_alamatCustomer').setValue(sel[0].get('Alamat'));
                        me.down('#tx_jenisUsahaCustomer').setValue(sel[0].get('JenisUsaha'));
                        me.down('#tx_teleponCustomer').setValue(sel[0].get('Telepon'));
                        
                        me.down('#tx_kodeCustomer').setReadOnly(true);
                        me.down('#tx_namaCustomer').setReadOnly(false);
                        me.down('#txa_alamatCustomer').setReadOnly(false);
                        me.down('#tx_jenisUsahaCustomer').setReadOnly(false);
                        me.down('#tx_teleponCustomer').setReadOnly(false);
                        
                        me.down('#btn_customerSimpan').setDisabled(false);
                        me.down('#btn_customerUpdate').setDisabled(true);
                        me.down('#btn_customerHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus   ',
                    itemId: 'btn_customerHapus',
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
                                    url: BASE_PATH + 'Customer/deleteCustomer',
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
                    itemId: 'btn_customerSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'Customer/saveCustomer',
                            method: 'POST',
                            params: {
                                ins: me.down('#tx_ins').getValue(),
                                kode: me.down('#tx_kodeCustomer').getValue(),
                                nama: me.down('#tx_namaCustomer').getValue(),
                                alamat: me.down('#txa_alamatCustomer').getValue(),
                                jenis_usaha: me.down('#tx_jenisUsahaCustomer').getValue(),
                                telepon: me.down('#tx_teleponCustomer').getValue(),
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
                    width: 85,
                    text: 'Kode',
                    align: 'left',
                    dataIndex: 'Kode',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Nama',
                    dataIndex: 'Nama',
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'Alamat',
                    dataIndex: 'Alamat',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Jenis Usaha',
                    align: 'left',
                    dataIndex: 'JenisUsaha',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Telepon',
                    dataIndex: 'Telepon',
                },
                
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    },
    resettombol: function () {
        this.down('#tx_ins').setValue('0');
        this.down('#tx_kodeCustomer').setValue('');
        this.down('#tx_namaCustomer').setValue('');
        this.down('#txa_alamatCustomer').setValue('');
        this.down('#tx_jenisUsahaCustomer').setValue('');
        this.down('#tx_teleponCustomer').setValue('');
        
        this.down('#tx_kodeCustomer').setReadOnly(true);
        this.down('#tx_namaCustomer').setReadOnly(true);
        this.down('#txa_alamatCustomer').setReadOnly(true);
        this.down('#tx_jenisUsahaCustomer').setReadOnly(true);
        this.down('#tx_teleponCustomer').setReadOnly(true);

        
        this.down('#btn_customerSimpan').setDisabled(true);
        this.down('#btn_customerUpdate').setDisabled(false);
        this.down('#btn_customerHapus').setDisabled(false);
    },
}
);
