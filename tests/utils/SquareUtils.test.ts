import * as chai from 'chai';

import {SquareUtils} from "../../src/utils/SquareUtils";

const expect = chai.expect;
describe('SquareUtils class', () => {

    // ---- isSquare(pieces):

    // Test:
    it('isSquare(pieces) should return false for [0, 0, 0, 0]' , () => {
        expect(SquareUtils.isSquare([0,0,0,0])).to.equal(false);
    });

    // Test:
    it('isSquare(pieces) should return true for square [0, 1, 8, 9]' , () => {
        expect(SquareUtils.isSquare([0,1,8,9])).to.equal(true);
    });

    // Test:
    it('isSquare(pieces) should return true for square [0, 1, 8, 9] (but unsorted)' , () => {
        expect(SquareUtils.isSquare([9,1,8,0])).to.equal(true);
    });

    // Test:
    it('isSquare(pieces) should return false for square [0, 1, 5, 2]' , () => {
        expect(SquareUtils.isSquare([0,1,5,2])).to.equal(false);
    });

    // Test:
    it('isSquare(pieces) should return true for square [9, 19, 24, 34]' , () => {
        expect(SquareUtils.isSquare([9, 19, 24, 34])).to.equal(true);
    });

    // Test:
    it('isSquare(pieces) should return true for square [36, 39, 60, 63]' , () => {
        expect(SquareUtils.isSquare([36, 39, 60, 63])).to.equal(true);
    });

    // Test:
    it('isSquare(pieces) should return true for square [0, 7, 56, 63]' , () => {
        expect(SquareUtils.isSquare([0, 7, 56, 63])).to.equal(true);
    });

    // Test:
    it('isSquare(pieces) should return true for square [1, 15, 48, 62]' , () => {
        expect(SquareUtils.isSquare([1, 15, 48, 62])).to.equal(true);
    });

    // Test:
    it('isSquare(pieces) should return true for square [1, 8, 10, 17]' , () => {
        expect(SquareUtils.isSquare([1, 8, 10, 17])).to.equal(true);
    });

    // Test:
    it('isSquare(pieces) should return false for [1, 3, 10, 17]' , () => {
        expect(SquareUtils.isSquare([1, 3, 10, 17])).to.equal(false);
    });

});
