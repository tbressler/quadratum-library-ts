import * as chai from 'chai';

import {GameBoardUtils} from "../../src/utils/GameBoardUtils";

const expect = chai.expect;
describe('GameBoardUtils class', () => {

    // Test:
    it('method isInt(value) should return true for 0' , () => {
        expect(GameBoardUtils.isInt(0)).to.equal(true);
    });

    // Test:
    it('method isInt(value) should return true for 0.0' , () => {
        expect(GameBoardUtils.isInt(0.0)).to.equal(true);
    });

    // Test:
    it('method isInt(value) should return true for 2.5' , () => {
        expect(GameBoardUtils.isInt(2.5)).to.equal(false);
    });

    // Test:
    it('method isInt(value) should return true for 7.5' , () => {
        expect(GameBoardUtils.isInt(7.5)).to.equal(false);
    });


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
    it('method toIndex(x,y) should throw an Error with x = 3.5 (floating point number)' , () => {
        expect(() => GameBoardUtils.toIndex(3.5, 3)).to.throw(Error);
    });

    // Test:
    it('method toIndex(x,y) should throw an Error with x = 6.5 (floating point number)' , () => {
        expect(() => GameBoardUtils.toIndex(6.5, 3)).to.throw(Error);
    });

    // Test:
    it('method toIndex(x,y) should throw an Error with y = 3.5 (floating point number)' , () => {
        expect(() => GameBoardUtils.toIndex(3, 3.5)).to.throw(Error);
    });

    // Test:
    it('method toIndex(x,y) should throw an Error with y = 6.5 (floating point number)' , () => {
        expect(() => GameBoardUtils.toIndex(3, 6.5)).to.throw(Error);
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


    // Test:
    it('method toCoords(index) should return [0,0] for 0' , () => {
        expect(GameBoardUtils.toCoords(0)).to.deep.equal([0, 0]);
    });

    // Test:
    it('method toCoords(index) should return [7,7] for 63' , () => {
        expect(GameBoardUtils.toCoords(63)).to.deep.equal([7, 7]);
    });

    // Test:
    it('method toCoords(index) should return [7,7] for 63' , () => {
        expect(GameBoardUtils.toCoords(63)).to.deep.equal([7, 7]);
    });

    // Test:
    it('method toCoords(index) should return [4,3] for 28' , () => {
        expect(GameBoardUtils.toCoords(28)).to.deep.equal([4, 3]);
    });

    // Test:
    it('method toCoords(index) should return [3,4] for 35' , () => {
        expect(GameBoardUtils.toCoords(35)).to.deep.equal([3, 4]);
    });

    // Test:
    it('method toCoords(index) should throw an error for 3.5 (floating point number)' , () => {
        expect(() => GameBoardUtils.toCoords(3.5)).to.throw(Error);
    });

    // Test:
    it('method toCoords(index) should throw an error for 16.5 (floating point number)' , () => {
        expect(() => GameBoardUtils.toCoords(16.5)).to.throw(Error);
    });

    // Test:
    it('method toCoords(index) should return [0,2] for 16.0' , () => {
        expect(GameBoardUtils.toCoords(16.0)).to.deep.equal([0,2]);
    });

    // Test:
    it('method toCoords(index) should throw an Error if index is lower than 0' , () => {
        expect(() => GameBoardUtils.toCoords(-1)).to.throw(Error);
    });

    // Test:
    it('method toCoords(index) should throw an Error if index is greater than 63' , () => {
        expect(() => GameBoardUtils.toCoords(64)).to.throw(Error);
    });

});
