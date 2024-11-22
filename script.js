function serialize(numbers) {
  numbers = [...new Set(numbers)].sort((a, b) => a - b); // Remove duplicates and sort
  const ranges = [];
  let start = numbers[0];
  let prev = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] !== prev + 1) {
      if (start === prev) {
        ranges.push(`${start}`);
      } else {
        ranges.push(`${start}-${prev}`);
      }
      start = numbers[i];
    }
    prev = numbers[i];
  }

  if (start === prev) {
    ranges.push(`${start}`);
  } else {
    ranges.push(`${start}-${prev}`);
  }

  return ranges.join(",");
}

function deserialize(serialized) {
  const numbers = [];
  const parts = serialized.split(",");

  for (const part of parts) {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);
      for (let i = start; i <= end; i++) {
        numbers.push(i);
      }
    } else {
      numbers.push(Number(part));
    }
  }

  return numbers;
}

// Тесты
const testCases = [
  {
    input: [1, 2, 3, 5, 7, 8, 9, 10],
    description: "Простой диапазон с пропусками",
  },
  { input: [1], description: "Одно число" },
  {
    input: [300, 299, 298],
    description: "Граница диапазона, числа в обратном порядке",
  },
  {
    input: Array.from({ length: 1000 }, (_, i) => i + 1),
    description: "Большой непрерывный массив",
  },
  {
    input: Array.from({ length: 500 }, (_, i) => (i % 3 === 0 ? i + 1 : i * 2)),
    description: "Случайные числа",
  },
];

// Запуск тестов
testCases.forEach(({ input, description }) => {
  const serialized = serialize(input);
  const deserialized = deserialize(serialized);
  const compressionRatio = (
    JSON.stringify(input).length / serialized.length
  ).toFixed(2);

  console.log(`Описание: ${description}`);
  console.log(`Исходный массив: ${JSON.stringify(input).slice(0, 100)}...`);
  console.log(`Сериализовано: ${serialized.slice(0, 100)}...`);
  console.log(
    `Восстановлено: ${JSON.stringify(deserialized).slice(0, 100)}...`
  );
  console.log(`Коэффициент сжатия: ${compressionRatio}`);
  console.log(
    deserialized.toString() === input.toString() ? "✅ Успешно" : "❌ Ошибка"
  );
  console.log("=".repeat(50));
});
