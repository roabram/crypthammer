export const printPassword = (service: string): void => {
  const password = service + '123';
  console.log(`The Password for ${service} is ${password}`);
};
