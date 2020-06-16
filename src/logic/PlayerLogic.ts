import {Player} from "../model/Player";
import {GameBoard} from "../model/GameBoard";
import {LogicCallback} from "./LogicCallback";

/**
 * The interface for the player logic.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export interface PlayerLogic {

    /**
     * Returns the player of this logic.
     *
     * @return The player.
     */
    getPlayer(): Player;

    /**
     * Requests a move at the player logic. The move must be executed via the callback.
     *
     * @param gameBoard The game board.
     * @param callback The callback of the game logic.
     */
    requestMove(gameBoard: GameBoard, callback: LogicCallback): void;

}
