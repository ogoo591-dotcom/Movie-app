export const PopularTitle = (props) => {
  const { name } = props;
  return (
    <div className="flex justify-start items-center p-5 ml-8">
      <h3 className="text-2xl font-semibold">{name} </h3>
    </div>
  );
};
