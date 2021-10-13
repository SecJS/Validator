import { Validator } from '../../src/Validator'

export class AllFalseValidator extends Validator {
  get validateAll() {
    return false
  }

  get removeAdditional() {
    return true
  }

  get schema() {
    return {
      name: 'string|required',
      email: 'email|required',
    }
  }
}
