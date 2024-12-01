/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-ignore
type Point = [number, number] | null

// Параметры по умолчанию: [a, b, p, G, n]
export const defParams = [2, 2, 17, [5, 1], 19] as const
const [a, b, p, G, n] = defParams

/**
 * Генерация ключей на основе эллиптической кривой.
 * @returns {{privateKey: number, publicKey: Point}} - Генерирует приватный и публичный ключи.
 */
export function generateKeys(): { privateKey: number; publicKey: Point } {
  // Приватный ключ (случайное число от 1 до n-1)
  const privateKey: number = Math.floor(Math.random() * (n - 1)) + 1

  // Вычисление публичного ключа Q = d * G
  //@ts-expect-error ???
  const publicKey = pointMultiply(G, privateKey)

  return { privateKey, publicKey }
}

/**
 * Хеширование изображения (простейший хеш на основе суммы байт).
 * @param {Uint8Array} data - Данные изображения.
 * @returns {number} - Простой хеш изображения.
 */
export function hashImage(data: Uint8Array): number {
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    hash = (hash + data[i]) % n // Используем модуль n
  }
  return hash
}

/**
 * Подписывает хеш на основе ECDSA.
 * @param {number} hash - Хеш данных.
 * @param {number} privateKey - Приватный ключ.
 * @returns {{r: number, s: number}} - Цифровая подпись.
 */
export function signHash(
  hash: number,
  privateKey: number,
  a: number = defParams[0],
  b: number = defParams[1],
  p: number = defParams[2],
  //@ts-expect-error ???
  G: Point = defParams[3],
  n: number = defParams[4]
): { r: number; s: number } {
  let r = 0
  let s = 0

  while (r === 0 || s === 0) {
    const k = Math.floor(Math.random() * (n - 1)) + 1 // Случайное число от 1 до n-1
    const R = pointMultiply(G, k)

    if (R === null) continue // Если R не определена, выбираем другое k

    r = R[0] % n // Координата x точки R (модуль n)

    if (r === 0) continue // Если r = 0, выбираем другое k

    // Вычисление s = k^(-1) * (hash + r * privateKey) mod n
    const kInverse = modInverse(k, n)
    if (kInverse === null) continue // Если обратный элемент не существует, выбираем другое k

    s = (kInverse * (hash + r * privateKey)) % n

    if (s === 0) continue // Если s = 0, выбираем другое k
  }

  return { r, s }
}

/**
 * Умножение точки на эллиптической кривой.
 * @param {Point} P - Точка.
 * @param {number} d - Скаляр.
 * @returns {Point} - Новая точка или null, если операция не определена.
 */
function pointMultiply(
  P: Point,
  d: number,
  a: number = defParams[0],
  b: number = defParams[1],
  p: number = defParams[2]
): Point {
  let Q: Point = null // Нулевая точка
  let N = P

  while (d > 0) {
    if (d % 2 === 1) {
      Q = Q === null ? N : pointAdd(Q, N)
      if (Q === null) return null // Если операция не определена
    }
    N = pointAdd(N, N) // Двойная точка
    if (N === null) return null // Если операция не определена
    d = Math.floor(d / 2)
  }

  return Q
}

/**
 * Сложение точек на эллиптической кривой.
 * @param {Point} P - Первая точка.
 * @param {Point} Q - Вторая точка.
 * @returns {Point} - Результат сложения или null, если операция не определена.
 */
function pointAdd(
  P: Point,
  Q: Point,
  a: number = defParams[0],
  b: number = defParams[1],
  p: number = defParams[2]
): Point {
  if (P === null) return Q
  if (Q === null) return P

  const [x1, y1] = P
  const [x2, y2] = Q

  if (x1 === x2 && (y1 + y2) % p === 0) return null // P + (-P) = 0

  let m: number
  if (x1 === x2 && y1 === y2) {
    const denominator = (2 * y1) % p
    const invDenominator = modInverse(denominator, p)
    if (invDenominator === null) return null // Нет обратного элемента
    m = ((3 * x1 * x1 + a) * invDenominator) % p // Двойная точка
  } else {
    const denominator = (x2 - x1) % p
    const invDenominator = modInverse(denominator, p)
    if (invDenominator === null) return null // Нет обратного элемента
    m = ((y2 - y1) * invDenominator) % p // Сложение двух точек
  }

  const x3 = (m * m - x1 - x2) % p
  const y3 = (m * (x1 - x3) - y1) % p

  return [(x3 + p) % p, (y3 + p) % p] // Возвращаем координаты в поле
}

/**
 * Вычисление обратного элемента по модулю с помощью расширенного алгоритма Евклида.
 * @param {number} k - Число.
 * @param {number} mod - Модуль.
 * @returns {number | null} - Обратное число или null, если оно не существует.
 */
function modInverse(k: number, mod: number): number | null {
  k = ((k % mod) + mod) % mod
  if (k === 0) return null // Нет обратного элемента для 0

  let [s, old_s] = [0, 1]
  let [r, old_r] = [mod, k]

  while (r !== 0) {
    const quotient = Math.floor(old_r / r)
    ;[old_r, r] = [r, old_r - quotient * r]
    ;[old_s, s] = [s, old_s - quotient * s]
  }

  if (old_r > 1) return null // Обратного элемента не существует

  return ((old_s % mod) + mod) % mod
}

/**
 * Проверяет подлинность цифровой подписи на основе ECDSA.
 * @param {number} hash - Хеш сообщения.
 * @param {{r: number, s: number}} signature - Подпись (пара r и s).
 * @param {Point} publicKey - Публичный ключ.
 * @returns {boolean} - Истинно, если подпись подлинна; ложь в противном случае.
 */
export function verifySignature(
  hash: number,
  signature: { r: number; s: number },
  publicKey: Point,
  a: number = defParams[0],
  b: number = defParams[1],
  p: number = defParams[2],
  //@ts-expect-error ???
  G: Point = defParams[3],
  n: number = defParams[4]
): boolean {
  const { r, s } = signature

  // Проверяем, что r и s находятся в пределах (0, n)
  if (r <= 0 || r >= n || s <= 0 || s >= n) return false

  // Вычисляем w = s^(-1) mod n
  const w = modInverse(s, n)
  if (w === null) return false // Обратного элемента не существует

  // Вычисляем u1 = (hash * w) % n и u2 = (r * w) % n
  const u1 = (hash * w) % n
  const u2 = (r * w) % n

  // Вычисляем R' = u1 * G + u2 * Q
  const u1G = pointMultiply(G, u1)
  const u2Q = pointMultiply(publicKey, u2)

  if (u1G === null || u2Q === null) return false // Операция не определена

  const R = pointAdd(u1G, u2Q)

  // Если R — нулевая точка, подпись недействительна
  if (R === null) return false

  // Проверяем, совпадает ли r с x-координатой R mod n
  const rPrime = R[0] % n
  return rPrime === r
}
