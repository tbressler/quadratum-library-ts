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
        if ((!GameBoardUtils.isInt(x)) || (x < 0) || (x > 7)) throw new Error('x must be an integer and between 0..7!');
        if ((!GameBoardUtils.isInt(y)) || (y < 0) || (y > 7)) throw new Error('y must be an integer and between 0..7!');
        return (y * 8) + x;
    }


    /**
     * Converts the given index to the corresponding x-y coordinates.
     *
     * @param index The index, between 0..63.
     * @return The corresponding x and y coordinates in the form [x, y].
     */
    public static toCoords(index: number): [number, number] {
        GameBoardUtils.assertIndex(index);
        return [(index % 8), (index - (index % 8)) / 8];
    }


    /**
     * Returns the difference of the x coordinates.
     *
     * @param index1 The index of the first piece, between 0..63.
     * @param index2 The index of the second piece, between 0..63.
     * @return The difference of the x coordinates, between 0..7.
     */
    public static distX(index1: number, index2: number): number {
        GameBoardUtils.assertIndex(index1);
        GameBoardUtils.assertIndex(index2);
        let [x1,] = GameBoardUtils.toCoords(index1);
        let [x2,] = GameBoardUtils.toCoords(index2);
        return x2 - x1;
    }

    /**
     * Returns the difference of the y coordinates.
     *
     * @param index1 The index of the first piece, between 0..63.
     * @param index2 The index of the second piece, between 0..63.
     * @return The difference of the x coordinates, between 0..7.
     */
    public static distY(index1: number, index2: number): number {
        GameBoardUtils.assertIndex(index1);
        GameBoardUtils.assertIndex(index2);
        let [,y1] = GameBoardUtils.toCoords(index1);
        let [,y2] = GameBoardUtils.toCoords(index2);
        return y2 - y1;
    }


    /**
     * Asserts if index is an integer and between 0 and 63.
     * If not the method throws an error exception.
     *
     * @param index The index.
     */
    public static assertIndex(index: number): void {
        if (!GameBoardUtils.isInt(index) || (index < 0) || (index > 63)) throw Error('index must be an integer and between 0..63!');
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