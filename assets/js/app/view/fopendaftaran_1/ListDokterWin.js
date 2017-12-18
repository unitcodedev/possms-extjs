/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListDokterWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.listdokterwin',
    itemId: 'listdokterwin',
    id: 'listdokterwin',
    ui: 'blue-window',
    title: 'PENCARIAN DATA DOKTER',
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
                itemId:'formListDokter',
                id:'formListDokter',
                bodyPadding: 10,
                fieldDefaults: {
                    width: 300,
                    labelAlign: 'right',
                    labelWidth: 110,
                    msgTarget: 'side'
                },
                items: [
                {
                    xtype: 'fopendaftaran.listdoktergrid',
                    width: 770,
                    height: 320,
                },
                ]
            }
                
            ],
            buttons: [
        //            {
        //                text: 'Simpan',
        //                scope: this,
        //                iconCls: 'icon-btn-save',
        //                itemId: 'listdokterwin_simpan'
        //            }
        ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */