/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.App', {
    extend: 'SIForLaP.controller.Base',
    models: [
        'appmenu.MenuModel'
    ],
    stores: [
        'appmenu.BackOfficeMenuStore',
        'appmenu.ElektromedisMenuStore',
        'appmenu.LaboratMenuStore',
        'appmenu.MasterMenuStore',
        'appmenu.MarketingMenuStore',
        'appmenu.PelayananMenuStore',
        'appmenu.KesiswaanMenuStore',
        'appmenu.PemeriksaanLainMenuStore',
    ],
    views: [
        'layout.LayoutContainer',
        'layout.FormUserWin',
        'layout.NavPanel',
        //MENU LIST
        'appmenu.BackOfficeMenu',
        'appmenu.ElektromedisMenu',
        'appmenu.PelayananMenu',
        'appmenu.MasterMenu',
        'appmenu.MarketingMenu',
        'appmenu.KesiswaanMenu',
        'appmenu.LaboratMenu',
        'appmenu.PemeriksaanLainMenu',
    ],
    refs: [
        {
            ref: 'tabs',
            selector: '#tabs'
        },
        {
            ref: 'MainView',
            selector: '#layoutcontainer'
        },
        {
            ref: 'UserProfile',
            selector: '#userprofileform'
        },
    ],
    init: function () {
        this.listen({
            controller: {
                '#App': {
                    tokenchange: this.dispatch
                }
            },
            component: {
                '#backofficemenu': {
                    itemclick: this.addHistory
                },
                '#elektromedismenu': {
                    itemclick: this.addHistory
                },
                '#pelayananmenu': {
                    itemclick: this.addHistory
                },
                '#laboratmenu': {
                    itemclick: this.addHistory
                },
                '#mastermenu': {
                    itemclick: this.addHistory
                },
                '#marketingmenu': {
                    itemclick: this.addHistory
                },
                '#pemeriksaanlainmenu': {
                    itemclick: this.addHistory
                },
//                '#userProfiles': {
//                    click: function () {
//                        var win = Ext.widget('layout.formuserwin');
//                    }
//                },
                '#userprofileform': {
                    afterrender: function () {
                        var form = this.getUserProfile().getForm();
                        form.load({
                            //                            url: BASE_PATH + 'users',
                            //                            waitMsg: 'Load data...',
                            //                            success: function(form, action) {
                            //                                Ext.getCmp('imageTtdUser').setSrc(action.result.data.ttd_url);
                            //                            },
                            failure: function (form, action) {
                                //                                Ext.Msg.alert("Load failed", 'Tidak ada data');
                                form.findField('first_name').setValue(NAMA_USER);
                                form.findField('id').setValue(ID_KARY);
                            }
                        });

                    }
                },
                '#saveUserProfile': {
                    click: function (btn, e, opt) {
//                        Ext.Msg.alert("Load failed", 'Tidak ada data');
                        var form = this.getUserProfile().getForm(),
                                passwordField = form.findField('password').getValue(),
                                passwordConfirm = form.findField('password_confirm').getValue();
//                        Ext.Msg.alert("Load failed", passwordField);
                        if (passwordField !== passwordConfirm) {
                            Ext.Msg.alert("Salah", 'Maaf Password Tidak Sama');
                            return;
                        }

                        if (form.isValid()) {
                            Ext.Ajax.request({
                                url: BASE_PATH + 'users/edit_profile',
                                method: 'POST',
                                params: form.getValues(),
                                scope: this,
                                callback: function (options, success, response) {
                                    var resp = Ext.decode(response.responseText);

                                    if (resp.success === 'true') {
                                        btn.up('window').destroy();
                                        window.location = BASE_URL;
                                        Ext.MessageBox.show({
                                            title: 'INFO',
                                            msg: resp.message,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.INFO
                                        });
                                    } else {
                                        Ext.MessageBox.show({
                                            title: 'ERROR',
                                            msg: resp.message,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                }
                            });
                        }
                    }
                }

            },
            global: {
            },
            store: {
            },
            proxy: {
                '*': {
                    exception: function (proxy, response, operation, eOpts) {
                        Ext.MessageBox.show({
                            title: 'ERROR',
                            msg: response.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                }
            }
        });
    },
    addHistory: function (view, rec, item, index, eventObj) {
        if (!rec.raw || !rec.raw.panel || rec.raw.panel === "none") {
            return;
        }
        var me = this,
                token = rec.raw.panel;
        // Tampilkan # di Browser
//        Ext.util.History.add(token);
        // langsung Link
//        me.fireEvent('tokenchange', token);
        var icon = rec.raw.iconCls;
        var aidi = rec.raw.id;
        var removeGet = token.substring(3);
        var folder = removeGet.toLowerCase();
        removeGet.substring(0, 2);
//	var parentFolder = this.folderParsing(pF);
        var controller = token;
        var cls = "SIForLaP.view." + folder + "." + token;
        var tabs = this.getTabs();
        var tab = tabs.child('#' + token);
        var tabController = this.application.controllers.get(controller);
        // Cek Akses
        Ext.Ajax.request({
            url: BASE_PATH + 'apps/cek_akses_menu',
            method: 'POST',
            params: {
                id: aidi
            },
            scope: this,
            callback: function (options, success, response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success === 'true') {
                    if (!tabController) {
                        this.application.getController(controller);
                    }
                    if (!tab) {
                        tab = tabs.add(Ext.create(cls, {
                            itemId: token,
                            title: rec.get('text'),
                            iconCls: icon,
                            closable: true,
                            border: false
                        }));
                    }
                    tabs.setActiveTab(tab);
                } else {
                    Ext.MessageBox.show({
                        title: "Akses",
                        msg: "Anda Tidak Berhak Mengakses Fitur ini...!!",
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });

    },
    dispatch: function (token) {
        var me = this;
        //        // switch on token to determine which content to create
        if (token !== "") {
            Ext.Ajax.request({
                url: BASE_PATH + 'apps/user_check',
                method: 'POST',
                params: {
                    menu: token
                },
                scope: this,
                callback: function (options, success, response) {
                    var resp = Ext.decode(response.responseText);

                    if (resp.success === 'true') {
                        me.processId(token);
                    } else {
                        Ext.MessageBox.show({
                            title: resp.title,
                            msg: resp.msg,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });

                        return;
                    }
                }
            });
        }
    },
    processId: function (token) {
        //        if (rec.raw.disabled) {
        //            Ext.MessageBox.show({
        //                title: 'Warning',
        //                msg: 'Anda tidak memiliki akses untuk menu ini',
        //                buttons: Ext.MessageBox.OK,
        //                icon: Ext.MessageBox.WARNING
        //            });
        //            return;
        //        }
        //        else {
        //        if (!token.raw || !token.raw.panel || token.raw.panel === "none") {
        //            return;
        //        }

        var id = token;
        var icon = "";
        var cls, folder;

        folder = id.substring(3);
        folder = folder.toLowerCase();

        cls = "SIForLaP.view." + folder + "." + id;

        var tabs = this.getTabs();
        var tab = tabs.child('#' + id);
        var tabController = this.application.controllers.get(id);

        if (!tabController) {
            tabsController = this.application.getController(id);
            //tabsController.init();
        }

        if (!tab) {
            tab = tabs.add(Ext.create(cls, {
                itemId: id,
                title: token, //rec.get('text'),
                iconCls: icon,
                border: false,
                closable: true
            }));
        }
        tabs.setActiveTab(tab);
        //        }
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */