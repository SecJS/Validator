import { UserSanitizer } from './stubs/UserSanitizer'
import { ExtendSanitizer } from './stubs/ExtendSanitizer'

describe('\n Sanitizer', () => {
  let userSanitizer: UserSanitizer

  beforeEach(() => {
    userSanitizer = new UserSanitizer()
  })

  it('should sanitize the data using schema from user sanitizer', async () => {
    const data = {
      email: 'lenonSec7@gmail.com      ',
    }

    const sanitizedData = await userSanitizer.sanitize(data)

    expect(sanitizedData).toStrictEqual({
      email: 'lenonsec7@gmail.com',
    })
  })

  it('should extend sanitization adding escape rule', async () => {
    /* eslint no-new: "off" */
    new ExtendSanitizer()

    const data = {
      email: '"lenonSec7@gmail.com"     ',
    }

    const sanitizedData = await userSanitizer.sanitize(data, 'escapeSchema')

    expect(sanitizedData.email).toBe('&quot;lenonsec7@gmail.com&quot;')
  })
})
