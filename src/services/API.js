// @flow

import { AsyncStorage } from 'react-native'

const API_KEY = '23567b218376f79d9415' // other valid API keys: '760b5fb497225856222a', '0e2a751704a65685eefc'
const API_ENDPOINT = 'http://195.39.233.28:8035'
const TOKEN = 'TOKEN'

export async function auth () {
  const response = await fetch(`${API_ENDPOINT}/auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'apiKey': API_KEY,
    }),
  })
  if (response.status === 200) {
    const json = await response.json()
    return json.token
  }

  return null
}

async function setToken (token) {
  await AsyncStorage.setItem(TOKEN, token)
}

async function getToken () {
  let token = await AsyncStorage.getItem(TOKEN)
  if (token === null) {
    token = await auth()
    await setToken(token)
  }
  return token
}

export async function getPictures (page: number): Array<Object> {
  console.log('GETTING PICTURES FOR PAGE', page)
  const token = await getToken()
  const response = await fetch(`${API_ENDPOINT}/images?pare=${page}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (response.status === 200) {
    const json = await response.json()
    return json
  }

  // http://195.39.233.28:8035/images?page=xxx
}

export async function getPictureDetails (id: number): Object {
  // http://195.39.233.28:8035/images/id
  const token = await getToken()
  const response = await fetch(`${API_ENDPOINT}/images/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (response.status === 200) {
    const json = await response.json()
    return json
  }
}
