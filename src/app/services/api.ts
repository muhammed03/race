const BASE_URL = 'http://localhost:3000';

export const getCars = async (
  page: number,
  limit = 7
): Promise<{
  items: [];
  count: string | null;
}> => {
  const response = await fetch(
    `${BASE_URL}/garage?_page=${page}&_limit=${limit}`
  );

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getStartEngine = async (
  id: number
): Promise<{ velocity: number; distance: number }> => {
  const res = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
    method: 'PATCH',
  })
    .then((res) => res.json())
    .catch();

  return res;
};

export const getDriveStatus = async (
  id: number
): Promise<{ success: boolean }> | null => {
  const res = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

export const getStopEngine = async (
  id: number
): Promise<{ velocity: number; distance: number }> =>
  (
    await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    })
  ).json();

export const getDeleteCarById = async (
  id: number
): Promise<{
  name: string;
  color: string;
  id: number;
}> => (await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' })).json();

export const getCreateCar = async (car: {
  name: string;
  color: string;
}): Promise<Response> =>
  (
    await fetch(`${BASE_URL}/garage`, {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const getCarById = async (
  id: string
): Promise<{
  name: string;
  color: string;
  id: number;
}> => (await fetch(`${BASE_URL}/garage/${id}`)).json();

export const getUpdateCarById = async (
  car: {
    name: string;
    color: string;
  },
  id: number
): Promise<{
  name: string;
  color: string;
  id: number;
}> =>
  (
    await fetch(`${BASE_URL}/garage/${id}`, {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();


// export const getPageStatus