import axios from 'axios'
import type { Product } from '../types/product'
import type { Interaction } from '../types/interaction'

const config = useRuntimeConfig()
export type RecommendationsResponse = {
  products: Product[]
}

export type SearchParamsType = {
  q?: string
  min_price?: number | null
  max_price?: number | null
  category?: string[] | null
  page?: number
}

export type GetProductsResponse = {
  items: Product[]
  total: number
  page: number
}

const mockProducts: Product[] = [
  {
    _id: "p1",
    name: "Oversize Hoodie 'Cloud Grey'",
    description: "Мягкое худи свободного кроя из хлопка с флисом внутри. Идеально для повседневных образов.",
    category: "hoodies",
    price: 18900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p2",
    name: "Cargo Pants 'Urban Sand'",
    description: "Удобные карго штаны с регулировкой по талии и функциональными карманами.",
    category: "pants",
    price: 22900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p3",
    name: "Classic T-Shirt 'White Core'",
    description: "Базовая белая футболка из 100% хлопка. Не просвечивает, плотная ткань.",
    category: "t-shirts",
    price: 7900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p4",
    name: "Puffer Jacket 'Midnight Navy'",
    description: "Тёплая и лёгкая зимняя куртка с водоотталкивающим покрытием.",
    category: "outerwear",
    price: 45900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p5",
    name: "Sneakers 'Mono Black'",
    description: "Универсальные кроссовки из эко-кожи с амортизирующей подошвой.",
    category: "shoes",
    price: 29900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p6",
    name: "Oversize Hoodie 'Cloud Grey'",
    description: "Мягкое худи свободного кроя из хлопка с флисом внутри. Идеально для повседневных образов.",
    category: "hoodies",
    price: 18900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p7",
    name: "Cargo Pants 'Urban Sand'",
    description: "Удобные карго штаны с регулировкой по талии и функциональными карманами.",
    category: "pants",
    price: 22900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p8",
    name: "Classic T-Shirt 'White Core'",
    description: "Базовая белая футболка из 100% хлопка. Не просвечивает, плотная ткань.",
    category: "t-shirts",
    price: 7900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p9",
    name: "Puffer Jacket 'Midnight Navy'",
    description: "Тёплая и лёгкая зимняя куртка с водоотталкивающим покрытием.",
    category: "outerwear",
    price: 45900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p10",
    name: "Sneakers 'Mono Black'",
    description: "Универсальные кроссовки из эко-кожи с амортизирующей подошвой.",
    category: "shoes",
    price: 29900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p11",
    name: "Oversize Hoodie 'Cloud Grey'",
    description: "Мягкое худи свободного кроя из хлопка с флисом внутри. Идеально для повседневных образов.",
    category: "hoodies",
    price: 18900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p12",
    name: "Cargo Pants 'Urban Sand'",
    description: "Удобные карго штаны с регулировкой по талии и функциональными карманами.",
    category: "pants",
    price: 22900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p13",
    name: "Classic T-Shirt 'White Core'",
    description: "Базовая белая футболка из 100% хлопка. Не просвечивает, плотная ткань.",
    category: "t-shirts",
    price: 7900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p14",
    name: "Puffer Jacket 'Midnight Navy'",
    description: "Тёплая и лёгкая зимняя куртка с водоотталкивающим покрытием.",
    category: "outerwear",
    price: 45900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
  {
    _id: "p15",
    name: "Sneakers 'Mono Black'",
    description: "Универсальные кроссовки из эко-кожи с амортизирующей подошвой.",
    category: "shoes",
    price: 29900,
    image_url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
    created_at: new Date()
  },
]
export type BaseResponse = { status: string }

export type ChangePasswordResponse = BaseResponse & { userId: string }

const ROUTE_SEGMENT = ''
const BASE_URL = config.public.API_URL
  ? `${config.public.API_URL}/${ROUTE_SEGMENT}`
  : ''

class AuthService {
  private BASE_URL: string

  constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  async recommendations(userId: string): Promise<Product[]> {
    const { data } = await axios.get<RecommendationsResponse>(
      `${this.BASE_URL}${userId}/recommendations/`,
      {
        headers: {
          'Content-Encoding': 'application/json',
        },
      }
    )

    // return data.products
    return mockProducts
  }


  async products(searchParams: SearchParamsType): Promise<GetProductsResponse> {
    const params: Record<string, string | number> = {}

    if (searchParams.q) params.q = searchParams.q
    if (searchParams.min_price) params.min_price = searchParams.min_price
    if (searchParams.max_price) params.max_price = searchParams.max_price
    if (searchParams.category?.length) params.category = searchParams.category.join(',')
    params.page = searchParams.page ?? 1
    const { data } = await axios.get<Product[]>(
      `${this.BASE_URL}/product/`,
      {
        params,
        headers: {
          'Content-Encoding': 'application/json',
        },
      }
    )

    return {
      items: mockProducts.slice((params.page - 1) * 9, params.page * 9),
      page: params.page,
      total: mockProducts.length
    }
  }


  async product(id: string): Promise<Product> {
    const { data } = await axios.get<Product>(
      `${this.BASE_URL}/product/${id}`,
      {
        headers: {
          'Content-Encoding': 'application/json',
        },
      }
    )

    // return data

    // пока бэка нет — возвращаем один из тех же моков

    //@ts-expect-error dffffffffffffffffffff
    return mockProducts.find(p => p._id === id) ? mockProducts.find(p => p._id === id) : mockProducts[0]
  }

  async view(productId: string): Promise<string> {
    await axios.post(
      `${this.BASE_URL}/interactions/view`,
      { product_id: productId },
      {
        headers: this.getAuthHeaders(),
      }
    )
    return 'You viewed the product'
    // заглушка (пока нет бэка):
    // console.log("[MOCK] VIEW product:", productId)
  }

  async like(productId: string): Promise<string> {
    await axios.post(
      `${this.BASE_URL}/interactions/like`,
      { product_id: productId },
      {
        headers: this.getAuthHeaders(),
      }
    )
    return 'You liked the product'
    // заглушка (пока нет бэка):
    // console.log("[MOCK] LIKE product:", productId)
  }

  async interactions(userId: string): Promise<Interaction[]> {
    await axios.get<Interaction[]>(
      `${this.BASE_URL}/user/${userId}/interactions`,
      { headers: this.getAuthHeaders() }
    )

    // return data
    // mock:
    return [
      { _id: '1', user_id: '1', action_type: 'view', product_id: 'p1', timestamp: new Date() },
      { _id: '2', user_id: '1', action_type: 'like', product_id: 'p4', timestamp: new Date() },
      { _id: '3', user_id: '1', action_type: 'purchase', product_id: 'p2', timestamp: new Date() },
    ]
  }


}

function createProductService(API_URL: string): AuthService {
  return new AuthService(API_URL)
}

export const productService = createProductService(BASE_URL)
