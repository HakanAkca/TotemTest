import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-community/async-storage'

const url = "https://accounts.spotify.com/api"
const api_url = "https://api.spotify.com/v1"
const url_autorize = "https://accounts.spotify.com"
const client_id = "6ffe7e22c4cd429ea498bc16cddf1421"
const client_secret = "e5253f51776541f88ecbd7ca8f569351"
const base6Credentails = base64.encode(client_id + ':' + client_secret)

export const getSpotifyToken = async () => {

    let scopes = 'user-read-email user-library-read user-read-recently-played playlist-read-private user-top-read user-read-private'
    
    const request = await fetch(`${url}/token`, { 
        method: 'POST', 
        headers: {
            Authorization: `Basic ${base6Credentails}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&scope=${encodeURIComponent(scopes)}`
    });

    return await request.json()

}  

export const refreshToken = async (refresh_token) => {
    
    let redirectUrl = AuthSession.getRedirectUrl('redirect')
    
    const request = await fetch(`${url}/token`, { 
        method: 'POST', 
        headers: {
            Authorization: `Basic ${base6Credentails}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    });

    return await request.json()

}  

export const getUserTopArtists = async (token) => {   
    const request = await fetch(`${api_url}/artists?ids=1Xyo4u8uXC1ZmMpatF05PJ,3TVXtAsR1Inumwj472S9r4,360IAlyVv4PCEVjgyMZrxK,3fMbdgg4jU18AjLCKBhRSm`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const getArtist = async (token, id) => {   
    const request = await fetch(`${api_url}/artists/${id}`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const getArtistAlbums = async (token, id) => {   
    const request = await fetch(`${api_url}/artists/${id}/albums`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const getAlbumsTracks = async (token, id) => {   
    const request = await fetch(`${api_url}/albums/${id}/tracks`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const getNews = async (token) => {
    const request = await fetch(`${api_url}/browse/new-releases?country=${Localization.locale.substring(0,2)}`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const featuredPlaylists = async (token) => {
    const request = await fetch(`${api_url}/browse/categories`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const search = async ( offset, limit, q, token) => {
    const request = await fetch(`${api_url}/search?type=artist&limit=${limit}&offset=${offset}&q=${encodeURIComponent(q)}`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return await request.json()
}