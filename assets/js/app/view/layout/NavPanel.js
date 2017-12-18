/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.layout.NavPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.layout.navpanel',
//    iconCls: 'icon-btn-logo',
    region: 'west',
//    title: 'Menu ',
    split: true,
    width: 200,
    minWidth: 200,
    maxWidth: 200,
//    collapsed: true,
    collapsible: true,
//    bodyStyle: 'background-color: #dfe8f5; padding:10px;',
    frame: false,
    layout: 'accordion',
    listeners: {
        mouseover: {
            element: 'el',
            fn: function () {
//                alert('over');
//                this.toggleCollapse(false);
//                this.setWidth(200);
            }
        },
        mouseleave: {
            element: 'el',
            fn: function () {
//                this.setWidth(0);
//                alert('leave');
//                this.toggleCollapse(true);
            }
        }
    },
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            tools: [
//                {
//                    type: 'help',
//                    handler: function(event, toolEl, panel) {
//                        Ext.MessageBox.alert('Help', 'Help and Manual window goes here');
//                    }
//                },
//                {
//                    type: 'gear',
//                    handler: function(event, toolEl, panel) {
//                        Ext.MessageBox.alert('About', 'About window goes here');
//                    }
//                }
            ],
            tbar: [
                {
                    xtype: 'fieldset',
                    margin: '0 0 0 0',
                    border: false,
                    style: "background-color : #dfe8f5; color : black",
                    width: '100%',
                    align: 'center',
                    height: 190,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            bodyCls: 'header-body',
                            width: '100%',
                            height : 40,
                            style: "border-radius: 15px;",
                            align: 'center',
                            html: '<p style="font-size: 12px; color: #00C6D7; text-align : left"><img class="img-header" src="assets/img/favicon.png" /><b>POS SMS</b></p>'
//                            html: '<br><p style="font-size: 20px; color: white;"><img class="img-header" src="assets/img/favicon.png" /><b>PARIS (PARAHITA Information System)</b></p>'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                Ext.create('Ext.Img', {
                                    width: '50%',
//                                    width: 80,
                                    align: 'center',
                                    height: 90,
//                                    margins: '15 5 5 5',
                                    baseCls: 'imagefieldthumb',
                                    src: BASE_PATH + 'assets/img_data/1.jpg',
                                    id: 'imageTtdUser',
                                    listeners: {
                                        el: {
                                            click: function () {
                                                alert('test');
                                            }
                                        }
                                    }
//                    onChange: function (value) {
//                        var form = this.up('form').getForm(),
//                                nama = form.findField('id').getValue();
//                        form.submit({
//                            url: BASE_URL + 'ms_karyawan/upload_foto/' + nama,
//                            waitMsg: 'Upload Foto..',
//                            clientValidation: false,
//                            success: function (form, action) {
//                                Ext.MessageBox.alert('SUCCESS', action.result.message);
//                                Ext.getCmp('imageTtdUser').setSrc(BASE_URL + 'assets/upload/foto/' + nama + '.jpg');
//                            },
//                            failure: function (form, action) {
//                                Ext.MessageBox.alert('ERROR', action.result.message);
//                            }
//                        });
//                    }
                                }),
                                {
                                    xtype: 'tbtext',
                                    width: '50%',
                                    margin: '25 0 0 0',
                                    text: "<p style='color : black; text-align: center; font-size : 16px'><b>Welcome <br></p> \n\
                                           <p style='color : #00C6D7; text-align: center; font-size : 14px'> " + NAMA_USER + "</p>",
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            margin: '0 0 0 100',
                            style: "background-color : white; color : black;border-radius: 50%;",
                            iconCls: 'icon-btn-logout',
                            handler: function () {
                                Ext.MessageBox.confirm('Confirm', 'Apakah Yakin Anda Mau LOGOUT ??', function (btn, text) {
                                    if (btn === 'yes') {
                                        Ext.Ajax.request({
                                            url: BASE_PATH + 'auth/logout',
                                            method: 'POST',
                                            success: function (xhr) {
                                                window.location = BASE_PATH;
                                            }
                                        });
                                    }
                                })
                            }
                        },
                        {
                            xtype: 'button',
                            style: "background-color : white; color : black;border-radius: 50%;",
                            iconCls: 'icon-btn-user',
                            handler: function () {
                                var win = Ext.widget('layout.formuserwin');
                            }
                        },
                        {
                            xtype: 'button',
                            style: "background-color : white; color : black;border-radius: 50%;",
                            iconCls: 'icon-btn-setting',
                        }
                    ]
                },
            ],
            items: [
                {
                    xtype: 'appmenu.pelayananmenu',
                },
                {
                    xtype: 'appmenu.kesiswaanmenu'
                },
//                {
//                    xtype: 'appmenu.elektromedismenu'
//                },
//                {
//                    xtype: 'appmenu.pemeriksaanlainmenu'
//                },
//                {
//                    xtype: 'appmenu.elektromedismenu'
//                },
                {
                    xtype: 'appmenu.backofficemenu'
                },
                {
                    xtype: 'appmenu.marketingmenu'
                },
                {
                    xtype: 'appmenu.mastermenu'
                },
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file LayoutContainer.js */
/* Location: ./assets/js/app/view/layout/LayoutContainer.js */