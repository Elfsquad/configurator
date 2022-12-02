import {  AuthenticationContext, IAuthenticationOptions } from '@elfsquad/authentication';

export interface IConfiguratorOptions {
    authenticationMethod?: AuthenticationMethod | undefined;
    tenantId?: string | undefined;
    tenantDomain?: string | undefined;
    authenticationContext?: AuthenticationContext | undefined;
    authenticationOptions?: IAuthenticationOptions | undefined;
    apiUrl?: string | undefined;
}

export enum AuthenticationMethod {
    ANONYMOUS,
    USER_LOGIN,
    ANONYMOUS_AND_USER_LOGIN
}