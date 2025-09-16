export async function buscarFraseMotivacional() {
  const resp = await fetch("https://type.fit/api/quotes");
  const data = await resp.json();
  const random = data[Math.floor(Math.random() * data.length)];
  return random.text;
}
