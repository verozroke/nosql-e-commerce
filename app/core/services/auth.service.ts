import axios from 'axios'
import type { User } from '../types/user'

const config = useRuntimeConfig()
export type SignInBody = {
  username: string
  password: string
}

export type SignInResponse = {
  access_token: string
}


export type SignUpBody = {
  username: string
  password: string
}


export type BaseResponse = { status: string }

export type ChangePasswordResponse = BaseResponse & { userId: string }

const ROUTE_SEGMENT = ''
const BASE_URL = config.public.API_URL
  ? `${config.public.API_URL}${ROUTE_SEGMENT}`
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

  async signIn(body: SignInBody): Promise<string> {
    const { data } = await axios.post<SignInResponse>(
      `${this.BASE_URL}/api/auth/login`,
      body,
      {
        headers: {
          'Content-Encoding': 'application/json',
        },
      }
    )

    localStorage.setItem('token', data.access_token)

    return 'Sign In is successful.'
  }


  async signUp(body: SignInBody): Promise<string> {
    await axios.post<SignInResponse>(
      `${this.BASE_URL}/api/auth/register`,
      body,
      {
        headers: {
          'Content-Encoding': 'application/json',
        },
      }
    )

    return 'Sign Up is successful.'
  }

  async logout(): Promise<string> {
    localStorage.removeItem('token')
    return 'Logout successfully'
  }

  async me(): Promise<User> {
    const { data } = await axios.get<User>(`${this.BASE_URL}/api/auth/me`, {
      headers: this.getAuthHeaders(),
    })

    return data
  }



}

function createAuthService(API_URL: string): AuthService {
  return new AuthService(API_URL)
}

export const authService = createAuthService(BASE_URL)
