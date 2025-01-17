const Card = require('../../Card.js');

class Anguish extends Card {
    setupCardAbilities(ability) {
        this.play({
            title: 'Anguish',
            message: '{0} plays {1}',
            messageArgs: (context) => [context.player, context.source],
            target: {
                mode: 'select',
                player: 'opponent',
                choices: {
                    Discard: ability.actions.conditional({
                        condition: (context) => context.player.opponent.hand.length > 0,
                        trueGameAction: ability.actions.discardAtRandom(),
                        falseGameAction: ability.actions.addDamageToken((context) => ({
                            target: context.player.opponent.phoenixborn,
                            amount: 2,
                            showMessage: true
                        }))
                    }),
                    Damage: ability.actions.addDamageToken((context) => ({
                        target: context.player.opponent.phoenixborn,
                        amount: 2,
                        showMessage: true
                    }))
                }
            },
            then: {
                gameAction: ability.actions.chooseAction((context) => ({
                    player: context.player.opponent,
                    choices: {
                        'Exhaust 2 dice': ability.actions.conditional({
                            condition: (context) =>
                                context.player.opponent.dice.filter((d) => !d.exhausted).length >=
                                2,
                            trueGameAction: ability.actions.exhaustDie({
                                promptForSelect: {
                                    toSelect: 'die',
                                    dieCondition: (d) => !d.exhausted,
                                    mode: 'upTo',
                                    numDice: 2,
                                    owner: 'opponent'
                                },
                                showMessage: true
                            }),
                            falseGameAction: ability.actions.addDamageToken((context) => ({
                                target: context.player.opponent.phoenixborn,
                                amount: 2,
                                showMessage: true
                            }))
                        }),
                        'Take 2 Damage': ability.actions.addDamageToken((context) => ({
                            target: context.player.opponent.phoenixborn,
                            amount: 2,
                            showMessage: true
                        }))
                    }
                }))
            }
        });
    }
}

Anguish.id = 'anguish';

module.exports = Anguish;
