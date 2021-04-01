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
                'no-plusplus': 'off',
                'no-param-reassign': 'off',
                'linebreak-style': 'off',
                'indent': 'off',
                '@typescript-eslint/indent': 'off',
                '@typescript-eslint/lines-between-class-members': 'off',
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
