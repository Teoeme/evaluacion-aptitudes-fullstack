import { IIdGenerator } from "../../domain/services/IIdGenerator";
import mongoose from "mongoose";

export class MongooseIdGenerator implements IIdGenerator {
    generate(): string {
        return new mongoose.Types.ObjectId().toString();
    }
}