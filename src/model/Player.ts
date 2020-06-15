/**
 * A model for the player.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class Player {

    /* The name of the player. */
    private readonly name: string;

    /**
     * Creates a player.
     *
     * @param name The name of the player, must not be null or empty.
     */
    constructor(name: string) {
        if (!name) throw new Error('The player name is empty!');
        this.name = name;
    }

    /** Returns the name of the player. */
    get getName() {
        return this.name;
    }

}