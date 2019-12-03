/*
type Exercise {
    name: String!
    muscleGroups: [String]!
    instructions: String
    isTimed: Boolean
    isCooldown: Boolean
    isWarmup: Boolean
    id: String
  }
  */

import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Exercise {
  @Field()
  public id: string;

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

  public table: string = "test-exercises2";
}
