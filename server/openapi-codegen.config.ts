import {
  generateSchemaTypes,
  generateFetchers,
} from '@openapi-codegen/typescript';
import { defineConfig } from '@openapi-codegen/cli';
export default defineConfig({
  easyCost: {
    from: {
      relativePath: '../swagger-spec.json',
      source: 'file',
    },
    outputDir: '../client/src/api',
    to: async (context) => {
      const filenamePrefix = 'easyCost';
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });

      await generateFetchers(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
