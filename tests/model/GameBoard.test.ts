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

});
