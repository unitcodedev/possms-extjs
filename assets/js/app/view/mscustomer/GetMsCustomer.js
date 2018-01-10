Ext.define('SIForLaP.view.mscustomer.GetMsCustomer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mscustomer.getmscustomer',
    itemId: 'getmscustomer',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Customer',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Customer');
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
                                    xtype: 'mscustomer.mscustomergrid',
                                    width: 690,
                                    height: 450,
                                    title: 'Master Customer',
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
            ]
        });

        me.callParent(arguments);
    }
});
