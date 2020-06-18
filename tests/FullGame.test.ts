import * as chai from 'chai';

import {Square} from "../src/model/Square";
import {GameLogic} from "../src/logic/GameLogic";
import {HumanPlayerLogic} from "../src/logic/players/HumanPlayerLogic";
import {GameLogicListener} from "../src/logic/GameLogicListener";
import {Player} from "../src/model/Player";
import {GameBoard} from "../src/model/GameBoard";
import {GameBoardListener} from "../src/model/GameBoardListener";

const expect = chai.expect;
describe('Full game', () => {

    // ---- Test setup:
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');
    let gameBoard: GameBoard;
    beforeEach(function () {
        gameBoard = new GameBoard(player1, player2);
    });

    // ---- Mock setup:
    function mockGameBoardListener(cbOPP: (n: number, p: Player) => void, cbOGBC: () => void): GameBoardListener {
        return new class implements GameBoardListener {
            onPiecePlaced(index: number, player: Player): void { cbOPP(index, player); }
            onGameBoardCleared(): void { cbOGBC(); }
        }
    }

    function mockGameLogicListener(cbAPC: (ap: Player) => void, cbGO: (w: Player|null) => void, cbGS: (ap: Player) => void, cbNSF: (p: Player, s: Square[]) => void) {
        return new class implements GameLogicListener {
            onActivePlayerChanged(activePlayer: Player): void { cbAPC(activePlayer); }
            onGameOver(winner: Player | null): void { cbGO(winner); }
            onGameStarted(activePlayer: Player): void { cbGS(activePlayer); }
            onNewSquaresFound(player: Player, squares: Square[]): void { cbNSF(player,squares); }
        }
    }


    // ---- Full games:

    // Game 1:
    it('where player 2 should win' , () => {

        // Setup listener for the game board:
        gameBoard.addGameBoardListener(mockGameBoardListener(() => {
                // on piece placed.
            }, () => {
                // on game board cleared.
            }));

        // Setup human player logic:
        let playerLogic1 = new HumanPlayerLogic(player1);
        let playerLogic2 = new HumanPlayerLogic(player2);
        let gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        let player2Won = false;
        gameLogic.addGameLogicListener(mockGameLogicListener(() => {
                // on active player changed.
            }, (winner) => {
                if (winner == player2) player2Won = true;
            }, () => {
                // on game started.
            }, () => {
                // on new squares found.
            }));

        // Start the game:
        gameLogic.startGame(player1);

        // Make moves:
        let player1Moves = [ 2, 4, 9, 11, 15, 16, 20, 22, 25, 27, 31, 32, 34, 36, 43, 45, 48];
        let player2Moves = [ 6, 8, 12, 18, 19, 23, 29, 33, 35, 38, 41, 42, 49, 51, 52, 55, 57];

        for (let i=0; i < player1Moves.length; i++) {
            playerLogic1.placePiece(player1Moves[i]);
            playerLogic2.placePiece(player2Moves[i]);
        }

        expect(player2Won).to.be.true;
        expect(gameLogic.getScore(player1)).to.equal(93);
        expect(gameLogic.getSquareCount(player1)).to.equal(5);
        expect(gameLogic.getScore(player2)).to.equal(155);
        expect(gameLogic.getSquareCount(player2)).to.equal(6);
    });

});