/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.FoApproveDiscountByWinby', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.foapprovediscountbywinby',
    itemId: 'foapprovediscountbywinby',
    ui: 'blue-window',
    title: '<b>Form Approve Discount</b>',
    iconCls: 'icon-btn-discount',
    width: 300,
    height: 220,
    resizable: false,
    autoShow: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'formfoapprove_discount',
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
                            value: '<b> Masukkan User Name dan Password SPV Untuk pemberian Discount</b>'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'User Name ',
                            margin: '0 10 5 10',
//                            labelSeparator: "",
                            name: 'disc_username',
                        },
                        {
                            xtype: 'textfield',
                            margin: '0 10 5 10',
//                            labelSeparator: "",
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
                    itemId: 'foapprovediscountbywinby_simpan'
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */