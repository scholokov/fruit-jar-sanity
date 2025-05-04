import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Fruit Jar Studio',
  projectId: '874v0tp0',
  dataset: 'production',
  plugins: [
    deskTool(),
    visionTool(),
    cloudinaryAssetSourcePlugin({
      cloudName: 'dmb4mtnpu',  // Заміни на свій Cloudinary cloud name
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
