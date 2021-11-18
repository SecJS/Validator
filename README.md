# Validator ✅

> Validate payloads from any NodeJS project.

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/secjs/validator.svg?style=social&label=Star&maxAge=2592000)](https://github.com/secjs/validator/stargazers/)

<p>
    <a href="https://www.buymeacoffee.com/secjs" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</p>

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/secjs/validator?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/secjs/validator?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">

  <img alt="Commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to maintain a payload validator package to use inside any NodeJS project.

<img src=".github/validator.png" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

> To use the high potential from this package you need to install first this other packages from SecJS,
> it keeps as dev dependency because one day `@secjs/core` will install everything once.

```bash
npm install @secjs/exceptions
```

> Then you can install the package using:

```bash
npm install @secjs/validator
```

## Validator

> Use Validator class to extend in your validation classes

```ts
import { Validator } from '@secjs/validator'

export class UserValidator extends Validator {
  get schema() {
    return {
      name: 'string|required',
      email: 'email|required',
    }
  }

  get updateSchema()  {
    return {
      name: 'string',
      email: 'string',
    }
  }
}

const userValidator = new UserValidator()

try {
  const validatedData = await userValidator.validate({ 
    name: 'João', 
    email: 'lenonSec7@gmail.com' 
  }, 'schema')
  
  return validatedData
} catch(error) {
  // All the validation errors found
  throw error
}
```

### Nice validator options

> Fail on first and clean the data

```ts
import { Validator } from '@secjs/validator'

export class UserValidator extends Validator {
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

const userValidator = new UserValidator()

try {
  const validatedData = await userValidator.validate({ 
    name: 'João', 
    email: 'lenonSec7@gmail.com', 
    additionalProp: 'hello' 
  }, 'schema')

  return validatedData // { name: 'João', email: 'lenonSec7@gmail.com' } without additionalProp
} catch(error) {
  // Only the first validation error found
  throw error 
  // [
  //   {
  //     message: 'required validation failed on name',
  //     validation: 'required',
  //     field: 'name',
  //   }
  // ]
}
```

### Custom error messages

> Use custom error messages and Internationalization support

```ts
import { Validator } from '@secjs/validator'

export class UserValidator extends Validator {
  get messages() {
    return {
      email: '{{ field }} is not a valid email',
      // pt-br
      'name.required': '{{ field }} é obrigatório para criar um usuário'
    }
  }
  
  get schema() {
    return {
      name: 'string|required',
      email: 'email|required',
    }
  }
}

const userValidator = new UserValidator()

try {
// try implementation...
} catch(error) {
  throw error 
  // [
  //   {
  //     message: 'name é obrigatório para criar um usuário',
  //     validation: 'required',
  //     field: 'name',
  //   },
  //  {
  //     message: 'email is not a valid email',
  //     validation: 'email',
  //     field: 'email',
  //   }
  // ]
}
```

## Sanitizer

> Use Sanitizer class to extend in your validation classes

```ts
import { Sanitizer } from '@secjs/validator'

export class UserSanitizer extends Sanitizer {
  get schema() {
    return {
      email: 'trim|lower_case',
    }
  }

  get updateSchema() {
    return {
      email: 'trim|lower_case',
    }
  }
}

const userSanitizer = new UserSanitizer()

userSanitizer.sanitize({ 
  email: 'lenonSec7@gmail.com      ' 
}, 'schema') // Return the object with sanitizations implemented
// { email: 'lenonsec7@gmail.com' }
```

## Extend Validator and Sanitizer

> Extend validation and sanitizer rules

```ts
import * as he from 'he'
import { Validator, Sanitizer } from '@secjs/validator'

export class ExtendValidator {
  protected validator: Validator
  
  constructor() {
    this.validator = new Validator()
    
    this.validator.extendAsync('unique', this.unique)
  }

  // Returning false will fail the validation
  unique = async (data: any, field: string, args: string[]) => {
    const repository = this.getRepository(args[0])

    const model = await repository.getOne(null, {
      where: { [field]: this.validator.getValue(data, field) },
    })

    return !model
  }
}

export class ExtendSanitizer {
  protected sanitizer: Sanitizer

  constructor() {
    this.sanitizer = new Sanitizer()

    this.sanitizer.extend('escape', this.escape)
  }

  escape = async (data: any, field: string, args: string[], config: any) => {
    let fieldValue = this.sanitizer.getValue(data, field)
    
    if (typeof (fieldValue) !== 'string') {
      return
    }

    this.sanitizer.patchValue(data, field, he.escape(fieldValue))
  }
}
```

## More rules

> This project is using [indicative](https://github.com/poppinss/indicative) package to implement 
> class Sanitizer and Validator if you want to check all the validation and sanitizer rules check
> [indicative documentation](https://indicative.adonisjs.com/).

---

## License

Made with 🖤 by [jlenon7](https://github.com/jlenon7) :wave:
