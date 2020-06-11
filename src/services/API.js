// @flow
import { AsyncStorage } from 'react-native'

const API_KEY = '23567b218376f79d9415' // other valid API keys: '760b5fb497225856222a', '0e2a751704a65685eefc'
const API_ENDPOINT = 'http://195.39.233.28:8035'
const TOKEN = 'TOKEN'
const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export async function auth () {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth`, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({
        'apiKey': API_KEY,
      }),
    })
    if (response.status === 200) {
      const json = await response.json()
      return json.token
    }
  }
  catch (e) {
    return null
  }

  return null
}

async function setToken (token) {
  await AsyncStorage.setItem(TOKEN, token)
}

async function getToken (reset: boolean = false) {
  let token = reset ? null : await AsyncStorage.getItem(TOKEN)
  if (token === null) {
    token = await auth()
    await setToken(token)
  }
  return token
}

export async function getPictures (page: number): Array<Object> {
  const token = await getToken()
  if (token === null) {
    return null
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/images?pare=${page}`, {
      headers: Object.assign({}, JSON_HEADERS, {Authorization: `Bearer ${token}`})
    })
    if (response.status === 200) {
      const json = await response.json()
      return json
    } else if (response.status === 401) {
      await getToken(true)
      const result = await getPictures(page)
      return result
    } else {
      return null
    }
  } catch (e) {
    return null
  }
}

export async function getPictureDetails (id: number): Object {
  const token = await getToken()
  if (token === null) {
    return null
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/images/${id}`, {
      headers: Object.assign({}, JSON_HEADERS, {Authorization: `Bearer ${token}`})
    })

    if (response.status === 200) {
      const json = await response.json()
      return json
    } else if (response.status === 401) {
      await getToken(true)
      const result = await getPictureDetails(id)
      return result
    } else {
      return null
    }
  } catch (e) {
    return null
  }
}
