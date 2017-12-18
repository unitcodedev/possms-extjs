/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.MsPasienActionWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.mspasienactionwin',
    itemId: 'mspasienactionwin',
    id: 'mspasienactionwin',
    ui: 'blue-window',
    title: 'FORM PASIEN',
    width: 400,
    height: 350,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'formActionDokter',
                    id: 'formmspasienactionwin',
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
                            fieldLabel: 'Nama ',
                            name: 'actpx_nama',
                            width: 340,
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            name: 'actpx_jk',
                            allowBlank: true,
                            editable: false,
                            fieldLabel: 'Jenis Kelamin',
                            width: 200,
                            store: new Ext.data.SimpleStore({
                                id: 0,
                                fields: [
                                    'typeCode', //numeric value is the key
                                    'type' //the text value is the value
                                ],
                                data: [
                                    ['L', 'Laki Laki'],
                                    ['P', 'Perempuan']
                                ]
                            })
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    displayField: 'type',
                                    valueField: 'typeCode',
                                    queryMode: 'local',
                                    name: 'jenis_umur',
                                    allowBlank: true,
                                    editable: false,
                                    margin: '0 5 0 0',
                                    fieldLabel: 'Tgl Lahir',
//                                    readOnly : true,
                                    width: 200,
                                    store: new Ext.data.SimpleStore({
                                        id: 0,
                                        fields: [
                                            'typeCode', //numeric value is the key
                                            'type' //the text value is the value
                                        ],
                                        data: [
                                            ['1', 'Tgl Lahir'],
                                            ['2', 'Umur']
                                        ]
                                    }),
                                    listeners: {
                                        change: function (field, newValue, oldValue) {
                                            if (newValue === '1') {
                                                me.down('#formActionDokter').getForm().findField('actpx_tgllahir').show();
                                                me.down('#formActionDokter').getForm().findField('actpx_umur').hide();
                                            } else {
                                                me.down('#formActionDokter').getForm().findField('actpx_umur').show();
                                                me.down('#formActionDokter').getForm().findField('actpx_tgllahir').hide();
                                            }
                                            ;
                                        }}
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'actpx_umur',
                                    hidden: true,
                                    width: 50,
                                    listeners: {
                                        scope: this,
                                        change: function (fld, m) {
                                            var umur = fld.getValue(),
                                                    status = fld.up('form').getForm().findField('actpx_status'),
                                                    jk = fld.up('form').getForm().findField('actpx_jk');
                                            if (jk.getValue() === 'L') {
                                                if (umur < 17) {
                                                    status.setReadOnly(true);
                                                    status.setValue('An.');
                                                } else if (umur > 17 && umur < 23) {
                                                    status.setReadOnly(true);
                                                    status.setValue('Sdr.');
                                                } else if (umur >= 23) {
                                                    status.setReadOnly(true);
                                                    status.setValue('Tn.');
                                                }
                                            } else {
                                                if (umur < 17) {
                                                    status.setReadOnly(true);
                                                    status.setValue('An.');
                                                } else {
                                                    status.setReadOnly(false);
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    width: 100,
                                    name: 'actpx_tgllahir',
                                    format: 'd/M/Y',
                                    submitFormat: 'Y-m-d',
                                    allowBlank: false,
                                    hidden : true,
                                    listeners: {
                                        scope: this,
                                        change: function (fld, m) {
                                            var umur = this.ngitungUmur(fld.getValue()),
                                                    status = fld.up('form').getForm().findField('actpx_status'),
                                                    jk = fld.up('form').getForm().findField('actpx_jk');
                                            if (jk.getValue() === 'L') {
                                                if (umur < 17) {
                                                    status.setReadOnly(true);
                                                    status.setValue('An.');
                                                } else if (umur > 17 && umur < 23) {
                                                    status.setReadOnly(true);
                                                    status.setValue('Sdr.');
                                                } else if (umur >= 23) {
                                                    status.setReadOnly(true);
                                                    status.setValue('Tn.');
                                                }
                                            } else {
                                                if (umur < 17) {
                                                    status.setReadOnly(true);
                                                    status.setValue('An.');
                                                } else {
                                                    status.setReadOnly(false);
                                                }
                                            }
                                        }
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            name: 'actpx_status',
                            allowBlank: true,
                            readOnly: true,
                            fieldLabel: 'Status',
                            editable: false,
                            width: 200,
                            store: new Ext.data.SimpleStore({
                                id: 0,
                                fields: [
                                    'typeCode', //numeric value is the key
                                    'type' //the text value is the value
                                ],
                                data: [
                                    ['Tn.', 'Tn.'],
                                    ['Ny.', 'Ny.'],
                                    ['Nn.', 'Nn.'],
                                    ['Mrs.', 'Mrs'],
                                    ['Miss.', 'Miss.'],
                                    ['Sdr.', 'Sdr.'],
                                    ['An.', 'An.'],
                                ]
                            })
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No HP ',
                            name: 'actpx_hp',
                            width: 250,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Telf Rumah ',
                            name: 'actpx_telf',
                            width: 250,
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Alamat ',
                            name: 'actpx_alamat',
                            height: 50,
                            width: 340,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kota ',
                            name: 'actpx_kota',
                            width: 240,
                        },
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Simpan',
                    scope: this,
                    iconCls: 'icon-btn-save',
                    itemId: 'mspasienactionwin_simpan'
                }
            ]
        });
        me.callParent(arguments);

    },
    ngitungUmur: function (dateString) {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
    }

});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */