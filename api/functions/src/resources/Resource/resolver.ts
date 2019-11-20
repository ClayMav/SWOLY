import { Arg, ClassType, Mutation, Query, Resolver } from "type-graphql";
import { Firestore } from "@google-cloud/firestore";

const client = require("firebase-tools");

const PROJECTID = "swoly-252721";
const firestore = new Firestore({
  projectID: PROJECTID
});

export function ResourceResolver<T>(
  Collection: string,
  ResourceCls: ClassType<T>,
  // See https://github.com/sigdotcom/mstacm.org/issues/2
  // Partial<T> required for full type-safe
  // https://github.com/19majkel94/type-graphql/issues/134
  // may have some hints
  CreateCls: ClassType<Partial<T>>,
  UpdateCls: ClassType<Partial<T>>,
  DeleteCls: ClassType<Partial<T>>
) {
  const resourceName = ResourceCls.name.toLocaleLowerCase();
  const firstLetter = resourceName[0];
  const resourceCamelCase = firstLetter.toUpperCase() + resourceName.slice(1);
  const collection = firestore.collection(Collection);

  // `isAbstract` decorator option is mandatory to prevent multiple registering in schema
  @Resolver(() => ResourceCls, { isAbstract: true })
  abstract class ResourceResolverClass {
    @Mutation(() => ResourceCls, {
      name: `create${resourceCamelCase}`
    })
    public async create(
      @Arg(`data`, () => CreateCls) input: Partial<T> // Was deeppartial
    ): Promise<T> {
      console.log(input);
      const ref = await collection.add({ ...input });
      console.log("Added gym with ID: ", ref.id);
      return new Promise((resolve: any) => {
        resolve({ ...input, id: ref.id });
      });
    }

    @Mutation(() => ResourceCls, {
      name: `update${resourceCamelCase}`
    })
    public async update(
      @Arg("id", () => String) id: string,
      @Arg(`data`, () => UpdateCls) input: any
    ): Promise<T> {
      console.log("Update", id, input);
      const docRef = collection.doc(id);
      const document = await docRef.get();
      await docRef.update({ ...input });
      console.log({ ...document.data(), id: document.id, ...input });
      return new Promise((resolve: any) => {
        resolve({ ...document.data(), id: document.id, ...input });
      });
    }

    @Mutation(() => DeleteCls, {
      name: `delete${resourceCamelCase}`
    })
    public async remove(
      @Arg("id", () => String) id: string
    ): Promise<{ id: string }> {
      await client.firestore.delete(`${Collection}/${id}`, {
        project: PROJECTID,
        recursive: true,
        yes: true
      });
      // const resp = await collection.doc(id).delete();
      return { id };
    }

    @Query(() => ResourceCls, { name: `${resourceName}` })
    protected async getOne(@Arg("id", () => String) id: string) {
      const value = await collection.doc(id).get();
      return { ...value.data(), id: value.id };
    }

    @Query(() => [ResourceCls], { name: `${resourceName}s` })
    protected async getAll() {
      const values = await collection.get();
      return values.docs.map(value => {
        return { ...value.data(), id: value.id };
      });
    }
  }

  return ResourceResolverClass;
}
