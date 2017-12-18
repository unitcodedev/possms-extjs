/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.FoheaderPendaftaranForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.fopendaftaran.foheaderpendaftaranform',
    itemId: 'foheaderpendaftaranform',
    id: 'foheaderpendaftaranform',
    bodyStyle: FORM_BG,
    bodyPadding: '5 5',
    buttonAlign: 'right',
    fieldDefaults: {
        width: 250,
        labelAlign: 'right',
        labelWidth: 100,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [   
            ],
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                width: 410,
                itemId: 'pasienField',
                items: [
            ]
            },
//            {
//                xtype: 'radiogroup',
//                fieldLabel: 'Pengirim ',
//                width: 320,
//                items: [
//                {
//                    boxLabel: 'APS',
//                    width: 70,
//                    name: 'daftar_tipekirim',
//                    inputValue: 1,
//                },
//                {
//                    boxLabel: 'Dokter',
//                    width: 70,
//                    name: 'daftar_tipekirim',
//                    inputValue: 2,
//                },
//                {
//                    boxLabel: 'Antar Lab',
//                    width: 80,
//                    name: 'daftar_tipekirim',
//                    inputValue: 3,
//                },
//                {
//                    boxLabel: 'Rekanan',
//                    width: 70,
//                    name: 'daftar_tipekirim',
//                    inputValue: 4,
//                },
//                ],
//                listeners: {
//                    change: function (rb, nv, ov, options) {
//                        var type_kirim = me.getForm().findField('daftar_tipekirim').getGroupValue();
//                        //                        console.log(type_kirim );
//                        if (type_kirim === 2) {
//                            me.getForm().findField('nama_dokter').show();
//                            me.getForm().findField('nama_lab').hide();
//                            me.getForm().findField('nama_rekanan').hide();
//                            me.getForm().findField('dokter_cabang').show();
//                        } else if (type_kirim === 3) {
//                            me.getForm().findField('nama_dokter').hide();
//                            me.getForm().findField('nama_lab').show();
//                            me.getForm().findField('nama_rekanan').hide();
//                            me.getForm().findField('dokter_cabang').hide();
//                        } else if (type_kirim === 4) {
//                            me.getForm().findField('nama_dokter').hide();
//                            me.getForm().findField('nama_lab').hide();
//                            me.getForm().findField('nama_rekanan').show();
//                            me.getForm().findField('dokter_cabang').hide();
//                        } else {
//                            me.getForm().findField('nama_dokter').hide();
//                            me.getForm().findField('nama_lab').hide();
//                            me.getForm().findField('nama_rekanan').hide();
//                            me.getForm().findField('dokter_cabang').hide();
//                        }
//                    }
//                }
//            },
//            {
//                xtype: 'textfield',
//                fieldLabel: 'Nama Lab ',
//                name: 'nama_lab',
//                itemId: 'nama_lab',
//                width: 240,
//                hidden : true
//            },
//            {
//                xtype: 'textfield',
//                fieldLabel: 'Nama Rekanan ',
//                name: 'nama_rekanan',
//                itemId: 'nama_rekanan',
//                width: 240,
//                hidden : true
//            },
//            {
//                xtype: 'textfield',
//                fieldLabel: 'No Barcode ',
//                name: 'dpx_barcode',
//                readOnly: true,
//                hidden: true
//            },
            

            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '1 1 1 20',
                width: 410,
                itemId: 'biayaField',
                items: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    margin: '0 10 0 0',
                    align: 'center',
                    text: '  List Pasien   ',
                    iconCls: 'icon-btn-evaluasi',
                    action: 'listPasienPdftrn'
                },
                 {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    text: '  List Pasien   ',
                    iconCls: 'icon-btn-evaluasi',
                    action: 'listPasienPdftrn'
                },
                ]
            },
            ]
        });

        me.callParent(arguments);
    },

});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */