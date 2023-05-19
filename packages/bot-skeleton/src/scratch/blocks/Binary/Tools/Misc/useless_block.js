import { localize } from '@deriv/translations';

Blockly.Blocks.useless_block = {
    init() {
        this.jsonInit({
            message0: '%1',
            args0: [
                {
                    type: 'field_label',
                    text: localize('Conversion Helper Block'),
                    class: 'blocklyTextRootBlockHeader',
                },
            ],
            colour: Blockly.Colours.RootBlock.colour,
            colourSecondary: Blockly.Colours.RootBlock.colourSecondary,
            colourTertiary: Blockly.Colours.RootBlock.colourTertiary,
            tooltip: localize('This block was required to correctly convert your old strategy.'),
            category: Blockly.Categories.Miscellaneous,
            nextStatement: null,
            previousStatement: null,
        });
    },
};

Blockly.JavaScript.useless_block = () => {};
