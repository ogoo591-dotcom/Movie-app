export const UpcomingTitle = (props) => {
  const { name } = props;
  return (
    <div className="flex justify-start items-center ml-8 p-5">
      <h3 className="text-2xl font-semibold">{name} </h3>
    </div>
  );
};
