module.exports = function(grunt) {
    return {
        dist: {
            options: {
                prefix: 'VERSION\\s*=\\s*[\\\'|"]'
            },
            src: ['dist/focus-manager.js', 'dist/focus-manager.min.js']
        },
        bower: {
            options: {
                prefix: '"version":\\s*"'
            },
            src: ['bower.json']
        }
    }
};
