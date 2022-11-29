import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Data } from "../typings";
import { fetchData } from "../utils/fetch";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ChartContainer = () => {
  const [chartData, setChartData] = useState<Data[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const chartOptions: ChartOptions = {
    responsive: true,
    interaction: {
      mode: "nearest",
      axis: "x",
    },
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
      x: {
        display: true,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        xAlign: "center",
        yAlign: "bottom",
        backgroundColor: "hsl(25, 47%, 15%)",
        titleColor: "hsl(33, 100%, 98%)",
        padding: 12,
        displayColors: false,

        callbacks: {
          title: () => {
            return "";
          },
          label: (context) => {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  const chartDataSet = {
    labels: chartData?.map((value) => value.day),
    datasets: [
      {
        data: chartData?.map((value) => value.amount) || [],
        borderWidth: 0,
        backgroundColor: "hsl(10, 79%, 65%)",
        hoverBackgroundColor: "hsl(186, 34%, 60%)",
        borderRadius: 5,
        borderSkipped: true,
      },
    ],
  };

  useEffect(() => {
    fetchData().then((result: Data[]) => {
      setChartData(result);
      setLoading(false);
    });
  }, []);

  return (
    <main className="w-full rounded-xl bg-orange-pale p-5 shadow transition-all">
      <h1 className="mb-10 text-2xl font-bold text-brown-dark">
        Spending - Last 7 days
      </h1>

      {loading ? (
        <span className="mt-4 flex min-h-[200px] flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </span>
      ) : (
        <Bar options={chartOptions} data={chartDataSet} />
      )}

      <footer className="mt-8 flex justify-between border-t-2 border-cream pt-8">
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
