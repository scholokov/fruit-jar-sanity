// schemas/review.js

export default {
  name: 'review',
  type: 'document',
  title: 'Відгук',
  fields: [
    {
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      title: 'Продукт',
    },
    {
      name: 'author',
      type: 'string',
      title: "Ім'я користувача",
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Оцінка',
      validation: Rule => Rule.min(1).max(5),
    },
    {
      name: 'comment',
      type: 'text',
      title: 'Коментар',
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Дата',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    },
  ],
}
