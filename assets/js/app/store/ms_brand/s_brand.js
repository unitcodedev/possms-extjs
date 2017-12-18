var s_brand = Ext.define('SIForLaP.model.s_brand', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Kode', type: 'string'},
        {name: 'Keterangan', type: 'string'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.ms_brand.s_brand', {
    extend: 'Ext.data.Store',
    alias: 'store.ms_brand.brand_store',
    model: s_brand,
    remoteFilter: true,
    autoLoad : true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'Brand/listBrand',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});