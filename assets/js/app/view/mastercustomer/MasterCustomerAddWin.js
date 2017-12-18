/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.mastercustomer.MasterCustomerAddWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.mastercustomer.mastercustomeraddwin',
    itemId: 'pendaftaranmastercustomeraddwin',
    ui: 'blue-window',
    title: 'FORM TAMBAH MASTER CUSTOMER BARU',
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
                    itemId: 'FormMasterCustomerAddWin',
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
                            name: 'kode_customer',
                            width: 340,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nama Customer',
                            name: 'mc_nama',
                            width: 340,
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Alamat',
                            name: 'mc_alamat',
                            height: 55,
                            width: 300,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kecamatan',
                            name: 'mc_kecamatan',
                            width: 280,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kota',
                            name: 'mc_kabupaten',
                            width: 280,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Provinsi',
                            name: 'mc_provinsi',
                            width: 280,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No. Telp',
                            name: 'mc_telp',
                            width: 280,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No. HP',
                            name: 'mc_nohp',
                            width: 280,
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Plafond',
                            name: 'mc_plafond',
                            width: 280,
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Jatuh Tempo',
                            name: 'mc_jatuh_tempo',
                            width: 220,
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: '<b>Aktif</b> ',
                            labelWidth: 70,
                            name: 'mc_aktif',
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
                            var form = me.down('#FormMasterCustomerAddWin').getForm();
                            Ext.Ajax.request({
                                url: BASE_PATH + 'master_customer/simpan_customer_baru',
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
                                        var grid = Ext.ComponentQuery.query('panel > #mastercustomergrid')[0];
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