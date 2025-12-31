module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'prettier/prettier': [
            'error',
            {
                semi: false,
                singleQuote: true,
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
