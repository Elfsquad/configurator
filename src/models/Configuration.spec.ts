import 'jest';
import fetchMock from "jest-fetch-mock";
import { ConfiguratorContext } from '../configurator/ConfiguratorContext';
import { Configuration } from './Configuration';

describe('configuration', () => {

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

    it('should apply changes after UpdateRequirement', async () => {

        // Arrange
        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test' }));

        // Act
        const configuration = await configuratorContext.newConfiguration('test');

        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test', totalPrice: 123 }));
        await configuration.updateRequirement('node_id', true, 1);

        // Assert
        expect(configuration.totalPrice).toBe(123);
    });

    it('should apply changes after updateText', async () => {

        // Arrange
        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test' }));

        // Act
        const configuration = await configuratorContext.newConfiguration('test');

        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test', totalPrice: 123 }));
        await configuration.updateText('node_id', 'abc');

        // Assert
        expect(configuration.totalPrice).toBe(123);
    });

    it('should apply changes after changeLanguage', async () => {

        // Arrange
        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test' }));

        // Act
        const configuration = await configuratorContext.newConfiguration('test');

        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test', totalPrice: 123 }));
        await configuration.changeLanguage('nl');

        // Assert
        expect(configuration.totalPrice).toBe(123);
    });

    it('should remove conflicts after updateRequirement', async () => {
            
            // Arrange
            fetchMock.mockResponseOnce(JSON.stringify({ id: 'test' }));
    
            // Act
            const configuration = await configuratorContext.newConfiguration('test');
    
            fetchMock.mockResponseOnce(JSON.stringify({ id: 'test', totalPrice: 123, conflicts: [ { id: 'test' } ] }));
            await configuration.updateRequirement('node_id', true, 1);
    
            fetchMock.mockResponseOnce(JSON.stringify({ id: 'test', totalPrice: 123 }));
            await configuration.updateRequirement('node_id', true, 1, true);

    
            // Assert
            expect(configuration.conflicts).toBe(undefined);
    });

});
