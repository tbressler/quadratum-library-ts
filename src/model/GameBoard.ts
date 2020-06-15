import {Player} from "./Player";
import {GameBoardUtils} from "../utils/GameBoardUtils";
import {GameBoardListener} from "./GameBoardListener";

/**
 * A model for the game board.
 * A game board has 8 x 8 fields (with index 0 to 63) and 2 players.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class GameBoard {

    /* Player one. */
    private readonly player1: Player;

    /* Player two. */
    private readonly player2: Player;

    /* The fields of the game board. */
    private board: number[] = [];

    /* The listeners for the game board. */
    private listeners: GameBoardListener[] = [];


    /**
     * Creates a game board with the two given players.
     *
     * @param player1 Player one.
     * @param player2 Player two, must not be equal to player one.
     */
    constructor(player1: Player, player2: Player) {
        if ((player1 === player2) || (player1.getName === player2.getName)) throw new Error('Player 1 and 2 must not be equal!');
        this.player1 = player1;
        this.player2 = player2;
    }

    /** Returns player 1. */
    get getPlayer1() {
        return this.player1;
    }

    /** Returns player 2. */
    get getPlayer2() {
        return this.player2;
    }


    /**
     * Place a piece on the game board.
     *
     * @param index The field index, between 0 and 63.
     * @param player The player that places the piece (must be player 1 or 2 of course).
     */
    public placePieceOnField(index: number, player: Player): void {
        this.checkPlacePiecePrecondition(index, player);

        // Place piece on field.
        let fieldValue = (player == this.player1) ? 1 : 2;
        this.board[index] = fieldValue;

        // Notify all listeners.
        this.fireOnPiecePlaced(index, player);
    }

    /* Checks the preconditions for placing a piece on the game board. */
    private checkPlacePiecePrecondition(index: number, player: Player): void {
        // Check if player is valid.
        if ((player !== this.player1) && (player !== this.player2)) throw new Error('Player is invalid!');
        // Check if index is valid (between 0 and 63).
        GameBoardUtils.assertIndex(index);
        // Check if field is empty.
        if (!this.isFieldEmpty(index)) throw new Error('Field on game board is not empty!');
    }


    /**
     * Returns the player who placed the piece on the game board or null if no piece was placed
     * on the given field.
     *
     * @param index The field index, between 0 and 63.
     * @return The player who placed the piece or null if no piece was placed.
     */
    public getPieceFromField(index: number): Player | null {
        if (this.isFieldEmpty(index))
            return null;
        return (this.board[index] == 1) ? this.player1 : this.player2;
    }


    /**
     * Returns true if the field is empty. Otherwise this method returns false.
     *
     * @param index The field index, between 0 and 63.
     * @return True if the field is empty or false.
     */
    public isFieldEmpty(index: number): boolean {
        GameBoardUtils.assertIndex(index);
        return (!this.board[index]);
    }


    /**
     * Clears all fields of the game board.
     */
    public clearAllFields(): void {
        this.board = [];

        // Notify all listeners.
        this.fireOnGameBoardCleared();
    }


    /**
     * Adds a listener to the game board.
     *
     * @param listener The listener that should be added.
     */
    public addGameBoardListener(listener: GameBoardListener): void {
        this.listeners.push(listener);
    }

    /* Notifies all listeners that a piece was placed. */
    private fireOnPiecePlaced(index: number, player: Player) {
        this.listeners.forEach(l => l.onPiecePlaced(index, player));
    }

    /* Notifies all listeners that the game board was cleared. */
    private fireOnGameBoardCleared() {
        this.listeners.forEach(l => l.onGameBoardCleared());
    }

    /**
     * Removes a listener from the game board.
     *
     * @param listener The listener that should be removed.
     */
    public removeGameBoardListener(listener: GameBoardListener): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

}