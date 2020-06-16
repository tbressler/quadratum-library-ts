import * as chai from 'chai';

import {GameLogic} from "../../src/logic/GameLogic";
import {GameBoard} from "../../src/model/GameBoard";
import {Player} from "../../src/model/Player";
import {PlayerLogic} from "../../src/logic/PlayerLogic";
import {LogicCallback} from "../../src/logic/LogicCallback";
import {GameLogicListener} from "../../src/logic/GameLogicListener";
import {Square} from "../../src/model/Square";

const expect = chai.expect;
describe('GameLogic class', () => {

    let _ignore = () => {};

    // ---- Test setup:
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');
    let gameBoard = new GameBoard(player1, player2);
    let playerLogic1: PlayerLogic;
    let playerLogic2: PlayerLogic;
    let gameLogic: GameLogic;
    // beforeEach(function () {
    //
    // });

    // ---- Mock setup:
    function mockPlayerLogic(player: Player, cbRM: (gameBoard: GameBoard, callback: LogicCallback) => void) {
        return new class implements PlayerLogic {
            getPlayer(): Player { return player; }
            requestMove(gameBoard: GameBoard, callback: LogicCallback): void { cbRM(gameBoard, callback); }
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


    // ---- constructor(gameboard,playerLogic1,playerLogic2):

    // Test:
    it('constructor(gameboard,playerLogic1,playerLogic2) should throw an error if playerLogic1 has unknown player' , () => {
        let nonGameBoardPlayer = new Player('unknown player');
        playerLogic1 = mockPlayerLogic(nonGameBoardPlayer, _ignore);
        playerLogic2 = mockPlayerLogic(player2, _ignore);

        expect(() => new GameLogic(gameBoard, playerLogic1, playerLogic2)).to.throw(Error);
    });

    // Test:
    it('constructor(gameboard,playerLogic1,playerLogic2) should throw an error if playerLogic2 has unknown player' , () => {
        let nonGameBoardPlayer = new Player('unknown player');
        playerLogic1 = mockPlayerLogic(player1, _ignore);
        playerLogic2 = mockPlayerLogic(nonGameBoardPlayer, () => {});

        expect(() => new GameLogic(gameBoard, playerLogic1, playerLogic2)).to.throw(Error);
    });

    // Test:
    it('constructor(gameboard,playerLogic1,playerLogic2) should throw an error if both playerLogics have the same player 1' , () => {
        playerLogic1 = mockPlayerLogic(player1, _ignore);
        playerLogic2 = mockPlayerLogic(player1, _ignore);

        expect(() => new GameLogic(gameBoard, playerLogic1, playerLogic2)).to.throw(Error);
    });

    // Test:
    it('constructor(gameboard,playerLogic1,playerLogic2) should throw an error if both playerLogics have the same player 2' , () => {
        playerLogic1 = mockPlayerLogic(player2, _ignore);
        playerLogic2 = mockPlayerLogic(player2, _ignore);

        expect(() => new GameLogic(gameBoard, playerLogic1, playerLogic2)).to.throw(Error);
    });


    // ---- isGameStarted():

    // Test:
    it('isGameStarted() should return false when game was not started before' , () => {
        playerLogic1 = mockPlayerLogic(player1, _ignore);
        playerLogic2 = mockPlayerLogic(player2, _ignore);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        expect(gameLogic.isGameStarted()).to.be.false;
    });

    // Test:
    it('isGameStarted() should return true when game was started before' , () => {
        playerLogic1 = mockPlayerLogic(player1, _ignore);
        playerLogic2 = mockPlayerLogic(player2, _ignore);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player1);

        expect(gameLogic.isGameStarted()).to.be.true;
    });

    // Test:
    it('isGameStarted() should return true when game was started before' , () => {
        playerLogic1 = mockPlayerLogic(player1, _ignore);
        playerLogic2 = mockPlayerLogic(player2, _ignore);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player1);

        expect(gameLogic.isGameStarted()).to.be.true;
    });

    // Test:
    it('isGameStarted() should notify game logic listener' , () => {
        playerLogic1 = mockPlayerLogic(player1, _ignore);
        playerLogic2 = mockPlayerLogic(player2, _ignore);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);
        let startNotified = false;

        gameLogic.addGameLogicListener(mockGameLogicListener(_ignore, _ignore, () => { startNotified = true }, _ignore));
        gameLogic.startGame(player1);

        expect(startNotified).to.be.true;
    });

});