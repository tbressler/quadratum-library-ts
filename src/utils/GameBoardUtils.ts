/**
 * Utility class for game board calculations.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class GameBoardUtils {

    // Private constructor (singleton).
    private constructor() {}

    /**
     * Converts the given x-y coordinates to the corresponding index.
     *
     * @param x The x coordinate, between 0..7.
     * @param y The y coordinate, between 0..7.
     * @return The corresponding index, between 0..63.
     */
    public static toIndex(x: number, y: number): number {
        if ((x < 0) || (x > 7)) throw new Error("x must be between 0..7!");
        if ((y < 0) || (y > 7)) throw new Error("y must be between 0..7!");
        return (y * 8) + x;
    }

}