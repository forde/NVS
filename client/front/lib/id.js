import { customAlphabet } from 'nanoid'

export default function id() {
    const nanoid = customAlphabet('1234567890AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz', 12)
    return nanoid()
}