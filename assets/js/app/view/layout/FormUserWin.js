/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.layout.FormUserWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.layout.formuserwin',
    itemId: 'formuserwin',
    title: 'UBAH PASSWORD',
    width: 400,
    modal: true,
    ui: 'blue-window',
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    closable: false,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyStyle: FORM_BG,
                    bodyPadding: 10,
                    buttonAlign: 'right',
                    itemId: 'userprofileform',
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1.8,
                            fieldLabel: 'Nama ',
                            emptyText: 'Depan',
                            name: 'first_name',
                            allowBlank: false,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            width: 350,
                            fieldLabel: 'Password Baru',
                            inputType: 'password',
                            name: 'password',
                            emptyText: 'Password Baru',
                            id: 'password',
                            allowBlank: true
                        },
                        {
                            xtype: 'textfield',
                            width: 350,
                            fieldLabel: 'Ulangi Password ',
                            inputType: 'password',
                            name: 'password_confirm',
                            emptyText: 'Ulangi Password Baru',
                            allowBlank: true
                        },
                        {
                            xtype: 'numberfield',
                            width: 350,
                            fieldLabel: 'id',
                            name: 'id',
                            value: 0,
                            hidden: true
                        },
                    ]
                }
            ],
            buttons: [
                {
                    text: 'SIMPAN',
                    iconCls: 'icon-btn-update',
                    scope: this,
                    itemId: 'saveUserProfile'
                },
                {
                    text: 'BATAL',
                    iconCls: 'icon-btn-delete',
                    scope: this,
                    handler: this.close
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */