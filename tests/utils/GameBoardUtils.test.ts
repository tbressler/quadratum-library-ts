import * as chai from 'chai';

import {GameBoardUtils} from "../../src/utils/GameBoardUtils";

const expect = chai.expect;
describe('GameBoardUtils class', () => {

    // Test:
    it('method toIndex(x,y) should return 0 for x=0 and y=0' , () => {
        expect(GameBoardUtils.toIndex(0, 0)).to.equal(0);
    });

    // Test:
    it('method toIndex(x,y) should return 63 for x=7 and y=7' , () => {
        expect(GameBoardUtils.toIndex(7, 7)).to.equal(63);
    });

    // Test:
    it('method toIndex(x,y) should return 35 for x=3 and y=4' , () => {
        expect(GameBoardUtils.toIndex(3, 4)).to.equal(35);
    });

    // Test:
    it('method toIndex(x,y) should return 28 for x=4 and y=3' , () => {
        expect(GameBoardUtils.toIndex(4, 3)).to.equal(28);
    });

    // Test:
    it('method toIndex(x,y) should throw an Error with x lower than 0' , () => {
        expect(() => GameBoardUtils.toIndex(-1, 3)).to.throw(Error);
    });

    // Test:
    it('method toIndex(x,y) should throw an Error with x greater than 7' , () => {
        expect(() => GameBoardUtils.toIndex(8, 3)).to.throw(Error);
    });

    // Test:
    it('method toIndex(x,y) should throw an Error with y lower than 0' , () => {
        expect(() => GameBoardUtils.toIndex(3, -1)).to.throw(Error);
    });

    // Test:
    it('method toIndex(x,y) should throw an Error with y greater than 7' , () => {
        expect(() => GameBoardUtils.toIndex(3, 8)).to.throw(Error);
    });




});
