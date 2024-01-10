// export async function createUsers(users: any[]) {
//     const newUsers = users.map(u => u)
//   const createdUsers = await db.createMany({ users: newUsers });
//   return createdUsers;
// }
// export async function createUser(user: any) {
//   const createdUsers = await db.createSingle({ user: user });
//   return createdUsers;
// }

// export async function findUser(id: string) {
//   const user = await db.findSingle({ id: id });
//   return user;
// }

// export async function findManyUsers(ids: string[]) {
//   const users = await db.findMany({ ids: ids });
//   return users;
// }
