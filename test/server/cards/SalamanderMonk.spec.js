describe('Salamander Monk', function () {
    describe('destruction with space in battlefield', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['iron-worker'],
                    dicepool: ['divine', 'illusion', 'charm', 'charm'],
                    spellboard: [],
                    hand: ['close-combat', 'power-through']
                },
                player2: {
                    phoenixborn: 'coal-roarkwin', // battlefield 6
                    inPlay: ['mist-spirit', 'anchornaut', 'hammer-knight', 'salamander-monk'],
                    spellboard: ['summon-iron-rhino'],
                    hand: ['molten-gold'],
                    dicepool: ['natural', 'natural', 'charm', 'charm'],
                    archives: ['salamander-monk-spirit']
                }
            });
        });

        it('on destroy summons spirit', function () {
            expect(this.salamanderMonk.location).toBe('play area');
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.salamanderMonk);
            this.player1.clickCard(this.ironWorker);
            this.player2.clickPrompt('Done');
            this.player2.clickPrompt('No');
            expect(this.player1).not.toHaveDefaultPrompt();
            this.player2.clickCard(this.salamanderMonkSpirit);
            expect(this.player1).toHaveDefaultPrompt();
            expect(this.salamanderMonk.location).toBe('archives');
            expect(this.salamanderMonkSpirit.location).toBe('play area');
        });
    });

    describe('Salamander Monk battlefield full', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['iron-worker'],
                    dicepool: ['divine', 'illusion', 'charm', 'charm'],
                    spellboard: [],
                    hand: ['close-combat', 'power-through']
                },
                player2: {
                    phoenixborn: 'coal-roarkwin',
                    inPlay: [
                        'mist-spirit',
                        'anchornaut',
                        'mist-spirit',
                        'anchornaut',
                        'hammer-knight',
                        'salamander-monk'
                    ],
                    spellboard: ['summon-iron-rhino'],
                    hand: ['molten-gold'],
                    dicepool: ['natural', 'natural', 'charm', 'charm'],
                    archives: ['salamander-monk-spirit']
                }
            });
        });

        it('on destroy summons spirit when battlefield full (replacing self)', function () {
            expect(this.salamanderMonk.location).toBe('play area');
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.salamanderMonk);
            this.player1.clickCard(this.ironWorker);
            this.player2.clickPrompt('Done');
            this.player2.clickPrompt('No');
            expect(this.player1).not.toHaveDefaultPrompt();
            this.player2.clickCard(this.salamanderMonkSpirit);
            expect(this.player1).toHaveDefaultPrompt();
            expect(this.salamanderMonk.location).toBe('archives');
            expect(this.salamanderMonkSpirit.location).toBe('play area');
        });
    });
});