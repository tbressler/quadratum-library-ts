import * as chai from 'chai';

import {Square} from "../../src/model/Square";
import {Player} from "../../src/model/Player";

const expect = chai.expect;
describe('Square class', () => {

    // ---- Test setup:
    let player1 = new Player('player 1');


    // ---- constructor():

    // Test:
    it('constructor(pieces,player) ...' , () => {
        let square = new Square([0,1,8,9], player1);

    });

});