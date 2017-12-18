/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.FoApproveBawaTabungWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.foapprovebawatabungwin',
    id: 'foapprovebawatabungwin',
    itemId: 'foapprovebawatabungwin',
    ui: 'blue-window',
    title: '<b>Form Approve Bawa Tabung</b>',
    iconCls: 'icon-btn-discount',
    modal: true,
    closable: false,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    width: 300,
    height: 220,
    autoShow: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'formfoapprove_bawatabung',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 250,
                        labelAlign: 'right',
                        labelWidth: 70,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            name: 'img',
                            padding: '0px 0px 5px 0px',
                            align: 'center',
                            value: '<b> Masukkan User Name dan Password SPV Untuk Approval</b>'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'User Name ',
                            margin: '0 10 5 10',
                            name: 'disc_username',
                        },
                        {
                            xtype: 'textfield',
                            margin: '0 10 5 10',
                            fieldLabel: 'Password',
                            inputType: 'password',
                            name: 'disc_password',
                        },
                    ]
                }

            ],
            buttons: [
                {
                    text: 'Approve',
                    scope: this,
                    iconCls: 'icon-btn-save',
                    handler: function () {
                        var form = me.down('#formfoapprove_bawatabung');
                        var grid = Ext.getCmp('fopendaftarangrid');
//                        var formutama = Ext.getCmp('fopendaftaranform');
                        Ext.Ajax.request({
                            url: BASE_PATH + 'pendaftaran/approve_discount',
                            method: 'POST',
                            params: form.getValues(),
                            scope: this,
                            callback: function (options, success, response) {
                                var resp = Ext.decode(response.responseText);
                                if (resp.success === 'true') {
                                    Ext.MessageBox.show({
                                        title: resp.title,
                                        msg: "Verifkasi Password Berhasil",
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
                                    me.close();
                                    grid.down('#sdm_pendaftarantabung').setValue(resp.data.id);
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
                },
                {
                    text: 'Tutup',
                    scope: this,
                    iconCls: 'icon-btn-delete',
                    handler: function () {
                        me.close();
                        Ext.getCmp('fopendaftarangrid').down('#pendaftarantabung').setValue(false);

                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */