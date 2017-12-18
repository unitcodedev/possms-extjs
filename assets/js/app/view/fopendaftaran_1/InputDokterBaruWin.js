/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.InputDokterBaruWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.inputdokterbaruwin',
    itemId: 'pendaftaraninputdokterbaruwin',
    ui: 'blue-window',
    title: 'FORM TAMBAH DOKTER',
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
                    itemId: 'formActionTambahDokterBaru',
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
                            fieldLabel: 'Gelar Depan ',
                            name: 'gelar_depan',
                            width: 340,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nama ',
                            name: 'nama_dokter',
                            width: 340,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Gelar belakang ',
                            name: 'gelar_belakang',
                            width: 340,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No HP ',
                            name: 'no_hp',
                            width: 250,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Telp ',
                            name: 'no_telp',
                            width: 250,
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Alamat ',
                            name: 'alamat',
                            height: 50,
                            width: 340,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kota ',
                            name: 'kota',
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
                    itemId: 'ButtonSimpanDokterBaru'
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