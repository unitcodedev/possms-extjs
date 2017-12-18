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
    defaults: {
        border: true,
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master');
        Ext.applyIf(me, {
            items: [
                Ext.create(Ext.tab.Panel, {
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
                            title: "Jenjang",
                            defaults: {
                                border: true,
                                split: true
                            },
                            items: [
                                {
                                    xtype: "masterid.masterjenjanggrid",
                                    region: "west",
                                    title: "Jenjang",
                                    width: '35%',
                                    autoHeight: true,
                                    height: "75%",
                                    listeners: {
                                        selectionchange: function (m, r, e) {
                                            var grid = me.down('#masterjenjangdetailgrid'),
                                                    store = grid.getStore(),
                                                    filterCollection = [];
                                            var statusFilter = new Ext.util.Filter({
                                                property: 'fiilter',
                                                value: r[0].get('mj_id')
                                            });
                                            filterCollection.push(statusFilter);
                                            store.clearFilter(true);
                                            store.filter(filterCollection);
                                        }
                                    }
                                },
                                {
                                    xtype: "masterid.masterjenjangdetailgrid",
                                    region: "center",
                                    itemId: 'masterjenjangdetailgrid',
                                    title: "Detail Jenjang",
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
                            title: "Uang Sekolah",
                            defaults: {
                                border: true,
                                split: true
                            },
                            items: [
                                {
                                    xtype: "masterid.masteruangsekolahgrid",
                                    region: "west",
                                    title: "Uang Sekolah Group",
                                    width: '35%',
                                    autoHeight: true,
                                    height: "75%",
                                    listeners: {
                                        selectionchange: function (m, r, e) {
                                            var grid = me.down('#masterjenjangdetailgrid'),
                                                    store = grid.getStore(),
                                                    filterCollection = [];
                                            var statusFilter = new Ext.util.Filter({
                                                property: 'fiilter',
                                                value: r[0].get('mj_id')
                                            });
                                            filterCollection.push(statusFilter);
                                            store.clearFilter(true);
                                            store.filter(filterCollection);
                                        }
                                    }
                                },
                                {
                                    xtype: "masterid.masteruangsekolahdetailgrid",
                                    region: "center",
                                    itemId: 'masteruangsekolahdetailgrid',
                                    title: "Uang Sekolah Detail",
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
                            title: "Jabatan",
                            defaults: {
                                border: true,
                                split: true
                            },
                            items: [
                                {
                                    xtype: "masterid.masterjabatangrid",
                                    region: "center",
                                    title: "Jabatan",
//                                    width: '35%',
                                    autoHeight: true,
                                    height: "75%",
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
                            title: "Pekerjaan",
                            defaults: {
                                border: true,
                                split: true
                            },
                            items: [
                                {
                                    xtype: "masterid.mastepekerjaangrid",
                                    region: "center",
                                    title: "Pekerjaan",
//                                    width: '35%',
                                    autoHeight: true,
                                    height: "75%",
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
                            title: "Mata Pelajaran",
                            defaults: {
                                border: true,
                                split: true
                            },
                            items: [
                                {
                                    xtype: "masterid.mastemapelgrid",
                                    region: "center",
                                    title: "Mata Pelajaran",
//                                    width: '35%',
                                    autoHeight: true,
                                    height: "75%",
                                },
                            ],
                        },
                    ]
                }
                )
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */