import * as chai from 'chai';

import {GameBoard} from "../../src/model/GameBoard";
import {Player} from "../../src/model/Player";

const expect = chai.expect;
describe('GameBoard class', () => {

    // Test setup:
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');
    let gameBoard: GameBoard = new GameBoard(player1, player2);


    // ---- constructor():

    // Test:
    it('should create a valid game board when constructed with two valid players' , () => {
        let player1 = new Player('player 1');
        let player2 = new Player('player 2');

        expect(new GameBoard(player1, player2)).to.be.instanceOf(GameBoard);
    });

    // Test:
    it('should throw an error if constructed with same player (player one and two are equal)' , () => {
        let player1 = new Player('player 1');

        expect(() => new GameBoard(player1, player1)).to.throw(Error);
    });

    // Test:
    it('should throw an error if constructed with same player (name of player one and two are equal)' , () => {
        let player1 = new Player('player 1');
        let player2 = new Player('player 1');

        expect(() => new GameBoard(player1, player2)).to.throw(Error);
    });


    // ---- getPlayer1():

    // Test:
    it('should have a player 1' , () => {
        expect(gameBoard.getPlayer1).to.equal(player1);
    });


    // ---- getPlayer2():

    // Test:
    it('should have a player 2' , () => {
        expect(gameBoard.getPlayer2).to.equal(player2);
    });


    // ---- placePieceOnField(index, player):

    // Test:
    it('should throw an error if index lower than 0' , () => {
        expect(() => gameBoard.placePieceOnField(-1, player1)).to.throw(Error);
    });

    // Test:
    it('should throw an error if index greater than 63' , () => {
        expect(() => gameBoard.placePieceOnField(64, player1)).to.throw(Error);
    });

    // Test:
    it('should throw an error if index is 3.5 (floating point number)' , () => {
        expect(() => gameBoard.placePieceOnField(3.5, player1)).to.throw(Error);
    });

    // Test:
    it('should throw an error if player is invalid' , () => {
        let player3 = new Player('some other player');
        expect(() => gameBoard.placePieceOnField(3, player3)).to.throw(Error);
    });

});
