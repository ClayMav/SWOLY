import { Arg, ClassType, Mutation, Query, Resolver } from "type-graphql";
import { Firestore } from "@google-cloud/firestore";

const client = require("firebase-tools");

const PROJECTID = "swoly-252721";
export const firestore = new Firestore({
  projectID: PROJECTID
});

export interface ResourceResolverProps<T> {
  table: string;
  ResourceCls: ClassType<T>;
  // See https://github.com/sigdotcom/mstacm.org/issues/2
  // Partial<T> required for full type-safe
  // https://github.com/19majkel94/type-graphql/issues/134
  // may have some hints
  DeleteCls: ClassType<Partial<T>>;
}

export function ResourceResolver<T>({
  table,
  ResourceCls,
  // See https://github.com/sigdotcom/mstacm.org/issues/2
  // Partial<T> required for full type-safe
  // https://github.com/19majkel94/type-graphql/issues/134
  // may have some hints
  DeleteCls
}: ResourceResolverProps<T>) {
  const resourceName = ResourceCls.name.toLocaleLowerCase();
  const firstLetter = resourceName[0];
  const resourceCamelCase = firstLetter.toUpperCase() + resourceName.slice(1);

  // `isAbstract` decorator option is mandatory to prevent multiple registering in schema
  @Resolver(() => ResourceCls, { isAbstract: true })
  abstract class ResourceResolverClass {
    collection = firestore.collection(table);

    table = table;

    @Mutation(() => DeleteCls, {
      name: `delete${resourceCamelCase}`
    })
    public async remove(
      @Arg("id", () => String) id: string
    ): Promise<{ id: string } | null> {
      if (!DeleteCls) {
        return null;
      }
      await client.firestore.delete(`${table}/${id}`, {
        project: PROJECTID,
        recursive: true,
        yes: true
      });
      // const resp = await collection.doc(id).delete();
      return { id };
    }

    @Query(() => ResourceCls, { name: `${resourceName}` })
    protected async getOne(@Arg("id", () => String) id: string) {
      const value = await this.collection.doc(id).get();
      return { ...value.data(), id: value.id };
    }

    @Query(() => [ResourceCls], { name: `${resourceName}s` })
    protected async getAll() {
      const values = await this.collection.get();
      return values.docs.map(value => {
        return { ...value.data(), id: value.id };
      });
    }
  }

  return ResourceResolverClass;
}
