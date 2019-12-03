import { Arg, Mutation, Resolver } from "type-graphql";
import { ResourceResolver } from "../Resource";
import { Exercise } from "./entity";
import {
  ExerciseCreateInput,
  ExerciseDeletePayload,
  ExerciseUpdateInput
} from "./input";

const resource = Exercise;
type resourceType = Exercise;

@Resolver(() => Exercise)
export class ExerciseResolver extends ResourceResolver<resourceType>({
  table: "test-exercises",
  ResourceCls: resource,
  DeleteCls: ExerciseDeletePayload
}) {
  @Mutation(() => Exercise)
  public async createExercise(
    @Arg(`data`, () => ExerciseCreateInput) input: Partial<Exercise> // Was deeppartial
  ): Promise<Exercise> {
    console.log(input);
    const ref = await this.collection.add({ ...input });
    console.log("Added gym with ID: ", ref.id);
    return new Promise((resolve: any) => {
      resolve({ ...input, id: ref.id });
    });
  }

  @Mutation(() => Exercise)
  public async updateExercise(
    @Arg("id", () => String) id: string,
    @Arg(`data`, () => ExerciseUpdateInput) input: Partial<Exercise>
  ): Promise<Exercise> {
    console.log("Update", id, input);
    const docRef = this.collection.doc(id);
    const document = await docRef.get();
    await docRef.update({ ...input });
    console.log({ ...document.data(), id: document.id, ...input });
    return new Promise((resolve: any) => {
      resolve({ ...document.data(), id: document.id, ...input });
    });
  }
}
