export default class WeaponSheet extends ItemSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes:  ["bsh", "bsh-sheet", "bsh-weapon-sheet", "sheet"],
            height:   350,
            width:    500,
            template: "systems/black-sword-hack/templates/sheets/weapon-sheet.html"
        });
    }

    get template() {
        return "systems/black-sword-hack/templates/sheets/weapon-sheet.html";
    }

    // V14 : getData() retourne item et item.system directement
    getData() {
        const context        = super.getData();
        context.configuration = CONFIG.configuration;
        // Assurer la compatibilité des templates qui utilisent item.system
        context.item         = this.item;
        context.system       = this.item.system;
        return context;
    }
}
