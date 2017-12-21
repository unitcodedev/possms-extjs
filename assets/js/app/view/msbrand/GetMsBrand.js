/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.msbrand.GetMsBrand', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.msbrand.getmsbrand',
    itemId: 'getmsbrand',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Brand',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Brand');
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
                                    xtype: 'msbrand.msbrandgrid',
                                    width: 545,
                                    height: 450,
                                    title: 'Master Brand',
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
