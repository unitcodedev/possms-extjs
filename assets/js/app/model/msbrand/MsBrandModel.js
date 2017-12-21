Ext.define('SIForLaP.model.msbrand.MsBrandModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Supplier', type: 'string'},
        {name: 'Kode', type: 'string'},
        {name: 'Keterangan', type: 'string'},
    ],
    idProperty: 'id'
});
