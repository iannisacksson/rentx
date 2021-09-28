interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
  filename?: string;
}

export { ICreateUserDTO };
