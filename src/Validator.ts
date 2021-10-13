import {
  extend,
  validate,
  validateAll,
  validations,
} from 'indicative/validator'

import { getValue } from 'indicative-utils'
import { VanillaFormatter } from 'indicative-formatters'
import { NotImplementedException } from '@secjs/exceptions'

export class Validator {
  get validateAll(): boolean {
    return true
  }

  get removeAdditional(): boolean {
    return false
  }

  get formatter() {
    return VanillaFormatter
  }

  get strictUndefined(): boolean {
    return false
  }

  get messages(): any {
    return {}
  }

  protected validations = validations

  private get config() {
    return {
      formatter: this.formatter,
      existyStrict: this.strictUndefined,
      removeAdditional: this.removeAdditional
    }
  }

  private resolveDefaults(messages?: any, config?: any) {
    if (!messages) messages = {}

    messages = { ...messages, ...this.messages }

    if (!config) config = {}

    config = { ...config, ...this.config }

    return { msg: messages, cfg: config }
  }

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

  async validate(value, type = 'schema', messages?: any, config?: any) {
    const { msg, cfg } = this.resolveDefaults(messages, config)

    if (!this[type]) {
      throw new NotImplementedException('Validation schema not implemented.')
    }

    if (this.validateAll) return validateAll(value, this[type], msg, cfg)

    return validate(value, this[type], msg, cfg)
  }
}
