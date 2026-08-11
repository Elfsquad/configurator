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

  /**
   * Optionally supply the bearer token for every request, instead of
   * taking it from the @link{AuthenticationContext}. Use this when the
   * host application receives a token by another route than the OAuth
   * flow — for example a token handed over by the embedding
   * application.
   *
   * Returning null or undefined falls back to the normal resolution,
   * so the host decides per request whether its own token applies.
   *
   * Called on every request; return a cached value if resolving it is
   * expensive.
   */
  accessTokenProvider?:
    | (() => string | null | undefined | Promise<string | null | undefined>)
    | undefined;

  /**
   * Optional headers added to every request, resolved per request.
   * Use for context the host resolves at runtime, such as the
   * `x-elf-orgid` and `x-elf-tenantid` headers that select the selling
   * organization and the tenant.
   *
   * These are applied last and overwrite headers this library sets
   * itself.
   */
  additionalHeaders?: (() => Record<string, string> | Promise<Record<string, string>>) | undefined;
}

export type AuthenticationMethod = (typeof AuthenticationMethod)[keyof typeof AuthenticationMethod];

export const AuthenticationMethod = {
  ANONYMOUS: 0,
  USER_LOGIN: 1,
  ANONYMOUS_AND_USER_LOGIN: 2,
} as const;
