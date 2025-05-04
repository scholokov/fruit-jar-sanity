// schemas/order.js

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Замовлення',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: "Ім'я замовника", type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Телефон', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Замовлені позиції',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'product', title: 'Продукт', type: 'reference', to: [{ type: 'product' }] },
            { name: 'variant', title: "Об'єм", type: 'string' },
            { name: 'quantity', title: 'Кількість', type: 'number' },
          ]
        }
      ]
    }),
    defineField({
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: {
        list: [
          { title: 'Нове', value: 'new' },
          { title: 'Опрацьовано', value: 'processed' },
          { title: 'Скасовано', value: 'cancelled' }
        ]
      },
      initialValue: 'new'
    }),
    defineField({ name: 'createdAt', title: 'Створено', type: 'datetime', readOnly: true })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      itemCount: 'items.length'
    },
    prepare({ title, subtitle, itemCount }) {
      return {
        title: title || 'Без імені',
        subtitle: `${subtitle || '—'} • Позицій: ${itemCount ?? 0}`
      }
    }
  }
})
