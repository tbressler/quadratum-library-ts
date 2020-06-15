import * as chai from 'chai';

import {GameBoardUtils} from "../../src/utils/GameBoardUtils";

const expect = chai.expect;
describe('GameBoardUtils class', () => {

    // ---- isInt(value):

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


    // ---- toIndex(x,y):

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


    // ---- toCoords(index):

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


    // ---- distX(index,index):

    // Test:
    it('method distX(index,index) should return 0 for same indexes' , () => {
        expect(GameBoardUtils.distX(9, 9)).to.equal(0);
    });

    // Test:
    it('method distX(index,index) should return 1 for 9 and 10' , () => {
        expect(GameBoardUtils.distX(9, 10)).to.equal(1);
    });

    // Test:
    it('method distX(index,index) should return 3 for 9 and 20' , () => {
        expect(GameBoardUtils.distX(9, 20)).to.equal(3);
    });

    // Test:
    it('method distX(index,index) should return 0 for 9 and 17' , () => {
        expect(GameBoardUtils.distX(9, 17)).to.equal(0);
    });

    // Test:
    it('method distX(index,index) should return 0 for 9 and 17' , () => {
        expect(GameBoardUtils.distX(9, 17)).to.equal(0);
    });

    // Test:
    it('method distX(index,index) should throw an error with index1 lower than 0' , () => {
        expect(() => GameBoardUtils.distX(-1, 5)).to.throw(Error);
    });

    // Test:
    it('method distX(index,index) should throw an error with index1 greater than 63' , () => {
        expect(() => GameBoardUtils.distX(64, 5)).to.throw(Error);
    });

    // Test:
    it('method distX(index,index) should throw an error with index2 lower than 0' , () => {
        expect(() => GameBoardUtils.distX(5, -1)).to.throw(Error);
    });

    // Test:
    it('method distX(index,index) should throw an error with index2 greater than 63' , () => {
        expect(() => GameBoardUtils.distX(5, 64)).to.throw(Error);
    });

    // Test:
    it('method distX(index,index) should throw an error with 9 and 3.5 (floating point number)' , () => {
        expect(() => GameBoardUtils.distX(9, 3.5)).to.throw(Error);
    });

    // Test:
    it('method distX(index,index) should throw an error with 3.5 (floating point number) and 9' , () => {
        expect(() => GameBoardUtils.distX(3.5, 9)).to.throw(Error);
    });


    // ---- distY(index,index):

    // Test:
    it('method distY(index,index) should return 0 for same indexes' , () => {
        expect(GameBoardUtils.distY(9, 9)).to.equal(0);
    });

    // Test:
    it('method distY(index,index) should return 0 for 9 and 10' , () => {
        expect(GameBoardUtils.distY(9, 10)).to.equal(0);
    });

    // Test:
    it('method distY(index,index) should return 1 for 9 and 17' , () => {
        expect(GameBoardUtils.distY(9, 17)).to.equal(1);
    });

    // Test:
    it('method distY(index,index) should return 3 for 9 and 36' , () => {
        expect(GameBoardUtils.distY(9, 36)).to.equal(3);
    });

    // Test:
    it('method distY(index,index) should throw an error with index1 lower than 0' , () => {
        expect(() => GameBoardUtils.distY(-1, 5)).to.throw(Error);
    });

    // Test:
    it('method distY(index,index) should throw an error with index1 greater than 63' , () => {
        expect(() => GameBoardUtils.distY(64, 5)).to.throw(Error);
    });

    // Test:
    it('method distY(index,index) should throw an error with index2 lower than 0' , () => {
        expect(() => GameBoardUtils.distY(5, -1)).to.throw(Error);
    });

    // Test:
    it('method distY(index,index) should throw an error with index2 greater than 63' , () => {
        expect(() => GameBoardUtils.distY(5, 64)).to.throw(Error);
    });

    // Test:
    it('method distY(index,index) should throw an error with 9 and 3.5 (floating point number)' , () => {
        expect(() => GameBoardUtils.distY(9, 3.5)).to.throw(Error);
    });

    // Test:
    it('method distY(index,index) should throw an error with 3.5 (floating point number) and 9' , () => {
        expect(() => GameBoardUtils.distY(3.5, 9)).to.throw(Error);
    });

});
