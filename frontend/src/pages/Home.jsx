import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import { useEffect, useState } from "react";

/*
const chartData = {
  labels: ["Saving", "Expense", "Investment"],
  datasets: [
    {
      label: "%",
      data: [13, 8, 3],
      backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235)"],
      borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      borderRadius: 30,
      spacing: 10,
      cutout: 130,
    },
  ],
};
*/
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER); // for logged in user data
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
    awaitRefetchQueries: true,
  });

  const { data: categoryStatisticsData } = useQuery(GET_TRANSACTION_STATISTICS);
  // console.log(`categoryStatisticsData`, categoryStatisticsData);

  const [chartData, setChartData] = useState({
    labels: [], // ==> [categories]
    datasets: [
      {
        label: "$",
        data: [], // ==> [totalAmounts]
        backgroundColor: [], // ==> [backgroundColors]
        borderColor: [], // ==> [borderColors]
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (categoryStatisticsData?.categoryStatistics) {
      const categories = categoryStatisticsData.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = categoryStatisticsData.categoryStatistics.map((stat) => stat.totalAmount);

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "saving") {
          backgroundColors.push("rgba(75, 192, 192)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(54, 162, 235)");
          borderColors.push("rgba(54, 162, 235)");
        }
      })

      setChartData((prev) => ({
        labels: categories, // <== [categories]
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts, // <== [totalAmounts]
            backgroundColor: backgroundColors, // <== [backgroundColors]
            borderColor: borderColors, // <== [borderColors]
          }
        ]
      }))
    }
  }, [categoryStatisticsData])

  const handleLogout = async () => {
    try {
      await logout();
      // Clear the Apollo Client cache FROM THE DOCS (reset the cache entirely, such as when a user logs out)
      // https://www.apollographql.com/docs/react/caching/advanced-topics#resetting-the-cache
      client.resetStore();
    } catch (error) {
      console.error(`Error in handleLogout: ${error}`);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
        <div className='flex items-center'>
          <p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
            Spend wisely, track wisely
          </p>
          <img
            src={authUserData?.authUser.profilePicture}
            className='w-11 h-11 rounded-full border cursor-pointer'
            alt='Avatar'
          />
          {!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer text-white' onClick={handleLogout} />}
          {/* loading spinner */}
          {loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
        </div>
        <div className='flex flex-wrap w-full justify-center items-center gap-6'>
          <div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
            <Doughnut data={chartData} />
          </div>

          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default Home;