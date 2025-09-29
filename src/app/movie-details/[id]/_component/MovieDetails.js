"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const apiLink = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(apiLink, options);
        const json = await res.json();
        setMovie(json);
      } catch {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  if (!id) return <div className="p-6 text-red-600">Invalid movie id</div>;
  if (loading) return <div className="p-6">Loading…</div>;
  if (!movie) return <div className="p-6">Not found</div>;

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-8 p-6">
      <div className="flex justify-between">
        {" "}
        <div>
          <p>{movie.title}</p>
          <span>{`2025`}</span>
        </div>
        <div>
          <h3>Rating</h3>
          <div className="flex flex-row gap-2">
            <StarIcon />
            <span className="text-lg font-medium text-black">{rating}</span>
            <span className="text-lg font-medium text-gray-400">/10</span>
          </div>
        </div>
      </div>
      <img
        className="w-full rounded-xl"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  );
};
