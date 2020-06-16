import {Player} from "./Player";
import {SquareUtils} from "../utils/SquareUtils";
import {Hashable} from "../utils/HashSet";

/** A simple data type for the 4 pieces of a square. */
export type quadruple = [number, number, number, number];


/**
 * A square which consists of 4 pieces of one player.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class Square implements Hashable {

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
        if (!SquareUtils.isSquare(fields)) throw new Error('Fields must form a square!');
        this.fields = fields.sort((n1,n2) => n1-n2);
        this.score = SquareUtils.getScore(fields);
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


    /**
     * Returns a hash code value for the object. This method is supported for the benefit of
     * hash sets.
     *
     * @return A hash code value for this object.
     */
    public hashCode(): number {
        let result = this.hashCodeForArray(this.fields);
        result = Math.imul(31, result) + this.hashCodeForString(this.player.getName)
        return result;
    }

    /* Returns the hash code for an array. */
    private hashCodeForArray(elements: number[]): number {
        let result = 1;
        elements.forEach((value) => {
            result = Math.imul(31, result) + value;
        });
        return result;
    }

    /* Returns the hash code for a string. */
    private hashCodeForString(element: string): number {
        let result = 0;
        for(let i = 0; i < element.length; i++)
            result = Math.imul(31, result) + element.charCodeAt(i) | 0;
        return result;
    }

}