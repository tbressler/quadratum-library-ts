/**
 * Utility class that helps calculating squares.
 *
 * @author Tobias Bressler
 * @version 1.0
 */
import {quadruple} from "../model/Square";
import {GameBoardUtils} from "./GameBoardUtils";

export class SquareUtils {

    /* Private constructor (singleton). */
    private constructor() {}

    /**
     * Checks if the given indexes are forming a valid square.
     *
     * @param pieces The 4 indexes of the edges of the square.
     * @return True if the pieces are forming a valid square or false.
     */
    public static isSquare(pieces: quadruple): boolean {
        pieces = pieces.sort();

        let possiblePieces = SquareUtils.getPossiblePieces([pieces[0], pieces[1]]);

        if (!possiblePieces)
            return false;

        // Check possible pieces with given indexes:
        return (possiblePieces[0] == pieces[2]) && (possiblePieces[1] == pieces[3])
            || (possiblePieces[1] == pieces[2]) && (possiblePieces[0] == pieces[3]);
    }

    /**
     * Returns an array with the two possible pieces that are forming a square with
     * the two given pieces. If the possible pieces are out of range, an empty array is
     * returned.
     *
     * @param index1 The index of the first piece (must be lower than index2).
     * @param index2 The index of the second piece (must be greater than index1).
     * @return An array with the two possible pieces or an empty array.
     */
    public static getPossiblePieces(rootPieces: [number, number]): [number, number] | null {
        if (rootPieces[0] > rootPieces[1]) throw new Error('The first value must be lower than the second value!');

        // Calculate x and y difference and possible pieces.
        let dx = GameBoardUtils.distX(rootPieces[0], rootPieces[1]);
        let dy = GameBoardUtils.distY(rootPieces[0], rootPieces[1]);

        // Check if x and y difference > 0.
        if ((dx == 0) && (dy == 0)) return null;

        // Translate index of first two pieces to coords:
        let piece1 = GameBoardUtils.toCoords(rootPieces[0]);
        let piece2 = GameBoardUtils.toCoords(rootPieces[1]);

        // Calculate possible position for the 2 other pieces:
        let piece3 = [piece1[0] - ((dx > 0) ? dy : -dy), piece1[1] + ((dx > 0) ? dx : -dx)];
        let piece4 = [piece2[0] - ((dx > 0) ? dy : -dy), piece2[1] + ((dx > 0) ? dx : -dx)];

        // Check if pieces are in range:
        if ((piece3[0] < 0) || (piece3[0] > 7) || (piece3[1] < 0) || (piece3[1] > 7) ||
            (piece4[0] < 0) || (piece4[0] > 7) || (piece4[1] < 0) || (piece4[1] > 7)) return null;

        // Calculate index of possible pieces:
        return [GameBoardUtils.toIndex(piece3[0], piece3[1]), GameBoardUtils.toIndex(piece4[0], piece4[1])];
    }


    /**
     * Returns the score for the given square.
     *
     * @param square The 4 indexes of the edges of the square.
     * @return The score for the square, between 1..64.
     */
    public static score(square: quadruple): number {
        let minIndex = Math.min(square[0], square[1], square[2], square[3]);
        let maxIndex = Math.max(square[0], square[1], square[2], square[3]);
        let dx = GameBoardUtils.distY(minIndex, maxIndex) + 1;
        return dx * dx;
    }

}
