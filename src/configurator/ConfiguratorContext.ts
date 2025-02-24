import { AuthenticationContext } from '@elfsquad/authentication';
import { Configuration } from '../models/Configuration';
import { ConfigurationModels } from '../models/ConfigurationModels';
import { Layout2d } from '../models/Layout2d';
import { Layout3d } from '../models/Layout3d';
import { LinkedConfigurationOverview } from '../models/LinkedConfigurationOverview';
import { OverviewGroups } from '../models/Overview';
import { QuotationRequest } from '../models/QuotationRequest';
import { Settings } from '../models/Settings';
import { AuthenticationMethod, IConfiguratorOptions } from './IConfiguratorOptions';


export class ConfiguratorContext extends EventTarget {
    /**
     * The @link{AuthenticationContext} that is used to authenticate
     * with the API.
    */
    public authenticationContext: AuthenticationContext;

    /**
     * A list of configurations that are currently open. This list will
     * contain the root configuration and all linked configurations.
    */
    public configurations: Configuration[] = [];

    /**
     * Initializes a new instance with the provided options.
     *
     * @example
     * ```typescript
     * import { ConfiguratorContext, AuthenticationMethod } from '@elfsquad/configurator';
     *
     * const context = new ConfiguratorContext({
     *   authenticationMethod: AuthenticationMethod.ANONYMOUS,
     *   tenantId: 'your-tenant-id',
     * });
     * ```
     *
     * @param _options The options that are used to configure the context.
     * @throws An error if the options are invalid.
    */
    constructor(public _options: IConfiguratorOptions) { 
        super();
        if (!_options.authenticationMethod){
            _options.authenticationMethod = AuthenticationMethod.ANONYMOUS;
        }

        if ((_options.authenticationMethod == AuthenticationMethod.ANONYMOUS || _options.authenticationMethod == AuthenticationMethod.ANONYMOUS_AND_USER_LOGIN)
            && !_options.tenantId){
            console.error('TenantId is required when the authentication method is ANONYMOUS.');
            return;
        }

        if (_options.authenticationMethod != AuthenticationMethod.ANONYMOUS && !(_options.authenticationOptions || _options.authenticationContext)){
            console.error('Authentication options are required if the authentication method is not set to ANONYMOUS.');
            return;
        }

        if (_options.authenticationMethod != AuthenticationMethod.ANONYMOUS){
            if (_options.authenticationContext){
                this.authenticationContext = _options.authenticationContext;
            }
            else{
                this.authenticationContext = new AuthenticationContext(_options.authenticationOptions);
            }
            
        }

        if (!_options.apiUrl){
            _options.apiUrl = `https://api.elfsquad.io`;
        }
    }

    /**
     * Retrieve the available configuration models, categories &
     * languages for the current showroom & user.
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const configurationModels = await context.getConfigurationModels();
     * console.log('Models: ', configurationModels.features);
     * console.log('Categories: ', configurationModels.categories);
     * console.log('Languages: ', configurationModels.languages);
     * ```
     *
     * @param languageIso the language iso will be used for setting feature texts in the DTO.
     * @returns DTO containing the configuration models, categories & languages.
    */
    public async getConfigurationModels(languageIso?: string | undefined): Promise<ConfigurationModels> {
        let url = `${this._options.apiUrl}/configurator/1/configurator/configurationmodels`;
        if (languageIso){
            url += `?lang=${languageIso}`;
        }

        let result = await this._get(url);
        return (await result.json()) as ConfigurationModels;
    }

    /**
     * Start a new configuration with the provided feature model id,
     * feature model name or configuration code.
     *
     * If a configuration code is provided, the configuration will be
     * duplicated & the duplicated configuration will be returned.
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const feautureModelName = 'YourFeatureModelName';
     * const configuration = await context.newConfiguration(feautureModelName);
     * ```
     *
     * @param name The feature model id, feature model name or
     * configuration code.
     * @param language The language to start the configuration in.
     * @param preview Whether the configuration should be started in
     * preview mode.
     * @param includeSearchbarResults Whether results in display type
     * searchbar should be included or not.
     *
     * @returns The new configuration.
    */
    public async newConfiguration(name: string, language: string = null, preview: boolean = false, includeSearchbarResults: boolean = false): Promise<Configuration> {
        let parameters = new URLSearchParams({ 
            language, 
            preview: preview?.toString(), 
            includeSearchbarResults: includeSearchbarResults?.toString()
        }).toString();
        let result = await this._get(`${this._options.apiUrl}/configurator/1/configurator/new/${name}?${parameters}`);
        
        const configuration = new Configuration(this, await result.json());
        this.configurations.push(configuration);
        await this._updateConfiguration(configuration);        
        
        return configuration;
    }

