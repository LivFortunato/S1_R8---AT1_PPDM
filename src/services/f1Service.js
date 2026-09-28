const BASE_URL = 'https://api.openf1.org/v1';

async function request(path) {
  try {
    const response = await fetch(`${BASE_URL}${path}`);

    if (!response.ok) {
      throw new Error(`Não foi possível acessar a API (status ${response.status}).`);
    }

    return await response.json();
  } catch (error) {
    if (error.message?.includes('Não foi possível')) {
      throw error;
    }

    throw new Error('Não foi possível conectar à API. Verifique sua internet e tente novamente.');
  }
}

export async function getDrivers() {
  return request('/drivers?session_key=latest');
}

export async function getDriverByNumber(driverNumber) {
  return request(`/drivers?session_key=latest&driver_number=${driverNumber}`);
}
