import {Player} from "../model/Player";
import {Square} from "../model/Square";

/**
 * A listener for the game logic.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export interface GameLogicListener {

    /**
     * Method is called when the game is over. The given parameter winner indicates which player
     * won the game. If the parameter is null, the game is a draw.
     *
     * @param winner The winner of the game or null if the game is a draw.
     */
    onGameOver(winner: Player|null): void;

    /**
     * Method is called when new squares were found.
     *
     * @param player The player.
     * @param squares The new squares that were found.
     */
    onNewSquaresFound(player: Player, squares: Square[]): void;

    /**
     * Method is called when the active player changed.
     *
     * @param activePlayer The active player.
     */
    onActivePlayerChanged(activePlayer: Player): void;

    /**
     * Method is called when a game was started.
     *
     * @param activePlayer The active player.
     */
    onGameStarted(activePlayer: Player): void;

}