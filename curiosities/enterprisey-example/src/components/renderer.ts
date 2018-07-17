import {component_t, createElement, nominal_creator_t, nominate, render} from '../../../../createElement.esm';

/**
 *
 * @module renderer
 * This module exports the aggregated bindings of the createElement lib, forming
 * your HTMLElement building blocks.
 *
 */

export const div: nominal_creator_t = nominate('div');
export const span: nominal_creator_t = nominate('span');
export const ul: nominal_creator_t = nominate('ul');
export const li: nominal_creator_t = nominate('li');

export const form: nominal_creator_t = nominate('form');
export const input: nominal_creator_t = nominate('input');
export const button: nominal_creator_t = nominate('button');
export const label: nominal_creator_t = nominate('label');
export const small: nominal_creator_t = nominate('small');

export {
    createElement,
    nominate,
    render,
    component_t,
    nominal_creator_t
}