import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email Validator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')

    expect(isValid).toBeFalsy()
  })

  it('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@email.com')

    expect(isValid).toBeTruthy()
  })

  it('should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
