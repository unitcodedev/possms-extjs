/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.masterid.MasterIDForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.masterid.masteridform',
    itemId: 'masteridform',
    bodyPadding: '5 5',
    buttonAlign: 'right',
    bodyStyle: {"background-color": "#E0E3E6"},
    fieldDefaults: {
        width: 250,
        labelAlign: 'right',
        labelWidth: 100,
        msgTarget: 'side'
    },
    autoScroll: true,
    border: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    xtype: 'fieldset',
                    margin: '0 0 2 2',
                    width: 450,
                    title: '<b>Biodata </b>',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '<b>No Lab Siprama</b>',
                            hidden: true,
                            name: 'no_lab_siprama',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '<b>No Lab</b>',
                            readOnly: true,
                            name: 'no_lab',
                            hidden: true,
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Pasien ',
                            boxLabel: 'BPJS',
                            name: 'bpjs',
                            inputValue: 1,
                            listeners: {
                                change: function (rb, nv, ov, options) {
                                    var form = me.getForm();
                                    if (nv) {
                                        form.findField('no_ktp').show();
                                        form.findField('no_kk').show();
                                        form.findField('no_bpjs').show();
                                    } else {
                                        form.findField('no_ktp').hide();
                                        form.findField('no_kk').hide();
                                        form.findField('no_bpjs').hide();
                                    }
                                }
                            }

                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No KTP',
                            width: 350,
                            hidden: true,
                            name: 'no_ktp',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No KK',
                            width: 350,
                            hidden: true,
                            name: 'no_kk',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No BPJS',
                            hidden: true,
                            width: 350,
                            name: 'no_bpjs',
                        },
                        {
                            xtype: 'container',
                            anchor: '100%',
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'container',
                                    columnWidth: .90,
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nama Pasien',
                                            //                                            labelCls : 'icon-btn-temp',
                                            name: 'nama_pasien',
                                            emptyText: 'Ketik Nama / No Hp dan Tekan F1',
                                            itemId: 'nama_pasien',
                                            width: 350,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keyup: function (form, e) {
                                                    if (e.getKey() === 112 || e.getKey() === 13) {
                                                        var win = Ext.widget('masterid.listpasienwin');
                                                        Ext.getCmp('textCariPasien').setValue(form.getValue());
                                                        Ext.getCmp('typeCariPasien').setValue('pas_nama');
                                                        //---------------------------------------------
                                                        var grid1 = Ext.getCmp('listpasiengrid'),
                                                                store1 = grid1.getStore(),
                                                                filterCollection = [];
                                                        var statusFilter = new Ext.util.Filter({
                                                            property: 'pendaftaran_cari_pasien',
                                                            value: 'false' + '-' + form.getValue()
                                                        });
                                                        filterCollection.push(statusFilter);
                                                        store1.clearFilter(true);
                                                        store1.filter(filterCollection);
                                                    }
                                                },
                                                change: function (field, newValue, oldValue) {
                                                    field.setValue(newValue.toUpperCase());
                                                }
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ID',
                            name: 'pas_id',
                            itemId: 'pas_id',
                            readOnly: true,
//                            width: 250,
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            name: 'jenis_kelamin',
                            allowBlank: true,
                            editable: false,
                            fieldLabel: 'Jenis Kelamin',
                            width: 200,
                            readOnly: true,
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
                                                me.getForm().findField('tgl_lahir').show();
                                                me.getForm().findField('umur').hide();
                                            } else {
                                                me.getForm().findField('umur').show();
                                                me.getForm().findField('tgl_lahir').hide();
                                            }
                                            ;
                                        }}
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'umur',
//                                    readOnly: true,
                                    hidden: true,
                                    width: 50,
                                },
                                {
                                    xtype: 'datefield',
                                    width: 120,
                                    name: 'tgl_lahir',
                                    hidden: true,
                                    format: 'd/M/Y',
                                    emptyText: 'MM-DD-YYYY',
                                    submitFormat: 'Y-m-d',
                                    readOnly: true,
                                    allowBlank: false,
                                },
                            ]
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            name: 'status',
                            allowBlank: true,
                            fieldLabel: 'Status',
                            editable: false,
                            readOnly: true,
                            width: 200,
                            store: new Ext.data.SimpleStore({
                                id: 0,
                                fields: [
                                    'typeCode', //numeric value is the key
                                    'type' //the text value is the value
                                ],
                                data: [
                                    ['Tn', 'Tn.'],
                                    ['Ny', 'Ny.'],
                                    ['Nn', 'Nn.'],
                                    ['Mrs', 'Mrs.'],
                                    ['Mrs', 'Mrs.'],
                                    ['Miss', 'Miss.'],
                                    ['Sdr', 'Sdr.'],
                                    ['An', 'An.'],
                                ]
                            })
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No HP ',
                            name: 'no_hp',
                            itemId: 'no_hp',
                            readOnly: true,
                            width: 250,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Telf Rumah ',
                            name: 'no_tlfnrumah',
                            itemId: 'no_tlfnrumah',
                            readOnly: true,
                            width: 250,
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Alamat ',
                            name: 'alamat',
                            itemId: 'alamat',
                            readOnly: true,
                            height: 35,
                            width: 340,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kota ',
                            name: 'kota',
                            itemId: 'kota',
                            readOnly: true,
                            width: 240,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Jabatan ',
                            name: 'jabatan',
                            hidden: true,
//                            readOnly: true,
                            width: 240,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Divisi ',
                            name: 'divisi',
                            hidden: true,
//                            readOnly: true,
                            width: 240,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Sub Divisi ',
                            name: 'sub_divisi',
                            hidden: true,
//                            readOnly: true,
                            width: 240,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Departemen ',
                            name: 'departemen',
                            hidden: true,
//                            readOnly: true,
                            width: 240,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Sub Departemen ',
                            name: 'sub_departemen',
                            hidden: true,
//                            readOnly: true,
                            width: 240,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    margin: '0 0 2 2',
                    width: 450,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    align: 'center',
                                    margin: '2 0 2 5',
                                    text: ' Anamnesa ',
                                    iconCls: 'icon-btn-dokter',
                                    action: 'ActionWinFormAnamnesa',
                                },
