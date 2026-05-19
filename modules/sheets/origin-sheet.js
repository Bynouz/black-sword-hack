import BackgroundDialog from "../dialogs/background_dialog.js";

export default class OriginSheet extends ItemSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes:  ["bsh", "bsh-sheet", "bsh-origin", "sheet"],
            height:   600,
            width:    700,
            template: "systems/black-sword-hack/templates/sheets/origin-sheet.html"
        });
    }

    get template() {
        return "systems/black-sword-hack/templates/sheets/origin-sheet.html";
    }

    // V14 : data.data.system n'existe plus, on utilise this.item.system
    getData() {
        const context = super.getData();
        context.configuration = CONFIG.configuration;
        // V14 : accès direct via this.item
        context.item   = this.item;
        context.system = this.item.system;
        // Générer les objets de backgrounds pour le template
        context.system.backgroundObjects = this.item.system.backgrounds.map(
            (definition) => JSON.parse(definition)
        );
        return context;
    }

    activateListeners(html) {
        html.find(".bsh-new-background-icon").click(this._onNewBackgroundClicked.bind(this));
        html.find(".bsh-background-column").click(this._onEditBackgroundClicked.bind(this));
        html.find(".bsh-background-checkbox").click(this._onBackgroundSelectionClicked.bind(this));
        html.find(".bsh-delete-background-icon").click(this._onDeleteBackgroundClicked.bind(this));

        Array.from(html.find(".bsh-background-column")).forEach(
            (row) => row.dataset.origin = this.object.id
        );
        super.activateListeners(html);
        if(!game.settings.get("black-sword-hack", "customOrigins")) {
            ui.notifications.error(game.i18n.localize("bsh.errors.origins.custom.inactive"));
        }
    }

    _findRootElement(element) {
        let root = element;

        while(!root.classList.contains("bsh-origin-sheet-body")) {
            root = root.parentElement;
        }

        return root;
    }

    _onBackgroundSelectionClicked(event) {
        let sheetBody  = this._findRootElement(event.currentTarget);
        let checkboxes = sheetBody.querySelectorAll('input[type="checkbox"]:checked');
        let icon       = sheetBody.querySelector('.bsh-delete-background-icon');

        if(checkboxes.length === 0) {
            icon.classList.add("bsh-greyed-out");
        } else {
            icon.classList.remove("bsh-greyed-out");
        }
    }

    _onDeleteBackgroundClicked(event) {
        let sheetBody = this._findRootElement(event.currentTarget);
        let icon      = sheetBody.querySelector('.bsh-delete-background-icon');

        if(!icon.classList.contains("bsh-greyed-out")) {
            let checkboxes  = sheetBody.querySelectorAll('input[type="checkbox"]:checked');
            let keys        = Array.from(checkboxes).map((c) => c.dataset.key);
            let backgrounds = this.object.system.backgrounds.map((e) => JSON.parse(e));

            backgrounds = backgrounds.filter((e) => !keys.includes(e.key));
            backgrounds = backgrounds.map((e) => JSON.stringify(e));
            this.object.update({system: {backgrounds: backgrounds}}, {diff: true});
        }
    }

    _onEditBackgroundClicked(event) {
        let origin     = this.object;
        let key        = event.currentTarget.dataset.key;
        let background = origin.system.backgrounds.find(
            (entry) => JSON.parse(entry).key === key
        );

        event.preventDefault();
        if(background) {
            BackgroundDialog.buildForOrigin(
                event.currentTarget,
                JSON.parse(background),
                {}
            ).then((dialog) => dialog.render(true));
        } else {
            console.error(`Background key '${key}' not found for origin id '${origin.id}'.`);
        }
    }

    _onNewBackgroundClicked(event) {
        event.preventDefault();
        BackgroundDialog.buildForNewOrigin(event.currentTarget, {}).then(
            (dialog) => dialog.render(true)
        );
    }
}
