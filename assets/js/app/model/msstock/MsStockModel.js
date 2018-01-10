Ext.define('SIForLaP.model.msstock.MsStockModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'Kode', type: 'int'},
        {name: 'Nama', type: 'string'},
        {name: 'Satuan1', type: 'string'},
        {name: 'Satuan2', type: 'string'},
        {name: 'Satuan3', type: 'string'},
        {name: 'JmlSat1', type: 'string'},
        {name: 'JmlSat2', type: 'string'},
        {name: 'Keterangan', type: 'string'},
        {name: 'Merk', type: 'int'},
        {name: 'Golongan', type: 'int'},
    ],
    idProperty: 'id'
});
