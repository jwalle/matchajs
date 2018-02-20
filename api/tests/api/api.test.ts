import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import api from '../../src/Api';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {
    it('should be Json', () => {
        return chai.request(api).get('/')
        .then(res => {
            expect(res.type).to.eql('application/json');
        });
    });

    it('should have a message prop', () => {
        return chai.request(api).get('/')
        .then(res => {
            expect(res.body.message).to.eql('Hello World !');
        });
    });
});