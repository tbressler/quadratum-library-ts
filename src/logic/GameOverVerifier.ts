import {GameBoard} from "../model/GameBoard";
import {SquareCollector} from "./SquareCollector";
import {SquareUtils} from "../utils/SquareUtils";
import {Player} from "../model/Player";

/** The game over state. */
export enum GameOverState {
    /** The game is not over. */
    NOT_OVER,
    /** The game is over and player 1 won. */
    PLAYER1_WON,
    /** The game is over and player 2 won. */
    PLAYER2_WON,
    /** The game is over and the game is a draw. */
    GAME_DRAW
}

/** Possible moves. */
export enum PossibleMoves {
    /** Both players can do squares. */
    BOTH_PLAYERS,
    /** Only player 1 can do more squares. */
    ONLY_PLAYER1,
    /** Only player 2 can do more squares. */
    ONLY_PLAYER2,
    /** No player can do more squares. */
    NO_PLAYER
}

/**
 * This class is used by the game logic in order to check,
 * if the game is over and who won the game.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class GameOverVerifier {

    /* The minimum score for a player to win the game. */
    private readonly minScore: number;

    /* The minimum difference between the player scores to win the game. */
    private readonly minDifference: number;


    /**
     * Creates the game over verifier.
     *
     * @param minScore The minimum score to win, must be > 0 (suggested 150).
     * @param minDifference The minimum difference between score, must be > 0 (suggested 15).
     */
    public constructor(minScore: number, minDifference: number) {
        if (minScore < 1) throw new Error('minScore must be > 0!');
        if (minDifference < 1) throw new Error('minDifference must be > 0!');

        this.minScore = minScore;
        this.minDifference = minDifference;
    }

    /**
     * Checks if the game is over.
     *
     * @param gameBoard The game board, must not be null.
     * @param squareCollector The current squares, must not be null.
     * @return The game over state, never null.
     */
    public isGameOver(gameBoard: GameBoard, squareCollector: SquareCollector): GameOverState {
        let scorePlayer1 = squareCollector.getScore(gameBoard.getPlayer1);
        let scorePlayer2 = squareCollector.getScore(gameBoard.getPlayer2);

        // Check if one player has won the game:
        if ((scorePlayer1 >= this.minScore) || (scorePlayer2 >= this.minScore)) {

            let dif = scorePlayer1 - scorePlayer2;

            if (dif >= this.minDifference) {
                return GameOverState.PLAYER1_WON;
            } else if (dif <= -this.minDifference) {
                return GameOverState.PLAYER2_WON;
            }
        }

        // Check if more squares are possible:
        switch (this.canPlayersDoMoreSquares(gameBoard)) {
            case PossibleMoves.BOTH_PLAYERS:
                return GameOverState.NOT_OVER;
            case PossibleMoves.NO_PLAYER:
                return this.getGameDrawState(scorePlayer1, scorePlayer2);
            case PossibleMoves.ONLY_PLAYER1:
                return (scorePlayer1 > scorePlayer2) ? GameOverState.PLAYER1_WON : GameOverState.NOT_OVER;
            case PossibleMoves.ONLY_PLAYER2:
                return (scorePlayer2 > scorePlayer1) ? GameOverState.PLAYER2_WON : GameOverState.NOT_OVER;
            default:
                throw new Error('This should never happen! Unknown move state.');
        }
    }

    /* Returns the game draw state. */
    private getGameDrawState(scorePlayer1: number, scorePlayer2: number): GameOverState {
        if (scorePlayer1 > scorePlayer2)
            return GameOverState.PLAYER1_WON;
        else if (scorePlayer2 > scorePlayer1)
            return GameOverState.PLAYER2_WON;
        return GameOverState.GAME_DRAW;
    }

    /* Checks if the players can do more squares on the game board. */
    private canPlayersDoMoreSquares(gameBoard: GameBoard): PossibleMoves {
        let player1 = gameBoard.getPlayer1;

        let possible: [number, number] | null;
        let pieces: [Player|null, Player|null, Player|null, Player|null] = [null, null, null, null];

        let hasPlayer1: boolean;
        let hasPlayer2: boolean;
        let hasEmpty: boolean;

        let player1CanDoMoreSquares = false;
        let player2CanDoMoreSquares = false;

        // Go through the game board and check for possible squares:
        for (let i = 0; i < 55; i++) {

            pieces[0] = gameBoard.getPieceFromField(i);

            for (let j = i + 1; j < 64; j++) {

                pieces[1] = gameBoard.getPieceFromField(j);

                possible = SquareUtils.getPossiblePieces([i, j]);
                if (!possible)
                    continue;

                pieces[2] = gameBoard.getPieceFromField(possible[0]);
                pieces[3] = gameBoard.getPieceFromField(possible[1]);

                hasPlayer1 = false;
                hasPlayer2 = false;
                hasEmpty = false;

                for (let m = 0; m < 4; m++)
                if (pieces[m] == null)
                    hasEmpty = true;
                else if (pieces[m] == player1)
                    hasPlayer1 = true;
                else
                    hasPlayer2 = true;

                if (hasPlayer1 && !hasPlayer2 && hasEmpty)
                    player1CanDoMoreSquares = true;
                else if (hasPlayer2 && !hasPlayer1 && hasEmpty)
                    player2CanDoMoreSquares = true;
                else if (!hasPlayer1 && !hasPlayer2 && hasEmpty)
                    return PossibleMoves.BOTH_PLAYERS;

                if (player1CanDoMoreSquares && player2CanDoMoreSquares)
                    return PossibleMoves.BOTH_PLAYERS;
            }
        }

        // Check if player 1 or 2 can do more squares:
        if (player1CanDoMoreSquares)
            return PossibleMoves.ONLY_PLAYER1;
        else if (player2CanDoMoreSquares)
            return PossibleMoves.ONLY_PLAYER2;

        return PossibleMoves.NO_PLAYER;
    }

}