/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.FoCariDataPasienFormWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.focaridatapasienformwin',
    itemId: 'focaridatapasienformwin',
    ui: 'blue-window',
    title: '<b>Pencarian Data Pasien</b>',
    iconCls: 'icon-btn-pasien',
    width: 630,
    height: 500,
    resizable: false,
    autoShow: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'FormFoCariDataPasien',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 350,
                        labelAlign: 'right',
                        labelWidth: 100,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    width: 200,
                                    labelWidth: 60,
                                    fieldLabel: '<b> No Lab <b>',
                                    margin: '0 5 0 5',
                                    name: 'no_lab'
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 5 0 5',
                                    ui: 'blue-button',
                                    text: 'Cari',
                                    iconCls: 'icon-btn-search',
                                    handler: function (grid, rowIndex, colIndex) {
                                        var form = me.down('#FormFoCariDataPasien');
                                        var grid = form.down('#grid_CariDataPasienPemeriksaan'),
                                                store = grid.getStore(),
                                                filterCollection = [];
                                        var statusFilter = new Ext.util.Filter({
                                            property: 'cari_datapasien_pemeriksaan',
                                            value: form.getForm().findField('no_lab').getValue()
                                        });
                                        filterCollection.push(statusFilter);
                                        store.clearFilter(true);
                                        store.filter(filterCollection);
                                    }
                                },
                            ]},
                        {
                            xtype: 'fopendaftaran.focaridatapasienpemeriksaangrid',
                            itemId: 'grid_CariDataPasienPemeriksaan',
                            width: 600,
                            height: 300
                        },
                    ]
                }

            ],
            buttons: [
                {
                    text: 'Copy PX',
                    scope: this,
                    iconCls: 'icon-btn-save',
                    handler: function (grid, rowIndex, colIndex) {
                        var grid = Ext.getCmp('fopendaftarangrid');
                        var box = Ext.MessageBox.show({
                            title: 'Tunggu',
                            msg: 'Proses Copy......!!!!',
                            wait: true,
                            waitConfig: {interval: 200},
                            animateTarget: 'waitButton',
                            buttonText: {
                                cancel: 'Batal'
                            }
                        });
                        me.down('#FormFoCariDataPasien').down('#grid_CariDataPasienPemeriksaan').getStore().each(function (record) {
                            var cek = grid.getStore().findRecord('kode_pemeriksaan', record.get('kode_pemeriksaan'));
                            if (cek !== null) {
                                Ext.Msg.alert('Warning', 'Pemeriksaan Sudah Ada');
                                return;
                            }
                            var rs = Ext.ModelManager.create({
                                kode_pemeriksaan: record.get('kode_pemeriksaan'),
                                nama_pemeriksaan: record.get('tp_namapemeriksaan'),
                                harga_pemeriksaan: record.get('tp_hargabruto'),
                                netto_pemeriksaan: record.get('tp_harganett'),
                                diskon_pemeriksaan: record.get('tp_discount')
                            }, 'SIForLaP.model.ListPemeriksaanModel');
                            grid.getStore().add(rs);
                        });
                        box.hide();
                        me.close();
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */