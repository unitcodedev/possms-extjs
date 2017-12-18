Ext.define('SIForLaP.model.mssatuan.MsSatuanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Kode', type: 'string'},
        {name: 'Keterangan', type: 'string'},
    ],
    idProperty: 'id'
});