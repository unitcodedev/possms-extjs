/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.masterid.MasterIDAddWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.masterid.masteridaddwin',
    itemId: 'pendaftaranmasteridaddwin',
    ui: 'blue-window',
    title: 'FORM TAMBAH MASTER BARANG BARU',
    width: 400,
    height: 350,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'FormMasterIDAddWin',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 300,
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Kode Barang',
                            name: 'id',
                            width: 170,
                            value: 0,
                            hidden: true,
                            readOnly: true,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kode Barang',
                            name: 'kode_barang',
                            readOnly: true,
                            width: 210,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nama Barang',
                            name: 'nama_barang',
                            width: 340,
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Harga Beli',
                            name: 'harga_beli',
                            width: 280,
                        },
                        {
                            xtype: "combobox",
                            name: "satuan",
                            width: 290,
                            fieldLabel: "Pilih Satuan",
                            emptyText: "Pilih Satuan",
                            valueField: "id",
                            displayField: "satuan",
                            queryMode: "local",
//                            matchFieldWidth: false,
                            store: {
                                autoLoad: true, fields: [{name: 'id', type: 'int'}, 'satuan'],
                                proxy: {
                                    type: 'ajax',
                                    url: BASE_URL + 'datamaster/list_satuan_barang',
                                    reader: {root: 'data', type: 'json'}
                                },
                            },
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Harga Jual',
                            name: 'harga_barang',
                            width: 280,
                        },
                        {
                            xtype: "combobox",
                            name: "satuan_harga",
                            width: 290,
                            fieldLabel: "Pilih Satuan",
                            emptyText: "Pilih Satuan",
                            valueField: "id",
                            displayField: "satuan",
                            queryMode: "local",
//                            matchFieldWidth: false,
                            store: {
                                autoLoad: true, fields: [{name: 'id', type: 'int'}, 'satuan'],
                                proxy: {
                                    type: 'ajax',
                                    url: BASE_URL + 'datamaster/list_satuan_barang',
                                    reader: {root: 'data', type: 'json'}
                                },
                            },
                        },
                        {
                            xtype: "combobox",
                            name: "kategori",
                            width: 340,
                            fieldLabel: "Pilih Kategori",
                            emptyText: "Pilih Kategori",
                            valueField: "id",
                            displayField: "kategori",
                            queryMode: "local",
//                            matchFieldWidth: false,
                            store: {
                                autoLoad: true, fields: [{name: 'id', type: 'int'}, 'kategori'],
                                proxy: {
                                    type: 'ajax',
                                    url: BASE_URL + 'datamaster/list_kategori_barang',
                                    reader: {root: 'data', type: 'json'}
                                },
                            },
                        },
                        {
                            xtype: "combobox",
                            name: "lokasi",
                            width: 320,
                            fieldLabel: "Pilih Lokasi",
                            emptyText: "Pilih Lokasi",
                            valueField: "id",
                            displayField: "lokasi",
                            queryMode: "local",
//                            matchFieldWidth: false,
                            store: {
                                autoLoad: true, fields: [{name: 'id', type: 'int'}, 'lokasi'],
                                proxy: {
                                    type: 'ajax',
                                    url: BASE_URL + 'datamaster/list_lokasi_barang',
                                    reader: {root: 'data', type: 'json'}
                                },
                            },
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: '<b>Aktif</b> ',
                            labelWidth: 70,
                            name: 'status',
                            width: 80,
                            inputValue: 1,
                        },
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Simpan',
                    scope: this,
                    iconCls: 'icon-btn-save',
                    listeners: {
                        click: function () {
                            var form = me.down('#FormMasterIDAddWin').getForm();
                            Ext.Ajax.request({
                                url: BASE_PATH + 'master_barang/simpan_barang_baru',
                                method: 'POST',
                                params: form.getValues(),
                                scope: this,
                                callback: function (options, success, response) {
                                    var resp = Ext.decode(response.responseText);
                                    if (resp.success === 'true') {
                                        Ext.MessageBox.show({
                                            title: resp.title,
                                            msg: "Proses Simpan Berhasil",
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.INFO
                                        });
                                        me.close();
                                        var grid = Ext.ComponentQuery.query('panel > #masteridgrid')[0];
                                        grid.getStore().load();
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
                    }
                }
            ]
        });
        me.callParent(arguments);

    },
    ngitungUmur: function (dateString) {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
    }

});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */