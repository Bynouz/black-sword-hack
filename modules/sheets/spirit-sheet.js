export default class SpiritSheet extends ItemSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes:  ["bsh", "bsh-sheet", "bsh-spirit-sheet", "sheet"],
            height:   400,
            width:    550,
            template: "systems/black-sword-hack/templates/sheets/spirit-sheet.html"
        });
    }

    get template() {
        return "systems/black-sword-hack/templates/sheets/spirit-sheet.html";
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
