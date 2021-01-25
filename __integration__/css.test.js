/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

const fs = require('fs-extra');
const StyleDictionary = require('../index');

describe('integration', () => {
  describe('css', () => {
    StyleDictionary.extend({
      source: [`__integration__/tokens/**/*.json`],
      platforms: {
        css: {
          transformGroup: 'css',
          buildPath: '__integration__/build/',
          files: [{
            destination: 'variables.css',
            format: 'css/variables'
          },{
            destination: 'variablesWithReferences.css',
            format: 'css/variables',
            options: {
              keepReferences: true
            }
          }]
        }
      }
    }).buildAllPlatforms();

    describe('css/variables', () => {
      const output = fs.readFileSync('__integration__/build/variables.css', {encoding:'UTF-8'});
      it(`should match snapshot`, () => {
        expect(output).toMatchSnapshot();
      });

      describe(`with references`, () => {
        const output = fs.readFileSync('__integration__/build/variablesWithReferences.css', {encoding:'UTF-8'});
        it(`should match snapshot`, () => {
          expect(output).toMatchSnapshot();
        });
      });

      // TODO: add css validator
    });
  });
});

afterAll(() => {
  fs.emptyDirSync('__integration__/build');
});