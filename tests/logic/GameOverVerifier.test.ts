import * as chai from 'chai';

import {Player} from "../../src/model/Player";
import {GameBoard} from "../../src/model/GameBoard";
import {SquareCollector} from "../../src/logic/SquareCollector";
import {GameOverState, GameOverVerifier} from "../../src/logic/GameOverVerifier";

const expect = chai.expect;
describe('GameOverVerifier class', () => {

    // ---- Test setup:
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');
    let gameBoard: GameBoard;
    let gameOverVerifier: GameOverVerifier;
    beforeEach(function () {
        gameBoard = new GameBoard(player1, player2);
        gameOverVerifier = new GameOverVerifier(150, 15);
    });

    // ---- Mock setup:
    function mockPlayerMoves(movesPlayer1: number[], movesPlayer2: number[]): void {
        movesPlayer1.forEach(i => gameBoard.placePieceOnField(i, player1));
        movesPlayer2.forEach(i => gameBoard.placePieceOnField(i, player2));
    }
    function mockSquareCollector(scorePlayer1: number, scorePlayer2: number): SquareCollector {
        return new class extends SquareCollector {
            getScore(player: Player): number {
                return (player == player1) ? scorePlayer1 : scorePlayer2;
            }
        }
    }
    function mockGameBoard(piece: Player|null, leaveIndexEmpty: number = -1): GameBoard {
        return new class extends GameBoard {
            constructor() {
                super(player1, player2);
            }
            getPieceFromField(index: number): Player|null {
                if (leaveIndexEmpty == index)
                    return null;
                return piece;
            }
        }
    }


    // ---- constructor(minScore,minDifference):

    // Test:
    it('constructor(minScore,minDifference) should throw an error when minScore is negative' , () => {
        expect(() => new GameOverVerifier(-1, 15)).to.throw(Error);
    });

    // Test:
    it('constructor(minScore,minDifference) should throw an error when minScore is 0' , () => {
        expect(() => new GameOverVerifier(0, 15)).to.throw(Error);
    });

    // Test:
    it('constructor(minScore,minDifference) should throw an error when minDifference is negative' , () => {
        expect(() => new GameOverVerifier(150, -1)).to.throw(Error);
    });

    // Test:
    it('constructor(minScore,minDifference) should throw an error when minDifference is 0' , () => {
        expect(() => new GameOverVerifier(150, 0)).to.throw(Error);
    });


    // ---- isGameOver(gameboard,squareCollector):

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return PLAYER1_WON if player1 has a score of 150 and player2 only 135' , () => {
        let squareCollector = mockSquareCollector(150, 135);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.PLAYER1_WON);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return PLAYER1_WON if player1 has a score of 165 and player2 only 150' , () => {
        let squareCollector = mockSquareCollector(165, 150);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.PLAYER1_WON);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return PLAYER2_WON if player1 has a score of 135 and player2 only 150' , () => {
        let squareCollector = mockSquareCollector(135, 150);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.PLAYER2_WON);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return PLAYER2_WON if player1 has a score of 150 and player2 only 165' , () => {
        let squareCollector = mockSquareCollector(150, 165);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.PLAYER2_WON);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return NOT_OVER if player1 has a score of 0 and player2 only 0' , () => {
        let squareCollector = mockSquareCollector(0, 0);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.NOT_OVER);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return NOT_OVER if player1 has a score of 0 and player2 only 15' , () => {
        let squareCollector = mockSquareCollector(0, 15);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.NOT_OVER);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return NOT_OVER if player1 has a score of 15 and player2 only 0' , () => {
        let squareCollector = mockSquareCollector(15, 0);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.NOT_OVER);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return NOT_OVER if player1 has a score of 150 and player2 only 150' , () => {
        let squareCollector = mockSquareCollector(150, 150);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.NOT_OVER);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return NOT_OVER if player1 has a score of 30 and player2 only 60' , () => {
        let squareCollector = mockSquareCollector(30, 60);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.NOT_OVER);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return PLAYER1_WON if no more moves possible and player1 has a higher score' , () => {
        let squareCollector = mockSquareCollector(60, 30);
        gameBoard = mockGameBoard(player1);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.PLAYER1_WON);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return PLAYER2_WON if no more moves possible and player2 has a higher score' , () => {
        let squareCollector = mockSquareCollector(30, 60);
        gameBoard = mockGameBoard(player1);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.PLAYER2_WON);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return GAME_DRAW if no more moves possible and both player have the same score' , () => {
        let squareCollector = mockSquareCollector(30, 30);
        gameBoard = mockGameBoard(player1);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.GAME_DRAW);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return PLAYER1_WON if player1 leads and he can do more squares' , () => {
        let squareCollector = mockSquareCollector(60, 30);
        gameBoard = mockGameBoard(player1, 10);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.PLAYER1_WON);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return NOT_OVER if player1 lags behind but can do more squares' , () => {
        let squareCollector = mockSquareCollector(30, 60);
        gameBoard = mockGameBoard(player1, 10);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.NOT_OVER);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return PLAYER2_WON if player2 leads and can do more squares' , () => {
        let squareCollector = mockSquareCollector(30, 60);
        gameBoard = mockGameBoard(player2, 10);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.PLAYER2_WON);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return NOT_OVER if player2 lag behind but can do more squares' , () => {
        let squareCollector = mockSquareCollector(60, 30);
        gameBoard = mockGameBoard(player2, 10);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.NOT_OVER);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return NOT_OVER if score is draw and player1 can do more squares' , () => {
        let squareCollector = mockSquareCollector(60, 60);
        gameBoard = mockGameBoard(player1, 10);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.NOT_OVER);
    });

    // Test:
    it('isGameOver(gameBoard,squareCollector) should return NOT_OVER if score is draw and player2 can do more squares' , () => {
        let squareCollector = mockSquareCollector(60, 60);
        gameBoard = mockGameBoard(player2, 10);
        expect(gameOverVerifier.isGameOver(gameBoard, squareCollector)).to.equal(GameOverState.NOT_OVER);
    });

});