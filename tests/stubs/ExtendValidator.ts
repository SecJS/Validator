import { Validator } from '../../src/Validator'

const db = {
  users: [
    {
      name: 'test-unique',
    },
  ],
}

export class ExtendValidator {
  protected validator: Validator

  constructor() {
    this.validator = new Validator()

    this.validator.extendAsync('unique', this.unique)
  }

  unique = async (data: any, field: string, args: string[]) => {
    const userTable = db[args[0]]

    const user = userTable.find(
      d => d.name === this.validator.getValue(data, field),
    )

    return !user
  }
}
