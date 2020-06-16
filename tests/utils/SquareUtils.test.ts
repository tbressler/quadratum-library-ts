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


    // ---- getPossiblePieces(rootPieces):

    // Test:
    it('getPossiblePieces(rootPieces) should return [10, 17] for [1, 8]' , () => {
        expect(SquareUtils.getPossiblePieces([1, 8])).to.deep.equals([10, 17]);
    });

    // Test:
    it('getPossiblePieces(rootPieces) should return [24, 34] for [9, 19]' , () => {
        expect(SquareUtils.getPossiblePieces([9, 19])).to.deep.equals([24, 34]);
    });

    // Test:
    it('getPossiblePieces(rootPieces) should return null for [0, 9]' , () => {
        expect(SquareUtils.getPossiblePieces([0, 9])).to.null;
    });

    // Test:
    it('getPossiblePieces(rootPieces) should throw an error for 19, 9 (because unsorted)' , () => {
        expect(() => SquareUtils.getPossiblePieces([19, 9])).to.throw(Error);
    });


    // ---- getScore(square):

    // Test:
    it('getScore(square) should return 64 for [1, 15, 48, 62]' , () => {
        expect(SquareUtils.getScore([1, 15, 48, 62])).to.equal(64);
    });

    // Test:
    it('getScore(square) should return 16 for [1, 4, 25, 28]' , () => {
        expect(SquareUtils.getScore([1, 4, 25, 28])).to.equal(16);
    });

    // Test:
    it('getScore(square) should return 16 for [27, 32, 52, 57]' , () => {
        expect(SquareUtils.getScore([27, 32, 52, 57])).to.equal(25);
    });

    // Test:
    it('getScore(square) should return 25 for [16, 21, 56, 61]' , () => {
        expect(SquareUtils.getScore([27, 32, 52, 57])).to.equal(25);
    });

    // Test:
    it('getScore(square) should return 49 for [8, 14, 56, 62]' , () => {
        expect(SquareUtils.getScore([8, 14, 56, 62])).to.equal(49);
    });

    // Test:
    it('getScore(square) should return 64 for [6, 8, 55, 57]' , () => {
        expect(SquareUtils.getScore([6, 8, 55, 57])).to.equal(64);
    });

});
