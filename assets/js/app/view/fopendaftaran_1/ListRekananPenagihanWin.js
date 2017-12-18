/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListRekananPenagihanWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.listrekananpenagihanwin',
    itemId: 'listrekananpenagihanwin',
    id: 'listrekananpenagihanwin',
    ui: 'blue-window',
    title: '<b>Pencarian Data Rekanan Penagihan</b>',
    width: 800,
    height: 400,
    resizable: false,
    border: true,
    autoScroll: true,
    autoShow: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            {
                xtype: 'form',
                itemId:'formListRekananPenagihan',
                id:'formListRekananPenagihan',
                bodyPadding: 10,
                fieldDefaults: {
                    width: 300,
                    labelAlign: 'right',
                    labelWidth: 110,
                    msgTarget: 'side'
                },
                items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama ',
                    name: 'nama_cari',
                    hidden: true
                },
                {
                    xtype: 'fopendaftaran.listrekananpenagihangrid',
                    width: 770,
                    height: 325,
                },
                ]
            }
                
            ],
            buttons: [
        //            {
        //                text: 'Simpan',
        //                scope: this,
        //                iconCls: 'icon-btn-save',
        //                itemId: 'listrekananpenagihanwin_simpan'
        //            }
        ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */