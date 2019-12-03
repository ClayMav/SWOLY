/*
 type Max {
    exercise: Exercise!
    maxWeight: Float!
    timeAchieved: String!
    id: String
  }
  */

import { Field, ObjectType } from "type-graphql";

import { Exercise } from "../Exercise";

@ObjectType()
export class Max {
  @Field()
  public id: string;

  @Field(() => Exercise)
  public exercise: Exercise;

  @Field()
  public max: number;

  @Field()
  public timeAchieved: Date;
}
