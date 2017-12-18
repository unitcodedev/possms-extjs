/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListDokterGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fopendaftaran.listdoktergrid',
    itemId: 'listdoktergrid',
    id: 'listdoktergrid',
    ui: 'black-panel',
    autoScroll: true,
//    title: 'CARI Dokter',
//    forceFit: true,
    store: 'fopendaftaran.MasterDokterStore',
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
                    id: 'pendaftarancaridokterpengirim_datapusat',
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
                    id: 'typeCariDokter',
                    name: 'typeCariDokter',
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
                    itemId: 'textCariDokter',
                    id: 'textCariDokter',
                    width: 200,
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Cari',
                    iconCls: 'icon-btn-search',
                    action: 'CariDokter'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Tambah Dokter',
                    iconCls: 'icon-btn-add',
                    action: 'TambahDokterBaru'
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
                    width: 70,
                    text: 'Kode',
                    dataIndex: 'kode_dokter',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
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
                    width: 70,
                    text: 'Gelar<br>Belakang',
                    dataIndex: 'gelar_belakang',
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'Alamat 1',
                    dataIndex: 'md_alamat_praktek1',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kota 1',
                    dataIndex: 'md_kota_1',
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'Alamat 2',
                    dataIndex: 'md_alamat_praktek2',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kota 2',
                    dataIndex: 'md_kota_2',
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'Alamat 3',
                    dataIndex: 'md_alamat_praktek3',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kota 3',
                    dataIndex: 'md_kota_3',
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