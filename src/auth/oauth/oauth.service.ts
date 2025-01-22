import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class OAuthService {
  constructor() {}

  async getToken(tokenUrl: string, params: Record<string, any>): Promise<any> {
    try {
      const response = await axios.post(
        tokenUrl,
        new URLSearchParams(params).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        },
      )
      return response.data
    } catch (error) {
      console.error(
        'Error fetching token:',
        error.response?.data || error.message,
      )
      throw new HttpException(
        error.response?.data?.error_description || 'Failed to fetch token',
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getProfile(profileUrl: string, accessToken: string): Promise<any> {
    try {
      const response = await axios.get(profileUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      console.log('Profile Response:', response.data)
      return response.data
    } catch (error) {
      console.error('Profile Error:', error.response?.data || error.message)
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch profile',
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
