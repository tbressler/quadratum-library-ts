import * as chai from 'chai';

import {Player} from "../../../src/model/Player";
import {HumanPlayerLogic} from "../../../src/logic/players/HumanPlayerLogic";
import {GameBoard} from "../../../src/model/GameBoard";
import {LogicCallback} from "../../../src/logic/LogicCallback";

const expect = chai.expect;
describe('HumanPlayerLogic class', () => {

    // ---- Test setup:
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');
    let gameBoard = new GameBoard(player1, player2);
    let logicCallback: LogicCallback;
    let humanPlayerLogic: HumanPlayerLogic;
    beforeEach(function () {
        humanPlayerLogic = new HumanPlayerLogic(player1);
    });

    // ---- Mock setup:
    function mockLogicCallback(cbMM : (i: number) => boolean) {
        return new class implements LogicCallback {
            makeMove(index: number): boolean { return cbMM(index); }
        };
    }

    // ---- getPlayer():

    // Test:
    it('getPlayer() returns player from constructor' , () => {
        expect(humanPlayerLogic.getPlayer()).to.equal(player1);
    });


    // ---- isPlayerActive():

    // Test:
    it('isPlayerActive() should return false after construction' , () => {
        expect(humanPlayerLogic.isPlayerActive()).to.be.false;
    });

    // Test:
    it('isPlayerActive() should return true after a move was requested' , () => {
        humanPlayerLogic.requestMove(gameBoard, logicCallback);
        expect(humanPlayerLogic.isPlayerActive()).to.be.true;
    });


    // ---- placePiece(index):

    // Test:
    it('placePiece(index) should not request move on callback if player is not active' , () => {
        let madeMove = false;
        logicCallback = mockLogicCallback(() => { madeMove = true; return true; });

        expect(() => humanPlayerLogic.placePiece(1)).to.throw(Error);
        expect(madeMove).to.be.false;
    });

    // Test:
    it('placePiece(index) should request move on callback if player is active' , () => {
        let madeMove = false;
        logicCallback = mockLogicCallback((i) => { if (i == 23) madeMove = true; return true; });

        humanPlayerLogic.requestMove(gameBoard, logicCallback);

        expect(humanPlayerLogic.placePiece(23)).to.be.true;
        expect(madeMove).to.be.true;
    });

    // Test:
    it('placePiece(index) should throw an error if index is lower than 0' , () => {
        logicCallback = mockLogicCallback(() => true);
        humanPlayerLogic.requestMove(gameBoard, logicCallback);

        expect(() => humanPlayerLogic.placePiece(-1)).to.throw(Error);
    });

    // Test:
    it('placePiece(index) should throw an error if index is greater than 63' , () => {
        logicCallback = mockLogicCallback(() => true);
        humanPlayerLogic.requestMove(gameBoard, logicCallback);

        expect(() => humanPlayerLogic.placePiece(64)).to.throw(Error);
    });

    // Test:
    it('placePiece(index) should throw an error if index is no integer (floating point number)' , () => {
        logicCallback = mockLogicCallback(() => true);
        humanPlayerLogic.requestMove(gameBoard, logicCallback);

        expect(() => humanPlayerLogic.placePiece(4.4)).to.throw(Error);
    });

});