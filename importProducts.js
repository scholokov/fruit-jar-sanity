import 'dotenv/config'
import { createClient } from '@sanity/client'
import fs from 'fs'

const client = createClient({
  projectId: '874v0tp0',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2023-10-01',
})

let rawJson = fs.readFileSync('./sanity_products_cleaned.json', 'utf-8')

// Фіксимо NaN → ""
rawJson = rawJson.replace(/"description":\s*NaN/g, '"description": ""')

const products = JSON.parse(rawJson)

async function importProducts() {
  for (const product of products) {
    try {
      const created = await client.create(product)
      console.log(`✅ Створено: ${created.title}`)
    } catch (err) {
      console.error(`❌ Помилка для ${product.title}:`, err.message)
    }
  }
}

importProducts()