    /**
     * Open an existing configuration with the provided configuration id
     * or configuration code.
     *
     * If the configuration code is provided, the configuration will be
     * duplicated & the duplicated configuration will be returned.
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const configurationId = 'YourConfigurationId';
     * const configuration = await context.openConfiguration(configurationId);
     * ```
     *
     * @param configurationId The configuration id or configuration code.
     * @param includeSearchbarResults Whether results in display type
     * searchbar should be included or not.
     * 
     * @returns The opened configuration.
    */
    public async openConfiguration(configurationId: string, includeSearchbarResults: boolean = false) : Promise<Configuration>{
        let result = await this._get(`${this._options.apiUrl}/configurator/1/configurator/open/${configurationId}?includeSearchbarResults=${includeSearchbarResults}`);
        
        const configuration = new Configuration(this, await result.json());
        this.configurations.push(configuration);
        await this._updateConfiguration(configuration);        
        
        return configuration;
    }

    /**
     * Retrieve the settings for the current showroom.
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const settings = await context.getSettings();
     * console.log('Settings: ', settings);
     * ```
     *
     * @param language The language is used for retrieving localized
     * texts.
     * @returns The settings for the current showroom & user.
    */
    public async getSettings(language: string = null): Promise<Settings> {
        if (language == null) language = this.rootConfiguration()?.language;
        let url = `${this._options.apiUrl}/configurator/1/configurator/settings`;
        if (language) url += `?lang=${language}`;
        let result = await this._get(url);
        return await result.json() as Settings;
    }

    /**
     * Retrieve the 2D layout for a coniguration. The 2dlayout can be
     * used for visualizing the configuration in a 2D view.
     *
     * A guide is available at: @link{https://docs.elfsquad.io/docs/configurator/guides/generating-2d-step-images}
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const layout2d = await context.getLayout2d();
     * console.log('Layout2d: ', layout2d);
     * ```
     *
     * @param configurationId The configuration id. If not provided, the
     * root configuration id will be used.
     * @param stepId The step id.
     *
     * @returns The 2D layout for the configuration.
    */
    public async getLayout2d(configurationId: string | null = null, stepId: string): Promise<Layout2d[]> {
      if (!configurationId) configurationId = this.rootConfiguration().id;
      if (!stepId) stepId = this.rootConfiguration().steps[0].id;
      const result = await this._get(`${this._options.apiUrl}/configurator/1/configurator/${configurationId}/2dlayout?stepId=${stepId}`);
      return (await result.json()) as Layout2d[];
    }

    /**
     * Retrieve the 3D layout for a coniguration. The 3dlayout can be
     * used for visualizing the configuration in a 3D view.
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const layout3d = await context.getLayout3d();
     * console.log('Layout3d: ', layout3d);
     * ```
     *
     * @param configurationId The configuration id. If not provided, the
     * root configuration id will be used.
     * 
     * @returns The 3D layout for the configuration.
    */
    public async getLayout3d(configurationId: string | null = null): Promise<Layout3d[]>{
        if (!configurationId) configurationId = this.rootConfiguration().id;
        let result = await this._get(`${this._options.apiUrl}/configurator/1/configurator/${configurationId}/3dlayout`);
        return await result.json() as Layout3d[];
    }

    /**
     * Retrieve the linked configuration overview for the current root
     * configuration. This overview can be used to display a navigator
     * for the linked configurations.
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const linkedConfigurationOverview = await context.getLinkedConfigurationOverview();
     * console.log('LinkedConfigurationOverview: ', linkedConfigurationOverview);
     * ```
     *
     * @returns The linked configuration overview for the current root
     * configuration.
    */
    public async getLinkedConfigurationOverview() : Promise<LinkedConfigurationOverview>{
        let result = await this._get(`${this._options.apiUrl}/configurator/1/configurator/${this.rootConfiguration().id}/linkedconfigurations/overview`);
        return await result.json() as LinkedConfigurationOverview;
    }