//                                {
//                                    xtype: 'button',
//                                    ui: 'blue-button',
//                                    align: 'center',
//                                    margin: '2 0 2 5',
//                                    text: '  Informed Concern   ',
//                                    iconCls: 'icon-btn-approve',
//                                    action: 'ActionWinFormInformedConren',
//                                },
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    align: 'center',
                                    margin: '2 0 2 5',
                                    text: ' Persyaratan ',
                                    iconCls: 'icon-btn-minta',
                                    itemId: 'ButtonFormPersyaratan',
                                    hidden: true,
                                    action: 'ActionWinFormPersyaratan',
                                },
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    align: 'center',
                                    margin: '2 0 2 5',
                                    text: ' Berita Acara ',
                                    iconCls: 'icon-btn-total',
                                    itemId: 'ButtonFormBeritaAcara',
                                    hidden: true,
                                    action: 'ActionWinFormBeritaAcara',
                                    listeners: {
                                        click: function () {
                                            if (Ext.getCmp('fopaket_pemeriksaan').getValue() === '' || Ext.getCmp('fopaket_pemeriksaan').getValue() === null) {
                                                alert('Tidak Ada Berita Acara');
                                            } else {
                                                window.open(BASE_PATH + 'pendaftaran/berita_acara/' + Ext.getCmp('fopaket_pemeriksaan').getValue(), "Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");
                                            }
                                        }
                                    }
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    margin: '0 0 2 2',
                    width: 450,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: '<b>Home Service</b> ',
                                    name: 'cek_homeservice',
                                    width: 130,
                                    inputValue: 1,
                                    listeners: {
                                        change: function (field, newValue, oldValue) {
                                            if (newValue === true) {
                                                me.getForm().findField('petugas_homeservice').show();
                                            } else {
                                                me.getForm().findField('petugas_homeservice').hide();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    width: 200,
                                    queryMode: 'local',
                                    allowBlank: false,
                                    store: 'masterid.DaftarSdmStore',
                                    emptyText: 'Masukkan Nama Petugas',
                                    hideTrigger: true,
                                    mode: 'remote',
                                    minChars: 1,
                                    displayField: 'mk_nama',
                                    valueField: 'id',
                                    name: 'petugas_homeservice',
                                    hidden: true,
                                    listeners: {
                                        select: function (cmb, rec, opt) {
                                            var val = cmb.getValue(),
                                                    record = cmb.findRecordByValue(val);
                                            if (record) {
                                            }
                                        }
                                    }
                                },
                            ]
                        },
                    ]
                },
                // END Biodata
                {
                    xtype: 'container',
                    width: 450,
                    layout: 'column',
                    items: [
                        {
                            xtype: 'container',
                            columnWidth: .20,
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    columns: 2,
                                    items: [{
                                            xtype: 'checkbox',
                                            boxLabel: 'Cabang Lain',
                                            name: 'dokter_cabang',
                                            hidden: true,
                                            width: 100,
                                            inputValue: '1'
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    margin: '0 0 2 2',
                    width: 450,
                    title: '<b>Status Hasil</b> ',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            columns: 5,
                            allowBlank: false,
                            itemId: 'itemid_fostatushasil',
                            items: [
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Diambil',
                                    name: 'fostatushasil',
                                    id: 'fostatushasil_diambil',
                                    width: 70,
                                    checked: true,
                                    inputValue: 1,
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Dikirim',
                                    name: 'fostatushasil',
                                    id: 'fostatushasil_dikirim',
                                    width: 70,
                                    inputValue: 2,
                                    listeners: {
                                        change: function (rb, nv, ov, options) {
                                            if (Ext.getCmp('fostatushasil_dikirim').getValue() === true) {
                                                Ext.getCmp('fostatushasil_dikirim_rumah').show();
                                                Ext.getCmp('fostatushasil_dikirim_kantor').show();
                                                Ext.getCmp('fostatushasil_dikirim_dokter').show();
                                                me.getForm().findField('alamat_rumah').show();
                                                me.getForm().findField('alamat_rumah').setValue(me.getForm().findField('alamat').getValue() + '-' + me.getForm().findField('kota').getValue());
//                                                me.getForm().findField('alamat_kantor').hide();
//                                                me.getForm().findField('alamat_dokter').hide();
                                            } else {
                                                me.getForm().findField('alamat_rumah').hide();
                                                me.getForm().findField('alamat_kantor').hide();
                                                me.getForm().findField('alamat_dokter').hide();
                                                Ext.getCmp('fostatushasil_dikirim_rumah').hide();
                                                Ext.getCmp('fostatushasil_dikirim_kantor').hide();
                                                Ext.getCmp('fostatushasil_dikirim_dokter').hide();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Diemail',
                                    name: 'fostatushasil',
                                    id: 'fostatushasil_diemail',
                                    width: 70,
                                    inputValue: 3,
                                    listeners: {
                                        change: function (rb, nv, ov, options) {
                                            if (Ext.getCmp('fostatushasil_diemail').getValue() === true) {
                                                me.getForm().findField('alamat_email').show();
                                            } else {
                                                me.getForm().findField('alamat_email').hide();
                                                me.getForm().findField('alamat_email').setValue('');
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Fax',
                                    name: 'fostatushasil',
                                    id: 'fostatushasil_fax',
                                    width: 70,
                                    inputValue: 4,
                                    listeners: {
                                        change: function (rb, nv, ov, options) {
                                            if (Ext.getCmp('fostatushasil_fax').getValue() === true) {
                                                me.getForm().findField('alamat_fax').show();
                                            } else {
                                                me.getForm().findField('alamat_fax').hide();
                                                me.getForm().findField('alamat_fax').setValue('');
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'SMS',
                                    width: 70,
//                                    hidden: true,
                                    name: 'fostatushasil',
                                    id: 'fostatushasil_sms',
                                    inputValue: 5,
                                    listeners: {
                                        change: function (rb, nv, ov, options) {
                                            if (Ext.getCmp('fostatushasil_sms').getValue() === true) {
                                                me.getForm().findField('alamat_sms').show();
                                            } else {
                                                me.getForm().findField('alamat_sms').hide();
                                                me.getForm().findField('alamat_sms').setValue('');
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            columns: 5,
                            allowBlank: false,
                            items: [
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Rumah',
                                    width: 80,
                                    id: 'fostatushasil_dikirim_rumah',
                                    inputValue: 1,
                                    hidden: true,
                                    checked: true,
                                    listeners: {
                                        change: function (rb, nv, ov, options) {
                                            if (Ext.getCmp('fostatushasil_dikirim_rumah').getValue() === true) {
                                                me.getForm().findField('alamat_rumah').show();
                                                me.getForm().findField('alamat_rumah').setValue(me.getForm().findField('alamat').getValue() + '-' + me.getForm().findField('kota').getValue());
                                                var grid = Ext.getCmp('masteridgrid');
//                                                var cek1 = grid.getStore().findRecord('kode_pemeriksaan', '603001');
//                                                console.log(cek1);
//                                                var cek2 = grid.getStore().findRecord('kode_pemeriksaan', '603002');
//                                                Ext.Msg.alert('Warning', 'test');
//                                                if (cek1 == null) {
//                                                    Ext.Msg.alert('Warning', 'Item Pengantaran Hasil HARUS dimasukkan ....!!!');
//                                                    Ext.getCmp('fostatushasil_dikirim_rumah').setValue(false);
//                                                }
//                                                if (cek2 == null) {
//                                                    Ext.Msg.alert('Warning', 'Item Pengantaran Hasil HARUS dimasukkan ....!!!');
//                                                    Ext.getCmp('fostatushasil_dikirim_rumah').setValue(false);
//                                                }
                                            } else {
                                                me.getForm().findField('alamat_rumah').hide();
                                            }
                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Kantor',
                                    width: 90,
                                    id: 'fostatushasil_dikirim_kantor',
                                    inputValue: 2,
                                    hidden: true,
                                    listeners: {
                                        change: function (rb, nv, ov, options) {
                                            if (Ext.getCmp('fostatushasil_dikirim_kantor').getValue() === true) {
                                                me.getForm().findField('alamat_kantor').show();
                                            } else {
                                                me.getForm().findField('alamat_kantor').hide();
                                            }
                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Dokter',
                                    width: 90,
                                    id: 'fostatushasil_dikirim_dokter',
                                    inputValue: 3,
                                    hidden: true,
                                    listeners: {
                                        change: function (rb, nv, ov, options) {
                                            if (Ext.getCmp('fostatushasil_dikirim_dokter').getValue() === true) {
                                                me.getForm().findField('alamat_dokter').show();
                                            } else {
                                                me.getForm().findField('alamat_dokter').hide();
                                            }
                                        }
                                    }
                                },
                            ]},
//                            ],
//                            listeners: {
//                                change: function (rb, nv, ov, options) {
//                                    var hasildikirim = me.getForm().findField('fohasildikirim').getGroupValue();
//                                    if (hasildikirim === 1) {
//                                        me.getForm().findField('alamat_rumah').show();
//                                        me.getForm().findField('alamat_rumah').setValue(me.getForm().findField('alamat').getValue() + '-' + me.getForm().findField('kota').getValue());
//                                        me.getForm().findField('alamat_kantor').hide();
////                                        me.getForm().findField('alamat_kantor').setValue('');
//                                        me.getForm().findField('alamat_dokter').hide();
////                                        me.getForm().findField('alamat_dokter').setValue('');
//                                    } else if (hasildikirim === 2) {
//                                        me.getForm().findField('alamat_kantor').show();
//                                        me.getForm().findField('alamat_rumah').hide();
////                                        me.getForm().findField('alamat_rumah').setValue('');
//                                        me.getForm().findField('alamat_dokter').hide();
////                                        me.getForm().findField('alamat_dokter').setValue('');
//                                    } else if (hasildikirim === 3) {
//                                        me.getForm().findField('alamat_dokter').show();
//                                        me.getForm().findField('alamat_rumah').hide();
////                                        me.getForm().findField('alamat_rumah').setValue('');
//                                        me.getForm().findField('alamat_kantor').hide();
////                                        me.getForm().findField('alamat_kantor').setValue('');
//                                    }
//                                }
//                            }
//                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Rumah ',
                            name: 'alamat_rumah',
                            height: 35,
                            width: 340,
                            hidden: true
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Kantor ',
                            name: 'alamat_kantor',
                            height: 35,
                            width: 340,
                            hidden: true
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Dokter ',
                            name: 'alamat_dokter',
                            height: 35,
                            width: 340,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Email ',
                            name: 'alamat_email',
                            width: 300,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Fax ',
                            name: 'alamat_fax',
                            width: 300,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Hp ',
                            name: 'alamat_sms',
                            width: 300,
                            hidden: true
                        },
                    ]},
                {
                    xtype: 'fieldset',
                    margin: '0 0 2 2',
                    width: 450,
                    title: '<b>Discount</b> ',
                    items: [
                        {
                            xtype: 'checkbox',
                            fieldLabel: '<b>Ya</b> ',
                            labelWidth: 50,
                            name: 'cek_discount',
                            width: 80,
                            inputValue: 1,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    if (newValue === true) {
                                        me.getForm().findField('jenis_discount').show();
                                        me.getForm().findField('info_discount').hide();
                                        me.getForm().findField('discount_rupiah').hide();
                                        me.getForm().findField('discount_persen').hide();
//                                        me.down('#itemIdPendaftaranDiscountRp').hide();
                                        me.getForm().findField('discount_persen').hide();
                                        me.getForm().findField('discount_rupiah').hide();
                                        me.down('#ButtonWinCekDiscount').hide();
                                        me.down('#verifikasipemberidiscount').hide();
                                    } else {
                                        me.getForm().findField('jenis_discount').hide();
                                        me.getForm().findField('info_discount').hide();
                                        me.getForm().findField('discount_rupiah').hide();
                                        me.getForm().findField('discount_persen').hide();
//                                        me.down('#itemIdPendaftaranDiscountRp').hide();
                                        me.getForm().findField('discount_persen').hide();
                                        me.getForm().findField('discount_rupiah').hide();
                                        me.down('#ButtonWinCekDiscount').hide();
                                        me.down('#verifikasipemberidiscount').hide();
                                        me.getForm().findField('jenis_discount').setValue();
                                        me.getForm().findField('info_discount').setValue();
                                        me.getForm().findField('discount_rupiah').setValue();
                                        me.getForm().findField('discount_persen').setValue();
                                        var jumlah = Ext.getCmp('masteridgrid').getStore().getCount()
                                        var discount = 0;
                                        for (var i = 0; i < jumlah; i++) {
                                            Ext.getCmp('masteridgrid').getStore().getAt(i).set('diskon_pemeriksaan', discount);
                                        }
                                        me.getForm().findField('discount_persen').setValue(discount);
                                        Ext.getCmp('pasien_uang').setValue('');
                                        Ext.getCmp('kembali').setValue('');
                                    }
                                }
                            }
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
                                    name: 'jenis_discount',
                                    allowBlank: true,
                                    editable: false,
                                    fieldLabel: 'Jenis Discount',
                                    width: 220,
                                    hidden: true,
                                    store: new Ext.data.SimpleStore({
                                        id: 0,
                                        fields: [
                                            'typeCode', //numeric value is the key
                                            'type' //the text value is the value
                                        ],
                                        data: [
                                            ['hut', 'HUT'],
                                            ['hkn', 'HKN'],
                                            ['keluarga', 'Keluarga Karyawan'],
                                            ['dokter', 'Dokter'],
                                            ['keluarga rekanan', 'Keluarga Rekanan'],
                                            ['voucher', 'Voucher'],
                                            ['member priority', 'Member Priority'],
                                            ['hari ibu', 'Hari Ibu'],
                                            ['promo', 'Promo'],
                                        ]
                                    }),
                                    listeners: {
                                        change: function (field, newValue, oldValue) {
                                            if (newValue === 'hut' || newValue === 'hkn') {
                                                me.getForm().findField('info_discount').show();
                                                me.getForm().findField('discount_rupiah').setValue('');
                                                me.getForm().findField('discount_rupiah').show();
                                                me.getForm().findField('discount_persen').setValue('');
                                                me.getForm().findField('discount_persen').show();
//                                                me.down('#itemIdPendaftaranDiscountRp').show();
                                                me.getForm().findField('discount_persen').show();
                                                me.getForm().findField('discount_rupiah').show();
                                                me.down('#ButtonWinCekDiscount').hide();
                                                me.down('#verifikasipemberidiscount').hide();
                                            } else {
                                                me.getForm().findField('info_discount').hide();
//                                                me.down('#itemIdPendaftaranDiscountRp').hide();
                                                me.getForm().findField('discount_persen').hide();
                                                me.getForm().findField('discount_rupiah').hide();
                                                me.down('#ButtonWinCekDiscount').show();
                                                me.down('#verifikasipemberidiscount').show();
                                                me.down('#verifikasipemberidiscount').setText();
                                                me.getForm().findField('idpersetujuandisc').setValue('');
                                                me.getForm().findField('discount_rupiah').hide();
                                                me.getForm().findField('discount_rupiah').setValue('');
                                                me.getForm().findField('discount_persen').setValue('');
                                                me.getForm().findField('discount_persen').hide();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    displayField: 'type',
                                    valueField: 'typeCode',
                                    queryMode: 'local',
                                    name: 'info_discount',
                                    hidden: true,
                                    allowBlank: true,
                                    editable: false,
                                    fieldLabel: 'Info Dari',
                                    width: 200,
                                    store: new Ext.data.SimpleStore({
                                        id: 0,
                                        fields: [
                                            'typeCode', //numeric value is the key
                                            'type' //the text value is the value
                                        ],
                                        data: [
                                            ['sms', 'SMS'],
                                            ['flayer', 'Flayer'],
                                            ['banner', 'Banner'],
                                            ['sosmed', 'Sosmed']
                                        ]
                                    })
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    align: 'center',
                                    margin: '2 20 2 20',
                                    text: 'Persetujuan ',
                                    iconCls: 'icon-btn-discount',
                                    action: 'ActionWinCekDiscount',
                                    itemId: 'ButtonWinCekDiscount',
                                    hidden: true
                                },
                                {
                                    xtype: 'tbtext',
                                    itemId: 'verifikasipemberidiscount',
                                    text: '-',
                                    style: 'color: blue;',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '-',
                                    name: 'idpersetujuandisc',
                                    hidden: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            itemId: 'itemIdPendaftaranDiscountRp',
//                            hidden: true,
                            items: [
                                // Selain Bandung
                                {
                                    xtype: 'textfield',
                                    width: 220,
                                    fieldLabel: 'Rp   ',
                                    value: '0',
                                    name: 'discount_rupiah',
                                    hidden: true,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (form, e) {
                                            if (e.getKey() === 13) {

                                                var grid = Ext.getCmp('masteridgrid');
                                                // Looping Grid Sek (Di Kurangi Obat dan Jasmed)
                                                var hrg_bruto = 0;
                                                grid.getStore().each(function (record) {
                                                    // Cek Group/Type 6 (Pengantaran / Home Service) Tidak Di Discount 
                                                    if (record.get('id_type') !== 6) {
                                                        hrg_bruto += Number(record.get('harga_pemeriksaan'));
                                                    }

                                                });
                                                // Proses Diskon
                                                var discount_total = 0;
                                                var kurang_bayar = 0;
                                                grid.getStore().each(function (record) {
                                                    // Cek Group/Type 6 (Pengantaran / Home Service) Tidak Di Discount 
                                                    if (record.get('id_type') !== 6) {
                                                        var rp_discount = (Number(record.get('harga_pemeriksaan'))) / hrg_bruto * form.getValue();
                                                        var discount = (rp_discount / (Number(record.get('harga_pemeriksaan')))) * 100;
                                                        record.set('diskon_pemeriksaan', discount);
                                                        record.set('netto_pemeriksaan', Number(record.get('harga_pemeriksaan')) - rp_discount);
                                                        discount_total = discount;
                                                        kurang_bayar += record.get('harga_pemeriksaan') - rp_discount;
                                                    } else {
                                                        kurang_bayar += record.get('harga_pemeriksaan');
                                                    }

                                                });
                                                me.getForm().findField('discount_persen').setValue(discount_total);
                                                Ext.getCmp('dibayar').setValue('0');
                                                Ext.getCmp('kurang_bayar').setValue(me.getForm().findField('jumlah_netto').getValue());
                                                Ext.getCmp('pasien_uang').setValue('0');
                                                Ext.getCmp('kembali').setValue('0');
                                            }
                                        }
                                    }
                                },
                                // Bandung
//                                {
//                                    xtype: 'textfield',
//                                    width: 220,
//                                    fieldLabel: 'Rp   ',
//                                    value: '0',
//                                    name: 'discount_rupiah',
//                                    hidden: true,
//                                    enableKeyEvents: true,
//                                    listeners: {
//                                        keyup: function (form, e) {
//                                            if (e.getKey() === 13) {
//                                                var grid = Ext.getCmp('masteridgrid');
//                                                // Looping Grid Sek (Di Kurangi Obat dan Jasmed)
//                                                var hrg_bruto = 0;
//                                                grid.getStore().each(function (record) {
//                                                    // Cek Group/Type 6 (Pengantaran / Home Service) Tidak Di Discount 
//                                                    if (record.get('id_type') !== 6) {
//                                                        hrg_bruto += record.get('harga_pemeriksaan') - record.get('jasmed') - record.get('obat');
//                                                    }
//
//                                                });
//                                                // Proses Diskon
//                                                var discount_total = 0;
////                                                var kurang_bayar = 0;
//                                                grid.getStore().each(function (record) {
//                                                    // Cek Group/Type 6 (Pengantaran / Home Service) Tidak Di Discount 
//                                                    if (record.get('id_type') !== 6) {
//                                                        var discount = (me.getForm().findField('discount_rupiah').getValue() / hrg_bruto) * 100;
//                                                        var harga_bersih = record.get('harga_pemeriksaan') - Number(record.get('jasmed')) - Number(record.get('obat'));
//                                                        var tidak_potong = (harga_bersih - (harga_bersih * record.get('diskon_pemeriksaan') / 100)) + Number(record.get('jasmed')) + Number(record.get('obat'));
//                                                        record.set('diskon_pemeriksaan', discount);
//                                                        record.set('netto_pemeriksaan', tidak_potong);
//                                                        discount_total = discount;
////                                                        kurang_bayar += record.get('harga_pemeriksaan') - tidak_potong;
//                                                    } else {
////                                                        kurang_bayar += record.get('harga_pemeriksaan');
//                                                    }
//                                                });
//                                                me.getForm().findField('discount_persen').setValue(discount_total);
//                                                Ext.getCmp('dibayar').setValue('0');
//                                                Ext.getCmp('kurang_bayar').setValue(me.getForm().findField('jumlah_netto').getValue());
//                                                Ext.getCmp('pasien_uang').setValue('0');
//                                                Ext.getCmp('kembali').setValue('0');
//                                            }
//                                        }
//                                    }
//                                },
                                {
                                    xtype: 'numberfield',
                                    width: 170,
                                    fieldLabel: '%   ',
                                    value: '0',
                                    name: 'discount_persen',
                                    hidden: true,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (form, e) {
                                            if (e.getKey() === 13) {
                                                var grid = Ext.getCmp('masteridgrid');
                                                // Looping Grid Sek (Di Kurangi Obat dan Jasmed)
                                                var hrg_bruto = 0;
                                                grid.getStore().each(function (record) {
                                                    // Cek Group/Type 6 (Pengantaran / Home Service) Tidak Di Discount 
                                                    if (record.get('id_type') !== 6) {
                                                        hrg_bruto += record.get('harga_pemeriksaan') - record.get('jasmed') - record.get('obat');
                                                    }

                                                });
                                                // Proses Diskon
                                                var kurang_bayar = 0;
                                                var rp_discount_total = 0;
                                                grid.getStore().each(function (record) {
                                                    // Cek Group/Type 6 (Pengantaran / Home Service) Tidak Di Discount 
                                                    if (record.get('id_type') !== 6) {
                                                        var discount = form.getValue();
                                                        record.set('diskon_pemeriksaan', discount);

                                                        var harga = record.get('harga_pemeriksaan');
                                                        var potong = harga - (harga * record.get('diskon_pemeriksaan') / 100);
                                                        // Tidak Potong
                                                        var harga_bersih = record.get('harga_pemeriksaan') - Number(record.get('jasmed')) - Number(record.get('obat'));
                                                        var tidak_potong = (harga_bersih - (harga_bersih * record.get('diskon_pemeriksaan') / 100)) + Number(record.get('jasmed')) + Number(record.get('obat'));
//                                debugger;
                                                        // Umum
                                                        if (Ext.getCmp('daftar_tipekirim1').getValue() === true || Ext.getCmp('daftar_tipekirim2').getValue() === true) {
                                                            if (JASMED_UMUM === '1') {
                                                                record.set('netto_pemeriksaan', potong);
                                                                var rp_discount = record.get('harga_pemeriksaan') - potong;
                                                            } else {
                                                                record.set('netto_pemeriksaan', tidak_potong);
                                                                var rp_discount = record.get('harga_pemeriksaan') - tidak_potong;
                                                            }
                                                        } else if (Ext.getCmp('daftar_tipekirim3').getValue() === true || Ext.getCmp('daftar_tipekirim4').getValue() === true) {
                                                            // Rekanan
                                                            if (JASMED_REKANAN === '1') {
                                                                record.set('netto_pemeriksaan', potong);
                                                                var rp_discount = record.get('harga_pemeriksaan') - potong;
                                                            } else {
                                                                record.set('netto_pemeriksaan', tidak_potong);
                                                                var rp_discount = record.get('harga_pemeriksaan') - tidak_potong;
                                                            }
                                                        }
                                                        rp_discount_total += rp_discount;
                                                    } else {
                                                        kurang_bayar += record.get('harga_pemeriksaan');
                                                    }

                                                });
                                                me.getForm().findField('discount_rupiah').setValue(rp_discount_total);
                                                Ext.getCmp('dibayar').setValue('0');
                                                Ext.getCmp('kurang_bayar').setValue(me.getForm().findField('jumlah_netto').getValue());
                                                Ext.getCmp('pasien_uang').setValue('0');
                                                Ext.getCmp('kembali').setValue('0');
//                                                var jumlah = Ext.getCmp('masteridgrid').getStore().getCount()
//                                                for (var i = 0; i < jumlah; i++) {
//                                                    var record = Ext.getCmp('masteridgrid').getStore().getAt(i);
//                                                    record.set('diskon_pemeriksaan', form.getValue());
//                                                    var netto = record.get('harga_pemeriksaan') - (record.get('harga_pemeriksaan') * record.get('diskon_pemeriksaan') / 100);
//                                                    record.set('netto_pemeriksaan', netto);
//                                                }
//                                                var rupiah = me.getForm().findField('jumlah_bruto').getValue() - me.getForm().findField('jumlah_netto').getValue();
//                                                me.getForm().findField('discount_rupiah').setValue(rupiah);
//                                                Ext.getCmp('dibayar').setValue('');
//                                                Ext.getCmp('kurang_bayar').setValue('');
//                                                Ext.getCmp('pasien_uang').setValue('');
//                                                Ext.getCmp('kembali').setValue('');
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Keterangan ',
                            name: 'keterangan',
                            height: 35,
                            width: 400,
//                            labelWidth: 70,
//                            hidden: true
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    margin: '0 0 2 2',
                    width: 450,
                    title: '<b>Pembayaran</b> ',
                    items: [
                        {
                            xtype: 'radiogroup',
                            hideLabel: true,
                            width: 320,
                            items: [
                                {
                                    boxLabel: 'Tunai',
                                    width: 80,
                                    name: 'daftar_pembayaran',
                                    inputValue: 1,
                                    checked: true
                                },
                                {
                                    boxLabel: 'Ditagihkan',
                                    width: 90,
                                    name: 'daftar_pembayaran',
                                    inputValue: 2,
                                },
                                {
                                    boxLabel: 'Kartu Debet',
                                    width: 90,
                                    name: 'daftar_pembayaran',
                                    inputValue: 3,
                                },
                                {
                                    boxLabel: 'Kartu Kredit',
                                    width: 90,
                                    name: 'daftar_pembayaran',
                                    inputValue: 4,
                                },
                                {
                                    boxLabel: 'Transfer',
                                    width: 80,
                                    hidden: true,
                                    name: 'daftar_pembayaran',
                                    inputValue: 5,
                                }
                            ],
                            listeners: {
                                change: function (rb, nv, ov, options) {
                                    var status_kirim = me.getForm().findField('daftar_pembayaran').getGroupValue();
                                    // Kartu Debet
                                    if (status_kirim === 3) {
                                        var filterCollection = [];
                                        var statusFilter = new Ext.util.Filter({
                                            property: 'pendaftarancari_bank',
                                            value: status_kirim
                                        });
                                        filterCollection.push(statusFilter);
                                        Ext.getCmp('masteridmasterbank').getStore().clearFilter(true)
                                        Ext.getCmp('masteridmasterbank').getStore().filter(filterCollection);
                                        Ext.getCmp('masteridmasterbank').setValue('');
                                        me.getForm().findField('no_kartu').hide();
                                        me.getForm().findField('mesin_edc').show();
                                        me.getForm().findField('no_transaksi').hide();
                                        me.getForm().findField('alamat_email').hide();
                                        me.getForm().findField('dibayar').show();
                                        me.getForm().findField('pasien_uang').hide();
                                        me.getForm().findField('kembali').hide();
                                        me.getForm().findField('kurang_bayar').show();
                                        me.getForm().findField('daftar_penagihan1').hide();
                                        // Hidden Type Penagihan
                                        me.getForm().findField('nama_dokterpenagihan').hide();
                                        me.getForm().findField('kode_dokterpenagihan').hide();
                                        me.getForm().findField('kode_rekananpenagihan').hide();
                                        me.getForm().findField('nama_rekananpenagihan').hide();
                                        me.getForm().findField('kode_karyawan').hide();
                                        me.getForm().findField('jenis_kartu').hide()
                                        me.getForm().findField('nomor_edc').show()
                                    } else if (status_kirim === 4) {
                                        var filterCollection = [];
                                        var statusFilter = new Ext.util.Filter({
                                            property: 'pendaftarancari_bank',
                                            value: status_kirim
                                        });
                                        filterCollection.push(statusFilter);
                                        Ext.getCmp('masteridmasterbank').getStore().clearFilter(true)
                                        Ext.getCmp('masteridmasterbank').getStore().filter(filterCollection);
                                        Ext.getCmp('masteridmasterbank').setValue('');
                                        me.getForm().findField('no_kartu').hide();
                                        me.getForm().findField('mesin_edc').show();
                                        me.getForm().findField('no_transaksi').hide();
                                        me.getForm().findField('alamat_email').hide();
                                        me.getForm().findField('dibayar').show();
                                        me.getForm().findField('pasien_uang').hide();
                                        me.getForm().findField('kembali').hide();
                                        me.getForm().findField('kurang_bayar').show();
                                        me.getForm().findField('daftar_penagihan1').hide();
                                        // Hidden Type Penagihan
                                        me.getForm().findField('nama_dokterpenagihan').hide();
                                        me.getForm().findField('kode_dokterpenagihan').hide();
                                        me.getForm().findField('kode_rekananpenagihan').hide();
                                        me.getForm().findField('nama_rekananpenagihan').hide();
                                        me.getForm().findField('kode_karyawan').hide();
                                        me.getForm().findField('nomor_edc').show();
                                    } else if (status_kirim === 2) {
                                        me.getForm().findField('no_kartu').hide();
                                        me.getForm().findField('daftar_penagihan1').show();
                                        me.getForm().findField('mesin_edc').hide();
                                        me.getForm().findField('no_transaksi').hide();
                                        me.getForm().findField('alamat_email').hide();
                                        me.getForm().findField('dibayar').hide();
                                        me.getForm().findField('pasien_uang').hide();
                                        me.getForm().findField('kembali').hide();
                                        me.getForm().findField('kurang_bayar').hide();
                                        // Hidden Type Penagihan
                                        me.getForm().findField('nama_dokterpenagihan').hide();
                                        me.getForm().findField('kode_dokterpenagihan').hide();
                                        me.getForm().findField('kode_rekananpenagihan').hide();
                                        me.getForm().findField('nama_rekananpenagihan').hide();
                                        me.getForm().findField('nomor_edc').hide();
//                                        me.getForm().findField('kode_karyawan').hide();
                                    } else if (status_kirim === 5) {
                                        var filterCollection = [];
                                        var statusFilter = new Ext.util.Filter({
                                            property: 'pendaftarancari_bank',
                                            value: status_kirim
                                        });
                                        filterCollection.push(statusFilter);
                                        Ext.getCmp('masteridmasterbank').getStore().clearFilter(true)
                                        Ext.getCmp('masteridmasterbank').getStore().filter(filterCollection);
                                        Ext.getCmp('masteridmasterbank').setValue('');
                                        me.getForm().findField('no_kartu').hide();
                                        me.getForm().findField('mesin_edc').show();
                                        me.getForm().findField('no_transaksi').show();
                                        me.getForm().findField('alamat_email').hide();
                                        me.getForm().findField('dibayar').show();
                                        me.getForm().findField('pasien_uang').hide();
                                        me.getForm().findField('kembali').hide();
                                        me.getForm().findField('kurang_bayar').show();
                                        me.getForm().findField('daftar_penagihan1').hide();
                                        // Hidden Type Penagihan
                                        me.getForm().findField('nama_dokterpenagihan').hide();
                                        me.getForm().findField('kode_dokterpenagihan').hide();
                                        me.getForm().findField('kode_rekananpenagihan').hide();
                                        me.getForm().findField('nama_rekananpenagihan').hide();
                                        me.getForm().findField('kode_karyawan').hide();
                                        me.getForm().findField('jenis_kartu').hide();
                                        me.getForm().findField('nomor_edc').hide();
                                    } else {
                                        me.getForm().findField('no_kartu').hide();
                                        me.getForm().findField('mesin_edc').hide();
                                        me.getForm().findField('no_transaksi').hide();
                                        me.getForm().findField('alamat_email').hide();
                                        me.getForm().findField('dibayar').show();
                                        me.getForm().findField('pasien_uang').show();
                                        me.getForm().findField('kembali').show();
                                        me.getForm().findField('kurang_bayar').show();
                                        me.getForm().findField('daftar_penagihan1').hide();
                                        // Hidden Type Penagihan
                                        me.getForm().findField('nama_dokterpenagihan').hide();
                                        me.getForm().findField('kode_dokterpenagihan').hide();
                                        me.getForm().findField('kode_rekananpenagihan').hide();
                                        me.getForm().findField('nama_rekananpenagihan').hide();
                                        me.getForm().findField('kode_karyawan').hide();
                                        me.getForm().findField('nomor_edc').hide();

                                    }
                                }
                            }
                        },
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Netto (Rp) ',
                            name: 'jumlah_netto',
                            id: 'jumlah_netto',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            hideTrigger: true,
                            emptyText: "0,00",
                            readOnly: true,
                            hidden: true
                        }),
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Brutto (Rp) ',
                            name: 'jumlah_bruto',
                            id: 'jumlah_bruto',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            hideTrigger: true,
                            emptyText: "0,00",
                            readOnly: true,
                            hidden: true
                        }),
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Di Bayar ',
                            name: 'dibayar',
                            id: 'dibayar',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            hideTrigger: true,
                            emptyText: "0,00",
//                            hidden: true,
                            listeners: {
                                change: function (v, newValue) {
//                            me.getForm().findField('kembali').setValue(me.getForm().findField('pasien_uang').getValue() - me.getForm().findField('jumlah_netto').getValue());
                                    me.getForm().findField('kurang_bayar').setValue(me.getForm().findField('jumlah_netto').getValue() - me.getForm().findField('dibayar').getValue());
//                                    var form = me.getForm();
//                                    var hrg_net = form.findField('jumlah_netto').getValue() / 100 * 75,
//                                            hrg_byr = form.findField('dibayar').getValue();
//                                    if (Ext.getCmp('daftar_tipekirim1').getValue())
//                                        if (hrg_byr <= hrg_net) {
//                                            Ext.MessageBox.show({
//                                                title: 'Error',
//                                                msg: 'Pembayaran Minimal Harus 75% <br> ' + hrg_net,
//                                                buttons: Ext.MessageBox.OK,
//                                                icon: Ext.MessageBox.ERROR
//                                            });
//                                            Ext.getCmp('Button-SaveFoPedaftaran').setDisabled(false);
//                                            return;
//                                        }
                                }
                            }
                        }),
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Kurang Bayar ',
                            name: 'kurang_bayar',
                            id: 'kurang_bayar',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            hideTrigger: true,
                            emptyText: "0,00",
                            readOnly: true,
//                            hidden: true,
                        }),
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Uang ',
                            name: 'pasien_uang',
                            id: 'pasien_uang',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            hideTrigger: true,
                            emptyText: "0,00",
//                            hidden: true,
                            listeners: {
                                change: function (v, newValue) {
                                    me.getForm().findField('kembali').setValue(me.getForm().findField('pasien_uang').getValue() - me.getForm().findField('dibayar').getValue());
                                }
                            }
                        }),
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Kembali ',
                            name: 'kembali',
                            id: 'kembali',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            hideTrigger: true,
                            emptyText: "0,00",
                            readOnly: true,
//                            hidden: true,
                        }),
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Ref ',
                            name: 'no_kartu',
                            width: 340,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Transaksi ',
                            name: 'no_transaksi',
                            width: 340,
                            hidden: true
                        },
                        {
                            xtype: 'combobox',
                            emptyText: 'Pilih BANK',
                            fieldLabel: 'Bank EDC ',
                            name: 'mesin_edc',
                            width: 250,
                            displayField: 'nama_bank',
                            id: 'masteridmasterbank',
                            valueField: 'id',
                            queryMode: 'remote',
                            allowBlank: true,
                            editable: false,
                            hidden: true,
                            triggerAction: 'all',
                            valueNotFoundText: 'Tidak ada Data',
                            store: 'masterid.BankStore',
                            listeners: {
                                select: function (cmb, rec, opt) {
                                    var val = cmb.getValue(),
                                            filterCollection = [],
                                            filterCollection1 = [];
                                    var statusFilter = new Ext.util.Filter({
                                        property: 'pendaftarancari_bankjeniskartu',
                                        value: val
                                    });
                                    var form = me.getForm();
                                    if (val === 3 || val === 4) {
                                        filterCollection.push(statusFilter);
                                        form.findField('jenis_kartu').show();
                                        form.findField('jenis_kartu').getStore().clearFilter(true)
                                        form.findField('jenis_kartu').getStore().filter(filterCollection);
                                        form.findField('jenis_kartu').setValue('');
                                    } else {
                                        form.findField('jenis_kartu').hide()
                                    }

                                    var value = form.findField('mesin_edc').getValue() + '-' + 0;
                                    var statusFilter1 = new Ext.util.Filter({
                                        property: 'pendaftarancari_nomoredc',
                                        value: value
                                    });
                                    filterCollection1.push(statusFilter1);
                                    form.findField('nomor_edc').show();
                                    form.findField('nomor_edc').getStore().clearFilter(true)
                                    form.findField('nomor_edc').getStore().filter(filterCollection1);
                                    form.findField('nomor_edc').setValue('');
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            emptyText: 'Jenis Kartu',
                            fieldLabel: 'Jenis Kartu',
                            name: 'jenis_kartu',
                            width: 250,
                            displayField: 'jenis_kartu',
                            valueField: 'id',
                            queryMode: 'remote',
                            allowBlank: true,
                            editable: false,
                            hidden: true,
                            triggerAction: 'all',
                            valueNotFoundText: 'Tidak ada Data',
                            store: 'masterid.JenisKartuBankStore',
                            listeners: {
                                select: function (cmb, rec, opt) {
                                    var form = me.getForm();
                                    var val = cmb.getValue(),
                                            filterCollection = [];
                                    var value = form.findField('mesin_edc').getValue() + '-' + val;
                                    var statusFilter = new Ext.util.Filter({
                                        property: 'pendaftarancari_nomoredc',
                                        value: value
                                    });
                                    filterCollection.push(statusFilter);
                                    form.findField('nomor_edc').show();
                                    form.findField('nomor_edc').getStore().clearFilter(true)
                                    form.findField('nomor_edc').getStore().filter(filterCollection);
                                    form.findField('nomor_edc').setValue('');

                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            emptyText: 'Nomor EDC',
                            fieldLabel: 'Nomor EDC',
                            name: 'nomor_edc',
                            width: 250,
                            displayField: 'no_edc',
                            valueField: 'no_edc',
                            queryMode: 'remote',
                            allowBlank: true,
                            editable: false,
                            hidden: true,
                            triggerAction: 'all',
                            valueNotFoundText: 'Tidak ada Data',
                            store: 'masterid.NomorEDCStore',
                        },
                        {
                            xtype: 'radiogroup',
                            hideLabel: true,
                            name: 'daftar_penagihan1',
                            hidden: true,
                            width: 320,
                            items: [
                                {
                                    boxLabel: 'Dokter',
                                    width: 80,
                                    name: 'daftar_penagihan',
                                    inputValue: 2,
                                },
                                {
                                    boxLabel: 'Antar Lab',
                                    width: 90,
                                    name: 'daftar_penagihan',
                                    inputValue: 3,
                                },
                                {
                                    boxLabel: 'Rekanan',
                                    width: 90,
                                    name: 'daftar_penagihan',
                                    inputValue: 4,
                                },
                                {
                                    boxLabel: 'karyawan',
                                    width: 90,
                                    name: 'daftar_penagihan',
                                    inputValue: 5,
                                },
                            ],
                            listeners: {
                                change: function (rb, nv, ov, options) {
                                    var ditagihkan = me.getForm().findField('daftar_penagihan').getGroupValue();
                                    if (ditagihkan === 2) {
                                        me.getForm().findField('nama_dokterpenagihan').show();
                                        me.getForm().findField('kode_dokterpenagihan').show();
                                        me.getForm().findField('kode_rekananpenagihan').hide();
                                        me.getForm().findField('nama_rekananpenagihan').hide();
                                        me.getForm().findField('kode_rekananpenagihan').setValue('');
                                        me.getForm().findField('nama_rekananpenagihan').setValue('');
                                        me.getForm().findField('kode_karyawan').hide();
                                    } else if (ditagihkan === 3) {
                                        me.getForm().findField('nama_dokterpenagihan').hide();
                                        me.getForm().findField('kode_dokterpenagihan').hide();
                                        me.getForm().findField('nama_dokterpenagihan').setValue('');
                                        me.getForm().findField('kode_dokterpenagihan').setValue('');
                                        me.getForm().findField('kode_rekananpenagihan').show();
                                        me.getForm().findField('nama_rekananpenagihan').show();
                                        me.getForm().findField('kode_karyawan').hide();
                                    } else if (ditagihkan === 4) {
                                        me.getForm().findField('nama_dokterpenagihan').hide();
                                        me.getForm().findField('kode_dokterpenagihan').hide();
                                        me.getForm().findField('nama_dokterpenagihan').setValue('');
                                        me.getForm().findField('kode_dokterpenagihan').setValue('');
                                        me.getForm().findField('kode_rekananpenagihan').show();
                                        me.getForm().findField('nama_rekananpenagihan').show();
                                        me.getForm().findField('kode_karyawan').hide();
                                    } else if (ditagihkan === 5) {
                                        me.getForm().findField('nama_dokterpenagihan').hide();
                                        me.getForm().findField('kode_dokterpenagihan').hide();
                                        me.getForm().findField('nama_dokterpenagihan').setValue('');
                                        me.getForm().findField('kode_dokterpenagihan').setValue('');
                                        me.getForm().findField('kode_rekananpenagihan').hide();
                                        me.getForm().findField('nama_rekananpenagihan').hide();
                                        me.getForm().findField('kode_karyawan').show();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Dokter',
                                    emptyText: 'Ketik Nama',
                                    name: 'nama_dokterpenagihan',
                                    width: 300,
                                    labelWidth: 100,
                                    hidden: true,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (form, e) {
//                                            alert(e.getKey());
                                            if (e.getKey() === 112 || e.getKey() === 13) {
                                                var win = Ext.widget('masterid.listdokterpenagihanwin');
                                                Ext.getCmp('typeCariDokterPenagihan').setValue('upper(nama_dokter)');
                                                Ext.getCmp('textCariDokterPenagihan').setValue(form.getValue());
                                                var grid1 = Ext.getCmp('listdokterpenagihangrid'),
                                                        store1 = grid1.getStore(),
                                                        filterCollection = [];
                                                var statusFilter = new Ext.util.Filter({
                                                    property: 'pendaftaranpenagihan_master_dokter',
                                                    value: form.getValue()
                                                });
                                                filterCollection.push(statusFilter);
                                                store1.clearFilter(true);
                                                store1.filter(filterCollection);
//
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    width: 70,
                                    name: 'kode_dokterpenagihan',
                                    hidden: true,
                                    readOnly: true,
                                }, {
                                    xtype: 'textfield',
                                    width: 70,
                                    name: 'id_dokterpenagihan',
                                    hidden: true,
                                    readOnly: true,
                                }, ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Rekanan',
                                    emptyText: 'Ketik Nama',
                                    name: 'nama_rekananpenagihan',
                                    width: 300,
                                    labelWidth: 100,
                                    hidden: true,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keyup: function (form, e) {
                                            if (e.getKey() === 112 || e.getKey() === 13) {
                                                var win = Ext.widget('masterid.listrekananpenagihanwin');
                                                Ext.getCmp('typeCariRekananPenagihan').setValue('upper(nama_rekanan)');
                                                Ext.getCmp('textCariRekananPenagihan').setValue(form.getValue());
                                                var grid1 = Ext.getCmp('listrekananpenagihangrid'),
                                                        store1 = grid1.getStore(),
                                                        filterCollection = [];
                                                var statusFilter = new Ext.util.Filter({
                                                    property: 'pendaftaranpenagihan_master_rekanan',
                                                    value: form.getValue()
                                                });
                                                filterCollection.push(statusFilter);
                                                store1.clearFilter(true);
                                                store1.filter(filterCollection);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    width: 70,
                                    name: 'kode_rekananpenagihan',
                                    hidden: true,
                                    readOnly: true,
                                }, {
                                    xtype: 'textfield',
                                    width: 70,
                                    name: 'id_rekananpenagihan',
                                    hidden: true,
                                    readOnly: true,
                                }, ]
                        },
                        {
                            xtype: 'combobox',
                            width: 300,
                            labelWidth: 120,
                            fieldLabel: 'Nama Karyawan',
                            queryMode: 'local',
                            allowBlank: false,
                            store: 'masterid.DaftarSdmStore',
                            emptyText: 'Nama Karyawan',
                            hideTrigger: true,
                            mode: 'remote',
                            minChars: 1,
                            displayField: 'mk_nama',
                            valueField: 'id',
                            name: 'kode_karyawan',
                            hidden: true,
                            listeners: {
                                select: function (cmb, rec, opt) {
                                    var val = cmb.getValue(),
                                            record = cmb.findRecordByValue(val);
                                    if (record) {
                                        //Disini
                                    }
                                }
                            }
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: 410,
                    itemId: 'biayaField',
                    items: [
                    ]
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Keluhan ',
                    margin: '0 0 5 20',
                    labelSeparator: "",
                    name: 'formanamnesa_keluhan',
                    hidden: true,
                    height: 45,
                },
                {
                    xtype: 'textareafield',
                    margin: '0 0 5 20',
                    labelSeparator: "",
                    fieldLabel: 'Jam Makan Terkahir ',
                    hidden: true,
                    name: 'formanamnesa_jammakan',
                    height: 45
                },
                {
                    xtype: 'textareafield',
                    margin: '0 0 5 20',
                    labelSeparator: "",
                    fieldLabel: ' Obat Yang dikonsumsi',
                    hidden: true,
                    name: 'formanamnesa_konsumsiobat',
                    height: 45
                },
                {
                    xtype: 'textareafield',
                    margin: '0 0 5 20',
                    fieldLabel: 'Riwayat Penyakit',
                    labelSeparator: "",
                    hidden: true,
                    name: 'formanamnesa_riwayatpenyakit',
                    height: 45
                },
                {
                    xtype: 'textareafield',
                    margin: '0 0 5 20',
                    fieldLabel: 'Riwayat Alergi',
                    labelSeparator: "",
                    hidden: true,
                    name: 'formanamnesa_riwayatalergi',
                    height: 45
                },
                {
                    xtype: 'textareafield',
                    margin: '0 0 5 20',
                    fieldLabel: 'Penyakit Keluarga',
                    labelSeparator: "",
                    hidden: true,
                    name: 'formanamnesa_penyakitkeluarga',
                    height: 45
                },
                {
                    xtype: 'textareafield',
                    margin: '0 0 5 20',
                    fieldLabel: 'IdTRX Pas Temp',
                    labelSeparator: "",
                    hidden: true,
                    name: 'idtrx_pas',
                    height: 45
                },
                {
                    xtype: 'masterid.listpersyaratanpaketgrid',
                    width: 320,
                    height: 320,
                    hidden: true,
                },
            ],
            bbar: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    margin: '2 0 2 10',
                    text: '  Baru   ',
                    iconCls: 'icon-btn-clear',
                    action: 'NewPdftrn',
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    margin: '2 0 2 10',
                    text: '  Simpan   ',
                    iconCls: 'icon-btn-save',
                    action: 'SavePdftrn',
                    id: 'Button-SaveFoPedaftaran'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    margin: '2 0 2 10',
                    text: '  Persetujuan   ',
                    iconCls: 'icon-btn-discount',
                    handler: function () {
                        var winapprove = Ext.widget('masterid.foapprovebelumbayarwin');
                    }
                },
                {
                    xtype: 'tbtext',
                    itemId: 'approve_bayarkurang',
                    text: '',
                    style: 'color: blue;',
                    hidden: true
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: '<b>Ya</b> ',
                    labelWidth: 50,
                    name: 'cek_approve_bayarkurang',
                    width: 80,
                    hidden: true,
                    inputValue: 1,
                },
                {
                    xtype: 'textfield',
                    margin: '0 0 5 20',
                    fieldLabel: 'Approve',
                    labelSeparator: "",
                    hidden: true,
                    name: 'id_approve_bayarkurang',
                    height: 45
                },
//                {
//                    xtype: 'button',
//                    ui: 'blue-button',
//                    align: 'center',
//                    margin: '2 0 2 10',
//                    text: '  Sementara   ',
//                    iconCls: 'icon-btn-sementara',
//                    action: 'SavePdftrn',
//                    id: 'Button-SementaraFoPedaftaran'
//                },
//                {
//                    xtype: 'button',
//                    ui: 'blue-button',
//                    align: 'center',
//                    margin: '2 0 2 10',
//                    text: ' Nota ',
//                    iconCls: 'icon-btn-print',
//                    action: 'PrintNotaPdftrn',
//                },
//                {
//                    xtype: 'button',
//                    ui: 'blue-button',
//                    align: 'center',
//                    margin: '2 0 2 10',
//                    text: ' Kartu Kontrol ',
//                    iconCls: 'icon-btn-print',
//                    action: 'PrintNotaPdftrn',
//                },
            ]
        });
        me.callParent(arguments);
    },
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */