const { CardType } = require('../../../constants.js');
const Card = require('../../Card.js');

class SpectralAssassin extends Card {
    setupCardAbilities(ability) {
        this.forcedReaction({
            title: 'Sneaky Strike',
            when: {
                onAttackersDeclared: (event, context) => {
                    // I'm the attacker
                    return event.battles.some((b) => b.attacker === context.source);
                }
            },
            gameAction: ability.actions.forRemainderOfTurn({
                targetController: 'opponent',
                effect: ability.effects.playerCannot(
                    'play',
                    (context) => context.source.type === CardType.ReactionSpell
                )
            })
        });
    }
}

SpectralAssassin.id = 'spectral-assassin';

module.exports = SpectralAssassin;
