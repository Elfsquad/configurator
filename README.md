# Elfsquad Configurator Library

The Elfsquad Configurator Library allows you to easily interact with the [Configurator API](https://docs.elfsquad.io/apis/configurator).

## Documentation
Documentation can be found on https://docs.elfsquad.io/docs/configurator/libraries/elfsquad-configurator-library

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

        configuratorContext.openConfiguration(configuration.id).then((configuration) => {
            console.log('openedConfiguration', configuration);

            const feature = configuration.steps[0].features[0];
            
            configuration.updateRequirement(feature.id, true, 1).then((updateResult) => {
                console.log('updateResult', updateResult);
            });

            configuration.updateText(feature.id, 'test 123').then((updateResult) => {
                console.log('updateTextResult', updateResult);
            });

            configuration.changeLanguage(Object.keys(models.languages)[2]).then((updateResult) => {
                console.log('changeLanguage', updateResult);
            });

            configuration.getStepImage(configuration.steps[0].id).then((image) => {
                console.log('image', image);
            });

            configuration.getPdf().then((pdf) => {
                console.log('pdf', pdf);
            });

            configuratorContext.getLayout3d().then((layout) => {
                console.log('layout', layout);
            });
        });
    });
});
```
