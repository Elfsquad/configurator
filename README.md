# Elfsquad Configurator Library

The Elfsquad Configurator Library allows you to easily interact with the [Configurator API](https://docs.elfsquad.io/apis/configurator).

## ConfiguratorContext options
* `authenticationMethod` (optional) Authentication method required by the application. Defaults to `ANONYMOUS`.
* `tenantId` Identifier of the tenant. The tenant id can be found on the integrations page of your EMS.
* `authenticationOptions` (optional) See [Elfsquad Authentication Library](https://github.com/Elfsquad/authentication) for the available options. This setting is required when the authenticationMethod is `USER_LOGIN` or `ANONYMOUS_AND_USER_LOGIN`.
* `apiUrl` (optional) Base address of the Elfsquad API. Defaults to `https://api.elfsquad.io`.

## ConfiguratorContext methods
* `getConfigurationModels` Retrieves a list of all available configuration models.
* `newConfiguration` Starts a new configuration session.
* `openConfiguration` Open an existing configuration.
* `updateRequirement` Update the value of a feature in the configuration.
* `updateText` Update the text value of a feature in the configuration.
* `changeLanguage` Changes the language of the texts in the configuration session.
* `getStepImage` Retrieves the step image for a step in the configuration session.
* `getPdf` Generates a PDF document for the configuration session.
* `getLayout3d` Retrieves the 3D layout settings for the configuration session.
* `getSettings` Retrieves the configurator settings.

## Examples
```javascript
const TENANT_ID = 'ff0a9727-ced1-4b99-9f8a-2087a1f79ba4';

const configuratorContext = new ConfiguratorContext({
    tenantId: TENANT_ID
});

configuratorContext.getSettings().then((settings) => {
    console.log('settings', settings);
});

configuratorContext.getConfigurationModels().then((models) => {
    console.log('models', models);

    let model = models.features[0];
    
    configuratorContext.newConfiguration(model.name).then((configuration) => {
        console.log('newConfiguration', configuration);

        configuratorContext.openConfiguration(configuration.id).then((openedConfiguration) => {
            console.log('openedConfiguration', openedConfiguration);

            const feature = openedConfiguration.steps[0].features[0];
            
            configuratorContext.updateRequirement(feature.id, true, 1).then((updateResult) => {
                console.log('updateResult', updateResult);
            });

            configuratorContext.updateText(feature.id, 'test 123').then((updateResult) => {
                console.log('updateTextResult', updateResult);
            });

            configuratorContext.changeLanguage(Object.keys(models.languages)[2]).then((updateResult) => {
                console.log('changeLanguage', updateResult);
            });

            configuratorContext.getStepImage(openedConfiguration.steps[0].id).then((image) => {
                console.log('image', image);
            });

            configuratorContext.getPdf().then((pdf) => {
                console.log('pdf', pdf);
            });

            configuratorContext.getLayout3d().then((layout) => {
                console.log('layout', layout);
            });
        });
    });
});
```