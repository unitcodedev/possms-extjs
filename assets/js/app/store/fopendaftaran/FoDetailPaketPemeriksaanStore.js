var FoDetailPaketPemeriksaanModel = Ext.define('SIForLaP.model.FoDetailPaketPemeriksaanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'id_type', type: 'int'},
        {name: 'kode_pemeriksaan', type: 'string'},
        {name: 'mspem_nama', type: 'string'},
        {name: 'rp_bruto', type: 'number'},
        {name: 'rp_netto', type: 'number'},
        {name: 'discount', type: 'number'},
        {name: 'jasmed', type: 'number'},
        {name: 'obat', type: 'number'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.FoDetailPaketPemeriksaanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.fodetailpaketpemeriksaanstore',
    model: FoDetailPaketPemeriksaanModel,
    storeId: 'fopendaftaranFoDetailPaketPemeriksaanStore',
    id: 'fopendaftaranFoDetailPaketPemeriksaanStore',
//    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_paket_detail',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});