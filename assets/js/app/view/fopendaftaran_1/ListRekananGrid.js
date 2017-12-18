/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListRekananGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fopendaftaran.listrekanangrid',
    itemId: 'listrekanangrid',
    id: 'listrekanangrid',
    ui: 'black-panel',
    autoScroll: true,
//    title: 'CARI Rekanan',
    forceFit: true,
    store: 'fopendaftaran.MasterRekananStore',
    columnLines: true,
    flex: 1,
    border: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Data Pusat ',
                    name: 'pendaftarancari_datapusat',
                    width: 150,
                    inputValue: 1,
                    id: 'pendaftarancarirekananpengirim_datapusat',
                },
            {
                xtype: 'combobox',
                displayField: 'type',
                valueField: 'typeCode',
                fieldLabel: 'Cari ',
                queryMode: 'local',
                margin: '10 5 10 5',
                labelWidth: 50,
                itemId: 'typeCariPaseien',
                id: 'typeCariRekanan',
                name: 'typeCariRekanan',
                allowBlank: true,
                editable: false,
                width: 150,
                store: new Ext.data.SimpleStore({
                    id: 0,
                    fields: [
                    'typeCode', //numeric value is the key
                    'type' //the text value is the value
                    ],
                    data: [
                    ['kode_rekanan', 'Kode'],
                    ['upper(nama_rekanan)', 'Nama'],
                    ]
                })
            },
            {
                xtype: 'textfield',
                margin: '10 5 10 5',
                allowBlank: false,
                itemId: 'textCariRekanan',
                id: 'textCariRekanan',
                width: 200,
            //                    readOnly: true
            },
            {
                xtype: 'button',
                ui: 'blue-button',
                text: 'Cari',
                iconCls: 'icon-btn-search',
                action: 'CariRekanan'
            },
            ],
            columns: [
            Ext.create('Ext.grid.RowNumberer'),
            {
                xtype: 'gridcolumn',
                width: 140,
                text: 'ID',
                dataIndex: 'id',
                hidden: true
            },
            {
                xtype: 'gridcolumn',
                width: 100,
                text: 'Kode',
                dataIndex: 'kode_rekanan',
                renderer: 'uppercase'
            },
            {
                xtype: 'gridcolumn',
                width: 180,
                text: 'Nama',
                dataIndex: 'nama_rekanan',
            },
            {
                xtype: 'gridcolumn',
                width: 100,
                text: 'Alamat',
                dataIndex: 'alamat_rekanan',
            },
            {
                xtype: 'gridcolumn',
                width: 100,
                text: 'Kota',
                dataIndex: 'kota_rekanan',
            },
            {
                xtype: 'gridcolumn',
                width: 100,
                text: 'Contact Rekanan',
                dataIndex: 'cp_rekanan',
            },
            {
                xtype: 'gridcolumn',
                width: 100,
                text: 'Contact HP',
                dataIndex: 'cp_telf',
            },
            ],
//            bbar: {
//                xtype: 'pagingtoolbar',
//                store: 'fopendaftaran.MasterRekananStore',
//                displayInfo: true,
//                displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
//                emptyMsg: "No records to display&nbsp;"
//            }
        });

        me.callParent(arguments);
    //        me.loadPage(1);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */