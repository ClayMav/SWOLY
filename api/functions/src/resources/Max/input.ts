import { Field, InputType, ObjectType } from "type-graphql";
import { Max } from "./entity";
import { Exercise } from "../Exercise";

type tMax = Max;

@InputType()
export class MaxCreateInput {
  @Field()
  public exercise: string;

  @Field()
  public max: number;

  @Field()
  public timeAchieved: Date;

  public relations: any = { exercise: Exercise };
}

@InputType()
export class MaxUpdateInput {
  @Field({ nullable: true })
  public exercise?: string;

  @Field({ nullable: true })
  public max?: number;

  @Field({ nullable: true })
  public timeAchieved?: Date;

  public relations: any = { exercise: Exercise };
}

@ObjectType()
export class MaxDeletePayload implements Partial<tMax> {
  @Field()
  public id: string;
}
