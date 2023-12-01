export const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export const signup = (name, email, password) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 201) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export const validateToken = async () => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/auth-status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};
