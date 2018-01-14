describe('Blackmail', function() {
    integration(function() {
        describe('When playing Blackmail', function() {
            beforeEach(function() {
                this.setupTest({
                    phase: 'conflict',
                    player1: {
                        faction: 'scorpion',
                        inPlay: ['seppun-guardsman'],
                        hand: ['blackmail']
                    },
                    player2: {
                        inPlay: ['miya-mystic', 'shiba-peacemaker', 'radiant-orator', 'otomo-courtier'],
                        hand: ['watch-commander', 'honored-blade']
                    }
                });
                this.noMoreActions();
                this.initiateConflict({
                    type: 'military',
                    attackers: ['seppun-guardsman'],
                    defenders: ['miya-mystic', 'shiba-peacemaker', 'radiant-orator']
                });
                this.miyaMystic = this.player2.findCardByName('miya-mystic');
                this.shibaPeacemaker = this.player2.findCardByName('shiba-peacemaker');
                this.radiantOrator = this.player2.findCardByName('radiant-orator');
                this.otomoCourtier = this.player2.findCardByName('otomo-courtier');
            });

            it('should only be legal if the player has less honor than their opponent', function() {
                this.player1.player.honor = 11;
                this.player2.clickPrompt('Pass');
                this.player1.clickCard('blackmail');

                expect(this.player1).not.toHavePrompt('Choose a character');
                expect(this.player1.player.canInitiateAction).toBe(true);
            });

            it('should allow characters with cost under 3 in the conflict to be chosen', function() {
                this.player2.clickPrompt('Pass');
                this.player1.clickCard('blackmail');
                expect(this.player1).toBeAbleToSelect(this.miyaMystic);
                expect(this.player1).toBeAbleToSelect(this.shibaPeacemaker);
            });

            it('should allow characters outside the conflict with cost under 3 to be chosen', function() {
                this.player2.clickPrompt('Pass');
                this.player1.clickCard('blackmail');
                expect(this.player1).toBeAbleToSelect(this.otomoCourtier);
            });

            it('should not allow characters with cost 3 or higher to be chosen', function() {
                this.player2.clickPrompt('Pass');
                this.player1.clickCard('blackmail');
                expect(this.player1).not.toBeAbleToSelect(this.radiantOrator);
            });

            xdescribe('if a character who can participate as an attacker and who is in the conflict is chosen', function() {
                beforeEach(function() {
                    this.spy = spyOn(this.game, 'addMessage');
                    this.player2.clickPrompt('Pass');
                    this.player1.clickCard('blackmail');
                    this.player1.clickCard(this.miyaMystic);
                });

                it('should move that character from a defender to an attacker', function() {
                    expect(this.miyaMystic.controller).toBe(this.player1.player);
                    expect(this.game.currentConflict.attackers).toContain(this.miyaMystic);
                    expect(this.game.currentConflict.defenders).not.toContain(this.miyaMystic);
                });

                it('should correctly calculate the new conflict totals', function() {
                    expect(this.game.currentConflict.attackerSkill).toBe(3);
                    expect(this.game.currentConflict.defenderSkill).toBe(5);
                });

                it('should return the character to previous controller at the end of the conflict', function() {
                    this.noMoreActions();
                    expect(this.player1).toHavePrompt('Initiate an action');
                    expect(this.miyaMystic.controller).toBe(this.player2.player);
                    expect(this.spy).not.toHaveBeenCalledWith('{0} cannot participate in the conflict any more and is sent home bowed', this.miyaMystic);
                });
            });

            xdescribe('if a character who cannot participate as an attacker and who is in the conflict is chosen', function() {
                beforeEach(function() {
                    this.spy = spyOn(this.game, 'addMessage');
                    this.player2.clickPrompt('Pass');
                    this.player1.clickCard('blackmail');
                    this.player1.clickCard(this.shibaPeacemaker);
                });


                xit('should send the character to the blackmailing players home, bowed', function() {
                    expect(this.shibaPeacemaker.inConflict).toBe(false);
                    expect(this.shibaPeacemaker.bowed).toBe(true);
                    expect(this.game.currentConflict.attackers).not.toContain(this.shibaPeacemaker);
                    expect(this.game.currentConflict.defenders).not.toContain(this.shibaPeacemaker);
                    expect(this.shibaPeacemaker.controller).toBe(this.player1.player);                    
                });

                xit('should display a game message indicating why the character has been sent home', function() {
                    expect(this.spy).toHaveBeenCalledWith('{0} cannot participate in the conflict any more and is sent home bowed', this.shibaPeacemaker);
                });
                
                xit('should correctly calculate the new conflict totals', function() {
                    expect(this.game.currentConflict.attackerSkill).toBe(2);
                    expect(this.game.currentConflict.defenderSkill).toBe(2);
                });

                xit('should return the character to previous controller at the end of the conflict', function() {
                    this.player2.playAttachment('watch-commander', this.miyaMystic);
                    expect(this.game.currentConflict.defenderSkill).toBe(3);

                    this.noMoreActions();
                    expect(this.player1).toHavePrompt('Initiate an action');
                    expect(this.miyaMystic.controller).toBe(this.player2.player);
                });
            });
        });
    });
});
