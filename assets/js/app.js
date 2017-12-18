Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': BASE_PATH + 'assets/js/ux'
    }
});
Ext.require([
    'Ext.data.*',
    'Ext.dd.*',
    'Ext.form.*',
    'Ext.grid.*',
    'Ext.menu.*',
    'Ext.selection.*',
    'Ext.state.*',
    'Ext.tip.*',
    'Ext.util.*',
    'Ext.window.*',
    'Ext.ux.*', ,
            'Ext.ux.TabCloseMenu',
    'Ext.ux.form.ComboGrid',
    'Ext.ux.tree.plugin.NodeDisabled',
    'Ext.ux.TreeFilter'
]);

Ext.application({
    requires: ['Ext.container.Viewport', 'SIForLaP.domain.Proxy'],
    appFolder: BASE_PATH + 'assets/js/app',
    name: 'SIForLaP',
    controllers: ['App'],
    launch: function () {
        var me = this;
        Ext.Ajax.timeout = 600000;
        Ext.util.History.init(function () {
            var hash = document.location.hash;
            me.getAppController().fireEvent('tokenchange', hash.replace('#', ''));
        });

        Ext.define('Ext.ux.form.ComboBoxEdit', {
            extend: 'Ext.form.field.ComboBox',
            trigger2Cls: 'x-form-new-trigger',
            alias: 'widget.comboboxedit',
            initComponent: function () {
                var me = this;
                me.callParent(arguments);
            },
            afterRender: function () {
                this.callParent();
            }
        });

        Ext.create('Ext.container.Viewport', {
            layout: {
                type: 'border',
                padding: 0
            },
            defaults: {
                split: true,
                border: true
            },
            items: [
//                {
//                    region: 'north',
//                    xtype: 'panel',
//                    border: false,
//                    cls: 'header',
//                    layout: 'hbox',
//                    split: false,
//                    items: [
//                        {
//                            xtype: 'panel',
//                            border: false,
//                            bodyCls: 'header-body',
//                            width: '100%',
//                            html: '<br><p style="font-size: 20px; color: white;"><img class="img-header" src="assets/img/logo.png" /><b>PARIS (PARAHITA Information System)</b></p>'
//                        },
//                        {
//                            xtype: 'box',
//                            width: '88%',
//                            html: '<img class="img-header" src="assets/img/gl_logo.png" />'
//                        },
//                    ]
//                },
                
                {
                    xtype: 'layout.navpanel',
                    padding: '5 0 0 3'
                },
                {
                    xtype: 'layout.layoutcontainer',
                    border: false,
                    padding: '5 3 0 0'
                },
                {
                    xtype: 'panel',
                    region: 'south',
                    border: false,
                    split: false,
                    margin: '2 0 0 0',
                    height: 27,
                    minHeight: 27,
                    maxHeight: 27,
                    bbar: [
                        {
                            xtype: 'tbtext',
                            text: '<div style="color: red;">' + TTD_STRING + '</div>'
                        },
                        '->',
                        {
                            xtype: 'tbtext',
                            width: 200,
                            text: IP_ADDRESS
                        },
                        {
                            xtype: 'tbtext',
                            text: DATE_TODAY
                        },
                        '-',
                        {
                            text: '',
                            iconCls: 'icon-btn-clock'
                        },
                        {
                            xtype: 'tbtext',
                            id: 'clock',
                        },
//                        {
//                            text: NAMA_USER,
//                            ui: 'blue-button',
//                            itemId: 'userProfiles',
//                            iconCls: 'icon-btn-msjabatan'
//                        },
//                        {
//                            text: CABANG_NAME,
//                            ui: 'blue-button',
//                            itemId: 'userProfile',
//                            iconCls: 'icon-btn-user'
//                        },
//                        {
//                            xtype: 'button',
//                            text: 'LOGOUT',
//                            ui: 'blue-button',
//                            iconCls: 'icon-btn-logout',
//                            handler: function () {
//                                Ext.MessageBox.confirm('Confirm', 'Apakah Yakin Anda Mau LOGOUT ??', function (btn, text) {
//                                    if (btn === 'yes') {
//                                        Ext.Ajax.request({
//                                            url: BASE_PATH + 'auth/logout',
//                                            method: 'POST',
//                                            success: function (xhr) {
//                                                window.location = BASE_PATH;
//                                            }
//                                        });
//                                    }
//                                })
//                            }
//                        }
                    ]
                }
            ],
            listeners: {
                afterrender: function () {
                }

            }
        });

        var updateClock = function () {
            Ext.getCmp('clock').setText(Ext.Date.format(new Date(), 'g:i:s A'));
        };
        var task = {
            run: updateClock,
            interval: 1000,
            scope: this
        };
        var runner = new Ext.util.TaskRunner();
        runner.start(task);

//	Ext.Loader.loadScript('assets/js/jzebra/3rdparty/deployJava.js');
//	Ext.Loader.loadScript('assets/js/jzebra/3rdparty/jquery-1.10.2.js');
//	Ext.Loader.loadScript('assets/js/jzebra/qz-websocket.js');
//	Ext.Loader.loadScript('assets/js/jzebra/vjbcode.js');

    }
});
