import { Validator } from '../../src/Validator'

export class UserValidator extends Validator {
  get schema() {
    return {
      name: 'string|required',
      email: 'email|required',
    }
  }

  get messages() {
    return {
      'name.required': '{{ field }} é obrigatório'
    }
  }

  get uniqueSchema() {
    return {
      name: 'string|required|unique:users',
      email: 'email|required',
    }
  }

  get updateSchema() {
    return {
      name: 'string',
      email: 'email',
    }
  }
}
