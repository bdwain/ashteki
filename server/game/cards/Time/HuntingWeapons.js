const { BattlefieldTypes, CardType } = require('../../../constants.js');
const Card = require('../../Card.js');

class HuntingWeapons extends Card {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: [
                ability.effects.modifyAttack(1),
                ability.effects.gainAbility('reaction', {
                    title: 'Hunt 1',
                    when: {
                        onAttackersDeclared: (event, context) => {
                            return event.battles.some((b) => b.attacker === context.source);
                        }
                    },
                    target: {
                        optional: true,
                        activePromptTitle: 'Choose a unit to damage',
                        cardType: BattlefieldTypes,
                        gameAction: ability.actions.dealDamage({
                            amount: 1
                        })
                    }
                })
            ]
        });
    }

    canAttach(card, context) {
        const myCondition = card.type === CardType.Ally;
        return super.canAttach(card, context) && myCondition;
    }
}

HuntingWeapons.id = 'hunting-weapons';

module.exports = HuntingWeapons;
