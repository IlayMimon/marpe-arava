import GroupedTable from "../components/Table/Table";

const HomePage = () => {

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the main page of the application.</p>
            <GroupedTable
                data={[
                    { id: '1', name: 'Alice', age: 25, dept: 'Engineering' },
                    { id: '2', name: 'Bob', age: 32, dept: 'Engineering' },
                    { id: '3', name: 'Eve', age: 28, dept: 'Design' },
                ]}
                columns={[
                    { key: 'name', title: 'Name', dataIndex: 'name' },
                    { key: 'age', title: 'Age', dataIndex: 'age' },
                ]}
                groupBy={(row) => row.dept}
                rowKey={(row) => row.id}
            />

        </div>
    );
};

export default HomePage;