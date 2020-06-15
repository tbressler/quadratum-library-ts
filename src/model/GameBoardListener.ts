import {Player} from "./Player";

/**
 * A listener for the game board.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export interface GameBoardListener {

    /**
     * This method is called, if a piece was placed on the game board.
     *
     * @param index The index where the piece was placed (0..63).
     * @param player The player who has placed the piece.
     */
    onPiecePlaced(index: number, player: Player): void;

    /**
     * This method is called, if the game board was cleared.
     */
    onGameBoardCleared(): void;

}