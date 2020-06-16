import {Player} from "../../model/Player";
import {PlayerLogic} from "../PlayerLogic";
import {GameBoard} from "../../model/GameBoard";
import {LogicCallback} from "../LogicCallback";

/**
 * An abstract implementation for the player logic interface.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export abstract class AbstractPlayerLogic implements PlayerLogic {

    /* The player. */
    private readonly player: Player;


    /**
     * Creates the abstract player logic.
     *
     * @param player The player.
     */
    protected constructor(player: Player) {
        this.player = player;
    }

    /**
     * Returns the player of this logic.
     *
     * @return The player.
     */
    public getPlayer(): Player {
        return this.player;
    }

    /**
     * Requests a move at the player logic. The move must be executed via the callback.
     *
     * @param gameBoard The game board.
     * @param callback The callback of the game logic.
     */
    abstract requestMove(gameBoard: GameBoard, callback: LogicCallback): void;

}
