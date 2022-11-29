export const fetchData = async () => {
  const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

  try {
    await delay(2000);
    const res = await fetch("/data.json");
    const jsonData = await res.json();
    return jsonData;
  } catch (err) {
    console.error(err);
  }
};
