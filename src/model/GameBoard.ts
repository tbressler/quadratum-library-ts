import {Player} from "./Player";

/**
 * A model for the game board.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class GameBoard {

    /* Player one. */
    private readonly player1: Player;

    /* Player two. */
    private readonly player2: Player;

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
    public placePiece(index: number, player: Player): void {
        this.checkPlacePiecePrecondition(index, player);
    }

    /* Checks the preconditions for placing a piece on the game board. */
    private checkPlacePiecePrecondition(index: number, player: Player): void {
        console.log(index);
        console.log(player);
    }

}