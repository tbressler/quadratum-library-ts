import {AbstractPlayerLogic} from "./AbstractPlayerLogic";
import {LogicCallback} from "../LogicCallback";
import {Player} from "../../model/Player";
import {GameBoard} from "../../model/GameBoard";
import {GameBoardUtils} from "../../utils/GameBoardUtils";

/**
 * The player logic for a human player. This logic can be used by the user interface of the
 * application, which accepts the user input.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class HumanPlayerLogic extends AbstractPlayerLogic {

    /* True if the player is active. */
    private playerActive = false;

    /* The logic callback. */
    private logicCallback: LogicCallback|null = null;


    /**
     * Creates the human player logic.
     *
     * @param player The player, must not be null.
     */
    public constructor(player: Player) {
        super(player);
    }


    /**
     * Requests a move at the player logic. The move must be executed via the callback.
     *
     * @param gameBoard The game board.
     * @param callback The callback of the game logic.
     */
    public requestMove(gameBoard: GameBoard, callback: LogicCallback): void {
        this.logicCallback = callback;
        this.playerActive = true;
    }


    /**
     * Returns true if the player is active or false if the opponent is active.
     *
     * @return True if the player is active.
     */
    public isPlayerActive(): boolean {
        return this.playerActive;
    }


    /**
     * Place a piece on the game board.
     *
     * @param index The field index, between 0..63.
     * @return True if the piece was placed successfully.
     */
    public placePiece(index: number): boolean {
        GameBoardUtils.assertIndex(index);

        if (!this.isPlayerActive())
            return false;

        this.playerActive = false;

        if (!this.logicCallback)
            throw new Error('Illegal application state! Callback is not available.');

        return this.logicCallback.makeMove(index);
    }

}
