/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListDokterPenagihanWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.listdokterpenagihanwin',
    itemId: 'listdokterpenagihanwin',
    id: 'listdokterpenagihanwin',
    ui: 'blue-window',
    title: 'PENCARIAN DATA DOKTER PENAGIHAN',
    width: 800,
    height: 400,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            {
                xtype: 'form',
                itemId:'formListDokterPenagihan',
                id:'formListPenagihanDokter',
                bodyPadding: 10,
                fieldDefaults: {
                    width: 300,
                    labelAlign: 'right',
                    labelWidth: 110,
                    msgTarget: 'side'
                },
                items: [
                {
                    xtype: 'fopendaftaran.listdokterpenagihangrid',
                    width: 770,
                    height: 325,
                },
                ]
            }
                
            ],
            buttons: [
        ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */