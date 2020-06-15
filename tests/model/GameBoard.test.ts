import * as chai from 'chai';

import {GameBoard} from "../../src/model/GameBoard";
import {Player} from "../../src/model/Player";
import {GameBoardListener} from "../../src/model/GameBoardListener";

const expect = chai.expect;
describe('GameBoard class', () => {

    // ---- Test setup:
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');
    let gameBoard: GameBoard;
    beforeEach(function () {
        gameBoard = new GameBoard(player1, player2);
    });


    // ---- constructor():

    // Test:
    it('constructor() should create a valid game board when constructed with two valid players' , () => {
        let player1 = new Player('player 1');
        let player2 = new Player('player 2');

        expect(new GameBoard(player1, player2)).to.be.instanceOf(GameBoard);
    });

    // Test:
    it('constructor() should throw an error if constructed with same player (player one and two are equal)' , () => {
        let player1 = new Player('player 1');

        expect(() => new GameBoard(player1, player1)).to.throw(Error);
    });

    // Test:
    it('constructor() should throw an error if constructed with same player (name of player one and two are equal)' , () => {
        let player1 = new Player('player 1');
        let player2 = new Player('player 1');

        expect(() => new GameBoard(player1, player2)).to.throw(Error);
    });


    // ---- getPlayer1():

    // Test:
    it('getPlayer1() should have a player 1' , () => {
        expect(gameBoard.getPlayer1).to.equal(player1);
    });


    // ---- getPlayer2():

    // Test:
    it('getPlayer2() should have a player 2' , () => {
        expect(gameBoard.getPlayer2).to.equal(player2);
    });


    // ---- placePieceOnField(index, player):

    // Test:
    it('placePieceOnField(index, player) should place a piece on the given field' , () => {
        gameBoard.placePieceOnField(1, player1);
        expect(gameBoard.getPieceFromField(1)).to.equal(player1);
    });

    // Test:
    it('placePieceOnField(index, player) should place a piece for each player on the given field' , () => {
        gameBoard.placePieceOnField(1, player1);
        gameBoard.placePieceOnField(2, player2);

        expect(gameBoard.getPieceFromField(1)).to.equal(player1);
        expect(gameBoard.getPieceFromField(2)).to.equal(player2);
    });

    // Test:
    it('placePieceOnField(index, player) should throw an error if piece placed one same field' , () => {
        gameBoard.placePieceOnField(22, player1);

        expect(() => gameBoard.placePieceOnField(22, player2)).to.throw(Error);
    });

    // Test:
    it('placePieceOnField(index, player) should throw an error if index lower than 0' , () => {
        expect(() => gameBoard.placePieceOnField(-1, player1)).to.throw(Error);
    });

    // Test:
    it('placePieceOnField(index, player) should throw an error if index greater than 63' , () => {
        expect(() => gameBoard.placePieceOnField(64, player1)).to.throw(Error);
    });

    // Test:
    it('placePieceOnField(index, player) should throw an error if index is 3.5 (floating point number)' , () => {
        expect(() => gameBoard.placePieceOnField(3.5, player1)).to.throw(Error);
    });

    // Test:
    it('placePieceOnField(index, player) should throw an error if player is invalid' , () => {
        let player3 = new Player('some other player');
        expect(() => gameBoard.placePieceOnField(3, player3)).to.throw(Error);
    });


    // ---- getPieceFromField(index):

    // Test:
    it('getPieceFromField(index) should return null for empty fields' , () => {
        expect(gameBoard.getPieceFromField(0)).to.null;
    });

    // Test:
    it('getPieceFromField(index) should returns player for fields where the player placed a piece' , () => {
        gameBoard.placePieceOnField(22, player1);
        gameBoard.placePieceOnField(25, player2);

        expect(gameBoard.getPieceFromField(22)).to.equal(player1);
        expect(gameBoard.getPieceFromField(25)).to.equal(player2);
    });

    // Test:
    it('getPieceFromField(index) should throw an error if index is lower than 0' , () => {
        expect(() => gameBoard.getPieceFromField(-1)).to.throw(Error);
    });

    // Test:
    it('getPieceFromField(index) should throw an error if index is greater than 63' , () => {
        expect(() => gameBoard.getPieceFromField(64)).to.throw(Error);
    });

    // Test:
    it('getPieceFromField(index) should throw an error if index is 15.6 (floating point number)' , () => {
        expect(() => gameBoard.getPieceFromField(15.6)).to.throw(Error);
    });


    // ---- isFieldEmpty(index):

    // Test:
    it('isFieldEmpty(index) should throw an error if index is lower than 0' , () => {
        expect(() => gameBoard.isFieldEmpty(-1)).to.throw(Error);
    });

    // Test:
    it('isFieldEmpty(index) should throw an error if index is greater than 63' , () => {
        expect(() => gameBoard.isFieldEmpty(64)).to.throw(Error);
    });

    // Test:
    it('isFieldEmpty(index) should throw an error if index is 12.92 (floating point number)' , () => {
        expect(() => gameBoard.isFieldEmpty(12.92)).to.throw(Error);
    });

    // Test:
    it('isFieldEmpty(index) should return true for all fields if no piece was placed before' , () => {
        for (let i: number = 0; i<=63; i++)
            expect(gameBoard.isFieldEmpty(i)).to.equal(true);
    });

    // Test:
    it('isFieldEmpty(index) should return false for a fields with pieces' , () => {
        gameBoard.placePieceOnField(20, player1);
        gameBoard.placePieceOnField(12, player2);

        expect(gameBoard.isFieldEmpty(20)).to.equal(false);
        expect(gameBoard.isFieldEmpty(12)).to.equal(false);
    });


    // ---- clearAllFields():

    // Test:
    it('clearAllFields(index) should clear all fields' , () => {
        gameBoard.placePieceOnField(63, player1);
        gameBoard.placePieceOnField(13, player2);

        gameBoard.clearAllFields();

        for (let i: number = 0; i<=63; i++)
            expect(gameBoard.isFieldEmpty(i)).to.equal(true);
    });


    // ---- addGameBoardListener(listener):

    // Mock for listeners.
    function mockListener(cbOPP: (n: number, p: Player) => void, cbOGBC: () => void): GameBoardListener {
        return new class implements GameBoardListener {
            onPiecePlaced(index: number, player: Player): void { cbOPP(index, player); }
            onGameBoardCleared(): void { cbOGBC(); }
        }
    }

    // Test:
    it('addGameBoardListener(index) should add a listener that will be notified if a piece was placed' , () => {
        let emitted1: [number?, Player?] = [];
        let listener1 = mockListener((n,p) => emitted1 = [n,p], () => {});
        gameBoard.addGameBoardListener(listener1);

        gameBoard.placePieceOnField(20, player1);

        expect(emitted1[0]).to.equal(20);
        expect(emitted1[1]).to.equal(player1);
    });

    // Test:
    it('addGameBoardListener(index) should add multiple listeners that will all be notified if a piece was placed' , () => {
        let emitted1: [number?, Player?] = [];
        let listener1 = mockListener((n,p) => emitted1 = [n,p], () => []);
        gameBoard.addGameBoardListener(listener1);

        let emitted2: [number?, Player?] = [];
        let listener2 = mockListener((n,p) => emitted2 = [n,p], () => []);
        gameBoard.addGameBoardListener(listener2);

        gameBoard.placePieceOnField(35, player2);

        expect(emitted1[0]).to.equal(35);
        expect(emitted1[1]).to.equal(player2);
        expect(emitted2[0]).to.equal(35);
        expect(emitted2[1]).to.equal(player2);
    });

    // Test:
    it('addGameBoardListener(index) should add a listener that will be notified if the game board was cleared' , () => {
        let emitted1: boolean = false;
        let listener1 = mockListener(() => {}, () => emitted1 = true);
        gameBoard.addGameBoardListener(listener1);

        gameBoard.clearAllFields();

        expect(emitted1).to.equal(true);
    });

    // Test:
    it('addGameBoardListener(index) should add multiple listeners that will all be notified if the game board was cleared' , () => {
        let emitted1: boolean = false;
        let listener1 = mockListener(() => {}, () => emitted1 = true);
        gameBoard.addGameBoardListener(listener1);

        let emitted2: boolean = false;
        let listener2 = mockListener(() => {}, () => emitted2 = true);
        gameBoard.addGameBoardListener(listener2);

        gameBoard.clearAllFields();

        expect(emitted1).to.equal(true);
        expect(emitted2).to.equal(true);
    });


    // ---- removeGameBoardListener(listener):

    // Test:
    it('removeGameBoardListener(index) should remove only this listener and other listener get notified for placed pieces' , () => {
        let emitted1: boolean = false;
        let listener1 = mockListener(() => emitted1 = true, () => {});
        gameBoard.addGameBoardListener(listener1);

        let emitted2: boolean = false;
        let listener2 = mockListener(() => emitted2 = true, () => {});
        gameBoard.addGameBoardListener(listener2);

        gameBoard.removeGameBoardListener(listener1);

        gameBoard.placePieceOnField(20, player1);

        expect(emitted1).to.equal(false);
        expect(emitted2).to.equal(true);
    });

    // Test:
    it('removeGameBoardListener(index) should remove only this listener and other listener get notified for game board cleared' , () => {
        let emitted1: boolean = false;
        let listener1 = mockListener(() => {}, () => emitted1 = true);
        gameBoard.addGameBoardListener(listener1);

        let emitted2: boolean = false;
        let listener2 = mockListener(() => {}, () => emitted2 = true);
        gameBoard.addGameBoardListener(listener2);

        gameBoard.removeGameBoardListener(listener1);

        gameBoard.clearAllFields();

        expect(emitted1).to.equal(false);
        expect(emitted2).to.equal(true);
    });

});
