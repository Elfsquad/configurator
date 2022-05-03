import fetchMock from "jest-fetch-mock";
import 'jest';
import { ConfiguratorContext } from './ConfiguratorContext';

describe('ConfiguratorContext', () => {

    const API_URL = `http://example.com`
    var configuratorContext: ConfiguratorContext;

    beforeAll(() => {
        fetchMock.enableMocks();
    });
    
    beforeEach(() => {
        configuratorContext = new ConfiguratorContext({
            apiUrl: API_URL,
            tenantId: '<TENANT_ID>'
         });
    });

    it('should create an instance', () => {
        expect(configuratorContext).toBeTruthy();
    });

    it('should add new configurations to the configurations list', async () => {
        // Arrange
        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test' }));
        
        // Act
        const configuration = await configuratorContext.newConfiguration('test');
        
        // Assert
        expect(configuratorContext.configurations.length).toBe(1);
        expect(configuratorContext.configurations[0]).toEqual(configuration);
        expect(configuration['_configuratorContext']).toBe(configuratorContext);
        expect(configuration.id).toBe('test');
    });

    it('should add opened configurations to the configurations list', async () => {
        // Arrange
        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test' }));

        // Act
        const configuration = await configuratorContext.openConfiguration('test');

        // Assert
        expect(configuratorContext.configurations.length).toBe(1);
        expect(configuratorContext.configurations[0]).toEqual(configuration);
        expect(configuration['_configuratorContext']).toBe(configuratorContext);
        expect(configuration.id).toBe('test');
    });
});