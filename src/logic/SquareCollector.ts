import {GameBoard} from "../model/GameBoard";
import {Player} from "../model/Player";
import {Square} from "../model/Square";
import {SquareUtils} from "../utils/SquareUtils";
import {HashSet} from "../utils/HashSet";

/**
 * Detects and manages squares on the game board.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class SquareCollector {

    /* A set of squares found by this detector. */
    private squares: HashSet<Square> = new HashSet<Square>();


    /**
     * Detect new squares of the given player on the game board.
     *
     * @param gameBoard The game board.
     * @param player The player.
     * @return A set of the new detected squares for the player.
     */
    public detectNewSquares(gameBoard: GameBoard, player: Player): Square[] {

        let foundSquares: Square[] = this.findNewSquares(gameBoard, player);

        if (foundSquares.length == 0)
            return [];

        foundSquares.forEach((s) => this.squares.push(s));

        return foundSquares;
    }

    /* Finds new squares for the given player. */
    private findNewSquares(gameBoard: GameBoard, player: Player): Square[] {
        let result: Square[] = [];
        let possible: [number, number] | null;
        let square: Square;

        for (let i = 0; i < 55; i++) {

            // Skip if field is empty or piece is not from given player
            if (gameBoard.getPieceFromField(i) != player)
                continue;

            for (let j = i + 1; j < 64; j++) {

                // Skip if field is empty or piece is not from given player
                if (gameBoard.getPieceFromField(j) != player)
                    continue;

                possible = SquareUtils.getPossiblePieces([i, j]);
                if (!possible) continue;

                // Check for possible square edges.
                if ((gameBoard.getPieceFromField(possible[0]) == player) &&
                    (gameBoard.getPieceFromField(possible[1]) == player)) {

                    square = new Square([i,j,possible[0],possible[1]], player);

                    // Skip if square is well-known
                    if (this.squares.contains(square))
                        continue;

                    result.push(square);
                }
            }
        }

        return result;
    }


    /**
     * Returns all the squares found by this detector.
     *
     * @return A set of the squares.
     */
    public getDetectedSquares(): Square[] {
        return this.squares.values();
    }


    /**
     * Returns the current number of squares for the given player.
     *
     * @param player The player.
     * @return The current number of squares of the player.
     */
    public getSquareCount(player: Player): number {
        let count = 0;
        this.squares.forEach(square => {
            if (square.getPlayer() == player)
                count++;
        });
        return count;
    }


    /**
     * Returns the current score for the given player.
     *
     * @param player The player.
     * @return The current score of the player
     */
    public getScore(player: Player): number {
        let score = 0;
        this.squares.forEach(square => {
            if (square.getPlayer() == player)
                score += square.getScore();
        });
        return score;
    }


    /**
     * Resets the square detector and clears all found squares.
     */
    public reset(): void {
        this.squares.clear();
    }

}
