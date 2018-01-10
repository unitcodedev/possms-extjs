Ext.define('SIForLaP.view.mssupplier.MsSupplierGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mssupplier.mssuppliergrid',
    itemId: 'mssuppliergrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_supplier',
    store: 'mssupplier.MsSupplierStore',
    columnLines: true,
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
                            itemId: 'tx_idSupplier',
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            labelWidth: 70,
                            readOnly: true,
                            fieldLabel: '<b>KODE</b>',
                            margin: '0 0 2 10',
                            itemId: 'tx_kodeSupplier',
                        },
                        {
                            xtype: 'textfield',
                            width: 270,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Nama</b>',
                            itemId: 'tx_namaSupplier',
                        },
                        {
                            xtype: 'textareafield',
                            width: 320,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Alamat</b>',
                            itemId: 'txa_almtSupplier',
                        },  
                        {
                            xtype: 'textfield',
                            width: 250,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Telepon</b>',
                            itemId: 'tx_telpSupplier',
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Fax</b>',
                            itemId: 'tx_faxSupplier',
                        },
                        {
                            xtype: 'textfield',
                            width: 200,
                            labelWidth: 70,
                            readOnly: true,
                            margin: '0 0 2 10',
                            fieldLabel: '<b>Kota</b>',
                            itemId: 'tx_kotaSupplier',
                        },
                        
                                 
                                          ],
                
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
                        me.down('#tx_idSupplier').setValue('0');
                        me.down('#tx_kodeSupplier').setValue('');
                        me.down('#tx_namaSupplier').setValue('');
                        me.down('#txa_almtSupplier').setValue('');
                        me.down('#tx_telpSupplier').setValue('');
                        me.down('#tx_faxSupplier').setValue('');
                        me.down('#tx_kotaSupplier').setValue('');
                        
                        me.down('#tx_kodeSupplier').setReadOnly(false);
                        me.down('#tx_namaSupplier').setReadOnly(false);
                        me.down('#txa_almtSupplier').setReadOnly(false);
                        me.down('#tx_telpSupplier').setReadOnly(false);
                        me.down('#tx_faxSupplier').setReadOnly(false);
                        me.down('#tx_kotaSupplier').setReadOnly(false);
                        me.down('#btn_supplierSimpan').setDisabled(false);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Koreksi   ',
                    itemId: 'btn_supplierUpdate',
                    iconCls: 'icon-btn-update',
                    handler: function () {
                        var sel = me.getSelectionModel().getSelection();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih Data Terlebih Dahulu');
                            return;
                        }
                        me.down('#tx_idSupplier').setValue('1');
                        me.down('#tx_kodeSupplier').setValue(sel[0].get('Kode'));
                        me.down('#tx_namaSupplier').setValue(sel[0].get('Nama'));
                        me.down('#txa_almtSupplier').setValue(sel[0].get('Alamat'));
                        me.down('#tx_telpSupplier').setValue(sel[0].get('Telepon'));
                        me.down('#tx_faxSupplier').setValue(sel[0].get('Fax'));
                        me.down('#tx_kotaSupplier').setValue(sel[0].get('Kota'));
                        
                        me.down('#tx_kodeSupplier').setReadOnly(true);
                        me.down('#tx_namaSupplier').setReadOnly(false);
                        me.down('#txa_almtSupplier').setReadOnly(false);
                        me.down('#tx_telpSupplier').setReadOnly(false);
                        me.down('#tx_faxSupplier').setReadOnly(false);
                        me.down('#tx_kotaSupplier').setReadOnly(false);
                        
                        me.down('#btn_supplierSimpan').setDisabled(false);
                        me.down('#btn_supplierUpdate').setDisabled(true);
                        me.down('#btn_supplierHapus').setDisabled(true);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 90,
                    margin: '0 0 2 5',
                    text: '  Hapus   ',
                    itemId: 'btn_supplierHapus',
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
                                    url: BASE_PATH + 'supplier/deleteSupplier',
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
                    itemId: 'btn_supplierSimpan',
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        Ext.Ajax.request({
                            url: BASE_PATH + 'supplier/saveSupplier',
                            method: 'POST',
                            params: {
                                id: me.down('#tx_idSupplier').getValue(),
                                kode: me.down('#tx_kodeSupplier').getValue(),
                                nama: me.down('#tx_namaSupplier').getValue(),
                                almt: me.down('#txa_almtSupplier').getValue(),
                                telp: me.down('#tx_telpSupplier').getValue(),
                                fax: me.down('#tx_faxSupplier').getValue(),
                                kota: me.down('#tx_kotaSupplier').getValue(),
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
                    width: 250,
                    text: 'Nama',
                    dataIndex: 'Nama',
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    text: 'Alamat',
                    align: 'left',
                    dataIndex: 'Alamat',
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'Telepon',
                    dataIndex: 'Telepon',
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'Fax',
                    align: 'left',
                    dataIndex: 'Fax',
                },
                {
                    xtype: 'gridcolumn',
                    width: 105,
                    text: 'Kota',
                    dataIndex: 'Kota',
                },
            ],
            plugins: [
            ],
        });

        me.callParent(arguments);
    },
    resettombol: function () {
        this.down('#tx_idSupplier').setValue('0');
        this.down('#tx_kodeSupplier').setValue('');
        this.down('#tx_namaSupplier').setValue('');
        this.down('#txa_almtSupplier').setValue('');
        this.down('#tx_telpSupplier').setValue('');
        this.down('#tx_faxSupplier').setValue('');
        this.down('#tx_kotaSupplier').setValue('');
        
        this.down('#tx_kodeSupplier').setReadOnly(true);
        this.down('#tx_namaSupplier').setReadOnly(true);
        this.down('#txa_almtSupplier').setReadOnly(true);
        this.down('#tx_telpSupplier').setReadOnly(true);
        this.down('#tx_faxSupplier').setReadOnly(true);
        this.down('#tx_kotaSupplier').setReadOnly(true);
        
        this.down('#btn_supplierSimpan').setDisabled(true);
        this.down('#btn_supplierUpdate').setDisabled(false);
        this.down('#btn_supplierHapus').setDisabled(false);
    },
}
);
