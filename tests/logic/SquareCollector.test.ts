import * as chai from 'chai';

import {Player} from "../../src/model/Player";
import {GameBoard} from "../../src/model/GameBoard";
import {SquareCollector} from "../../src/logic/SquareCollector";
import {quadruple, Square} from "../../src/model/Square";

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

    // ---- Mock setup:
    function mockPlayerMoves(movesPlayer1: number[], movesPlayer2: number[]): void {
        movesPlayer1.forEach(i => gameBoard.placePieceOnField(i, player1));
        movesPlayer2.forEach(i => gameBoard.placePieceOnField(i, player2));
    }

    function aSquare(pieces: quadruple, player: Player): Square {
        return new Square(pieces, player);
    }


    // ---- detectNewSquares(gameboard,player):

    // Test:
    it('detectNewSquares(gameboard,player) should return empty array when the game board is empty' , () => {
        let result = squareCollector.detectNewSquares(gameBoard, player1);
        expect(result).to.length(0);
    });

    // Test:
    it('detectNewSquares(gameboard,player) should return 1 square after 4 pieces were set by one player' , () => {
        mockPlayerMoves([27,32,52,57],[]);

        let result = squareCollector.detectNewSquares(gameBoard, player1);

        expect(result).to.length(1);
        expect(result).to.deep.include(aSquare([27,32,52,57], player1));
    });

    // Test:
    it('detectNewSquares(gameboard,player) should return 0 squares after 4 pieces were set by different players' , () => {
        mockPlayerMoves([27,52],[32, 57]);

        let result = squareCollector.detectNewSquares(gameBoard, player1);

        expect(result).to.length(0);
    });

    // Test:
    it('detectNewSquares(gameboard,player) should return 2 squares after 8 pieces were set by different players' , () => {
        mockPlayerMoves([27,32,52,57],[1,4,25,28]);

        let resultPlayer1 = squareCollector.detectNewSquares(gameBoard, player1);
        let resultPlayer2 = squareCollector.detectNewSquares(gameBoard, player2);

        expect(resultPlayer1).to.length(1);
        expect(resultPlayer1).to.deep.include(aSquare([27,32,52,57], player1));
        expect(resultPlayer2).to.length(1);
        expect(resultPlayer2).to.deep.include(aSquare([1,4,25,28], player2));
    });


    // ---- getDetectedSquares():

    // Test:
    it('getDetectedSquares() should return 0 squares when game board is empty' , () => {
        squareCollector.detectNewSquares(gameBoard, player1);
        squareCollector.detectNewSquares(gameBoard, player2);

        let resultPlayer1 = squareCollector.getDetectedSquares();

        expect(resultPlayer1).to.length(0);
    });

    // Test:
    it('getDetectedSquares() should return 2 squares after 8 pieces were set by one player' , () => {
        mockPlayerMoves([27,32,52,57],[]);
        squareCollector.detectNewSquares(gameBoard, player1);
        mockPlayerMoves([1,4,25,28],[]);
        squareCollector.detectNewSquares(gameBoard, player1);

        let resultPlayer1 = squareCollector.getDetectedSquares();

        expect(resultPlayer1).to.length(2);
        expect(resultPlayer1).to.deep.include(aSquare([27,32,52,57], player1));
        expect(resultPlayer1).to.deep.include(aSquare([1,4,25,28], player1));
    });

    // Test:
    it('getDetectedSquares() should return 3 squares after 12 pieces were set by two player' , () => {
        mockPlayerMoves([27,32,52,57, 2, 9, 11, 18],[1,4,25,28]);
        squareCollector.detectNewSquares(gameBoard, player1);
        squareCollector.detectNewSquares(gameBoard, player2);

        let resultPlayer1 = squareCollector.getDetectedSquares();

        expect(resultPlayer1).to.length(3);
        expect(resultPlayer1).to.deep.include(aSquare([27,32,52,57], player1));
        expect(resultPlayer1).to.deep.include(aSquare([2, 9, 11, 18], player1));
        expect(resultPlayer1).to.deep.include(aSquare([1,4,25,28], player2));
    });

    // ---- getScore(player):

    // Test:
    it('getScore(player) should return scores of 0 when the game board is empty' , () => {
        let scorePlayer1 = squareCollector.getScore(player1);
        let scorePlayer2 = squareCollector.getScore(player2);

        expect(scorePlayer1).to.equal(0);
        expect(scorePlayer2).to.equal(0);
    });

    // Test:
    it('getScore(player) should return scores for the squares of the two players' , () => {
        mockPlayerMoves([27,32,52,57, 2, 9, 11, 18],[1,4,25,28]);
        squareCollector.detectNewSquares(gameBoard, player1);
        squareCollector.detectNewSquares(gameBoard, player2);

        let scorePlayer1 = squareCollector.getScore(player1);
        let scorePlayer2 = squareCollector.getScore(player2);

        expect(scorePlayer1).to.equal(34);
        expect(scorePlayer2).to.equal(16);
    });


    // ---- getSquareCount(player):

    // Test:
    it('getSquareCount(player) should return 0 squares when game board is empty' , () => {
        squareCollector.detectNewSquares(gameBoard, player1);
        squareCollector.detectNewSquares(gameBoard, player2);

        let countPlayer1 = squareCollector.getSquareCount(player1);
        let countPlayer2 = squareCollector.getSquareCount(player2);

        expect(countPlayer1).to.equal(0);
        expect(countPlayer2).to.equal(0);
    });


    // Test:
    it('getSquareCount(player) should return number of squares of the two players' , () => {
        mockPlayerMoves([27,32,52,57, 2, 9, 11, 18],[1,4,25,28]);
        squareCollector.detectNewSquares(gameBoard, player1);
        squareCollector.detectNewSquares(gameBoard, player2);

        let countPlayer1 = squareCollector.getSquareCount(player1);
        let countPlayer2 = squareCollector.getSquareCount(player2);

        expect(countPlayer1).to.equal(2);
        expect(countPlayer2).to.equal(1);
    });


    // ---- reset():

    // Test:
    it('reset() should return clear all squares and scores' , () => {
        mockPlayerMoves([27,32,52,57, 2, 9, 11, 18],[1,4,25,28]);
        squareCollector.detectNewSquares(gameBoard, player1);
        squareCollector.detectNewSquares(gameBoard, player2);

        gameBoard.clearAllFields();
        squareCollector.reset();

        squareCollector.detectNewSquares(gameBoard, player1);
        squareCollector.detectNewSquares(gameBoard, player2);

        expect(squareCollector.getDetectedSquares()).to.length(0);
        expect(squareCollector.getSquareCount(player1)).to.equal(0);
        expect(squareCollector.getSquareCount(player1)).to.equal(0);
        expect(squareCollector.getScore(player1)).to.equal(0);
        expect(squareCollector.getScore(player2)).to.equal(0);
    });

});