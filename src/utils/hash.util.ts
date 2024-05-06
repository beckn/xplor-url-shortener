import { HASH_LENGTH } from '../common/constants/name-constants'
import * as crypto from 'crypto'
export function generateUniqueHash(originalUrl: string): string {
  const timestamp = Date.now().toString()
  const data = originalUrl + timestamp
  const hash = crypto.createHash('sha256').update(data).digest('hex').slice(0, HASH_LENGTH)
  return hash
}
