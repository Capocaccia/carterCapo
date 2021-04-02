import { list } from '@keystone-next/keystone/schema';
import { text, password, relationshop } from '@keystone-next/fields';

export const User = list({
  // access:
  // ui:
  fields: {
    name: text({
      isRequired: true,
    }),
    email: text({
      isRequired: true,
      isUnique: true,
    }),
    password: password(),
  },
});
