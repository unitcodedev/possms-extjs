/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.mssatuan.GetMsSatuan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mssatuan.getmssatuan',
    itemId: 'getmssatuan',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Satuan',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Satuan');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    xtype: 'fieldset',
                    region: 'center',
                    width: '100%',
                    border: false,
                    split: true,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    region: 'west',
                                    xtype: 'mssatuan.mssatuangrid',
                                    width: 425,
                                    height: 450,
                                    title: 'Master Satuan',
                                    margin: '1 4 4 4',
                                    ui: 'blue-panel',
                                    split: true,
                                    border: true,
                                },
//                                                       
                            ]
                        }
                    ]
                },
//                {
//                    region: 'center',
//                    xtype: 'mskota.mskotagrid',
//                    layout: 'fit',
//                    title: 'Master Customer',
//                    minWidth: 400,
//                    height: 300,
//                    split: true,
//                },
//                {
//                    region: 'east',
////                    xtype: 'mskota.mskotagrid',
//                    layout: 'fit',
////                    title: 'Master Customer',
//                    minWidth: 400,
//                    height: 300,
//                    split: true,
//                },
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */