import { Validator } from '../../src/Validator'

export class UserValidator extends Validator {
  createSchema() {
    return {
      name: 'string|required',
      email: 'email|required',
    }
  }

  uniqueSchema() {
    return {
      name: 'string|required|unique:users',
      email: 'email|required',
    }
  }

  updateSchema() {
    return {
      name: 'string',
      email: 'email',
    }
  }
}
