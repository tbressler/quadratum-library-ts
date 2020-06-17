import {GameBoard} from "../model/GameBoard";
import {PlayerLogic} from "./PlayerLogic";
import {Player} from "../model/Player";
import {GameLogicListener} from "./GameLogicListener";
import {SquareCollector} from "./SquareCollector";
import {GameOverState, GameOverVerifier} from "./GameOverVerifier";
import {LogicCallback} from "./LogicCallback";
import {Square} from "../model/Square";
import {GameBoardUtils} from "../utils/GameBoardUtils";

/**
 * The game logic.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class GameLogic {

    /*The game board. */
    private readonly gameBoard: GameBoard;

    /* The player logic of player1. */
    private readonly playerLogic1: PlayerLogic;

    /* The player logic of player2. */
    private readonly playerLogic2: PlayerLogic;

    /* Player of player logic 1. */
    private readonly player1: Player;

    /* Player of player logic 2. */
    private readonly player2: Player;

    /* Callback for the player logic. */
    private readonly playerLogicCallback: LogicCallback;

    /* The listeners. */
    private listeners: GameLogicListener[] = [];

    /* The active player logic. */
    private activePlayerLogic: PlayerLogic|null = null;

    /* Is true if the game was started, otherwise false. */
    private isStarted = false;

    /* The squares. */
    private squareCollector = new SquareCollector();

    /* The game over verifier. */
    private gameOverVerifier = new GameOverVerifier(150, 15);


    /**
     * Creates the game logic.
     *
     * @param gameBoard The game board.
     * @param playerLogic1 The logic for player 1.
     * @param playerLogic2 The logic for player 2.
     */
    public constructor(gameBoard: GameBoard, playerLogic1: PlayerLogic, playerLogic2: PlayerLogic) {
        this.gameBoard = gameBoard;
        this.playerLogic1 = playerLogic1;
        this.playerLogic2 = playerLogic2;
        this.player1 = playerLogic1.getPlayer();
        this.player2 = playerLogic2.getPlayer();

        this.playerLogicCallback = this.initLogicCallback();

        this.checkPlayers(gameBoard, this.player1, this.player2);
    }

    /* Initializes the logic callback. */
    private initLogicCallback(): LogicCallback {
        const _parent = this;
        return  new class implements LogicCallback {

            public makeMove(index: number): boolean {
                if (!_parent.isGameStarted())
                    throw new Error('Game is not started!');
                GameBoardUtils.assertIndex(index);

                if (!_parent.gameBoard.isFieldEmpty(index))
                    return false;

                _parent.gameBoard.placePieceOnField(index, _parent.activePlayerLogic!.getPlayer());

                _parent.checkGameBoardForSquares(_parent.activePlayerLogic!.getPlayer());
                if (_parent.checkIfGameIsOver())
                    return true;

                _parent.switchActivePlayer();

                return true;
            }
        };
    }

    /* Checks if players of player logic and game board are correct. */
    private checkPlayers(gameBoard: GameBoard, player1: Player, player2: Player): void {
        if (player1 == player2)
            throw new Error('playerLogic1 and playerLogic2 uses the same player!');
        if ((player1 != gameBoard.getPlayer1()) || (player2 != gameBoard.getPlayer2()))
            throw new Error('Players of logic and game board doesn\'t match!');
    }


    /**
     * Set the square collector. This method should only be used for testing purposes.
     *
     * @param squareCollector The square collector.
     */
    public setSquareCollector(squareCollector: SquareCollector): void {
        this.squareCollector = squareCollector;
    }


    /**
     * Set the game over verifier. This method should only be used for testing purposes.
     *
     * @param gameOverVerifier The game over verifier.
     */
    public setGameOverVerifier(gameOverVerifier: GameOverVerifier): void {
        this.gameOverVerifier = gameOverVerifier;
    }


    /* Checks the game board for new squares. */
    private checkGameBoardForSquares(player: Player): void {
        let foundSquares = this.squareCollector.detectNewSquares(this.gameBoard, player);
        if (foundSquares.length == 0)
            return;
        this.fireOnNewSquaresFound(player, foundSquares);
    }

    /* Returns true if the game is over, otherwise false. */
    private checkIfGameIsOver(): boolean {
        switch(this.gameOverVerifier.isGameOver(this.gameBoard, this.squareCollector)) {
            case GameOverState.NOT_OVER:
                return false;
            case GameOverState.PLAYER1_WON:
                this.fireOnGameOver(this.player1);
                return true;
            case GameOverState.PLAYER2_WON:
                this.fireOnGameOver(this.player2);
                return true;
            case GameOverState.GAME_DRAW:
                this.fireOnGameOver(null);
                return true;
            default:
                throw new Error('Unknown game over state!');
        }
    }


    /**
     * Starts the game. Clears the game board if a game was started before.
     *
     * @param player The active player, who can do the first turn.
     */
    public startGame(player: Player): void {
        this.checkStartGamePrecondition(player);

        this.gameBoard.clearAllFields();
        this.squareCollector.reset();

        this.isStarted = true;

        this.fireOnGameStarted(player);

        if (player == this.player1)
            this.setActivePlayerLogicTo(this.playerLogic1);
        else
            this.setActivePlayerLogicTo(this.playerLogic2);
    }

    /* Checks if the active player is valid. */
    private checkStartGamePrecondition(activePlayer: Player): void {
        if ((activePlayer != this.player1) && (activePlayer != this.player2))
            throw new Error('Player is unknown at the game board!');
    }

    /* Switches the active player. */
    private switchActivePlayer(): void {
        if (this.activePlayerLogic == this.playerLogic1)
            this.setActivePlayerLogicTo(this.playerLogic2);
        else
            this.setActivePlayerLogicTo(this.playerLogic1);
    }

    /* Changes the active player to the given player. */
    private setActivePlayerLogicTo(playerLogic: PlayerLogic): void {
        this.activePlayerLogic = playerLogic;

        // Notify listeners.
        this.fireOnActivePlayerChanged(playerLogic.getPlayer());

        // Request move at the player logic.
        playerLogic.requestMove(this.gameBoard, this.playerLogicCallback);
    }


    /**
     * Returns the active player or null if the game has not started yet.
     *
     * @return The active player or null.
     */
    public getActivePlayer(): Player|null {
        if (this.activePlayerLogic == null)
            return null;
        return this.activePlayerLogic.getPlayer();
    }


    /**
     * Returns true if the game was started, otherwise the method returns false.
     *
     * @return true if the game was started, otherwise false.
     */
    public isGameStarted(): boolean {
        return this.isStarted;
    }


    /**
     * Returns the game board.
     *
     * @return The game board.
     */
    public getGameBoard(): GameBoard {
        return this.gameBoard;
    }


    /**
     * Returns all found squares of the current game.
     *
     * @return A set of squares or an empty set.
     */
    public getSquares(): Square[] {
        return this.squareCollector.getDetectedSquares();
    }


    /**
     * Returns the current score of the given player.
     *
     * @param player The player.
     * @return The score of the given player.
     */
    public getScore(player: Player): number {
        return this.squareCollector.getScore(player);
    }

    /**
     * Returns the current number of squares for the given player.
     *
     * @param player The player.
     * @return The current number of squares for the given player.
     */
    public getSquareCount(player: Player): number {
        return this.squareCollector.getSquareCount(player);
    }


    /**
     * Adds a listener to the game logic.
     *
     * @param listener the listener.
     */
    public addGameLogicListener(listener: GameLogicListener): void {
        this.listeners.push(listener);
    }

    /* Notifies the game board listeners that the game has started. */
    private fireOnGameStarted(activePlayer: Player): void {
        this.listeners.forEach(l => l.onGameStarted(activePlayer));
    }

    /* Notifies all listeners that the active player has changed. */
    private fireOnActivePlayerChanged(player: Player): void {
        this.listeners.forEach(l => l.onActivePlayerChanged(player));
    }

    /* Notifies listener about new squares. */
    private fireOnNewSquaresFound(player: Player, foundSquares: Square[]): void {
        this.listeners.forEach(l => l.onNewSquaresFound(player, foundSquares));
    }

    /* Notifies listeners that game is over and given player won. */
    private fireOnGameOver(player: Player|null): void {
        this.listeners.forEach(l => l.onGameOver(player));
    }

    /**
     * Removes a listener from the game logic.
     *
     * @param listener the listener.
     */
    public removeGameLogicListener(listener: GameLogicListener): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

}
