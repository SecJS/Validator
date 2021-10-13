import { Sanitizer } from '../../src/Sanitizer'

export class UserSanitizer extends Sanitizer {
  get schema() {
    return {
      email: 'trim|lower_case',
    }
  }

  get escapeSchema() {
    return {
      email: 'trim|lower_case|escape',
    }
  }

  get updateSchema() {
    return {
      email: 'trim|lower_case',
    }
  }
}
