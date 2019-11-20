import { Resolver } from "type-graphql";
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
export class ExerciseResolver extends ResourceResolver<resourceType>(
  "test-exercises",
  resource,
  ExerciseCreateInput,
  ExerciseUpdateInput,
  ExerciseDeletePayload
) {}
