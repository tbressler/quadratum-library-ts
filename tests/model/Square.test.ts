import * as chai from 'chai';

import {Square} from "../../src/model/Square";
import {Player} from "../../src/model/Player";

const expect = chai.expect;
describe('Square class', () => {

    // ---- Test setup:
    let player = new Player('player');


    // ---- constructor(fields,player):

    // Test:
    it('constructor(fields,player) should not throw an error with valid parameter values' , () => {
        expect(() => new Square([0,1,8,9], player)).to.not.throw(Error);
    });

    // Test:
    it('constructor(fields,player) should throw an error if fields index is lower than 0' , () => {
        expect(() => new Square([-1,1,8,9], player)).to.throw(Error);
    });

    // Test:
    it('constructor(fields,player) should throw an error with invalid square' , () => {
        expect(() => new Square([0,1,2,3], player)).to.throw(Error);
    });


    // ---- getSortedFields():

    // Test:
    it('getSortedFields() should return fields in same order as given sorted fields' , () => {
        let square = new Square([0, 1, 8, 9], player);
        expect(square.getSortedFields()).to.deep.equals([0, 1, 8, 9]);
    });

    // Test:
    it('getSortedFields() should return fields in sorted order' , () => {
        let square = new Square([9, 1, 0, 8], player);
        expect(square.getSortedFields()).to.deep.equals([0, 1, 8, 9]);
    });


    // ---- getPlayer():

    // Test:
    it('getPlayer() should return the player given in constructor' , () => {
        let square = new Square([9, 0, 8, 1], player);
        expect(square.getPlayer()).to.equals(player);
    });


    // ---- getScore():

    // Test:
    it('getScore() should return 16 for square #1' , () => {
        let square = new Square([9, 19, 24, 34], player);
        expect(square.getScore()).to.equal(16);
    });

    // Test:
    it('getScore() should return 16 for square #2' , () => {
        let square = new Square([36, 39, 60, 63], player);
        expect(square.getScore()).to.equal(16);
    });

    // Test:
    it('getScore() should return 4 for square #3' , () => {
        let square = new Square([0, 1, 8, 9], player);
        expect(square.getScore()).to.equal(4);
    });

    // Test:
    it('getScore() should return 64 for square #4' , () => {
        let square = new Square([0, 7, 56, 63], player);
        expect(square.getScore()).to.equal(64);
    });

    // Test:
    it('getScore() should return 64 for square #5' , () => {
        let square = new Square([1, 15, 48, 62], player);
        expect(square.getScore()).to.equal(64);
    });

    // Test:
    it('getScore() should return 9 for square #6' , () => {
        let square = new Square([1, 8, 10, 17], player);
        expect(square.getScore()).to.equal(9);
    });

});