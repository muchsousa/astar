const { describe, it } = require('node:test');
const assert = require('node:assert');

const path = require('path');
const { execSync } = require('child_process')

const excuteFile = (filename, value) => execSync(`echo '${value}' | node index.js "${path.join(__dirname, 'maps', filename)}"`).toString();

describe('test from a file', () => {

    describe('test using file "map01.txt"', () => {
        it('should returns cost 16 for final position "9 0"', () => {
            const finalPosition = '9 0';
            const result = excuteFile('map01.txt', finalPosition);

            assert.match(
                result,
                /16 0,7 0,6 0,5 0,4 0,3 0,2 0,1 0,0 1,0 2,0 3,0 4,0 5,0 6,0 7,0 8,0 9,0/
            );
        });
    });
    
    describe('test using file "map02.txt"', () => {
        it('should returns cost 10 for final position "9 0"', () => {
            const finalPosition = '9 0';
            const result = excuteFile('map02.txt', finalPosition);

            assert.match(
                result,
                /10 6,5 6,4 6,3 5,3 4,3 3,3 2,3 2,2 2,1 2,0 1,0 4,0 9,0/
            );
        });
    });

    describe('test using file "map03.txt"', () => {
        it('should returns cost 33 for final position "29 29"', () => {
            const finalPosition = '29 29';
            const result = excuteFile('map03.txt', finalPosition);

            assert.match(
                result,
                /33 0,29 0,28 0,27 0,26 0,25 0,24 0,23 0,22 0,21 0,20 0,19 0,18 0,17 1,17 1,16 1,15 1,14 1,13 1,12 1,11 1,10 1,9 0,9 0,8 0,7 0,6 0,5 0,4 0,3 0,2 0,1 0,0 3,0 4,0 5,0 7,1 8,1 8,0 9,0 10,0 11,0 12,0 13,0 14,0 15,0 16,0 17,0 18,0 19,0 20,0 22,1 23,1 23,0 24,0 25,0 26,0 27,0 28,0 29,29/
            );
        });
    });

    describe('test using file "map04.txt"', () => {
        it('should returns cost 58 for final position "29 0"', () => {
            const finalPosition = '29 0';
            const result = excuteFile('map04.txt', finalPosition);

            assert.match(
                result,
                /58 0,29 0,28 0,27 0,26 1,26 1,25 2,25 2,24 2,23 1,23 1,22 1,21 1,20 1,19 1,18 2,18 4,17 4,16 4,15 4,14 4,13 3,13 3,12 3,11 3,10 3,9 3,8 3,7 3,6 3,5 3,4 3,3 2,3 1,3 1,2 1,1 1,0 2,0 9,0 11,1 13,2 14,2 14,1 14,0 16,1 17,1 17,0 18,0 19,0 20,0 21,0 25,3 25,2 26,2 26,1 26,0 27,0 28,0 29,0/
            );
        });
    });

    describe.skip('test using file "map05.txt"', () => {
        it('should returns cost 40 for final position "9 0"', () => {
            const finalPosition = '9 0';
            const result = excuteFile('map05.txt', finalPosition);

            assert.match(
                result,
                /40 /
            );
        });
    });

    describe.skip('test using file "map06.txt"', () => {
        it('should returns cost 33 for final position "9 0"', () => {
            const finalPosition = '9 0';
            const result = excuteFile('map06.txt', finalPosition);

            assert.match(
                result,
                /33 /
            );
        });
    });

});