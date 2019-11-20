import { Field, InputType, ObjectType } from "type-graphql";
import { Exercise } from "./entity";

@InputType()
export class ExerciseCreateInput implements Partial<Exercise> {
  @Field()
  public name: string;

  @Field(() => [String])
  public muscleGroups: string[];

  @Field({ nullable: true })
  public instructions?: string;

  @Field({ nullable: true })
  public isTimed?: boolean;

  @Field({ nullable: true })
  public isCooldown?: boolean;

  @Field({ nullable: true })
  public isWarmup?: boolean;
}

@InputType()
export class ExerciseUpdateInput implements Partial<Exercise> {
  @Field({ nullable: true })
  public name?: string;

  @Field(() => [String], { nullable: true })
  public muscleGroups?: string[];

  @Field({ nullable: true })
  public instructions?: string;

  @Field({ nullable: true })
  public isTimed?: boolean;

  @Field({ nullable: true })
  public isCooldown?: boolean;

  @Field({ nullable: true })
  public isWarmup?: boolean;
}

@ObjectType()
export class ExerciseDeletePayload implements Partial<Exercise> {
  @Field()
  public id: string;
}
