
/** Shorts an string address */
export function shortAddress(address: string, length = 5) {
    return `${address.substring(0, length)}...${address.substring(address.length - length, address.length)}`
}