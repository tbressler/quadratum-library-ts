import * as chai from 'chai';

import {Player} from "../../../src/model/Player";
import {GameBoard} from "../../../src/model/GameBoard";
import {LogicCallback} from "../../../src/logic/LogicCallback";
import {BotPlayerLogic, Strategy} from "../../../src/logic/players/BotPlayerLogic";

const expect = chai.expect;
describe('BotPlayerLogic class', () => {

    // ---- Test setup:
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');
    let gameBoard = new GameBoard(player1, player2);
    let logicCallback: LogicCallback;
    let botPlayerLogic: BotPlayerLogic;

    function createBotPlayerLogic(strategy: Strategy): BotPlayerLogic {
        let logic = new BotPlayerLogic(player1, strategy);
        logic.setRandomizeMoves(false); // For testing purpose, do not randomize moves.
        return logic;
    }

    // ---- Mock setup:
    function mockLogicCallback(cbMM : (i: number) => boolean): LogicCallback {
        return new class implements LogicCallback {
            makeMove(index: number): boolean { return cbMM(index); }
        };
    }


    // ---- getPlayer():

    // Test:
    it('getPlayer() returns player from constructor' , () => {
        botPlayerLogic = createBotPlayerLogic(Strategy.SHORT_TERM);
        expect(botPlayerLogic.getPlayer()).to.equal(player1);
    });


    // ---- requestMove():

    // Test:
    it('requestMove(gameBoard,logicCallback) sends a move to the logic callback when game board is empty (SHORT TERM)' , () => {
        botPlayerLogic = createBotPlayerLogic(Strategy.SHORT_TERM);
        let madeMove = false;
        logicCallback = mockLogicCallback((index) => {
            madeMove = true;
            expect(index).to.equal(0);
            return true;
        });

        botPlayerLogic.requestMove(gameBoard, logicCallback);

        expect(madeMove).to.be.true;
    });

    // Test:
    it('requestMove(gameBoard,logicCallback) sends a move to the logic callback when game board is empty (LONG TERM)' , () => {
        botPlayerLogic = createBotPlayerLogic(Strategy.LONG_TERM);
        let madeMove = false;
        logicCallback = mockLogicCallback((index) => {
            madeMove = true;
            expect(index).to.equal(11);
            return true;
        });

        botPlayerLogic.requestMove(gameBoard, logicCallback);

        expect(madeMove).to.be.true;
    });

    // Test:
    it('requestMove(gameBoard,logicCallback) sends a move to the logic callback when game board is not empty' , () => {
        botPlayerLogic = createBotPlayerLogic(Strategy.SHORT_TERM);
        let madeMove = false;
        logicCallback = mockLogicCallback((index) => {
            madeMove = true;
            expect(index).to.not.equal(0);
            return true;
        });

        gameBoard.placePieceOnField(0, player2);
        botPlayerLogic.requestMove(gameBoard, logicCallback);

        expect(madeMove).to.be.true;
    });


});