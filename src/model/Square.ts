import {Player} from "./Player";

/** A simple data type for the 4 pieces of a square. */
export type quadruple = [number, number, number, number];


/**
 * A square which consists of 4 pieces of one player.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class Square {

    /* The fields with the pieces of the square. */
    private readonly fields : quadruple;

    /* The score of the square. */
    private readonly score: number;

    /* The player that scored the square. */
    private readonly player: Player;


    /**
     * Creates a square.
     *
     * @param fields The 4 fields with the pieces of the square.
     * @param player  The player that scored this square.
     */
    public constructor(fields: quadruple, player: Player) {
        this.fields = fields;
        this.score = 0;
        this.player = player;
    }


    /**
     * Returns the field indexes for the pieces as a sorted array.
     *
     * @return The field indexes of the pieces as sorted array.
     */
    public getSortedFields(): quadruple {
        return this.fields;
    }


    /**
     * Returns the score of the square.
     *
     * @return The score.
     */
    public getScore(): number {
        return this.score;
    }


    /**
     * Returns the player who scored the square.
     *
     * @return The player.
     */
    public getPlayer(): Player {
        return this.player;
    }

}