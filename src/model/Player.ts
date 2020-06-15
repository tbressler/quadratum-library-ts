/**
 * A player.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class Player {

    private readonly name: string;

    get getName() {
        return this.name;
    }

    constructor(name: string) {
        if (!name) throw new Error('no name given');
        this.name = name;
    }

}