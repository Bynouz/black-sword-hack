export default class ConsumableSheet extends ItemSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes:  ["bsh", "bsh-sheet", "bsh-consumable", "sheet"],
            height:   450,
            width:    600,
            template: "systems/black-sword-hack/templates/sheets/consumable-sheet.html"
        });
    }

    get template() {
        return "systems/black-sword-hack/templates/sheets/consumable-sheet.html";
    }

    // V14 : getData() retourne item et item.system directement
    getData() {
        const context         = super.getData();
        context.configuration = CONFIG.configuration;
        context.item          = this.item;
        context.system        = this.item.system;
        return context;
    }
}
