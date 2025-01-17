const { CardType } = require('../../../constants.js');
const { capitalize } = require('../../../util.js');
const Card = require('../../Card.js');

class Transfer extends Card {
    setupCardAbilities(ability) {
        this.play({
            title: 'Transfer',
            targets: {
                tokenBoy: {
                    ignoreTargetCheck: true,
                    activePromptTitle: 'Choose a card with tokens',
                    controller: 'any',
                    cardCondition: (card) =>
                        card.hasAnyTokens() && card.type !== CardType.Phoenixborn
                },
                amount: {
                    activePromptTitle: 'Choose a type',
                    dependsOn: 'tokenBoy',
                    mode: 'options',
                    options: (context) => this.getTokenOptions(context.targets.tokenBoy),
                    handler: (option) => (this.chosenType = option.value)
                },
                receiver: {
                    ignoreTargetCheck: true,

                    activePromptTitle: 'Choose a card to receive the token',
                    dependsOn: 'amount',
                    cardCondition: (card, context) =>
                        card.type !== CardType.Phoenixborn &&
                        card.controller === context.targets.tokenBoy.controller &&
                        card !== context.targets.tokenBoy,
                    gameAction: ability.actions.moveToken((context) => ({
                        from: context.targets.tokenBoy,
                        to: context.targets.receiver,
                        type: this.chosenType
                    }))
                }
            }
        });
    }

    getTokenOptions(card) {
        return Object.keys(card.tokens).map((t) => ({ name: capitalize(t), value: t }));
    }
}

Transfer.id = 'transfer';

module.exports = Transfer;
