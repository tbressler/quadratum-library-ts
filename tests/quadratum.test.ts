import * as chai from 'chai';
import {Quadratum} from "../src/quadratum";

const expect = chai.expect;
describe('Quadratum class', () => {

    let quadratum: Quadratum;
    quadratum = new Quadratum();

    it('should be able to add things correctly' , () => {
        expect(quadratum.add(3,4)).to.equal(7);
    });

});
