/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListDokterPenagihanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fopendaftaran.listdokterpenagihangrid',
    itemId: 'listdokterpenagihangrid',
    id: 'listdokterpenagihangrid',
    ui: 'black-panel',
    autoScroll: true,
//    title: 'CARI Dokter',
    forceFit: true,
    store: 'fopendaftaran.MasterDokterPenagihanStore',
    columnLines: true,
    flex: 1,
    border: true,
    initComponent: function () {
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
                    itemId: 'pendaftarancaridokterpenagihan_datapusat',
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
                    id: 'typeCariDokterPenagihan',
                    name: 'typeCariDokterPenagihan',
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
                            ['kode_dokter', 'Kode'],
                            ['upper(nama_dokter)', 'Nama'],
                        ]
                    })
                },
                {
                    xtype: 'textfield',
                    margin: '10 5 10 5',
                    allowBlank: false,
                    itemId: 'textCariDokterPenagihan',
                    id: 'textCariDokterPenagihan',
                    width: 200,
                    //                    readOnly: true
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Cari',
                    iconCls: 'icon-btn-search',
                    action: 'CariDokterPenagihan'
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
                    dataIndex: 'kode_dokter',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Gelar<br>Depan',
                    dataIndex: 'gelar_depan',
                },
                {
                    xtype: 'gridcolumn',
                    width: 180,
                    text: 'Nama',
                    dataIndex: 'nama_dokter',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Gelar<br>Belakang',
                    dataIndex: 'gelar_belakang',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Alamat',
                    dataIndex: 'alamat_dokter',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kota',
                    dataIndex: 'kota_dokter',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Contact Dokter',
                    dataIndex: 'cp_dokter',
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
//                store: 'fopendaftaran.MasterDokterStore',
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