    /**
     * Retrieve the overview for the current configuration. The overview
     * can be used to display a summary of the configuration, for
     * example on the checkout page.
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const overview = await context.getOverview();
     * console.log('Overview: ', overview);
     * ```
     *
     * @param configurationId The configuration id. If not provided, the
     * root configuration id will be used.
     *
     * @returns The overview for the configuration.
    */
    public async getOverview(configurationId: string | null = null): Promise<OverviewGroups[]> {
        if (!configurationId) configurationId = this.rootConfiguration().id;
        const result = await this._get(
            `${this._options.apiUrl}/configurator/1/configurator/overview/multiple?configurationIds=${configurationId}`
        );
        return (await result.json()) as OverviewGroups[];
    }
    
    /**
     * Registers a callback function that will be called whenever a
     * configuration is updated.
     *
     * @example
     * ```typescript
     * import { ConfiguratorContext, Configuration } from '@elfsquad/configurator';
     * const context = new ConfiguratorContext();
     *
     * const callback = (evt: CustomEvent<Configuration>) => {
     *  console.log('Configuration updated: ', evt.detail);
     * };
     * context.onUpdate(callback);
     * ```
     *
     * @param f The callback function that will be registered.
    */
    public onUpdate(f: (evt: CustomEvent<Configuration>) => void) {
        this.addEventListener('onConfigurationUpdated', f as (evt: CustomEvent<Configuration>) => void)
    }

    /**
     * Request a quote for the current root configuration. This endpoint
     * should be used when anonymous users want to request a quote.
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const quotationRequest = {
     *   email: 'john.doe@gmail.com',
     *   firstName: 'John',
     *   lastName: 'Doe',
     * }
     * await context.requestQuote(quotationRequest);
     * ```
     *
     * @param quotationRequest The quotation request.
    */
    public async requestQuote(quotationRequest: QuotationRequest) {
        await this.post(`${this._options.apiUrl}/api/2/configurations/${this.rootConfiguration().id}/requestQuote`, quotationRequest);
    }

    /**
     * Add the current configuration to a quotation. This endpoint should
     * be used when a user is logged in and wants to add a configuration
     * to a quotation.
     *
     * @example
     * ```typescript
     * const context = new ConfiguratorContext();
     * const quotationId = 'YourQuotationId';
     * await context.addToQuotation(quotationId);
     * ```
     *
     * @param quotationId The quotation id.
     * @param configurationIds The configuration ids. If not provided,
     * the root configuration id will be used.
    */
    public async addToQuotation(quotationId: string, configurationIds: string[] = null) {
        if (!configurationIds) configurationIds = [this.rootConfiguration().id];
        await this._put(`${this._options.apiUrl}/configurator/3/configurator/addtoquotation`, {
          configurationIds,
          quotationId
        });
    }

    public _get(url:string): Promise<Response> {
        return this.fetchRequest(new Request(url));
    }

    private rootConfiguration(): Configuration{
        if (this.configurations.length == 0) return null;

        let childConfigurationIds = this.configurations
            .map(c => c.linkedConfigurationModels.map(lc => lc.configurationModelId))
            .flat();

        return this.configurations.find(c => childConfigurationIds.indexOf(c.id) == -1);
    }

    private post(url: string, body: any): Promise<Response> {
        return this.fetchRequest(new Request(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }));
    }

    public _put(url:string, object: any): Promise<Response> {
        return this.fetchRequest(new Request(url, {
            method: 'PUT',
            headers:  { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        }));
    }

    private async fetchRequest(input: Request): Promise<Response> {
        if (this._options.tenantDomain) {
          input.headers.append('x-elfsquad-domain', this._options.tenantDomain);
        }

        if (await this.useElfsquadIdHeader()) {
            input.headers.append('x-elfsquad-id', this._options.tenantId);
        } else {
            input.headers.append('authorization', `Bearer ${await this.authenticationContext.getAccessToken()}`);
        }

        return fetch(input);
    }

    private async useElfsquadIdHeader(): Promise<boolean> {
        if (this._options.authenticationMethod == AuthenticationMethod.ANONYMOUS){
            return true;
        }

        if (this._options.authenticationMethod == AuthenticationMethod.USER_LOGIN){
            return false;
        }

        if (this._options.authenticationMethod == AuthenticationMethod.ANONYMOUS_AND_USER_LOGIN){
            return !(await this.authenticationContext.isSignedIn());
        }
    }

    public async _updateConfiguration(configuration: Configuration) {
        this.dispatchEvent(new CustomEvent<Configuration>('onConfigurationUpdated', {'detail': configuration}));
    }
}
