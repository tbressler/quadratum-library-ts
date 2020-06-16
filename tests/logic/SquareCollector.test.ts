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


    // ---- detectNewSquares(gameboard,player):

    function aSquare(pieces: quadruple, player: Player): Square {
        return new Square(pieces, player);
    }

    // Test:
    it('detectNewSquares(gameboard,player) should return empty array when the game board is empty' , () => {
        let result = squareCollector.detectNewSquares(gameBoard, player1);
        expect(result).to.length(0);
    });

    // Test:
    it('detectNewSquares(gameboard,player) should return 1 square after 4 pieces were set by one player' , () => {
        gameBoard.placePieceOnField(27, player1);
        gameBoard.placePieceOnField(32, player1);
        gameBoard.placePieceOnField(52, player1);
        gameBoard.placePieceOnField(57, player1);

        let result = squareCollector.detectNewSquares(gameBoard, player1);

        expect(result).to.length(1);
        expect(result).to.deep.include(aSquare([27,32,52,57], player1));
    });

    // Test:
    it('detectNewSquares(gameboard,player) should return 0 squares after 4 pieces were set by different players' , () => {
        gameBoard.placePieceOnField(27, player1);
        gameBoard.placePieceOnField(32, player2);
        gameBoard.placePieceOnField(52, player1);
        gameBoard.placePieceOnField(57, player2);

        let result = squareCollector.detectNewSquares(gameBoard, player1);

        expect(result).to.length(0);
    });

    // Test:
    it('detectNewSquares(gameboard,player) should return 2 squares after 8 pieces were set by different players' , () => {
        gameBoard.placePieceOnField(27, player1);
        gameBoard.placePieceOnField(1, player2);
        gameBoard.placePieceOnField(32, player1);
        gameBoard.placePieceOnField(4, player2);
        gameBoard.placePieceOnField(52, player1);
        gameBoard.placePieceOnField(25, player2);
        gameBoard.placePieceOnField(57, player1);
        gameBoard.placePieceOnField(28, player2);

        let resultPlayer1 = squareCollector.detectNewSquares(gameBoard, player1);
        let resultPlayer2 = squareCollector.detectNewSquares(gameBoard, player2);

        expect(resultPlayer1).to.length(1);
        expect(resultPlayer1).to.deep.include(aSquare([27,32,52,57], player1));
        expect(resultPlayer2).to.length(1);
        expect(resultPlayer2).to.deep.include(aSquare([1,4,25,28], player2));
    });

});