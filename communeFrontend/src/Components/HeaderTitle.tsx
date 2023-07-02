const HeaderTitle = ({ name } : { name: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold tracking wider text-gray-600 text-3xl mb-2 p-5 uppercase">{name}</h1>
    </div>
  );
};

export default HeaderTitle;