/*
 type Location {
    latitude: Float!
    longitude: Float!
  }
 */

import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Location {
  @Field()
  public latitude: number;

  @Field()
  public longitude: number;
}
