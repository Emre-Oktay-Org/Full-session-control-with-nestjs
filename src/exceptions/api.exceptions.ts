import { ApiEc } from './apiec.enum';

export class ApiException extends Error {
  private readonly errorCode: ApiEc;

  constructor(errorCode: ApiEc, message?: string) {
    super(message ?? ApiException.defaultMessageKeyOrErrorCode(errorCode));
    this.errorCode = errorCode;
  }

  private static defaultMessageKeyOrErrorCode(errorCode: ApiEc): string {
    switch (errorCode) {
      case ApiEc.UserNotFound:
        return 'API_ERROR_USER_NOT_FOUND';
      case ApiEc.EmailAlreadyRegistered:
        return 'API_ERROR_EMAIL_ALREADY_REGISTER';
      case ApiEc.EmailWrong:
        return 'API_ERROR_EMAIL_WRONG';
      case ApiEc.PasswordWrong:
        return 'API_ERROR_PASSWORD_WRONG';
      case ApiEc.PasswordNotMatch:
        return 'API_ERROR_PASSWORD_NOT_MATCH';
      case ApiEc.InternalServerError:
        return 'API_ERROR_INTERNAL_SERVER_ERROR';
      case ApiEc.UserNotFoundByEmail:
        return 'API_ERROR_USER_NOT_FOUND_BY_EMAIL';
      case ApiEc.WrongInput:
        return 'API_ERROR_WRONG_INPUT';
      case ApiEc.ReEnterPassword:
        return 'API_ERROR_RE_ENTER_PASSWORD';
      case ApiEc.NotAuthorization:
        return 'API_ERROR_NOT_AUTHORIZATION';
      case ApiEc.NotAccept:
        return 'API_ERROR_NOT_ACCEPT';
      case ApiEc.EmailAlreadyConfirmed:
        return 'API_ERROR_EMAIL_ALREADY_CONFIRMED';
      case ApiEc.EmailNotConfirmed:
        return 'API_ERROR_EMAIL_NOT_CONFIRMED';
    }
  }
}
