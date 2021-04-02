import { list } from '@keystone-next/keystone/schema';
import { text } from '@keystone-next/fields';

export const Project = list({
  // access:
  // ui:
  fields: {
    title: text({
      isRequired: true,
      isUnique: true,
    }),
    categories: text({
      isRequired: true,
    }),
    description: text({
      isRequired: true,
    }),
    image: text({
      isRequired: false,
    }),
    link: text({
      isRequired: true,
      isUnique: true,
    }),
  },
  ui: {
    listView: {
      initialColumns: ['title', 'link', 'description'],
    },
  },
});
