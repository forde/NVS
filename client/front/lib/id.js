import { customAlphabet } from 'nanoid'

export default function id(length = 12) {
    const nanoid = customAlphabet('1234567890AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz', length)
    return nanoid()
}