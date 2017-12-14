import { post } from '../lib/request'

export const authenticate = async (email, password) => {
  try {
    const res = await post('/users/login', {
      user: {
        email,
        password
      }
    })
    return res.data
  } catch (error) {
    return error.response && error.response.status === 404
      ? "Wrong email/password"
      : "Unknown error. Please try again"
  }
}
