const _ = require('underscore');

const cards = require('./cards');
const Card = require('./Card.js');
const logger = require('../log.js');

class Deck {
    constructor(data) {
        if (!data) {
            return;
        }

        data.cards = data.cards.map((card) => {
            let result = {
                count: card.count,
                card: card.card
            };
            if (!result.card) {
                logger.error(`Corrupt deck ${card.id} ${card}`);
                return result;
            }

            if (card.maverick) {
                result.card.house = card.maverick;
                result.card.maverick = card.maverick;
            } else if (card.anomaly) {
                result.card.house = card.anomaly;
                result.card.anomaly = card.anomaly;
            }

            if (card.house) {
                result.card.house = card.house;
            }

            if (card.image) {
                result.card.cardImage = card.image;
            }

            if (card.enhancements) {
                result.card.enhancements = card.enhancements;
            }

            return result;
        });

        this.data = data;
    }

    prepare(player) {
        var result = {
            houses: [],
            cards: [],
            dice: []
        };

        result.houses = this.data.houses;

        this.eachRepeatedCard(this.data.cards, (cardData) => {
            let card = this.createCard(player, cardData);
            if (card) {
                card.setupAbilities();
                card.location = 'deck';
                result.cards.push(card);
            }
        });

        result.dice = this.getDice();

        return result;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getDice() {
        let magic = ['ceremonial', 'charm', 'divine', 'illusion', 'natural', 'sympathy', 'time'];
        let levels = ['power', 'class', 'class', 'class', 'basic', 'basic'];
        let output = [];
        for (var i = 0; i < 10; i++) {
            var m = this.getRandomInt(7);
            var l = this.getRandomInt(6);
            output.push({ id: i + 1, magic: magic[m], level: levels[l] });
        }
        return output;
    }

    eachRepeatedCard(cards, func) {
        _.each(cards, (cardEntry) => {
            for (var i = 0; i < cardEntry.count; i++) {
                func(cardEntry.card);
            }
        });
    }

    createCard(player, cardData) {
        if (!cardData || !cardData.id) {
            logger.error(`no cardData for ${JSON.stringify(this.data)}`);
            return;
        }

        cardData.image = cardData.cardImage || cardData.id;
        if (cardData.maverick) {
            cardData.house = cardData.maverick;
        } else if (cardData.anomaly) {
            cardData.house = cardData.anomaly;
        }

        if (!cards[cardData.id]) {
            return new Card(player, cardData);
        }

        let cardClass = cards[cardData.id];
        return new cardClass(player, cardData);
    }
}

module.exports = Deck;
