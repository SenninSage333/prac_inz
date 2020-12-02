import { useRouter } from 'next/router';

const StreamPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Id: {id}</h1>
    </div>
  );
};

export default StreamPage;
