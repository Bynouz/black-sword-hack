export default class CreatureActionSheet extends ItemSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes:  ["bsh", "bsh-sheet", "bsh-creature-action", "sheet"],
            height:   375,
            width:    750,
            template: "systems/black-sword-hack/templates/sheets/creature-action-sheet.html"
        });
    }

    get template() {
        return "systems/black-sword-hack/templates/sheets/creature-action-sheet.html";
    }

    // V14 : getData() retourne item et item.system directement
    getData() {
        const context         = super.getData();
        context.configuration = CONFIG.configuration;
        context.item          = this.item;
        context.system        = this.item.system;
        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);
    }
}
