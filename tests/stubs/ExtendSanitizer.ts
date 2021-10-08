import * as he from 'he'
import { Sanitizer } from '../../src/Sanitizer'

export class ExtendSanitizer {
  protected sanitizer: Sanitizer

  constructor() {
    this.sanitizer = new Sanitizer()

    this.sanitizer.extend('escape', this.escape)
  }

  escape = async (data: any, field: string) => {
    const fieldValue = this.sanitizer.getValue(data, field)

    if (typeof fieldValue !== 'string') {
      return
    }

    this.sanitizer.patchValue(data, field, he.escape(fieldValue))
  }
}
