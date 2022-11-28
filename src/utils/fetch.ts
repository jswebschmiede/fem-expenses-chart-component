export const fetchData = async () => {
  const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

  try {
    await delay(3000);
    const res = await fetch("/data.json");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
