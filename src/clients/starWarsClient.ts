type Arguments = {
  endpoint: string
  method?: string
};

const starWarsClient = async <T>({
  endpoint = '', method = 'GET'
}: Arguments): Promise<{ ok: boolean; data: T | null }> => {
  const request = new Request(`https://swapi.dev/api${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await fetch(request);

  let data: T | null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  return {
    ok: response.ok,
    data,
  };
};

export default starWarsClient;
