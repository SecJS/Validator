import { getValue } from 'indicative-utils'
import { NotImplementedException } from '@secjs/exceptions'
import {
  extend,
  validate,
  validateAll,
  validations,
} from 'indicative/validator'

export class Validator {
  protected validations = validations

  getValue(data: any, field: string) {
    return getValue(data, field)
  }

  extendSync(name: string, handler: any) {
    extend(name, {
      async: false,
      validate: handler,
    })
  }

  extendAsync(name: string, handler: any) {
    extend(name, {
      async: true,
      validate: handler,
    })
  }

  async validate(value, type = 'createSchema', messages = {}, config = {}) {
    if (!this[type]) {
      throw new NotImplementedException('Validation schema not implemented.')
    }

    try {
      await validate(value, this[type](), messages, config)
    } catch (error) {
      return error
    }
  }

  async validateAll(value, type = 'createSchema', messages = {}, config = {}) {
    if (!this[type]) {
      throw new NotImplementedException('Validation schema not implemented.')
    }

    try {
      await validateAll(value, this[type](), messages, config)
    } catch (errors) {
      return errors
    }
  }
}
