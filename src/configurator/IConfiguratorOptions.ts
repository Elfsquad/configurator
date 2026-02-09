import { AuthenticationContext, IAuthenticationOptions } from "@elfsquad/authentication";

export interface IConfiguratorOptions {
  /**
   * The authentication method that should be used. The default is
   * ANONYMOUS.
   *
   * ANONYMOUS: No authentication is required.
   * USER_LOGIN: The user must login to the configurator.
   * ANONYMOUS_AND_USER_LOGIN: The user can choose to login or
   * continue anonymously.
   */
  authenticationMethod?: AuthenticationMethod | undefined;

  /**
   * The tenant id of the tenant that the configurator should be
   * loaded for. This is required when the authentication method is
   * ANONYMOUS or ANONYMOUS_AND_USER_LOGIN.
   */
  tenantId?: string | undefined;

  /**
   * The registered showroom domain of the tenant. This is required
   * for all ANONYMOUS requests.
   */
  tenantDomain?: string | undefined;

  /**
   * Optionally use your own authentication context, if you are
   * already using the @link{elfsquad/authentication} package.
   */
  authenticationContext?: AuthenticationContext | undefined;

  /**
   * Optionally provide authentication options to override the
   * defaults.
   */
  authenticationOptions?: IAuthenticationOptions | undefined;

  /**
   * Define the base url of the configurator. Defaults to
   * api.elfsquad.io.
   */
  apiUrl?: string | undefined;
}

export enum AuthenticationMethod {
  ANONYMOUS,
  USER_LOGIN,
  ANONYMOUS_AND_USER_LOGIN,
}
