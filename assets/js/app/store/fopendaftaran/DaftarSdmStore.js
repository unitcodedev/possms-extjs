var DaftarSdm = Ext.define('SIForLaP.model.DaftarSdmModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'sdm_id', type: 'string'},
        {name: 'sdm_id_lama', type: 'string'},
        {name: 'mk_nama', type: 'string'},
        {name: 'mk_divisi', type: 'int'},
        {name: 'mk_jabatan', type: 'int'},
        {name: 'mk_posisi', type: 'int'},
        {name: 'mk_cabang', type: 'int'},
        {name: 'msd_nama', type: 'string'},
        {name: 'msj_nama', type: 'string'},
        {name: 'msp_nama', type: 'string'},
        {name: 'msc_nama', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.DaftarSdmStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.daftarsdmstore',
    model: DaftarSdm,
//    storeId: 'daftarsdmstore',
//    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'datamaster/list_sdm_new',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});