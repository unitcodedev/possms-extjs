Ext.define('SIForLaP.view.mssalesman.GetMsSalesman', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mssalesman.getmssalesman',
    itemId: 'getmssalesman',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Salesman',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Salesman');
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
                                    xtype: 'mssalesman.mssalesmangrid',
                                    width: 685,
                                    height: 450,
                                    title: 'Master Salesman',
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
//               
            ]
        });

        me.callParent(arguments);
    }
});
