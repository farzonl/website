import hash from "object-hash"

export interface CachedItem<T>{
    hash : string
    item : T
    expires : number
}


export async function cacheFetch<T>(expiration : number , input: RequestInfo, init?: RequestInit, asText? : boolean): Promise<T | undefined>{
    const hashId = hash({request : input, init : (init) ? init : {}})

    const urlFetch = async (): Promise<T | undefined> => {
        const fetchedItem = await fetch(input,init)
        try{
            if (asText){
                return fetchedItem.text() as any
            }else{
                return fetchedItem.json()
            }
        }catch{
            console.error("Failed to parse response")
            return undefined;
        }

    }

    const storageItem = localStorage.getItem(hashId);
    let parsedCacheItem:CachedItem<T> | null = null;


    if (storageItem){
        try{
            parsedCacheItem = JSON.parse(storageItem)
        }catch{
            console.error("Failed to parse cache")
        }
    }

    if (parsedCacheItem){
        if (parsedCacheItem.expires > Date.now()){
            return Promise.resolve(parsedCacheItem.item)
        }else{
            localStorage.removeItem(hashId)
            return urlFetch()
        }

    }else{
        const response = await urlFetch()
        localStorage.setItem(hashId, JSON.stringify({item : response, hash : hashId, expires : Date.now() + 1000*60}))
        return response
    }
   
}
