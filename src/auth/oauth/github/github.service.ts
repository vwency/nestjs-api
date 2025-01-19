import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import axios from 'axios'
import { AuthService } from 'src/auth/auth/auth.service'
import { Request } from 'express'

@Injectable()
export class GithubOAuthService {
  constructor(private authservice: AuthService) {}

  private readonly GITHUB_TOKEN_URL =
    'https://github.com/login/oauth/access_token'
  private readonly GITHUB_USER_URL = 'https://api.github.com/user'

  async authenticateWithGithub(code: string, req: Request): Promise<any> {
    try {
      const tokenResponse = await axios.post(
        this.GITHUB_TOKEN_URL,
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )

      if (tokenResponse.data.error) {
        throw new HttpException(
          tokenResponse.data.error_description,
          HttpStatus.BAD_REQUEST,
        )
      }

      const accessToken = tokenResponse.data.access_token

      const userResponse = await axios.get(this.GITHUB_USER_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!userResponse.data) {
        throw new HttpException(
          'Failed to fetch user profile',
          HttpStatus.BAD_REQUEST,
        )
      }

      let email = userResponse.data.email
      if (!email) {
        const emailsResponse = await axios.get(
          'https://api.github.com/user/emails',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        const primaryEmail = emailsResponse.data.find(
          (emailObj: any) => emailObj.primary && emailObj.verified,
        )
        email = primaryEmail?.email || null
      }

      let user = {
        username: userResponse.data.login,
        email: email,
        password: ' ',
      }

      console.log(user)

      user = await this.authservice.ValidateOAuthUser(user, req)

      return user
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
