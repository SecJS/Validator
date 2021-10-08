import { Sanitizer } from '../../src/Sanitizer'

export class UserSanitizer extends Sanitizer {
  createSchema() {
    return {
      email: 'trim|lower_case',
    }
  }

  escapeSchema() {
    return {
      email: 'trim|lower_case|escape',
    }
  }

  updateSchema() {
    return {
      email: 'trim|lower_case',
    }
  }
}
