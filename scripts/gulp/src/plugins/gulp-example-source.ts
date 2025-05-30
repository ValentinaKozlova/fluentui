import * as Babel from '@babel/core';
import { LegacyESLint as ESLint } from 'eslint/use-at-your-own-risk';
import gutil from 'gulp-util';
import prettier from 'prettier';
import through from 'through2';
import Vinyl from 'vinyl';

import { transformStarImportPlugin } from '../babel-plugins';

import { getRelativePathToSourceFile } from './util';
import { ExampleSource } from './util/docs-types';

const prettierConfig = require('../../../../prettier.config');

// eslint-disable-next-line @typescript-eslint/no-deprecated
const eslint = new ESLint({
  fix: true,
});

const pluginName = 'gulp-example-source';

const createExampleSourceCode = async (file: Vinyl): Promise<ExampleSource> => {
  const tsSource = file.contents?.toString() ?? '';

  const babelResult = Babel.transform(tsSource, {
    // This plugin transforms TS files for docs, we want to apply exactly this config.
    configFile: false,
    plugins: [transformStarImportPlugin],
    presets: [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]],
    sourceType: 'module',
  });

  const prettierResult = prettier.format(babelResult?.code ?? '', {
    ...prettierConfig,
    trailingComma: 'all',
    printWidth: 100,
    semi: false,
    parser: 'babel',
  });

  // https://eslint.org/docs/developer-guide/nodejs-api#cliengineexecuteontext
  // Results will contain single entry
  const results = await eslint.lintText(prettierResult, { filePath: file.path });
  const eslintResult = results[0];

  return {
    // result.output is omitted if no fix is available
    js: eslintResult.output || prettierResult,
    ts: tsSource,
  };
};

export default () =>
  through.obj(async (file: Vinyl, _, cb) => {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(pluginName, 'Streaming is not supported'));
      return;
    }

    try {
      const sourcePath = getRelativePathToSourceFile(file.path);
      const source = await createExampleSourceCode(file);

      const sourceFile = new Vinyl({
        path: sourcePath,
        contents: Buffer.from(JSON.stringify(source, null, 2)),
      });
      // `gulp-cache` relies on this private entry
      sourceFile._cachedKey = file._cachedKey;

      cb(null, sourceFile);
    } catch (e) {
      cb(e);
    }
  });
