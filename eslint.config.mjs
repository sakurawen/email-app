import { antfu } from '@antfu/eslint-config';

export default antfu({
  react: true,
  rules: {
    'style/semi': ['warn', 'always'],
  },
});
