import React from 'react';
import { useTranslation } from 'react-i18next';

import CardPile from './CardPile';
import SquishableCardPanel from './SquishableCardPanel';
import Droppable from './Droppable';
import DiceBox from './DiceBox';
import spellback from '../../assets/img/cardback-spell.png';
import conjback from '../../assets/img/cardback-conjuration.png';
import './PlayerRow.scss';

const PlayerRow = ({
    archives,
    cardSize,
    isMe,
    hand,
    manualMode,
    onCardClick,
    onDragDrop,
    onMouseOut,
    onMouseOver,
    side,
    dice
}) => {
    const { t } = useTranslation();

    const renderDroppablePile = (source, child) => {
        return isMe ? (
            <Droppable onDragDrop={onDragDrop} source={source} manualMode={manualMode}>
                {child}
            </Droppable>
        ) : (
            child
        );
    };

    const renderResources = (dice) => {
        return (
            <div className='panel resources card-pile'>
                <div className='panel-header'>Dice</div>
                <DiceBox dice={dice} size={cardSize} />
            </div>
        );
    };

    let cardPileProps = {
        manualMode: manualMode,
        onCardClick: onCardClick,
        onDragDrop: onDragDrop,
        onMouseOut: onMouseOut,
        onMouseOver: onMouseOver,
        popupLocation: side,
        size: cardSize
    };

    let sortedHand = [].concat(hand).sort((a, b) => {
        if (a.printedHouse < b.printedHouse) {
            return -1;
        } else if (a.printedHouse > b.printedHouse) {
            return 1;
        }

        return 0;
    });

    let handToRender = (
        <SquishableCardPanel
            cards={sortedHand}
            className='panel hand'
            groupVisibleCards
            cardBackUrl={spellback}
            manualMode={manualMode}
            maxCards={5}
            onCardClick={onCardClick}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            source='hand'
            title={t('Hand')}
            cardSize={cardSize}
        />
    );

    let hasArchivedCards = archives?.length > 0;
    let archivesToRender = (
        <CardPile
            className='archives'
            title={t('Archives')}
            source='archives'
            cards={archives}
            hiddenTopCard={hasArchivedCards && !isMe}
            cardBackUrl={conjback}
            {...cardPileProps}
        />
    );

    return (
        <div className='player-home-row-container pt-1'>
            {renderDroppablePile('hand', handToRender)}
            {renderDroppablePile('archives', archivesToRender)}
            {renderResources(dice)}
        </div>
    );
};

PlayerRow.displayName = 'PlayerRow';

export default PlayerRow;
