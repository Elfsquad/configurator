import 'jest';
import 'jest-fetch-mock'; // polyfills Request, Response, fetch for jsdom
import { ConfiguratorContext } from './ConfiguratorContext';

describe('ConfiguratorContext', () => {

    const API_URL = `http://example.com`;
    const originalFetch = global.fetch;
    let configuratorContext: ConfiguratorContext;
    let lastRequest: Request;

    function mockNextFetchResponse(body: any) {
        const currentMock = global.fetch as jest.Mock;
        currentMock.mockImplementationOnce(async (input: RequestInfo | URL) => {
            lastRequest = input as Request;
            return new Response(typeof body === 'string' ? body : JSON.stringify(body));
        });
    }

    beforeEach(() => {
        global.fetch = jest.fn(async (input: RequestInfo | URL) => {
            lastRequest = input as Request;
            return new Response('{}');
        }) as any;

        configuratorContext = new ConfiguratorContext({
            apiUrl: API_URL,
            tenantId: '<TENANT_ID>'
        });
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });

    it('should create an instance', () => {
        expect(configuratorContext).toBeTruthy();
    });

    it('should add new configurations to the configurations list', async () => {
        mockNextFetchResponse({ id: 'test' });

        const configuration = await configuratorContext.newConfiguration('test');

        expect(configuratorContext.configurations.length).toBe(1);
        expect(configuratorContext.configurations[0]).toEqual(configuration);
        expect(configuration['_configuratorContext']).toBe(configuratorContext);
        expect(configuration.id).toBe('test');
    });

    it('should add opened configurations to the configurations list', async () => {
        mockNextFetchResponse({ id: 'test' });

        const configuration = await configuratorContext.openConfiguration('test');

        expect(configuratorContext.configurations.length).toBe(1);
        expect(configuratorContext.configurations[0]).toEqual(configuration);
        expect(configuration['_configuratorContext']).toBe(configuratorContext);
        expect(configuration.id).toBe('test');
    });

    it('should call correct endpoint for getConfigurationModels', async () => {
        mockNextFetchResponse({ features: [] });

        await configuratorContext.getConfigurationModels();

        expect(lastRequest.url).toBe(`${API_URL}/configurator/1/configurator/configurationmodels`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for getConfigurationModels with language', async () => {
        mockNextFetchResponse({ features: [] });

        await configuratorContext.getConfigurationModels('en');

        expect(lastRequest.url).toBe(`${API_URL}/configurator/1/configurator/configurationmodels?lang=en`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for newConfiguration', async () => {
        mockNextFetchResponse({ id: 'test', linkedConfigurationModels: [] });

        await configuratorContext.newConfiguration('test');

        expect(lastRequest.url).toContain(`${API_URL}/configurator/1/configurator/new/test`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for openConfiguration', async () => {
        mockNextFetchResponse({ id: 'test-id', linkedConfigurationModels: [] });

        await configuratorContext.openConfiguration('test-id');

        expect(lastRequest.url).toContain(`${API_URL}/configurator/1/configurator/open/test-id`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for getSettings', async () => {
        mockNextFetchResponse({});

        await configuratorContext.getSettings();

        expect(lastRequest.url).toBe(`${API_URL}/configurator/1/configurator/settings`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for getLayout2d', async () => {
        mockNextFetchResponse({ id: 'cfg-id', linkedConfigurationModels: [], steps: [{ id: 'step-1' }] });
        await configuratorContext.newConfiguration('test');

        mockNextFetchResponse([]);
        await configuratorContext.getLayout2d('cfg-id', 'step-1');

        expect(lastRequest.url).toBe(`${API_URL}/configurator/1/configurator/cfg-id/2dlayout?stepId=step-1`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for getLayout3d', async () => {
        mockNextFetchResponse({ id: 'cfg-id', linkedConfigurationModels: [] });
        await configuratorContext.newConfiguration('test');

        mockNextFetchResponse([]);
        await configuratorContext.getLayout3d('cfg-id');

        expect(lastRequest.url).toBe(`${API_URL}/configurator/1/configurator/cfg-id/3dlayout`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for getLinkedConfigurationOverview', async () => {
        mockNextFetchResponse({ id: 'cfg-id', linkedConfigurationModels: [] });
        await configuratorContext.newConfiguration('test');

        mockNextFetchResponse({});
        await configuratorContext.getLinkedConfigurationOverview();

        expect(lastRequest.url).toBe(`${API_URL}/configurator/1/configurator/cfg-id/linkedconfigurations/overview`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for getOverview', async () => {
        mockNextFetchResponse({ id: 'cfg-id', linkedConfigurationModels: [] });
        await configuratorContext.newConfiguration('test');

        mockNextFetchResponse([]);
        await configuratorContext.getOverview();

        expect(lastRequest.url).toBe(`${API_URL}/configurator/1/configurator/overview/multiple?configurationIds=cfg-id`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for requestQuote', async () => {
        mockNextFetchResponse({ id: 'cfg-id', linkedConfigurationModels: [] });
        await configuratorContext.newConfiguration('test');

        mockNextFetchResponse({});
        await configuratorContext.requestQuote({ firstName: 'John', lastName: 'Doe', email: 'john@example.com' } as any);

        expect(lastRequest.url).toBe(`${API_URL}/api/2/configurations/cfg-id/requestQuote`);
        expect(lastRequest.method).toBe('POST');
    });

    it('should call correct endpoint for addToQuotation', async () => {
        mockNextFetchResponse({ id: 'cfg-id', linkedConfigurationModels: [] });
        await configuratorContext.newConfiguration('test');

        mockNextFetchResponse({});
        await configuratorContext.addToQuotation('quotation-id');

        expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/addtoquotation`);
        expect(lastRequest.method).toBe('PUT');
    });
});
