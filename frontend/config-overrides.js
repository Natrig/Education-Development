const { override, fixBabelImports, addLessLoader  } = require('customize-cra');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');

const lessVars = fs.readFileSync('./src/styles/variables.less', 'utf8');
const modifiedLessVars = lessVars.replace(/\_/gm, "-");

const varsToJs = lessToJs(lessVars, { resolveVariables: true, stripPrefix: true });
const varsToConfig = lessToJs(modifiedLessVars, { resolveVariables: true, stripPrefix: false });

fs.writeFileSync('./src/styles/variables.js', `export const vars = ${JSON.stringify(varsToJs, null, 2)}`, 'utf-8');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: varsToConfig
    }
  })
);
