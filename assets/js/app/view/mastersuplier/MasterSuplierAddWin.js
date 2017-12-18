/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.mastersuplier.MasterSuplierAddWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.mastersuplier.mastersuplieraddwin',
    itemId: 'pendaftaranmastersuplieraddwin',
    ui: 'blue-window',
    title: 'FORM TAMBAH MASTER SUPLIER BARU',
    width: 400,
    height: 450,
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
                    itemId: 'FormMasterSuplierAddWin',
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
                            hidden: true,
                            width: 170,
                            value: 0,
                            readOnly: true,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kode',
                            readOnly: true,
                            name: 'kode_suplier',
                            width: 340,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nama Suplier',
                            name: 'ms_nama',
                            width: 340,
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Alamat',
                            name: 'ms_alamat',
                            height: 55,
                            width: 300,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kota',
                            name: 'ms_kota',
                            width: 280,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Provinsi',
                            name: 'ms_provinsi',
                            width: 280,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No. Telp',
                            name: 'ms_telp',
                            width: 280,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cp. Nama',
                            name: 'ms_nama_person',
                            width: 280,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cp. No Hp',
                            name: 'ms_nohp_person',
                            width: 280,
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Jatuh Tempo',
                            name: 'ms_jatuh_tempo',
                            width: 220,
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: '<b>Aktif</b> ',
                            labelWidth: 70,
                            name: 'ms_aktif',
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
                            var form = me.down('#FormMasterSuplierAddWin').getForm();
                            Ext.Ajax.request({
                                url: BASE_PATH + 'master_suplier/simpan_suplier_baru',
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
                                        var grid = Ext.ComponentQuery.query('panel > #mastersupliergrid')[0];
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