/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.mskendaraan.GetMsKendaraan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mskendaraan.getmskendaraan',
    itemId: 'getmskendaraan',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Kendaraan',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Kendaraan');
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
                                    xtype: 'mskendaraan.mskendaraangrid',
                                    width: 465,
                                    height: 450,
                                    title: 'Master Kendaraan',
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
//                    xtype: 'msjenisusaha.msjenisusahagrid',
//                    layout: 'fit',
//                    title: 'Master Customer',
//                    minWidth: 400,
//                    height: 300,
//                    split: true,
//                },
//                {
//                    region: 'east',
////                    xtype: 'msjenisusaha.msjenisusahagrid',
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
