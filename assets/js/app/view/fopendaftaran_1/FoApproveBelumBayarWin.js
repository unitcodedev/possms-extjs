/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.FoApproveBelumBayarWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.foapprovebelumbayarwin',
    itemId: 'foapprovebelumbayarwin',
    ui: 'blue-window',
    title: '<b>Form Approve Kurang Bayar</b>',
    iconCls: 'icon-btn-discount',
    width: 300,
    height: 220,
    resizable: false,
    autoShow: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'formfoapprove_belumbayar',
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
                    handler: function() {
                        var form = me.down('#formfoapprove_belumbayar');
                        var formutama = Ext.getCmp('fopendaftaranform');
                        Ext.Ajax.request({
                            url: BASE_PATH + 'pendaftaran/approve_discount',
                            method: 'POST',
                            params: form.getValues(),
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);
                                if (resp.success === 'true') {
                                    Ext.MessageBox.show({
                                        title: resp.title,
                                        msg: "Verifkasi Password Berhasil",
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
                                    me.close();
                                    formutama.down('#approve_bayarkurang').show();
                                    formutama.down('#approve_bayarkurang').setText('<b>Persetujuan Kurang Bayar Oleh: <br> <u>' + resp.data.mk_nama + '</u></b>');
                                    formutama.getForm().findField('cek_approve_bayarkurang').setValue(true);
                                    formutama.getForm().findField('id_approve_bayarkurang').setValue(resp.data.id);
//                                    formutama.down("#verifikasipemberidiscount").setText('<b>Persetujuan Dari : ' + resp.data.mk_nama + '</b>');
//                                    formutama.getForm().findField('idpersetujuandisc').setValue(resp.data.id);
//                                    formutama.down("#ButtonWinCekDiscount").setDisabled(false);
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
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */