Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', BASE_URL + 'assets/js/ux');
Ext.require(['Ext.ux.statusbar.StatusBar']);
Ext.onReady(function () {
    var formLogin = new Ext.FormPanel({
        frame: false,
        border: false,
        buttonAlign: 'center',
        url: BASE_URL + 'auth/login',
        method: 'POST',
        id: 'frmLogin',
//        bodyStyle: 'background-color: #dfe8f5;',
        bodyStyle: 'background-color:#F8F9F9',
        bodyPadding: '10 15 25 15',
        width: 400,
        labelWidth: 150,
        items: [
            {
                xtype: 'displayfield',
                name: 'img',
                padding: '0px 0px 5px 0px',
                value: '<b>POS SMS</b> <br> Masukkan Username dan Password'
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                ]
            },
            {
                xtype: 'textfield',
                style: "background-color: #e6e6e6;",
                fieldLabel: "<img src='../assets/js/ext/resources/css/azzurra/images/icon/man.png' width='18' height='18' /> ",
//                fieldLabel: '<b>Username<b>',
                labelSeparator: '',
                labelWidth: 30,
                margin: '0 0 2 60',
                emptyText: 'Masukkan Username',
                labelAlign: 'right',
                name: 'username',
                itemId: 'username',
                id: 'logUsername',
                allowBlank: false,
                msgTarget: 'side',
                tabIndex: 1,
                anchor: '90%',
                listeners: {
                    scope: this,
                    specialkey: function (f, e) {
                        if (e.getKey() === e.ENTER) {
                            f.up('form').down('#logPassword').focus();
                        }
                    }
                }
            },
            {
                xtype: 'textfield',
                style: "background-color: #e6e6e6;",
                labelSeparator: '',
                labelWidth: 30,
                fieldLabel: "<img src='../assets/js/ext/resources/css/azzurra/images/icon/password.png' width='18' height='18' /> ",
//                fieldLabel: '<b>Password</b>',
                name: 'password',
                margin: '0 0 0 60',
                emptyText: 'Masukkan Password',
                labelAlign: 'right',
                itemId: 'logPassword',
                allowBlank: false,
                msgTarget: 'side',
                inputType: 'password',
                anchor: '90%',
                listeners: {
                    scope: this,
                    specialkey: function (f, e) {
                        if (e.getKey() === e.ENTER) {
                            fnLogin();
                        }
                    }
                }
            }
        ],
        buttons: [
            {
                text: 'Login',
                margin: '0px 10px 10px 10px',
                iconCls: 'icon-btn-login',
                handler: fnLogin
            }, {
                text: 'Reset',
                iconCls: 'icon-btn-refresh',
                handler: function () {
                    formLogin.getForm().reset();
                    Ext.getCmp('sbWinLogin').setStatus({
                        text: 'Ready',
                        iconCls: 'x-status-ready'
                    });
                }
            }
        ]
    });
    function fnLogin() {
        Ext.getCmp('frmLogin').on({
            beforeaction: function () {
                if (formLogin.getForm().isValid()) {
                    Ext.getCmp('winLogin').body.mask();
                    Ext.getCmp('sbWinLogin').showBusy('Checking Account...');
                }
            }
        });
        formLogin.getForm().submit({
            success: function () {
                window.location = BASE_URL;
            },
            failure: function (form, action) {
                Ext.getCmp('winLogin').body.unmask();
                if (formLogin.getForm().isValid()) {
                    Ext.getCmp('sbWinLogin').setStatus({
                        text: '<div class="status-error">' + action.result.msg + '</div>'
                    });
                } else {
                    Ext.getCmp('sbWinLogin').setStatus({
                        text: '<div class="status-error">Something error in form !</div>',
                        iconCls: 'x-status-error'
                    });
                }
            }
        });
    }
    var winLogin = new Ext.Window({
        title: 'POS SMS - Login',
        ui: 'blue-window',
        id: 'winLogin',
        layout: 'fit',
        iconCls: 'icon-btn-lock',
        width: 410,
        height: 210,
        closable: false,
        resizable: false,
        draggable: false,
        items: [formLogin],
        bbar: Ext.create('Ext.ux.StatusBar', {
            id: 'sbWinLogin',
            defaultText: 'Ready',
            iconCls: 'x-status-ready'
        })
    });
    winLogin.show();
});