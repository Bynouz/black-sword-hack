export default class SpellSheet extends ItemSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes:  ["bsh", "bsh-sheet", "bsh-spell-sheet", "sheet"],
            height:   400,
            width:    550,
            template: "systems/black-sword-hack/templates/sheets/spell-sheet.html"
        });
    }

    get template() {
        return "systems/black-sword-hack/templates/sheets/spell-sheet.html";
    }

    // V14 : getData() retourne item et item.system directement
    getData() {
        const context         = super.getData();
        context.configuration = CONFIG.configuration;
        context.item          = this.item;
        context.system        = this.item.system;
        context.disabled      = (this.item.system.state === "unavailable");
        return context;
    }
}
