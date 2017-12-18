/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.PrintWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.printwin',
    itemId: 'printwin',
    ui: 'blue-window',
    title: 'Cetak Nota, Kartu Kontrol dan Barcode',
    width: 355,
    height: 70,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'formActionPendaftaranPrint',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 300,
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Lab ',
                            name: 'no_lab',
                            hidden: true,
                            width: 340,
                        },
                    ],
                    tbar: [
                        {
                            xtype: 'button',
                            ui: 'blue-button',
                            align: 'center',
                            margin: '2 0 2 10',
                            text: ' Nota ',
                            width: 100,
                            iconCls: 'icon-btn-print',
                            handler: function() {
                                var form = me.down('#formActionPendaftaranPrint').getForm();
                                var nolab = form.findField('no_lab').getValue();
                                window.open(BASE_PATH + 'pendaftaran/cetak_nota/' + nolab, "Print Preview", "height=" + screen.height + ",width=700,modal=yes,alwaysRaised=yes,scrollbars=yes");
                            }
                        },
                        {
                            xtype: 'button',
                            ui: 'blue-button',
                            align: 'center',
                            margin: '2 0 2 10',
                            text: ' Kartu Kontrol ',
                            width: 100,
                            iconCls: 'icon-btn-print',
                            handler: function() {
                                var form = me.down('#formActionPendaftaranPrint').getForm();
                                var nolab = form.findField('no_lab').getValue();
                                window.open(BASE_PATH + 'pendaftaran/cetak_kartu_kontrol/' + nolab, "Print Preview", "height=" + screen.height + ",width=700,modal=yes,alwaysRaised=yes,scrollbars=yes");
                            }
                        },
                        {
                            xtype: 'button',
                            ui: 'blue-button',
                            align: 'center',
                            margin: '2 0 2 10',
                            width: 100,
                            text: ' Barcode ',
                            iconCls: 'icon-btn-print',
                            handler: function() {
                                var form = me.down('#formActionPendaftaranPrint').getForm();
                                if (form.findField('no_lab').getValue() === '') {
                                    Ext.Msg.alert('Warning', 'Pilih No Lab Terlebih Dahulu');
                                    return;
                                }
                                Ext.Loader.loadScript('assets/js/jzebra/3rdparty/deployJava.js');
                                Ext.Loader.loadScript('assets/js/jzebra/3rdparty/jquery-1.10.2.js');
                                Ext.Loader.loadScript('assets/js/jzebra/qz-websocket.js');
                                Ext.Loader.loadScript('assets/js/jzebra/vjbcode.js');
                                Ext.MessageBox.confirm('Confirm', 'Cetak Label Barcode ??', function(btn, text) {
                                    if (btn === 'yes') {
//                                        var no_lab = form.findField('no_lab').getValue();
//                                        var grid = Ext.ComponentQuery.query('panel > #plydatapasiengrid')[0];
                                        Ext.Ajax.request({
                                            url: BASE_PATH + 'pendaftaran/cetak_barcode',
                                            method: 'POST',
                                            params: {
                                                no_lab: form.findField('no_lab').getValue(),
//                                                cabang: grid.down('#CabangCariDataPasien').getValue(),
                                            },
                                            scope: this,
                                            callback: function(options, success, response) {
                                                var resp = Ext.decode(response.responseText);
                                                if (resp.success === 'true') {
                                                    for (var i = 0, len = resp.data.length; i < len; i++) {
                                                        printZPL("zebra", resp.data[i].no_labbcd, resp.data[i].no_lab, resp.data[i].pas_nama, resp.data[i].kode_label);
                                                    }
                                                }
                                            }
                                        });
                                    } else {
                                        return;
                                    }
                                })

                            }
                        },
                    ]
                }
            ],
        });
        me.callParent(arguments);

    },
    ngitungUmur: function(dateString) {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
    }

});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */