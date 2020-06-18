import {AbstractPlayerLogic} from "./AbstractPlayerLogic";
import {Player} from "../../model/Player";
import {GameBoard} from "../../model/GameBoard";
import {LogicCallback} from "../LogicCallback";
import {SquareUtils} from "../../utils/SquareUtils";
import {GameBoardUtils} from "../../utils/GameBoardUtils";

/** Enum for different bot strategies. */
export enum Strategy {
    /** Finds best index by adding all square scores to heat map. */
    LONG_TERM,
    /** Finds best index by using best square score for heat map. */
    SHORT_TERM
}

/**
 * The implementation of the player logic interface for artificial intelligence players (bots).
 *
 * @author Tobias Bressler
 * @version 1.0
 */
export class BotPlayerLogic extends AbstractPlayerLogic {

    /* The strategy that should be used by the bot. */
    private readonly strategy: Strategy;

    /* True if the moves of the player should be randomized. */
    private randomizeMoves = true;


    /**
     * Creates the bot player logic.
     *
     * @param player The player.
     * @param strategy The strategy.
     */
    public constructor(player: Player, strategy: Strategy) {
        super(player);
        this.strategy = strategy;
    }


    /**
     * Enables or disables randomization of moves. If randomization is enabled, the bot makes a random
     * decision which field he uses for his next move if the chance for a good score is the same.
     *
     * @param randomize True if moves should be randomized.
     */
    public setRandomizeMoves(randomize: boolean): void {
        this.randomizeMoves = randomize;
    }


    /**
     * Requests a move at the player logic. The move must be executed via the callback.
     *
     * @param gameBoard The game board.
     * @param callback The callback of the game logic.
     */
    public requestMove(gameBoard: GameBoard, callback: LogicCallback): void {
        let playerHeatMap: number[] = []; for (let i=0; i<64; i++) playerHeatMap[i] = 0; // Fill array with 0.
        let opponentHeatMap: number[] = []; for (let i=0; i<64; i++) opponentHeatMap[i] = 0; // Fill array with 0.

        let pieces: (Player|null)[] = [];
        let possible: [number, number]|null;

        let scoreForSquare: number;
        let playerScore: number;
        let opponentScore: number;
        let numberOfPlayerPieces: number;
        let numberOfOpponentPieces: number;

        // Create heat maps for player and opponent:
        for (let i = 0; i < 55; i++) {
            pieces[0] = gameBoard.getPieceFromField(i);
            for (let j = i + 1; j < 64; j++) {
                pieces[1] = gameBoard.getPieceFromField(j);

                possible = SquareUtils.getPossiblePieces([i, j]);
                if (!possible)
                    continue;

                pieces[2] = gameBoard.getPieceFromField(possible[0]);
                pieces[3] = gameBoard.getPieceFromField(possible[1]);

                numberOfPlayerPieces = 0;
                numberOfOpponentPieces = 0;

                for (let p = 0; p < 4; p++)
                    if (pieces[p] == this.getPlayer())
                        numberOfPlayerPieces++;
                    else if (pieces[p] != null)
                        numberOfOpponentPieces++;

                // Calculate possible score of square:
                scoreForSquare = SquareUtils.getScore([i, j, possible[0], possible[1]]);

                if ((numberOfOpponentPieces > 0) && (numberOfPlayerPieces == 0)) {
                    // ... square is not occupied by opponent and not yet blocked by player.

                    // Calculate chance for opponent to get this square.
                    opponentScore = scoreForSquare * (numberOfOpponentPieces + 1);

                    // Update opponent heat map:
                    this.updateHeatMap(opponentHeatMap, i, opponentScore);
                    this.updateHeatMap(opponentHeatMap, j, opponentScore);
                    this.updateHeatMap(opponentHeatMap, possible[0], opponentScore);
                    this.updateHeatMap(opponentHeatMap, possible[1], opponentScore);

                } else if (numberOfOpponentPieces == 0) {
                    // ... square is not blocked by opponent.

                    // Calculate chance for player to get this square.
                    playerScore = scoreForSquare * (numberOfPlayerPieces + 1);

                    // Update player heat map:
                    this.updateHeatMap(playerHeatMap, i, playerScore);
                    this.updateHeatMap(playerHeatMap, j, playerScore);
                    this.updateHeatMap(playerHeatMap, possible[0], playerScore);
                    this.updateHeatMap(playerHeatMap, possible[1], playerScore);
                }
            }
        }

        let value: number;
        let maxValue = -1;
        let indexWithMaxValue = -1;

        // Analyze heat map:
        for(let i = 0; i < 64; i++) {

            // Skip if field is not empty.
            if (!gameBoard.isFieldEmpty(i))
                continue;

            // Check chances to score:
            if (playerHeatMap[i] >= opponentHeatMap[i]) {
                // ... the chance for a player score is higher or equal.
                value = playerHeatMap[i];
            } else {
                // ... the chance for a opponent score is higher.
                value = opponentHeatMap[i];
            }

            // Check if chance is higher:
            if ((value > maxValue) ||
                ((value == maxValue) && this.doRandomization())) {
                maxValue = value;
                indexWithMaxValue = i;
            }
        }

        GameBoardUtils.assertIndex(indexWithMaxValue);

        callback.makeMove(indexWithMaxValue);
    }

    /* Updates the heat map at the given index with the score. */
    private updateHeatMap(heatMap: number[], index: number, score: number): void {
        heatMap[index] = this.calculateNewScore(heatMap[index], score);
    }

    /* Calculates the new score for the heat map.*/
    private calculateNewScore(heatMapValue: number, currentScore: number): number {
        switch (this.strategy) {
            case Strategy.LONG_TERM:
                return heatMapValue + currentScore;
            case Strategy.SHORT_TERM:
                return (currentScore > heatMapValue) ? currentScore : heatMapValue;
            default:
                throw new Error('Unknown strategy!');
        }
    }

    /* Returns true, if the values should be randomized. */
    private doRandomization(): boolean {
        return this.randomizeMoves && (Math.random() % 2 == 0);
    }

}