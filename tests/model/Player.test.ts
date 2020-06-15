import * as chai from 'chai';

import {Player} from "../../src/model/Player";

const expect = chai.expect;
describe('Player class', () => {

    // Test setup:
    let player: Player;


    // Test:
    it ('should throw an error when constructed with an empty name', () => {
        expect(() => new Player('')).to.throw(Error);
    });


    // Test:
    it('should have a name' , () => {
        player = new Player('Player 1');
        expect(player.getName).to.equal('Player 1');
    });

});
