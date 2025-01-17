const Card = require('../../Card.js');

class PainShaman extends Card {
    setupCardAbilities(ability) {
        this.entersPlay({
            effect: 'deal 1 damage to {0}',
            target: {
                optional: true,
                activePromptTitle: 'Choose a unit to damage',
                cardType: ['Ally', 'Conjuration'],
                gameAction: ability.actions.dealDamage({
                    amount: 1
                })
            },
            then: {
                target: {
                    activePromptTitle: 'Choose a unit or Phoenixborn to heal',
                    cardType: ['Ally', 'Conjuration', 'Phoenixborn'],
                    optional: true,
                    gameAction: ability.actions.removeDamage({
                        amount: 1,
                        showMessage: true
                    })
                }
            }
        });
    }
}

PainShaman.id = 'pain-shaman';

module.exports = PainShaman;
