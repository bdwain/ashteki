const GameActions = require('./GameActions/index');

const Actions = {
    // card actionsa
    addDamageToken: (propertyFactory) => new GameActions.AddTokenAction(propertyFactory, 'damage'),
    addExhaustionToken: (propertyFactory) =>
        new GameActions.AddTokenAction(propertyFactory, 'exhaustion'),
    addGravityFluxToken: (propertyFactory) =>
        new GameActions.AddTokenAction(propertyFactory, 'gravityFlux'),
    addStatusToken: (propertyFactory) => new GameActions.AddTokenAction(propertyFactory, 'status'),
    addToken: (propertyFactory, type) => new GameActions.AddTokenAction(propertyFactory, type),
    attach: (propertyFactory) => new GameActions.AttachAction(propertyFactory), // upgrade
    attachToPb: (propertyFactory) => new GameActions.AttachToPbAction(propertyFactory), // upgrade
    attachDie: (propertyFactory) => new GameActions.AttachDieAction(propertyFactory), // upgradeDie
    detachDie: (propertyFactory) => new GameActions.DetachDieAction(propertyFactory), // die, card
    cardLastingEffect: (propertyFactory) =>
        new GameActions.LastingEffectCardAction(propertyFactory), // effect, targetLocation, condition, until
    dealDamage: (propertyFactory) => new GameActions.DealDamageAction(propertyFactory),
    delayedEffect: (propertyFactory) => new GameActions.DelayedEffectAction(propertyFactory), // when, message, gameAction, handler
    discard: (propertyFactory) => new GameActions.DiscardCardAction(propertyFactory),
    destroy: (propertyFactory) => new GameActions.DestroyAction(propertyFactory),
    exhaust: (propertyFactory) => new GameActions.ExhaustAction(propertyFactory),
    exhaustGravityFlux: (propertyFactory) => new GameActions.ExhaustGravityFluxAction(propertyFactory),
    heal: (propertyFactory) => new GameActions.HealAction(propertyFactory),
    moveCard: (propertyFactory) => new GameActions.MoveCardAction(propertyFactory), // destination, switch = false, shuffle = false
    moveOnBattleline: (propertyFactory) => new GameActions.MoveOnBattlelineAction(propertyFactory),
    moveToBottom: (propertyFactory) => new GameActions.MoveToBottomAction(propertyFactory),
    moveToFlank: (propertyFactory) => new GameActions.MoveToFlankAction(propertyFactory),
    placeUnder: (propertyFactory) => new GameActions.PlaceUnderAction(propertyFactory), // parent
    playCard: (propertyFactory) => new GameActions.PlayCardAction(propertyFactory), // resetOnCancel = false, postHandler
    purge: (propertyFactory) => new GameActions.PurgeAction(propertyFactory),
    putIntoPlay: (propertyFactory) => new GameActions.PutIntoPlayAction(propertyFactory),
    ready: (propertyFactory) => new GameActions.ReadyAction(propertyFactory),
    rearrangeBattleline: (propertyFactory) =>
        new GameActions.RearrangeBattlelineAction(propertyFactory),
    recoverWounds: (propertyFactory) => new GameActions.RecoverAction(propertyFactory),
    removeDamage: (propertyFactory) => new GameActions.RemoveTokenAction(propertyFactory, 'damage'),
    removeStatus: (propertyFactory) => new GameActions.RemoveTokenAction(propertyFactory, 'status'),
    removeExhaustion: (propertyFactory) =>
        new GameActions.RemoveTokenAction(propertyFactory, 'exhaustion'),
    removeToken: (propertyFactory, type) => new GameActions.RemoveTokenAction(propertyFactory, type),
    removeAllTokens: (propertyFactory) => new GameActions.RemoveAllTokensAction(propertyFactory),
    resolveAbility: (propertyFactory) => new GameActions.ResolveAbilityAction(propertyFactory), // ability
    resolveFight: (propertyFactory) => new GameActions.ResolveFightAction(propertyFactory), // this shouldn't normally be needed
    returnToDeck: (propertyFactory) => new GameActions.ReturnToDeckAction(propertyFactory), // bottom = false
    returnToHand: (propertyFactory) => new GameActions.ReturnToHandAction(propertyFactory),
    reveal: (propertyFactory) => new GameActions.RevealAction(propertyFactory),
    sacrifice: (propertyFactory) => new GameActions.DestroyAction(propertyFactory, true),
    setGuarded: (propertyFactory) => new GameActions.SetGuardedAction(propertyFactory),
    swap: (propertyFactory) => new GameActions.SwapAction(propertyFactory), // origin
    use: (propertyFactory) => new GameActions.UseAction(propertyFactory),
    moveToken: (propertyFactory) => new GameActions.MoveTokenAction(propertyFactory),
    removeFromBattle: (propertyFactory) => new GameActions.RemoveFromBattleAction(propertyFactory),

    // player actions
    chosenDiscard: (propertyFactory) => new GameActions.ChosenDiscardAction(propertyFactory), // amount = 1
    chosenDestroy: (propertyFactory) => new GameActions.ChosenDestroyAction(propertyFactory),
    chosenExhaust: (propertyFactory) => new GameActions.ChosenExhaustAction(propertyFactory), // amount = 1
    discardAtRandom: (propertyFactory) => new GameActions.RandomDiscardAction(propertyFactory), // amount = 1
    discardTopOfDeck: (propertyFactory) => new GameActions.DiscardTopOfDeckAction(propertyFactory), // amount = 1
    purgeAtRandom: (propertyFactory) => new GameActions.RandomPurgeAction(propertyFactory), // amount = 1
    draw: (propertyFactory) => new GameActions.DrawAction(propertyFactory), // amount = 1
    forRemainderOfTurn: (propertyFactory) =>
        new GameActions.LastingEffectAction(propertyFactory, 1),
    lastingEffect: (propertyFactory) => new GameActions.LastingEffectAction(propertyFactory),
    rearrangeCards: (propertyFactory) => new GameActions.RearrangeCardsAction(propertyFactory),
    filterDeck: (propertyFactory) => new GameActions.FilterDeckAction(propertyFactory),
    search: (propertyFactory) => new GameActions.SearchAction(propertyFactory), // name
    shuffleDeck: (propertyFactory) => new GameActions.ShuffleDeckAction(propertyFactory), // name
    steal: (propertyFactory) => new GameActions.StealAction(propertyFactory), // amount = 1
    chosenAmountDraw: (propertyFactory) => new GameActions.ChosenAmountDrawAction(propertyFactory),
    playerChosenAmountDraw: (propertyFactory) =>
        new GameActions.PlayerChosenAmountDrawAction(propertyFactory),
    spendMainAction: (propertyFactory) => new GameActions.SpendMainAction(propertyFactory),
    spendSideAction: (propertyFactory) => new GameActions.SpendSideAction(propertyFactory),
    addSideAction: (propertyFactory) => new GameActions.AddSideAction(propertyFactory),
    summon: (propertyFactory) => new GameActions.SummonAction(propertyFactory),

    // meta actions
    addEventToWindow: (propertyFactory) => new GameActions.AddEventToWindowAction(propertyFactory),
    allocateDamage: (propertyFactory) => new GameActions.AllocateDamageAction(propertyFactory),
    changeEvent: (propertyFactory) => new GameActions.ChangeEventAction(propertyFactory),
    preventDamage: (propertyFactory) => new GameActions.PreventDamageAction(propertyFactory),
    chooseAction: (propertyFactory) => new GameActions.ChooseGameAction(propertyFactory), // choices, activePromptTitle = 'Select one'
    conditional: (propertyFactory) => new GameActions.ConditionalAction(propertyFactory),
    jointAction: (gameActions) => new GameActions.JointGameAction(gameActions), // takes an array of gameActions, not a propertyFactory
    sequential: (gameActions) => new GameActions.SequentialAction(gameActions), // takes an array of gameActions, not a propertyFactory
    sequentialForEach: (propertyFactory) =>
        new GameActions.SequentialForEachAction(propertyFactory),
    resolveBattle: (propertyFactory) => new GameActions.ResolveBattleAction(propertyFactory), // battle

    exhaustDie: (propertyFactory) => new GameActions.ExhaustDieAction(propertyFactory),
    readyDie: (propertyFactory) => new GameActions.ReadyDieAction(propertyFactory),
    setDieLevel: (propertyFactory) => new GameActions.SetDieLevelAction(propertyFactory),
    rerollDie: (propertyFactory) => new GameActions.RerollDieAction(propertyFactory),
    rerollDice: (propertyFactory) => new GameActions.RerollDiceAction(propertyFactory),
    meditate: (propertyFactory) => new GameActions.MeditateAction(propertyFactory),
    lowerDie: (propertyFactory) => new GameActions.ChangeDieAction(propertyFactory, 'lower'),
    raiseDie: (propertyFactory) => new GameActions.ChangeDieAction(propertyFactory, 'raise'),
    changeDice: (propertyFactory) => new GameActions.ChangeDiceAction(propertyFactory)
};

module.exports = Actions;
