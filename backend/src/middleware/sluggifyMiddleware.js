import uniqueSlug from './slugify/uniqueSlug'

const isUniqueFor = (context, type) => {
  return async slug => {
    const session = context.driver.session()
    try {
      const response = await session.run(`MATCH(p:${type} {slug: $slug }) return p.slug`, {
        slug,
      })
      return response.records.length === 0
    } finally {
      session.close()
    }
  }
}

export default {
  Mutation: {
    SignupVerification: async (resolve, root, args, context, info) => {
      args.slug = args.slug || (await uniqueSlug(args.name, isUniqueFor(context, 'User')))
      return resolve(root, args, context, info)
    },
    CreatePost: async (resolve, root, args, context, info) => {
      args.slug = args.slug || (await uniqueSlug(args.title, isUniqueFor(context, 'Post')))
      return resolve(root, args, context, info)
    },
    UpdatePost: async (resolve, root, args, context, info) => {
      args.slug = args.slug || (await uniqueSlug(args.title, isUniqueFor(context, 'Post')))
      return resolve(root, args, context, info)
    },
  },
}
