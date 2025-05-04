// schemas/product.js

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Продукт',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Назва', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Слаг', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'description', title: 'Опис', type: 'text', rows: 5 }),
    defineField({
      name: 'images',
      title: 'Зображення',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'url', title: 'Посилання на зображення', type: 'url' },
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ]
        }
      ],
    }),
    defineField({ name: 'category', title: 'Категорія', type: 'reference', to: [{ type: 'category' }], validation: Rule => Rule.required() }),
    defineField({ name: 'tags', title: 'Теги', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'alwaysAvailable',
      title: 'Завжди в наявності',
      type: 'boolean',
      initialValue: false,
      description: 'Використовується для товарів, які не потребують відстеження залишків (наприклад, камбуча)',
    }),
    defineField({ name: 'composition', title: 'Склад', type: 'string' }),
    defineField({ name: 'strength', title: 'Міцність', type: 'number', validation: Rule => Rule.min(0) }),
    defineField({ name: 'sweetness', title: 'Солодкість', type: 'number', validation: Rule => Rule.min(1).max(10) }),
    defineField({
      name: 'variants',
      title: 'Варіанти',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'volume', title: "Об'єм", type: 'string' },
            { name: 'price', title: 'Ціна', type: 'number' },
            { name: 'stock', title: 'Кількість у наявності', type: 'number' },
          ]
        }
      ],
      validation: Rule =>
        Rule.custom((variants, context) => {
          const alwaysAvailable = context.document?.alwaysAvailable

          if (!alwaysAvailable) {
            // 1. Перевірка наявності хоча б однієї варіації
            if (!Array.isArray(variants) || variants.length === 0) {
              return 'Додайте хоча б один варіант, або увімкніть "Завжди в наявності".'
            }

            // 2. Перевірка наявності stock в кожному варіанті
            const hasInvalidStock = variants.some(v => v?.stock === undefined || v.stock === null)
            if (hasInvalidStock) {
              return 'У кожному варіанті має бути вказана кількість.'
            }
          }

          return true
        }),
    }),
    defineField({
      name: 'fermentations',
      title: 'На ферментації',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'month', title: 'Місяць', type: 'string' },
            { name: 'year', title: 'Рік', type: 'number' },
            { name: 'volume', title: "Об'єм", type: 'string' },
            { name: 'stock', title: 'В Наявності', type: 'number' },
            {
              name: 'photos',
              title: 'Зображення на ферментації',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'url', title: 'Посилання на зображення', type: 'url' },
                    { name: 'alt', title: 'Alt Text', type: 'string' },
                  ]
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'showOnHome',
      title: 'Показувати на головній',
      type: 'boolean',
      initialValue: false
    }),
  ]
})
