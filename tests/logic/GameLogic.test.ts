import * as chai from 'chai';

import {GameLogic} from "../../src/logic/GameLogic";
import {GameBoard} from "../../src/model/GameBoard";
import {Player} from "../../src/model/Player";
import {PlayerLogic} from "../../src/logic/PlayerLogic";
import {LogicCallback} from "../../src/logic/LogicCallback";
import {GameLogicListener} from "../../src/logic/GameLogicListener";
import {quadruple, Square} from "../../src/model/Square";
import {SquareCollector} from "../../src/logic/SquareCollector";
import {GameOverState, GameOverVerifier} from "../../src/logic/GameOverVerifier";

const expect = chai.expect;
describe('GameLogic class', () => {

    // Simple placeholder to ignore callbacks.
    let _null = () => {};

    // ---- Test setup:
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');
    let gameBoard = new GameBoard(player1, player2);
    let playerLogic1: PlayerLogic;
    let playerLogic2: PlayerLogic;
    let gameLogic: GameLogic;

    // ---- Mock setup:
    function mockPlayerMoves(movesPlayer1: number[], movesPlayer2: number[]): void {
        movesPlayer1.forEach(i => gameBoard.placePieceOnField(i, player1));
        movesPlayer2.forEach(i => gameBoard.placePieceOnField(i, player2));
    }

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

    function mockSquareCollector(cbR : () => void) {
        return new class extends SquareCollector {
            reset() { cbR(); }
        }
    }

    function mockGameOverVerifier(minScore: number, minDifference: number, mockedState: GameOverState) {
        return new class extends GameOverVerifier {
            constructor() { super(minScore, minDifference); }
            isGameOver(gameBoard: GameBoard, squareCollector: SquareCollector): GameOverState { return mockedState; }
        };
    }

    function aSquare(pieces: quadruple, player: Player): Square {
        return new Square(pieces, player);
    }


    // ---- constructor(gameboard,playerLogic1,playerLogic2):

    // Test:
    it('constructor(gameboard,playerLogic1,playerLogic2) should throw an error if playerLogic1 has unknown player' , () => {
        let nonGameBoardPlayer = new Player('unknown player');
        playerLogic1 = mockPlayerLogic(nonGameBoardPlayer, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);

        expect(() => new GameLogic(gameBoard, playerLogic1, playerLogic2)).to.throw(Error);
    });

    // Test:
    it('constructor(gameboard,playerLogic1,playerLogic2) should throw an error if playerLogic2 has unknown player' , () => {
        let nonGameBoardPlayer = new Player('unknown player');
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(nonGameBoardPlayer, () => {});

        expect(() => new GameLogic(gameBoard, playerLogic1, playerLogic2)).to.throw(Error);
    });

    // Test:
    it('constructor(gameboard,playerLogic1,playerLogic2) should throw an error if both playerLogics have the same player 1' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player1, _null);

        expect(() => new GameLogic(gameBoard, playerLogic1, playerLogic2)).to.throw(Error);
    });

    // Test:
    it('constructor(gameboard,playerLogic1,playerLogic2) should throw an error if both playerLogics have the same player 2' , () => {
        playerLogic1 = mockPlayerLogic(player2, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);

        expect(() => new GameLogic(gameBoard, playerLogic1, playerLogic2)).to.throw(Error);
    });


    // ---- isGameStarted():

    // Test:
    it('isGameStarted() should return false when game was not started before' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        expect(gameLogic.isGameStarted()).to.be.false;
    });

    // Test:
    it('isGameStarted() should return true when game was started before' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player1);

        expect(gameLogic.isGameStarted()).to.be.true;
    });


    // ---- startGame(player):

    // Test:
    it('startGame(player) should notify game logic listeners onGameStarted() with player1 when game was started with player1' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);
        let startNotified = false;

        gameLogic.addGameLogicListener(mockGameLogicListener(_null, _null, (player) => {
            if (player == player1) startNotified = true;
        }, _null));
        gameLogic.startGame(player1);

        expect(startNotified).to.be.true;
    });


    // Test:
    it('startGame(player) should throw an error for unknown players' , () => {
        let nonGameBoardPlayer = new Player('unknown player');
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        expect(() => gameLogic.startGame(nonGameBoardPlayer)).to.throw(Error);
    });

    // Test:
    it('startGame(player) should reset the square collector' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        let squareCollectorReset = false;
        gameLogic.setSquareCollector(mockSquareCollector(() => {
            squareCollectorReset = true;
        }));

        gameLogic.startGame(player1)

        expect(squareCollectorReset).to.be.true;
    });

    // Test:
    it('startGame(player) should notify game logic listeners onGameStarted() with player2 when game was started with player2' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);
        let startNotified = false;

        gameLogic.addGameLogicListener(mockGameLogicListener(_null, _null, (player) => {
            if (player == player2) startNotified = true;
        }, _null));
        gameLogic.startGame(player2);

        expect(startNotified).to.be.true;
    });

    // Test:
    it('startGame(player) should notify listeners onActivePlayerChanged() with player1 when game was started with player1' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        let activePlayerChanged = false;
        gameLogic.addGameLogicListener(mockGameLogicListener((ap) => {
            if (ap == player1) activePlayerChanged = true;
        }, _null, _null, _null));

        gameLogic.startGame(player1)

        expect(activePlayerChanged).to.be.true;
    });

    // Test:
    it('startGame(player) should notify listeners onActivePlayerChanged() with player2 when game was started with player2' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        let activePlayerChanged = false;
        gameLogic.addGameLogicListener(mockGameLogicListener((ap) => {
            if (ap == player2) activePlayerChanged = true;
        }, _null, _null, _null));

        gameLogic.startGame(player2)

        expect(activePlayerChanged).to.be.true;
    });

    // Test:
    it('startGame(player) should request move on player logic for player 1 when game was started with player1' , () => {
        let requestMove = false;
        playerLogic1 = mockPlayerLogic(player1, () => {
            requestMove = true;
        });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player1)

        expect(requestMove).to.be.true;
    });

    // Test:
    it('startGame(player) should request move on player logic for player 2 when game was started with player2' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        let requestMove = false;
        playerLogic2 = mockPlayerLogic(player2, () => {
            requestMove = true;
        });
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player2)

        expect(requestMove).to.be.true;
    });

    // Test:
    it('player logic should place a piece on the game board when making a move' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => {
            cb.makeMove(10);
        });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player1)

        expect(gameBoard.getPieceFromField(10)).to.equal(player1);
    });

    // Test:
    it('player logic should place the pieces when player logic 1 and 2 making moves' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => {
            cb.makeMove(10);
        });
        playerLogic2 = mockPlayerLogic(player2, (gb,cb) => {
            cb.makeMove(20);
        });
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player1)

        expect(gameBoard.getPieceFromField(10)).to.equal(player1);
        expect(gameBoard.getPieceFromField(20)).to.equal(player2);
    });

    // Test:
    it('player logic should not make a move if the field is not empty (makeMove() returns false)' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => {
            cb.makeMove(23);
        });
        let emptyFieldResult = false;
        playerLogic2 = mockPlayerLogic(player2, (gb,cb) => {
            if (cb.makeMove(23) == false) emptyFieldResult = true;
        });
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player1)

        expect(gameBoard.getPieceFromField(23)).to.equal(player1);
        expect(emptyFieldResult).to.be.true;
    });

    // Test:
    it('player logic should throw an error if index is lower than 0 when making a move' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => {
            cb.makeMove(-1);
        });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        expect(() => gameLogic.startGame(player1)).to.throw(Error);
    });

    // Test:
    it('player logic should throw an error if index is greater than 63 when making a move' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => {
            cb.makeMove(64);
        });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        expect(() => gameLogic.startGame(player1)).to.throw(Error);
    });

    // Test:
    it('player logic should throw an error if index is no integer when making a move' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => {
            cb.makeMove(23.5);
        });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        expect(() => gameLogic.startGame(player1)).to.throw(Error);
    });

    // Test:
    it('player logic should notify game logic listeners when game was won by player 1' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => { cb.makeMove(14); });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);
        gameLogic.setGameOverVerifier(mockGameOverVerifier(150, 15, GameOverState.PLAYER1_WON));
        let player1WinsNotified = false;
        gameLogic.addGameLogicListener(mockGameLogicListener(_null, (w) => {
            if (w == player1) player1WinsNotified = true;
        }, _null, _null));

        gameLogic.startGame(player1);

        expect(player1WinsNotified).to.be.true;
    });

    // Test:
    it('player logic should notify game logic listeners when game was won by player 1' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => { cb.makeMove(14); });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);
        gameLogic.setGameOverVerifier(mockGameOverVerifier(150, 15, GameOverState.PLAYER2_WON));
        let player2WinsNotified = false;
        gameLogic.addGameLogicListener(mockGameLogicListener(_null, (w) => {
            if (w == player2) player2WinsNotified = true;
        }, _null, _null));

        gameLogic.startGame(player1);

        expect(player2WinsNotified).to.be.true;
    });

    // Test:
    it('player logic should notify game logic listeners when game was won by player 1' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => { cb.makeMove(14); });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);
        gameLogic.setGameOverVerifier(mockGameOverVerifier(150, 15, GameOverState.GAME_DRAW));
        let gameDrawNotified = false;
        gameLogic.addGameLogicListener(mockGameLogicListener(_null, (w) => {
            if (!w) gameDrawNotified = true;
        }, _null, _null));

        gameLogic.startGame(player1);

        expect(gameDrawNotified).to.be.true;
    });

    // Test:
    it('player logic should notify squares when found' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => { mockPlayerMoves([27,32,52],[]); cb.makeMove(57); });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);
        let newSquaresFoundNotified = false;
        gameLogic.addGameLogicListener(mockGameLogicListener(_null, _null, _null, (p,s) => {
            newSquaresFoundNotified = true;
            expect(s).to.deep.include(aSquare([27,32,52,57], player1));
        }));

        gameLogic.startGame(player1);

        expect(newSquaresFoundNotified).to.be.true;
        expect(gameLogic.getSquareCount(player1)).to.equal(1);
        expect(gameLogic.getScore(player1)).to.equal(25);
        expect(gameLogic.getSquares()).to.length(1);
        expect(gameLogic.getSquares()).to.deep.include(aSquare([27,32,52,57], player1));
    });


    // ---- getActivePlayer():

    // Test:
    it('getActivePlayer() should return null if game was not started before' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        expect(gameLogic.getActivePlayer()).to.be.null;
    });

    // Test:
    it('getActivePlayer() should return player1 if game was started with player1' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player1);

        expect(gameLogic.getActivePlayer()).to.equal(player1);
    });

    // Test:
    it('getActivePlayer() should return player2 if game was started with player2' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        gameLogic.startGame(player2);

        expect(gameLogic.getActivePlayer()).to.equal(player2);
    });


    // ---- getGameBoard():

    // Test:
    it('getGameBoard() should return game board' , () => {
        playerLogic1 = mockPlayerLogic(player1, _null);
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);

        expect(gameLogic.getGameBoard()).to.equal(gameBoard);
    });


    // ---- removeGameLogicListener(listener):

    // Test:
    it('removeGameLogicListener(listener) should remove listener and doesn\'t get notified' , () => {
        playerLogic1 = mockPlayerLogic(player1, (gb,cb) => { cb.makeMove(14); });
        playerLogic2 = mockPlayerLogic(player2, _null);
        gameLogic = new GameLogic(gameBoard, playerLogic1, playerLogic2);
        let listener1Notified = false;
        let listener1 = mockGameLogicListener(_null, _null, () => {
            listener1Notified = true;
        }, _null);
        let listener2Notified = false;
        let listener2 = mockGameLogicListener(_null, _null, () => {
            listener2Notified = true;
        }, _null);

        gameLogic.addGameLogicListener(listener1);
        gameLogic.addGameLogicListener(listener2);
        gameLogic.removeGameLogicListener(listener1)

        gameLogic.startGame(player1);

        expect(listener1Notified).to.be.false;
        expect(listener2Notified).to.be.true;
    });


});