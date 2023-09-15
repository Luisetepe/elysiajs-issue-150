module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        // '@typescript-eslint/ban-types': 'off',
        // '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        // 'no-mixed-spaces-and-tabs': 'off',
        // '@typescript-eslint/no-non-null-assertion': 'off',
        // '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
        // '@typescript-eslint/no-namespace': 'off',
        // 'no-case-declarations': 'off'
    },
    ignorePatterns: ['example/*', 'tests/**/*']
}
