// import { id } from "./addRecord";
// console.log(id);

export let primaryKeyViolation: object = {
  error: "PRIMARY_KEY_VIOLATION",
  status: 400,
  message: `id not present`,
};

export let dbErr: object = {
  error: "database error",
  message: "unable to post or update data, check your fields correctly",
  status: "500",
};

export let insertSuccessful: object={
    status : 201,
    message : "data inserted"
}

export let deleteMessage: object = {
    status: 200,
    response: `record deleted`,
  };

  export let idNotFound: object = {
    status: 400,
    result: `id not found`,
  };