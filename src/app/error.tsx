"use client";

export default function Error(props) {
  const { error } = props;

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p className="text-lg font-bold">Error Occurred</p>
      <p className="mt-1 mb-4 text-base">{error.message}</p>
    </div>
  );
}
