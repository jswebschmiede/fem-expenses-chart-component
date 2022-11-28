import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Data } from "../typings";
import { fetchData } from "../utils/fetch";

const ChartContainer = () => {
  const [chartData, setChartData] = useState<Data[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData().then((data: Data[]) => {
      setChartData(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="w-full rounded-xl bg-orange-pale p-5 shadow">
      <h1 className="text-2xl font-bold text-brown-dark">
        Spending - Last 7 days
      </h1>

      {loading ? (
        <span className="mt-4 inline-block animate-pulse rounded-xl bg-primary py-2 px-4 text-sm text-cream">
          Loading...
        </span>
      ) : (
        <>The Chart</>
      )}

      <footer className="mt-4 flex justify-between border-t-2 border-cream pt-4">
        <div>
          <span className="text-md mb-2 block text-brown-medium">
            Total this month
          </span>
          <span className="block text-3xl font-bold tracking-wide text-brown-dark">
            ${921.48}
          </span>
        </div>
        <div className="flex flex-col justify-end text-right">
          <span className="text-md block font-bold text-brown-dark">+2.4%</span>
          <span className="text-md block text-brown-medium">
            from last month
          </span>
        </div>
      </footer>
    </main>
  );
};

export default ChartContainer;
