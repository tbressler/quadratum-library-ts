import * as chai from 'chai';

import {Player} from "../../src/model/Player";
import {GameBoard} from "../../src/model/GameBoard";
import {SquareCollector} from "../../src/logic/SquareCollector";
import {Square} from "../../src/model/Square";
import {HashSet} from "../../src/utils/HashSet";

const expect = chai.expect;
describe('SquareCollector class', () => {

    // ---- Test setup:
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');
    let gameBoard: GameBoard;
    let squareCollector: SquareCollector;
    beforeEach(function () {
        gameBoard = new GameBoard(player1, player2);
        squareCollector = new SquareCollector();
    });


    // ---- constructor(fields,player):

    // Test:
    it('constructor(fields,player) should not throw an error with valid parameter values' , () => {

    });


});