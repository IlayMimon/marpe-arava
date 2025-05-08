import Table from "../components/Table/Table";
import useGetTableColumns from "../hooks/useGetTableColumns";
import useGetTableData from "../hooks/useGetTableData";

const HomePage = () => {
  const columns = useGetTableColumns();
  const data = useGetTableData();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
      <Table
        data={data}
        columns={columns}
        groupBy={(row) => row.area}
        rowKey={(row) => row.key}
      />
    </div>
  );
};

export default HomePage;
