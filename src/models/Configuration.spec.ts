import 'jest';
import 'jest-fetch-mock'; // polyfills Request, Response, fetch for jsdom
import { ConfiguratorContext } from '../configurator/ConfiguratorContext';
import { Configuration } from './Configuration';

describe('configuration', () => {

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

    async function createTestConfiguration(id = 'test-id'): Promise<Configuration> {
        mockNextFetchResponse({ id, linkedConfigurationModels: [] });
        return configuratorContext.newConfiguration('test');
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

    it('should apply changes after UpdateRequirement', async () => {
        mockNextFetchResponse({ id: 'test' });
        const configuration = await configuratorContext.newConfiguration('test');

        mockNextFetchResponse({ id: 'test', totalPrice: 123 });
        await configuration.updateRequirement('node_id', true, 1);

        expect(configuration.totalPrice).toBe(123);
    });

    it('should apply changes after updateText', async () => {
        mockNextFetchResponse({ id: 'test' });
        const configuration = await configuratorContext.newConfiguration('test');

        mockNextFetchResponse({ id: 'test', totalPrice: 123 });
        await configuration.updateText('node_id', 'abc');

        expect(configuration.totalPrice).toBe(123);
    });

    it('should apply changes after changeLanguage', async () => {
        mockNextFetchResponse({ id: 'test' });
        const configuration = await configuratorContext.newConfiguration('test');

        mockNextFetchResponse({ id: 'test', totalPrice: 123 });
        await configuration.changeLanguage('nl');

        expect(configuration.totalPrice).toBe(123);
    });

    it('should remove conflicts after updateRequirement', async () => {
        mockNextFetchResponse({ id: 'test' });
        const configuration = await configuratorContext.newConfiguration('test');

        mockNextFetchResponse({ id: 'test', totalPrice: 123, conflicts: [{ id: 'test' }] });
        await configuration.updateRequirement('node_id', true, 1);

        mockNextFetchResponse({ id: 'test', totalPrice: 123 });
        await configuration.updateRequirement('node_id', true, 1, true);

        expect(configuration.conflicts).toBe(undefined);
    });

    it('should call correct endpoint for updateRequirement', async () => {
        const configuration = await createTestConfiguration();

        mockNextFetchResponse({ id: 'test-id' });
        await configuration.updateRequirement('node_id', true, 1);

        expect(lastRequest.url).toContain(`${API_URL}/configurator/3/configurator/test-id?ignoreConflicts=`);
        expect(lastRequest.method).toBe('PUT');
    });

    it('should call correct endpoint for updateText', async () => {
        const configuration = await createTestConfiguration();

        mockNextFetchResponse({ id: 'test-id' });
        await configuration.updateText('node_id', 'abc');

        expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/test-id/text`);
        expect(lastRequest.method).toBe('PUT');
    });

    it('should call correct endpoint for updateImage', async () => {
        const configuration = await createTestConfiguration();

        mockNextFetchResponse({ id: 'test-id' });
        await configuration.updateImage('node_id', 'https://example.com/image.png');

        expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/test-id/image`);
        expect(lastRequest.method).toBe('PUT');
    });

    it('should call correct endpoint for updateName', async () => {
        const configuration = await createTestConfiguration();

        mockNextFetchResponse({ id: 'test-id' });
        await configuration.updateName('new-name');

        expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/test-id/updatename`);
        expect(lastRequest.method).toBe('PUT');
    });

    it('should call correct endpoint for updateCardinality', async () => {
        const configuration = await createTestConfiguration();

        mockNextFetchResponse({ id: 'test-id' });
        await configuration.updateCardinality('parent-node-id', 2);

        expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/test-id/updatelinkedconfigurationcardinality`);
        expect(lastRequest.method).toBe('PUT');
    });

    it('should call correct endpoint for changeLanguage', async () => {
        const configuration = await createTestConfiguration();

        mockNextFetchResponse({ id: 'test-id' });
        await configuration.changeLanguage('nl');

        expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/test-id/changeLanguage`);
        expect(lastRequest.method).toBe('PUT');
    });

    it('should call correct endpoint for getStepImage', async () => {
        const configuration = await createTestConfiguration();

        mockNextFetchResponse('');
        await configuration.getStepImage('step-1');

        expect(lastRequest.url).toContain(`${API_URL}/configurator/3/configurator/test-id/image?stepId=`);
        expect(lastRequest.method).toBe('GET');
    });

    it('should call correct endpoint for getPdf', async () => {
        const configuration = await createTestConfiguration();

        mockNextFetchResponse('');
        await configuration.getPdf();

        expect(lastRequest.url).toBe(`${API_URL}/configurator/3/configurator/test-id/pdf`);
        expect(lastRequest.method).toBe('GET');
    });
});
