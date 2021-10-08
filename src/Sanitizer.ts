import { getValue, patchValue } from 'indicative-utils'
import { NotImplementedException } from '@secjs/exceptions'
import { extend, sanitize, sanitizations } from 'indicative/sanitizer'

export class Sanitizer {
  protected sanitizations = sanitizations

  getValue(data: any, field: string) {
    return getValue(data, field)
  }

  patchValue(data: any, field: string, handler: any) {
    patchValue(data, field, handler)
  }

  extend(name: string, handler: any) {
    extend(name, {
      sanitize: handler,
    })
  }

  async sanitize(value, type = 'createSchema', config = {}) {
    if (!this[type]) {
      throw new NotImplementedException('Sanitization schema not implemented.')
    }

    try {
      return sanitize(value, this[type](), config)
    } catch (error) {
      return error
    }
  }
}
