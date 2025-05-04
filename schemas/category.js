// schemas/category.js

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Категорія',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Зображення',
      type: 'object',
      fields: [
        { name: 'url', title: 'Посилання на зображення', type: 'url' },
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ]
    }),
    defineField({
      name: 'shortDescription',
      title: 'Короткий опис',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      type: 'text'
    })
  ],
})
