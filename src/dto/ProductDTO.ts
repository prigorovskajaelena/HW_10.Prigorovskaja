import { z } from 'zod'
export class ProductDTO {
  id: number
  name: string
  price: number
  createdAt: null | string

  constructor(id: number, name: string, price: number, createdAt: null | string) {
    this.id = id
    this.name = name
    this.price = price
    this.createdAt = createdAt
  }

  static generateDefaultPosit(): ProductDTO {
    const dto = new ProductDTO(0, 'ElenaP', 10, null)
    return dto
  }

  static generateDefaultNegat(): ProductDTO {
    const dto = new ProductDTO(0, '', -10, null)
    return dto
  }
}
export const ProductSchema=z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  createdAt: z.string().nullable()
})

export type Product=z.infer<typeof ProductSchema>