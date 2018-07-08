#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Excerpt from https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * @type {string}
 */
const html = fs.readFileSync(path.join(__dirname, 'in.html'), 'utf-8');

const codeGen = require('./lib/convert')(html);
console.log(codeGen);

fs.writeFileSync(path.join(__dirname, 'out.js'), codeGen);
