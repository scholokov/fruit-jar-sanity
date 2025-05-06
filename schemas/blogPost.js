// schemas/blogPost.js
export default {
  name: 'blogPost',
  title: 'Блог',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Назва',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Дата публікації',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    },
    {
      name: 'blocks',
      title: 'Блоки',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Текст',
              type: 'text'
            },
            {
              name: 'images',
              title: 'Галерея фото',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'url', type: 'url', title: 'URL' },
                    { name: 'alt', type: 'string', title: 'Опис (alt)' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'excerpt',
      title: 'Короткий опис',
      type: 'text',
      rows: 2
    },
    {
      name: 'previewImage',
      title: 'Прев’ю зображення',
      type: 'object',
      fields: [
        { name: 'url', title: 'URL', type: 'url' },
        { name: 'alt', title: 'Опис (alt)', type: 'string' }
      ]
    },
    {
      name: 'slug',
      title: 'Slug (посилання)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    }
  ]
}
