const path = require('path')

module.exports = {
    cssModules: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}