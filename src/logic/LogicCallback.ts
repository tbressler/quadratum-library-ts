import {Player} from "../model/Player";

/**
 * This interface is used as a callback between the game logic and the player logic.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export interface LogicCallback {

    /**
     * Make the move on the game board.
     *
     * @param index The field index, between 0..63.
     * @param player The player.
     * @return True if the move was successful or false if not.
     */
    makeMove(index: number): boolean;

}
