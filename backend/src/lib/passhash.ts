/**
 * Хеширует пароль с использованием метода решёток с базисной матрицей 6x6.
 * @param {string} password - Входная строка пароля.
 * @returns {string} - Результирующий хеш в шестнадцатеричном формате.
 */
export function latticeHash(password: string): string {
  // Определяем базисную матрицу решётки 6x6
  const latticeMatrix = [
    [3, 5, 7, 2, 1, 6],
    [4, 9, 8, 3, 5, 7],
    [6, 1, 3, 8, 2, 4],
    [7, 2, 9, 5, 6, 3],
    [1, 8, 4, 7, 3, 9],
    [2, 6, 5, 1, 4, 8]
  ]

  // Преобразуем строку пароля в числовой вектор (ASCII-коды символов)
  const passwordVector = password.split("").map((char) => char.charCodeAt(0))

  // Дополняем вектор до кратного 6 чисел (если длина не кратна 6)
  while (passwordVector.length % 6 !== 0) {
    passwordVector.push(0) // Добавляем ноль для выравнивания
  }

  const hashedVector = [] // Инициализируем массив для хранения результатов

  // Обрабатываем вектор паролей блоками по 6 элементов
  for (let i = 0; i < passwordVector.length; i += 6) {
    const inputVector = passwordVector.slice(i, i + 6) // Берём текущий блок из 6 элементов
    const transformed = Array(6).fill(0) // Инициализируем массив для результата
    for (let row = 0; row < 6; row++) {
      // Вычисляем скалярное произведение строки матрицы на вектор
      transformed[row] = inputVector.reduce((sum, value, col) => sum + value * latticeMatrix[row][col], 0)
      transformed[row] = Math.round(transformed[row]) // Округляем результат
    }
    hashedVector.push(...transformed) // Добавляем преобразованный вектор в результат
  }

  // Преобразуем результирующий числовой вектор в строку хеша (в шестнадцатеричном формате)
  const hash = hashedVector
    .map((num) =>
      Math.abs(num % 256)
        .toString(16)
        .padStart(2, "0")
    ) // Остаток по модулю 256, перевод в шестнадцатеричный формат
    .join("") // Объединяем в строку

  return hash // Возвращаем итоговый хеш
}
