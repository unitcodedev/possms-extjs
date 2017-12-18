/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.masterid.MasterIDAddDetailWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.masterid.masteridadddetailwin',
    itemId: 'pendaftaranmasteridadddetailwin',
    ui: 'blue-window',
    title: 'FORM TAMBAH DETAIL BARANG BARU',
    width: 400,
    height: 220,
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
                    itemId: 'FormMasterIDAddDetailWin',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 300,
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kode Barang',
                            name: 'kode_barang',
                            readOnly: true,
                            width: 210,
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
                            fieldLabel: 'Konversi',
                            name: 'konversi',
                            width: 240,
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Harga Jual',
                            name: 'harga_barang',
                            width: 280,
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
                            var form = me.down('#FormMasterIDAddDetailWin').getForm();
                            Ext.Ajax.request({
                                url: BASE_PATH + 'master_barang/simpan_barang_detail',
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
                                        var grid = Ext.ComponentQuery.query('panel > #masteriddetailgrid')[0];
                                        var grid_master = Ext.ComponentQuery.query('panel > #masteridgrid')[0];
                                        var sel = grid_master.getSelectionModel().getSelection();
                                        grid.getStore().load({
                                            params: {
                                                kode_barang: sel[0].get('kode_barang'),
                                            },
                                            scope: this
                                        });
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