export function UserModel(
  _id,
  _role,
  _firstname,
  _lastname,
  _email,
  _password,
  _address
) {
  (this.id = _id),
    (this.role = _role),
    (this.firstname = _firstname),
    (this.lastname = _lastname),
    (this.email = _email),
    (this.password = _password),
    (this.address = _address);
}

export async function cleanData(data: Object): Promise<any> {
  const _dataKeys = Object.keys(data);

  let _data = _dataKeys
    .filter((key) => key !== _dataKeys[0])
    .map((key) => {
      let clean = data[key];
      const { password, ...result } = clean;

      return result;
    });

  return _data;
}
