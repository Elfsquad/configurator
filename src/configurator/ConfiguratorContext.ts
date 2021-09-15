import { AuthenticationContext } from '@elfsquad/authentication';
import { Configuration } from '../models/Configuration';
import { ConfigurationModels } from '../models/ConfigurationModels';
import { Layout3d } from '../models/Layout3d';
import { Settings } from '../models/Settings';
import { AuthenticationMethod, IConfiguratorOptions } from './IConfiguratorOptions';

export class ConfiguratorContext extends EventTarget {
    public authenticationContext: AuthenticationContext;
    private configuration: Configuration;

    constructor(private options: IConfiguratorOptions) { 
        super();
        if (!options.authenticationMethod){
            options.authenticationMethod = AuthenticationMethod.ANONYMOUS;
        }

        if ((options.authenticationMethod == AuthenticationMethod.ANONYMOUS || options.authenticationMethod == AuthenticationMethod.ANONYMOUS_AND_USER_LOGIN)
            && !options.tenantId){
            console.error('TenantId is required when the authentication method is ANONYMOUS.');
            return;
        }

        if (options.authenticationMethod != AuthenticationMethod.ANONYMOUS && !options.authenticationOptions){
            console.error('Authentication options are required if the authentication method is not set to ANONYMOUS.');
            return;
        }

        if (options.authenticationMethod != AuthenticationMethod.ANONYMOUS){
            this.authenticationContext = new AuthenticationContext(options.authenticationOptions);
        }

        if (!options.apiUrl){
            options.apiUrl = `https://api.elfsquad.io`;
        }
    }

    public async getConfigurationModels(languageIso?: string | undefined): Promise<ConfigurationModels> {
        let url = `${this.options.apiUrl}/configurator/1/configurator/configurationmodels`;
        if (languageIso){
            url += `?lang=${languageIso}`;
        }

        let result = await this.get(url);
        return (await result.json()) as ConfigurationModels;
    }

    public async newConfiguration(name: string): Promise<Configuration>{
        let result = await this.get(`${this.options.apiUrl}/configurator/1/configurator/new/${name}`);
        await this.updateConfiguration((await result.json()) as Configuration);
        return this.configuration;
    }

    public async openConfiguration(configurationId: string) : Promise<Configuration>{
        let result = await this.get(`${this.options.apiUrl}/configurator/1/configurator/open/${configurationId}`);
        await this.updateConfiguration((await result.json()) as Configuration);
        return this.configuration;
    }

    public async updateRequirement(featureModelNodeId: string, isSelection: boolean, value: number, ignoreConflicts: boolean = false): Promise<Configuration> {
        let result = await this.put(`${this.options.apiUrl}/configurator/1/configurator/${this.configuration.id}?ignoreConflicts=${ignoreConflicts}`, {
            featureModelNodeId,
            isSelection,
            value
        });
        await this.updateConfiguration((await result.json()) as Configuration);
        return this.configuration;
    }

    public async updateText(featureModelNodeId: string, textValue: string): Promise<Configuration> {
        let result = await this.put(`${this.options.apiUrl}/configurator/1/configurator/${this.configuration.id}/text`, {
            featureModelNodeId,
            textValue
        });
        await this.updateConfiguration((await result.json()) as Configuration);
        return this.configuration;
    }

    public async changeLanguage(languageIso: string): Promise<Configuration> {
        let result = await this.put(`${this.options.apiUrl}/configurator/1/configurator/${this.configuration.id}/changeLanguage`, languageIso);
        await this.updateConfiguration((await result.json()) as Configuration);
        return this.configuration;
    }

    public async getStepImage(stepId: string, size: number = 1080, background: boolean = true): Promise<Blob>{
        let result = await this.get(`${this.options.apiUrl}/configurator/1/configurator/${this.configuration.id}/image?stepId=${stepId}&size=${size}&background=${background}`);
        return result.blob();
    }

    public async getPdf(): Promise<Blob>{
        let result = await this.get(`${this.options.apiUrl}/configurator/1/configurator/${this.configuration.id}/pdf`);
        return result.blob();
    }

    public async getSettings(): Promise<Settings> {
        let result = await this.get(`${this.options.apiUrl}/configurator/1/configurator/settings`);
        return await result.json() as Settings;
    }

    public async getLayout3d(): Promise<Layout3d>{
        let result = await this.get(`${this.options.apiUrl}/configurator/1/configurator/${this.configuration.id}/3dlayout`);
        return await result.json() as Layout3d;
    }
    
    public onUpdate(f: EventListener) {
        this.addEventListener('onConfigurationUpdated', f);
    }

    private get(url:string): Promise<Response> {
        return this.fetchRequest(new Request(url));
    }

    private put(url:string, object: any): Promise<Response> {
        return this.fetchRequest(new Request(url, {
            method: 'PUT',
            headers:  { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        }));
    }

    private async fetchRequest(input: Request): Promise<Response> {
        if (await this.useElfsquadIdHeader()) {
            input.headers.append('x-elfsquad-id', this.options.tenantId);
        }
        else {
            input.headers.append('authorization', `Bearer ${await this.authenticationContext.getAccessToken()}`);
        }

        return fetch(input);
    }

    private async useElfsquadIdHeader(): Promise<boolean> {
        if (this.options.authenticationMethod == AuthenticationMethod.ANONYMOUS){
            return true;
        }

        if (this.options.authenticationMethod == AuthenticationMethod.USER_LOGIN){
            return false;
        }

        if (this.options.authenticationMethod == AuthenticationMethod.ANONYMOUS_AND_USER_LOGIN){
            return !(await this.authenticationContext.isSignedIn());
        }
    }

    private async updateConfiguration(configuration: Configuration) {
        this.configuration = configuration;
        this.dispatchEvent(new CustomEvent('onConfigurationUpdated', {'detail': configuration}));
    }
}
