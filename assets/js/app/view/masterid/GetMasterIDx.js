/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.masterid.GetMasterID', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.masterid.getmasterid',
    itemId: 'getmasterid',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master ID',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master ID');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                Ext.create(Ext.tab.Panel, {
//                    hidden : true,
                    region: 'center',
                    activeTab: 0,
                    defaults: {
                        bodyStyle: 'padding:10px'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyPadding: "2 0 0 0",
                            bodyStyle: "background: #E0E0E0",
                            border: false,
                            iconCls: 'icon-btn-list',
                            layout: "border",
                            title: "Uang Sekolah",
                            defaults: {
                                border: true,
                                split: true
                            },
                            items: [
                            ],
                        },
                        {
                            xtype: 'panel',
                            bodyPadding: "2 0 0 0",
                            bodyStyle: "background: #E0E0E0",
                            border: false,
                            iconCls: 'icon-btn-list',
                            layout: "border",
                            title: "Jenjang",
                            defaults: {
                                border: true,
                                split: true
                            },
                            items: [
//                                {
//                                    xtype: "masterid.masteriddetailgrid",
//                                    region: "west",
//                                    title: "Data Jenjang",
//                                    width: '35%',
//                                    autoHeight: true,
//                                    height: "75%",
//                                },
                                {
                                    xtype: "masterid.masteriddetailgrid",
                                    region: "center",
                                    title: "Detail Data Jenjang",
                                    height: "25%",
                                    border: true,
                                    split: true,
                                },
                            ],
                        },
                        {
                            xtype: 'panel',
                            bodyPadding: "2 0 0 0",
                            bodyStyle: "background: #E0E0E0",
                            border: false,
                            iconCls: 'icon-btn-list',
                            layout: "border",
                            title: "Posisi",
                            defaults: {
                                border: true,
                                split: true
                            },
                            items: [
//                                {
//                                    xtype: "plyrekapindividu.plyrekapindividugrid",
//                                    region: "west",
//                                    title: "Data Pasien",
//                                    width: '35%',
//                                    autoHeight: true,
//                                    height: "75%",
//                                },
//                                {
//                                    xtype: "plyrekapindividu.plyrekapindividuform",
//                                    region: "center",
//                                    title: "Data Rekap",
//                                    height: "25%",
//                                    border: true,
//                                    split: true,
//                                },
                            ],
                        },
                        {
                            xtype: 'panel',
                            bodyPadding: "2 0 0 0",
                            bodyStyle: "background: #E0E0E0",
                            border: false,
                            iconCls: 'icon-btn-list',
                            layout: "border",
                            title: "Mata Pelajaran",
                            defaults: {
                                border: true,
                                split: true
                            },
                            items: [
//                                {
//                                    xtype: "plyrekapindividu.plyrekapindividugrid",
//                                    region: "west",
//                                    title: "Data Pasien",
//                                    width: '35%',
//                                    autoHeight: true,
//                                    height: "75%",
//                                },
//                                {
//                                    xtype: "plyrekapindividu.plyrekapindividuform",
//                                    region: "center",
//                                    title: "Data Rekap",
//                                    height: "25%",
//                                    border: true,
//                                    split: true,
//                                },
                            ],
                        }
                    ]
                }
                ),
//                {
//                    region: 'north',
////                    xtype: 'masterid.masteridgrid',
//                    layout: 'fit',
//                    title: 'Master Barang',
//                    minWidth: 400,
//                    height: 300,
//                    split: true,
//                    listeners: {
//                        selectionchange: function (m, r, e) {
//                            var grid = me.down('#masteriddetailgrid');
//                            grid.getStore().load({
//                                params: {
//                                    kode_barang: r[0].get('kode_barang'),
//                                },
//                                scope: this
//                            });
//                        }
//                    }
//                },
//                {
//                    region: 'center',
//                    xtype: 'masterid.masteriddetailgrid',
//                    itemId: 'masteriddetailgrid',
//                    split: true,
//                    ui: 'blue-panel',
//                    title: 'Detail Barang',
//                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */