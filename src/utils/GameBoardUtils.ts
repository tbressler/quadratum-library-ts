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
        if ((!GameBoardUtils.isInt(x)) || (x < 0) || (x > 7)) throw new Error("x must be an integer and between 0..7!");
        if ((!GameBoardUtils.isInt(y)) || (y < 0) || (y > 7)) throw new Error("y must be an integer and between 0..7!");
        return (y * 8) + x;
    }

    /**
     * Converts the given index to the corresponding x-y coordinates.
     *
     * @param index The index, between 0..63.
     * @return The corresponding x and y coordinates in the form [x, y].
     */
    public static toCoords(index: number): [number, number] {
        if (!GameBoardUtils.isInt(index) || (index < 0) || (index > 63)) throw new Error("index must be an integer and between 0..63!");
        return [(index % 8), (index - (index % 8)) / 8];
    }

    /**
     * Checks if the given value is an integer. Returns false if it is not an integer.
     *
     * @param value The value to be checked.
     * @return True if integer otherwise false.
     */
    public static isInt(value: number): boolean {
        return (value === parseInt(value.toString(), 10));
    }

}