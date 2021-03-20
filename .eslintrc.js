module.exports = {
    root: true,
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: [
                    'tsconfig.*?.json',
                ],
                createDefaultProgram: true,
            },
            extends: [
                'plugin:@angular-eslint/recommended',
                'airbnb-typescript/base',
            ],
            rules: {
                'import/prefer-default-export': 'off',
                'arrow-parens': 'off',
                'no-console': 'off',
                'indent': ['error', 4],
                '@typescript-eslint/indent': ['error', 4],
            },
        },
        {
            files: ['*.component.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {
                'max-len': ['error', { 'code': 140 }],
            },
        },
        {
            files: ['*.component.ts'],
            extends: ['plugin:@angular-eslint/template/process-inline-templates'],
        },
    ],
};