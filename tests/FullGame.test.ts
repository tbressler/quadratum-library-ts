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
    it('where player 1 should win' , () => {

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

        let player1Won = false;
        gameLogic.addGameLogicListener(mockGameLogicListener(() => {
                // on active player changed.
            }, (winner) => {
                if (winner == player1) player1Won = true;
            }, () => {
                // on game started.
            }, () => {
                // on new squares found.
            }));

        // Start the game:
        gameLogic.startGame(player1);

        // Make moves:
        // TODO Add moves that lets player 1 win:
        let player1Moves = [ 1, 15, 48, 62, 10, 12, 14, 26, 30, 28];
        let player2Moves = [34, 59, 54, 29, 36, 38, 52, 18, 20, 36];

        for (let i=0; i < player1Moves.length; i++) {
            playerLogic1.placePiece(player1Moves[i]);
            playerLogic2.placePiece(player2Moves[i]);
        }

        // TODO expect(player1Won).to.be.true;
        // TODO expect(gameLogic.getScore(player1)).to.equal(150);
        // TODO expect(gameLogic.getScore(player2)).to.equal(100);
    });

});