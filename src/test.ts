/* eslint-disable import/no-extraneous-dependencies */
import 'jest-preset-angular/setup-jest';

Object.defineProperties(window, {
    CSS: { value: null },
    doctype: { value: '<!DOCTYPE html>' },
    getComputedStyle: {
        value: () => ({
            display: 'none',
            appearance: ['-webkit-appearance'],
        }),
    },
});

Object.defineProperty(document.body.style, 'transform', {
    value: () => ({
        enumerable: true,
        configurable: true,
    }),
});
