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
      validation: Rule => Rule.min(1).max(5).warning('Оцінка має бути від 1 до 5, якщо вказана'),
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
