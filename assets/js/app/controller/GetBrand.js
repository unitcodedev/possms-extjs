Ext.define('SIForLaP.controller.GetBrand', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'ms_brand.s_brand',
    ],
    views: [
        'v_brand.GetBrand',
        'v_brand.brandGrid',
    ],
    refs: [
    ],
    init: function () {
        this.control({
        }
        )
    },
});