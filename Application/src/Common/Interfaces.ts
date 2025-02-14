import { Dispatch } from "react"

export interface SingleArea {
    action: InfoArea
    reaction: InfoArea
}

export interface AreaList {
    list: Array<SingleArea>
}

export interface InfoArea {
    service: Service
    description: string
}

export interface Service {
    name: "spotify" | "google" | "twitter" | "twitch" | "iss" | "météo" | "nasa" | "strava"
    needsConnexion: boolean
}

export interface HomeScreenProps {
    userMail: string
    userId: string
}

export interface SettingsProps {
    userInfo: UserInfo
    setUserInfo: Dispatch<React.SetStateAction<UserInfo>>
    hasAuthorization: boolean
}

interface Location {
    latitude: number
    longitude: number
    city: string
}

interface ServicesInfo {
    spotifyId: string
    googleId: string
    twitterId: string
    twitchId: string
    stravaId: string
}

export interface UserInfo {
    mail: string
    coord: Location
    id: string
    services: ServicesInfo
}

export interface AddAreaProps {
    allAreas: Array<SingleArea>
    setAllAreas: Dispatch<React.SetStateAction<Array<SingleArea>>>
    userInfo: UserInfo
    setUserInfo: Dispatch<React.SetStateAction<UserInfo>>
}    