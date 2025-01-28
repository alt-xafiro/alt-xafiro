import {
  RuleConfigCondition,
  RuleConfigSeverity,
  TargetCaseType
} from '@commitlint/types';

const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [RuleConfigSeverity.Error, 'never', ['lower-case']] as [
      RuleConfigSeverity,
      RuleConfigCondition,
      TargetCaseType[]
    ]
  }
};

export default commitlintConfig;
