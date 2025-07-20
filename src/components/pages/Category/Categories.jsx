import axios from "axios";
import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";
import Error from "./../Error";
import Loading from "./../Loading";

export default function Categories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      console.log(response);
      return response.data.data;
    },
    staleTime: 1000,
    gcTime: 1000,
  });

  if (isLoading) return <Loading />;
  if (error)
    return <Error error="Something went wrong while fetching categories." />;

  return (
    <section className="px-4 pt-24 pb-8">
      <title>Category</title>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Shop All Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category._id}`}
            className="text-center border p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-40 w-full object-contain mb-2"
            />
            <h3 className="text-lg font-medium capitalize">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
