import { Arg, Resolver, Mutation } from "type-graphql";
import { ResourceResolver, firestore } from "../Resource";
import { Max } from "./entity";
import { MaxCreateInput, MaxDeletePayload, MaxUpdateInput } from "./input";

const client = require("firebase-tools");

const PROJECTID = "swoly-252721";

const resource = Max;
type resourceType = Max;

@Resolver(() => Max)
export class MaxResolver extends ResourceResolver<resourceType>(
  {
    table: "test-maxes",
    ResourceCls: resource,
    DeleteCls: MaxDeletePayload
  } /* : ResourceResolverProps<resourceType> */
) {
  @Mutation(() => Max)
  public async createMax(
    @Arg(`data`, () => MaxCreateInput) input: Partial<Max>, // Was deeppartial
    @Arg(`user`, () => String) user: string
  ): Promise<Max> {
    console.log(input);
    const col = firestore.collection(`users/${user}/${this.table}`);

    const exercise = firestore
      .collection(`test-exercises`)
      .doc(input.exercise)
      .get();

    const item = { ...input, exercise };
    const ref = await col.add(item);
    console.log("Added gym with ID: ", ref.id);
    return new Promise((resolve: any) => {
      resolve({ ...item, id: ref.id });
    });
  }

  @Mutation(() => Max)
  public async updateMax(
    @Arg(`id`, () => String) id: string,
    @Arg(`data`, () => MaxUpdateInput) input: any
  ): Promise<Max> {
    console.log(input);
    const docRef = this.collection.doc(id);
    const document = await docRef.get();
    await docRef.update({ ...input });

    console.log("Added gym with ID: ", ref.id);
    return new Promise((resolve: any) => {
      resolve({ ...input, id: ref.id });
    });
  }

  @Mutation(() => Max)
  public async deleteMax(
    @Arg(`id`, () => String) id: string,
    @Arg(`user`, () => String) user: string
  ): Promise<{ id: string }> {
    await client.firestore.delete(`users/${user}/${this.table}/${id}`, {
      project: PROJECTID,
      recursive: true,
      yes: true
    });

    return { id };
  }
}
