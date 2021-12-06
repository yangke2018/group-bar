const {describe} = require('mocha');
const assert = require('assert');

const {Demo} = require('../index');
console.log(Demo)

describe('Demo', () => {
    it('hello', () => {
        let demoTest = new Demo();
        assert("hello demo", demoTest.hello())
    });
});
