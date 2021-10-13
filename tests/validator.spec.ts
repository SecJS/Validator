import { UserValidator } from './stubs/UserValidator'
import { ExtendValidator } from './stubs/ExtendValidator'
import { AllFalseValidator } from './stubs/AllFalseValidator'

describe('\n Validator', () => {
  let userValidator: UserValidator
  let allFalseValidator: AllFalseValidator

  beforeEach(() => {
    userValidator = new UserValidator()
    allFalseValidator = new AllFalseValidator()
  })

  it('should return required validation errors', async () => {
    const data = {}

    try {
      await userValidator.validate(data)
    } catch(error) {
      expect(error).toStrictEqual([
        {
          message: 'name é obrigatório',
          validation: 'required',
          field: 'name',
        },
        {
          message: 'required validation failed on email',
          validation: 'required',
          field: 'email',
        },
      ])
    }
  })

  it('should return only one validation error when validateAll false', async () => {
    const data = {}

    try {
      await allFalseValidator.validate(data)
    } catch(error) {
      expect(error).toStrictEqual([
        {
          message: 'required validation failed on name',
          validation: 'required',
          field: 'name',
        },
      ])
    }
  })

  it('should return custom error messages from validate', async () => {
    const data = {}

    try {
      await allFalseValidator.validate(data, 'schema', {
        required: '{{ field }} is required to create an User'
      })
    } catch(error) {
      expect(error).toStrictEqual([
        {
          message: 'name is required to create an User',
          validation: 'required',
          field: 'name',
        },
      ])
    }
  })

  it('should throw an error when validation schema does not exist', async () => {
    const data = {}

    try {
      await userValidator.validate(data, 'undefined-schema')
    } catch(error) {
      expect(error.status).toBe(501)
      expect(error.name).toBe('NotImplementedException')
      expect(error.message).toBe('Validation schema not implemented.')
    }
  })

  it('should remove additional properties from object when validating', async () => {
    const data = {
      name: 'Hello',
      email: 'lenonsec7@gmail.com',
      anAdditionalProp: 'test'
    }

    const dataValidated = await allFalseValidator.validate(data)

    expect(dataValidated.anAdditionalProp).toBeFalsy()
  })

  it('should extend validation adding unique validation rule', async () => {
    /* eslint no-new: "off" */
    new ExtendValidator()

    const data = {
      name: 'test-unique',
      email: 'lenonsec7@gmail.com',
    }

    try {
      await userValidator.validate(data, 'uniqueSchema')
    } catch(error) {
      expect(error).toStrictEqual([
        {
          message: 'unique validation failed on name',
          validation: 'unique',
          field: 'name',
        },
      ])
    }
  })
})
