const { CardType, UpgradeCardTypes } = require('../../../constants.js');
const Card = require('../../Card.js');

class PolarityMage extends Card {
    setupCardAbilities(ability) {
        this.entersPlay({
            title: 'Give and Take',
            gameAction: ability.actions.chooseAction({
                choices: {
                    'Return to Hand': ability.actions.moveCard({
                        promptForSelect: {
                            optional: true,
                            controller: 'self',
                            location: 'discard',
                            cardType: [CardType.ConjuredAlteration, CardType.Upgrade]
                        },
                        destination: 'hand',
                        showMessage: true
                    }),
                    'Discard from Play': ability.actions.discard({
                        promptForSelect: {
                            optional: true,
                            cardType: UpgradeCardTypes,
                            controller: 'self'
                        },
                        showMessage: true
                    })
                }
            })
        });
    }
}

PolarityMage.id = 'polarity-mage';

module.exports = PolarityMage;
