const { assertSupportedNodeVersion } = require('../src/Engine');

module.exports = async () => {
    // @ts-ignore
    process.noDeprecation = true;

    assertSupportedNodeVersion();

    //const mix = require('../src/Mix').primary;

    const mix = require("laravel-mix");
    mix.js('resources/js/app.js', 'public/js')
   .react();
    

    require(mix.paths.mix());

    await mix.installDependencies();
    await mix.init();

    return mix.build();
    
};

module.exports = {
    module: {
        rules: [
            {
                    test: /\.js$/,
                    loader: 'esbuild-loader',
                    options: {
                      loader: 'jsx',  // Remove this if you're not using JSX
                      target: 'es2015'  // Syntax to compile to (see options below for possible values)
                    }
            },
        ],
    },
}