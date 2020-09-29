const _ = require('underscore');
const Phase = require('../phase.js');
const SimpleStep = require('../simplestep.js');
const FirstFivePrompt = require('./FirstFivePrompt.js');
const GameStartPrompt = require('./GameStartPrompt');

class SetupPhase extends Phase {
    constructor(game) {
        super(game, 'setup');
        this.initialise([
            new SimpleStep(game, () => this.setupBegin()),
            new FirstFivePrompt(game),
            new GameStartPrompt(game),
            new SimpleStep(game, () => this.startGame())
        ]);
    }

    startPhase() {
        this.game.currentPhase = this.name;
        for (let step of this.steps) {
            this.game.queueStep(step);
        }

        for (const player of this.game.getPlayers()) {
            let link = {
                link: 'https://www.keyforgegame.com/deck-details/' + player.deckData.uuid,
                argType: 'link',
                label: player.deckData.name
            };
            if (this.game.gameFormat !== 'sealed' && !this.game.hideDeckLists) {
                this.game.addMessage('{0} brings {1}{2} to The Crucible', player, link);
            }
        }
    }

    setupBegin() {
        for (let card of this.game.allCards) {
            card.applyAnyLocationPersistentEffects();
        }
    }

    startGame() {
        _.each(this.game.getPlayers(), (player) => {
            player.readyToStart = true;
        });
        this.game.raiseEvent('onGameStarted');
    }
}

module.exports = SetupPhase;
