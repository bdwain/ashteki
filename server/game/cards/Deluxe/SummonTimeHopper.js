const { Level, Magic } = require('../../../constants.js');
const Card = require('../../Card.js');
const DiceCount = require('../../DiceCount.js');

class SummonTimeHopper extends Card {
    setupCardAbilities(ability) {
        this.action({
            title: 'Summon Time Hopper',
            cost: [
                ability.costs.sideAction(),
                ability.costs.exhaust(),
                ability.costs.dice([new DiceCount(1, Level.Class, Magic.Time)])
            ],
            location: 'spellboard',
            target: {
                controller: 'self',
                cardType: 'Conjuration',
                cardCondition: (card) => card.id === 'time-hopper',
                location: 'archives',
                gameAction: ability.actions.putIntoPlay()
            },
            then: {
                condition: (context) =>
                    context.source.focus > 0 &&
                    context.player.unitsInPlay.some(
                        (c) => c.id === 'time-hopper' && c.status > 0 && !c.exhausted
                    ),
                target: {
                    controller: 'self',
                    cardType: 'Conjuration',
                    cardCondition: (card) => card.id === 'time-hopper',
                    location: 'archives',
                    gameAction: ability.actions.putIntoPlay()
                }
            }
        });
    }
}

SummonTimeHopper.id = 'summon-time-hopper';

module.exports = SummonTimeHopper;