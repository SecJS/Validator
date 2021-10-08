import { UserValidator } from './stubs/UserValidator'
import { ExtendValidator } from './stubs/ExtendValidator'

describe('\n Validator', () => {
  let userValidator: UserValidator

  beforeEach(() => {
    userValidator = new UserValidator()
  })

  it('should return required validation errors', async () => {
    const data = {}

    const errors = await userValidator.validateAll(data)

    expect(errors).toStrictEqual([
      {
        message: 'required validation failed on name',
        validation: 'required',
        field: 'name',
      },
      {
        message: 'required validation failed on email',
        validation: 'required',
        field: 'email',
      },
    ])
  })

  it('should extend validation adding unique validation rule', async () => {
    /* eslint no-new: "off" */
    new ExtendValidator()

    const data = {
      name: 'test-unique',
      email: 'lenonsec7@gmail.com',
    }

    const errors = await userValidator.validateAll(data, 'uniqueSchema')

    expect(errors).toStrictEqual([
      {
        message: 'unique validation failed on name',
        validation: 'unique',
        field: 'name',
      },
    ])
  })
})
