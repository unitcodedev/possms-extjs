/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.controller.GetMasterID', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'masterid.MasterJenjangStore',
        'masterid.MasterJenjangDetailStore',
        'masterid.MasterIDDetailStore',
    ],
    views: [
        'masterid.GetMasterID',
        'masterid.MasterIDForm',
        'masterid.MasterJenjangGrid',
        'masterid.MasterJenjangDetailGrid',
        'masterid.MasterUangSekolahDetailGrid',
        'masterid.MasterUangSekolahGrid',
        'masterid.MasteMapelGrid',
        'masterid.MastePekerjaanGrid',
        'masterid.MasterJabatanGrid',
        'masterid.MasterJabatanDetailGrid',
        'masterid.MasterIDDetailGrid',
        'masterid.MasterIDAddWin',
        'masterid.MasterIDAddDetailWin',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */