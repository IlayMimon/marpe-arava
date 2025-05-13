import httpRequest from '../functions/httpRequest';

const Example = () => {
  const handleRequest = async () => {
    const data = await httpRequest("/lists/getbytitle('Routes')/items?$top=4999");
    console.log(data.json());
  };

  return (
    <div>
      <h1>Example Component</h1>
      <button onClick={handleRequest}>example request</button>
    </div>
  );
};

export default Example;
